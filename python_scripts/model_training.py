import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier, IsolationForest
from sklearn.metrics import classification_report, confusion_matrix
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout
from tensorflow.keras.optimizers import Adam
import joblib
import json
import os
from datetime import datetime, timedelta

class PredictiveMaintenanceModel:
    def __init__(self, config_path=None):
        """
        Initialize the predictive maintenance model with configuration.
        
        Args:
            config_path (str): Path to model configuration JSON file
        """
        self.config = {
            'lstm_layers': [64, 32],
            'forecast_horizon': 24,  # hours
            'confidence_threshold': 0.85,
            'retraining_interval': '1d',
            'sequence_length': 48,  # Number of time steps to look back
            'features': [
                'temperature',
                'pressure',
                'vibration',
                'flow_rate',
                'power_output',
                'turbine_efficiency',
                'water_level',
                'oil_temperature'
            ],
            'target': 'equipment_status',
            'random_state': 42
        }
        
        if config_path and os.path.exists(config_path):
            with open(config_path, 'r') as f:
                self.config.update(json.load(f))
        
        self.scaler = StandardScaler()
        self.lstm_model = None
        self.rf_model = None
        self.isolation_forest = None
        self.last_training_time = None

    def preprocess_data(self, data):
        """
        Preprocess the input data for model training.
        
        Args:
            data (pd.DataFrame): Raw sensor data
            
        Returns:
            tuple: Processed X and y data for training
        """
        # Select relevant features
        features = data[self.config['features']].copy()
        
        # Scale features
        scaled_features = self.scaler.fit_transform(features)
        
        # Create sequences for LSTM
        X_sequences = []
        y = []
        
        for i in range(len(scaled_features) - self.config['sequence_length']):
            X_sequences.append(scaled_features[i:i + self.config['sequence_length']])
            y.append(1 if data[self.config['target']].iloc[i + self.config['sequence_length']] == 'maintenance' else 0)
        
        return np.array(X_sequences), np.array(y)

    def build_lstm_model(self, input_shape):
        """
        Build the LSTM model architecture.
        
        Args:
            input_shape (tuple): Shape of input data
            
        Returns:
            tf.keras.Model: Compiled LSTM model
        """
        model = Sequential()
        
        # Add LSTM layers
        for i, units in enumerate(self.config['lstm_layers']):
            if i == 0:
                model.add(LSTM(units, input_shape=input_shape, return_sequences=True))
            else:
                model.add(LSTM(units, return_sequences=False))
            model.add(Dropout(0.2))
        
        # Add Dense layers
        model.add(Dense(16, activation='relu'))
        model.add(Dropout(0.2))
        model.add(Dense(1, activation='sigmoid'))
        
        # Compile model
        model.compile(
            optimizer=Adam(learning_rate=0.001),
            loss='binary_crossentropy',
            metrics=['accuracy']
        )
        
        return model

    def train_models(self, data):
        """
        Train both LSTM and Random Forest models.
        
        Args:
            data (pd.DataFrame): Training data
            
        Returns:
            dict: Training metrics
        """
        # Preprocess data
        X_sequences, y = self.preprocess_data(data)
        
        # Split data
        X_train, X_test, y_train, y_test = train_test_split(
            X_sequences, y, 
            test_size=0.2, 
            random_state=self.config['random_state']
        )
        
        # Train LSTM
        if not self.lstm_model:
            self.lstm_model = self.build_lstm_model(
                input_shape=(X_sequences.shape[1], X_sequences.shape[2])
            )
        
        lstm_history = self.lstm_model.fit(
            X_train, y_train,
            epochs=50,
            batch_size=32,
            validation_split=0.2,
            verbose=1
        )
        
        # Train Random Forest
        X_rf = X_sequences.reshape(X_sequences.shape[0], -1)  # Flatten sequences
        X_rf_train, X_rf_test = train_test_split(
            X_rf, test_size=0.2, 
            random_state=self.config['random_state']
        )
        
        self.rf_model = RandomForestClassifier(
            n_estimators=100,
            random_state=self.config['random_state']
        )
        self.rf_model.fit(X_rf_train, y_train)
        
        # Train Isolation Forest for anomaly detection
        self.isolation_forest = IsolationForest(
            contamination=0.1,
            random_state=self.config['random_state']
        )
        self.isolation_forest.fit(X_rf)
        
        # Evaluate models
        lstm_pred = (self.lstm_model.predict(X_test) > 0.5).astype(int)
        rf_pred = self.rf_model.predict(X_rf_test)
        
        metrics = {
            'lstm': {
                'classification_report': classification_report(y_test, lstm_pred),
                'confusion_matrix': confusion_matrix(y_test, lstm_pred).tolist()
            },
            'random_forest': {
                'classification_report': classification_report(y_test, rf_pred),
                'confusion_matrix': confusion_matrix(y_test, rf_pred).tolist()
            },
            'training_history': {
                'loss': lstm_history.history['loss'],
                'val_loss': lstm_history.history['val_loss'],
                'accuracy': lstm_history.history['accuracy'],
                'val_accuracy': lstm_history.history['val_accuracy']
            }
        }
        
        self.last_training_time = datetime.now()
        return metrics

    def predict(self, data):
        """
        Make predictions using both models.
        
        Args:
            data (pd.DataFrame): Input data for prediction
            
        Returns:
            dict: Predictions and confidence scores
        """
        # Preprocess data
        features = data[self.config['features']].copy()
        scaled_features = self.scaler.transform(features)
        
        # Prepare sequences
        sequences = []
        for i in range(len(scaled_features) - self.config['sequence_length'] + 1):
            sequences.append(scaled_features[i:i + self.config['sequence_length']])
        sequences = np.array(sequences)
        
        # Get predictions
        lstm_pred = self.lstm_model.predict(sequences)
        rf_pred = self.rf_model.predict(sequences.reshape(sequences.shape[0], -1))
        anomalies = self.isolation_forest.predict(sequences.reshape(sequences.shape[0], -1))
        
        # Calculate confidence scores
        lstm_confidence = np.abs(lstm_pred - 0.5) * 2  # Scale to 0-1
        rf_confidence = np.max(self.rf_model.predict_proba(sequences.reshape(sequences.shape[0], -1)), axis=1)
        
        return {
            'lstm_predictions': lstm_pred.tolist(),
            'rf_predictions': rf_pred.tolist(),
            'anomalies': anomalies.tolist(),
            'lstm_confidence': lstm_confidence.tolist(),
            'rf_confidence': rf_confidence.tolist(),
            'timestamp': datetime.now().isoformat()
        }

    def save_models(self, path):
        """
        Save all models and configurations.
        
        Args:
            path (str): Directory to save models
        """
        os.makedirs(path, exist_ok=True)
        
        # Save LSTM model
        self.lstm_model.save(os.path.join(path, 'lstm_model'))
        
        # Save Random Forest and Isolation Forest models
        joblib.dump(self.rf_model, os.path.join(path, 'random_forest_model.joblib'))
        joblib.dump(self.isolation_forest, os.path.join(path, 'isolation_forest_model.joblib'))
        
        # Save scaler
        joblib.dump(self.scaler, os.path.join(path, 'scaler.joblib'))
        
        # Save configuration
        with open(os.path.join(path, 'config.json'), 'w') as f:
            json.dump(self.config, f, indent=4)

    def load_models(self, path):
        """
        Load all models and configurations.
        
        Args:
            path (str): Directory containing saved models
        """
        # Load LSTM model
        self.lstm_model = tf.keras.models.load_model(os.path.join(path, 'lstm_model'))
        
        # Load Random Forest and Isolation Forest models
        self.rf_model = joblib.load(os.path.join(path, 'random_forest_model.joblib'))
        self.isolation_forest = joblib.load(os.path.join(path, 'isolation_forest_model.joblib'))
        
        # Load scaler
        self.scaler = joblib.load(os.path.join(path, 'scaler.joblib'))
        
        # Load configuration
        with open(os.path.join(path, 'config.json'), 'r') as f:
            self.config = json.load(f)

