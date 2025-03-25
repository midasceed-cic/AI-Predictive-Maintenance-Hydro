import paho.mqtt.client as mqtt
import json
import time
import random
from config.mqtt_config import MQTT_BROKER, MQTT_PORT, MQTT_TOPIC, PUBLISH_INTERVAL
import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'config'))


# Define MQTT client
client = mqtt.Client()

# Connect to MQTT Broker
def connect_mqtt():
    try:
        client.connect(MQTT_BROKER, MQTT_PORT)
        print(f"✅ Connected to MQTT Broker at {MQTT_BROKER}:{MQTT_PORT}")
    except Exception as e:
        print(f"❌ Failed to connect: {e}")

# Generate random sensor data
def generate_sensor_data():
    return {
        "temperature": round(random.uniform(20.0, 40.0), 2),  # °C
        "vibration": round(random.uniform(0.5, 3.0), 2),     # m/s²
        "pressure": round(random.uniform(1.0, 5.0), 2),      # Bar
        "timestamp": time.time()
    }

# Publish data to MQTT
def publish():
    while True:
        data = generate_sensor_data()
        client.publish(MQTT_TOPIC, json.dumps(data))
        print(f"📤 Published: {data}")
        time.sleep(PUBLISH_INTERVAL)

if __name__ == "__main__":
    connect_mqtt()
    publish()
