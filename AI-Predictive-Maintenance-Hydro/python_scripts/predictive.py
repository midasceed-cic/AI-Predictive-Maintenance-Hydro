import pandas as pd
from influxdb_client import InfluxDBClient
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
import numpy as np

# InfluxDB Connection
INFLUX_URL = "http://localhost:8086"
INFLUX_TOKEN = "<your_influxdb_token>"
ORG = "midascreed"
BUCKET = "hydro_data"

# Initialize InfluxDB Client
client = InfluxDBClient(url=INFLUX_URL, token=INFLUX_TOKEN, org=ORG)
query_api = client.query_api()

# Query Data from InfluxDB
query = '''
from(bucket: "hydro_data")
  |> range(start: -7d)
  |> filter(fn: (r) => r["_measurement"] == "sensor_data")
  |> pivot(rowKey:["_time"], columnKey:["_field"], valueColumn:"_value")
'''

result = query_api.query_data_frame(query)

# Preprocess Data
if result.empty:
    print("No data found.")
    exit()

result.drop(columns=["result", "table", "_start", "_stop", "_measurement"], inplace=True)
result.rename(columns={"_time": "timestamp"}, inplace=True)
result['timestamp'] = pd.to_datetime(result['timestamp'])

# Handle Missing Values
result.fillna(method='ffill', inplace=True)

# Define Features and Labels
features = result[["temperature", "pressure", "vibration"]]
labels = np.where(result['vibration'] > 0.5, 1, 0)  # 1 for anomaly, 0 for normal

# Split Data
X_train, X_test, y_train, y_test = train_test_split(features, labels, test_size=0.2, random_state=42)

# Train the Model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Evaluate the Model
y_pred = model.predict(X_test)
print(classification_report(y_test, y_pred))

# Inference and Saving Anomalies
anomalies = result.loc[model.predict(features) == 1]

print(f"Total Anomalies Detected: {len(anomalies)}")

# Write Anomalies Back to InfluxDB
write_api = client.write_api()
for _, row in anomalies.iterrows():
    point = {
        "measurement": "anomaly_detection",
        "tags": {"status": "anomaly"},
        "fields": {
            "temperature": row["temperature"],
            "pressure": row["pressure"],
            "vibration": row["vibration"]
        },
        "time": row["timestamp"].isoformat()
    }
    write_api.write(bucket=BUCKET, org=ORG, record=point)

print("Anomalies written back to InfluxDB.")