def main():
    """
    Main function to demonstrate model usage.
    """
    # Example usage
    model = PredictiveMaintenanceModel()
    
    # Load your data here
    # data = pd.read_csv('predictive_maintenance.csv')
    
    # For demonstration, create synthetic data
    np.random.seed(42)
    n_samples = 1000
    
    synthetic_data = pd.DataFrame({
        'temperature': np.random.normal(60, 10, n_samples),
        'pressure': np.random.normal(2, 0.5, n_samples),
        'vibration': np.random.normal(5, 1, n_samples),
        'flow_rate': np.random.normal(100, 20, n_samples),
        'power_output': np.random.normal(500, 50, n_samples),
        'turbine_efficiency': np.random.normal(85, 5, n_samples),
        'water_level': np.random.normal(50, 5, n_samples),
        'oil_temperature': np.random.normal(45, 5, n_samples),
        'equipment_status': np.random.choice(
            ['operational', 'maintenance'],
            n_samples,
            p=[0.9, 0.1]
        )
    })
    
    # Train models
    metrics = model.train_models(synthetic_data)
    print("Training metrics:", json.dumps(metrics, indent=2))
    
    # Make predictions
    predictions = model.predict(synthetic_data.head(50))
    print("\nPredictions:", json.dumps(predictions, indent=2))
    
    # Save models
    model.save_models('saved_models')

if __name__ == '__main__':
    main() 