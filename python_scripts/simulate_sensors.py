import paho.mqtt.client as mqtt
import json
import time
import random
import numpy as np
from datetime import datetime

class HydroSensorSimulator:
    def __init__(self):
        # MQTT Configuration
        self.mqtt_broker = "localhost"
        self.mqtt_port = 1883
        self.mqtt_topic = "hydro_station/sensors"
        
        # Sensor Parameters
        self.sensor_ranges = {
            'temperature': {'min': 30, 'max': 90, 'unit': '°C', 'normal': 60},
            'pressure': {'min': 1, 'max': 3, 'unit': 'bar', 'normal': 2},
            'vibration': {'min': 2, 'max': 8, 'unit': 'mm/s', 'normal': 5},
            'flow_rate': {'min': 60, 'max': 140, 'unit': 'm³/s', 'normal': 100},
            'power_output': {'min': 400, 'max': 600, 'unit': 'MW', 'normal': 500},
            'turbine_efficiency': {'min': 75, 'max': 95, 'unit': '%', 'normal': 85},
            'water_level': {'min': 40, 'max': 60, 'unit': 'm', 'normal': 50},
            'oil_temperature': {'min': 35, 'max': 55, 'unit': '°C', 'normal': 45}
        }
        
        # Initialize MQTT Client
        self.client = mqtt.Client()
        try:
            self.client.connect(self.mqtt_broker, self.mqtt_port, 60)
            print(f"Connected to MQTT broker at {self.mqtt_broker}:{self.mqtt_port}")
        except Exception as e:
            print(f"Failed to connect to MQTT broker: {e}")
            raise

    def generate_sensor_data(self, add_anomaly=False):
        """Generate simulated sensor data with optional anomalies."""
        data = {}
        timestamp = datetime.now()
        
        # Add random anomaly to one sensor if requested
        anomaly_sensor = random.choice(list(self.sensor_ranges.keys())) if add_anomaly else None
        
        for sensor, params in self.sensor_ranges.items():
            if sensor == anomaly_sensor:
                # Generate anomalous value outside normal range
                value = random.choice([
                    random.uniform(params['min'], params['min'] + (params['normal'] - params['min'])/2),
                    random.uniform(params['normal'] + (params['max'] - params['normal'])/2, params['max'])
                ])
            else:
                # Generate normal value with some noise
                noise = np.random.normal(0, (params['max'] - params['min'])/20)
                value = params['normal'] + noise
                value = max(params['min'], min(params['max'], value))
            
            data[sensor] = round(value, 2)
        
        data['timestamp'] = timestamp.isoformat()
        data['equipment_status'] = 'operational'
        
        return data

    def start_simulation(self, interval=5, anomaly_probability=0.1):
        """Start the sensor simulation with specified interval."""
        print("Starting sensor simulation...")
        print(f"Publishing to topic: {self.mqtt_topic}")
        print(f"Interval: {interval} seconds")
        print(f"Anomaly probability: {anomaly_probability}")
        
        self.client.loop_start()
        
        try:
            while True:
                # Decide if we should generate an anomaly
                add_anomaly = random.random() < anomaly_probability
                
                # Generate and publish sensor data
                data = self.generate_sensor_data(add_anomaly)
                message = json.dumps(data)
                self.client.publish(self.mqtt_topic, message)
                
                # Print status with timestamp
                status = "ANOMALY INJECTED" if add_anomaly else "NORMAL"
                print(f"[{data['timestamp']}] Data published - Status: {status}")
                
                time.sleep(interval)
                
        except KeyboardInterrupt:
            print("\nSimulation stopped by user")
            self.client.loop_stop()
            self.client.disconnect()
        except Exception as e:
            print(f"Simulation error: {e}")
            self.client.loop_stop()
            self.client.disconnect()
            raise

def main():
    simulator = HydroSensorSimulator()
    simulator.start_simulation()

if __name__ == "__main__":
    main() 