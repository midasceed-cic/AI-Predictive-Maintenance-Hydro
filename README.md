# AI-Predictive-Maintenance-Hydro

## Project Overview
AI-Predictive-Maintenance-Hydro is an end-to-end industrial IoT solution designed for predictive maintenance in hydroelectric power stations. The system simulates SCADA sensor data, processes it through a robust data pipeline, and provides real-time monitoring and predictive analytics through Grafana dashboards.

### Key Capabilities
- Real-time sensor data simulation and monitoring
- Predictive maintenance using machine learning
- Automated anomaly detection
- Performance optimization recommendations
- Cost reduction through preventive maintenance
- Historical data analysis and trend prediction

### System Architecture
The project implements a modern microservices architecture:
1. **Data Generation Layer**: Python-based sensor simulation
2. **Data Processing Layer**: Node-RED for data transformation and routing
3. **Storage Layer**: InfluxDB for time-series data management
4. **Visualization Layer**: Grafana for data visualization and monitoring
5. **Integration Layer**: Proposed Next.js frontend for enhanced dashboard access

## 1. Prerequisites
To successfully deploy and run this project, ensure you have the following tools installed:

- **Docker**: For containerizing and running services
- **WSL (Windows Subsystem for Linux)**: A Linux environment on Windows
- **Python 3.8+**: For simulating sensor data and preprocessing
- **Node.js 18+**: For the proposed frontend (optional)
- **pnpm**: A fast package manager for JavaScript projects (optional)

Note: Grafana, InfluxDB, and Node-RED are not prerequisites as they are provided as Docker containers.

## 2. Project Structure
```
.
├── frontend/              # Proposed Next.js web interface (under development)
│   ├── app/              # Next.js pages and API routes
│   ├── components/       # Reusable React components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   ├── public/           # Static assets
│   ├── styles/           # Global styles
│   └── next.config.js    # Next.js configuration file
│
├── python_scripts/       # Sensor simulation scripts
│   ├── simulate_sensors.py    # Main simulation script
│   ├── data_preprocessing.py  # Data preprocessing utilities
│   └── model_training.py      # AI model training script
│
├── node_red/             # Node-RED flows and configurations
│   ├── flows.json        # Node-RED flow definitions
│   └── function_nodes/   # Custom function nodes
│
├── config/               # Service configurations and environment variables
│   ├── mosquitto.conf    # MQTT broker configuration
│   ├── influxdb.conf     # InfluxDB configuration
│   └── grafana/          # Grafana dashboard configurations
│
├── docker/               # Docker-related files and instructions
├── requirements/         # Python dependency files
├── data/                 # Persistent data storage
│   ├── influxdb/         # InfluxDB time-series data
│   ├── mosquitto/        # MQTT broker data
│   └── grafana/          # Grafana dashboards and data
│
├── logs/                 # Application and error logs
├── docker-compose.yml    # Docker services configuration
└── predictive_maintenance.csv  # AI model training dataset
```

## 3. Setting Up the Environment

### Core Services Setup
1. **Start Core Services with Docker Compose:**
   ```bash
   docker-compose up -d
   ```
   This will start the following services:
   - **MQTT Broker (Mosquitto)** on port 1883 (for message queuing)
   - **InfluxDB** on port 8086 (for time-series data storage)
   - **Node-RED** on port 1880 (for data processing)
   - **Grafana** on port 3000 (primary visualization platform)

2. **Configure Core Services:**

   a. **InfluxDB Setup:**
   - Access InfluxDB UI at `http://localhost:8086`
   - Login with default credentials (admin/admin123)
   - Create a new bucket named "hydro_data"
   - Generate an API token for Node-RED integration
   - Configure data retention policies
   - Set up data explorer queries for sensor data
   - Configure data downsampling for long-term storage
   - Set up continuous queries for data aggregation

   b. **Node-RED Configuration:**
   - Access Node-RED UI at `http://localhost:1880`
   - Import the provided flows from `node_red/flows.json`
   - Configure MQTT nodes to subscribe to sensor topics
   - Set up InfluxDB output nodes with your API token
   - Configure function nodes for data transformation
   - Set up debug nodes for monitoring data flow
   - Configure error handling and retry mechanisms
   - Set up data validation and cleaning nodes

   c. **Grafana Setup:**
   - Access Grafana at `http://localhost:3000`
   - Login with default credentials (admin/admin123)
   - Add InfluxDB as a data source
   - Import dashboards from `data/grafana`
   - Configure alert rules for predictive maintenance
   - Set up user authentication and permissions
   - Configure dashboard variables and templates
   - Set up notification channels for alerts

3. **Set Up Python Environment for Sensor Simulation:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: .\venv\Scripts\activate
   pip install -r requirements/requirements.txt
   ```

4. **Run the Sensor Simulation Script:**
   ```bash
   python python_scripts/simulate_sensors.py
   ```
   This script simulates SCADA system sensor data including:
   - Temperature readings (°C)
   - Pressure measurements (bar)
   - Vibration levels (mm/s)
   - Flow rates (m³/s)
   - Power output (MW)
   - Equipment status (operational/standby/maintenance)
   - Water level (m)
   - Turbine efficiency (%)
   - Generator voltage (kV)
   - Oil temperature (°C)

   Note: The Kaggle dataset (`predictive_maintenance.csv`) is optional and can be used for training the AI model, but the simulation script provides real-time data for testing and development.

### AI Model Integration
The project implements a comprehensive predictive maintenance model that can be trained using either:
1. **Simulated Data**: Real-time sensor data from the simulation script
2. **Historical Data**: The provided Kaggle dataset

#### Model Architecture
- **Input Layer**: Time-series sensor data
- **Processing Layer**: 
  - LSTM for temporal pattern recognition
  - Random Forest for feature importance
  - Isolation Forest for anomaly detection
- **Output Layer**: 
  - Failure probability prediction
  - Maintenance recommendations
  - Performance degradation metrics

#### Model Features
- Time-series forecasting
- Pattern recognition
- Threshold-based alerts
- Confidence scoring
- Automated retraining
- Feature importance analysis
- Anomaly detection
- Maintenance scheduling optimization

#### Model Training
```python
# Example of model training configuration
model_config = {
    'lstm_layers': [64, 32],
    'forecast_horizon': 24,  # hours
    'confidence_threshold': 0.85,
    'retraining_interval': '1d',
    'features': [
        'temperature',
        'pressure',
        'vibration',
        'flow_rate',
        'power_output'
    ]
}
```

### Optional: Frontend Setup (Under Development)
The frontend is designed to integrate with Grafana dashboards, providing:
- Custom navigation and layout
- User authentication and authorization
- Additional UI components and interactions
- Mobile-responsive design

#### Grafana Integration Methods:
1. **Iframe Embedding:**
   ```javascript
   // Example of embedding Grafana dashboard
   <iframe
     src="http://localhost:3000/d/your-dashboard-id"
     width="100%"
     height="600px"
     frameBorder="0"
     allowFullScreen
   />
   ```

2. **Grafana API Integration:**
```javascript
   // Example of fetching dashboard data
   const fetchDashboardData = async () => {
     const response = await fetch('http://localhost:3000/api/dashboards/db/your-dashboard-id', {
       headers: {
         'Authorization': `Bearer ${GRAFANA_API_KEY}`
       }
     });
     return response.json();
   };
   ```

3. **Custom Dashboard Components:**
   - Create wrapper components for Grafana panels
   - Implement custom navigation
   - Add additional UI elements

To set up the frontend (optional):
1. **Navigate to the Frontend Directory:**
   ```bash
   cd frontend
   ```

2. **Install Dependencies:**
   ```bash
   pnpm install
   ```

3. **Configure Environment Variables:**
   ```env
   NEXT_PUBLIC_GRAFANA_URL=http://localhost:3000
   NEXT_PUBLIC_GRAFANA_API_KEY=your_api_key
   ```

4. **Run the Development Server:**
   ```bash
   pnpm dev
   ```

Note: The frontend is still in development and not required for the core functionality of the system.

## 4. Features

### Core System
- **Sensor Data Simulation:** Python scripts generate realistic data streams
- **Message Brokering:** Mosquitto MQTT handles communication between services
- **Time-Series Database:** InfluxDB stores and manages sensor data
- **Node-RED Workflows:** For efficient data routing and processing
- **Grafana Dashboards:** Primary visualization platform with:
  - Real-time sensor data monitoring
  - Historical data analysis
  - Custom alerts and notifications
  - Predictive maintenance insights
  - Mobile-responsive dashboards
  - Automated report generation
  - Custom plugin integration
  - Role-based access control

### Proposed Frontend (Under Development)
- **Grafana Integration:** Seamless embedding of Grafana dashboards
- **Modern UI:** Built with Next.js 15 and Tailwind CSS
- **Type Safety:** Ensures code quality with TypeScript
- **Dark Mode Support:** Seamless theme toggling
- **Custom Navigation:** Enhanced user experience for dashboard navigation
- **User Management:** Role-based access control
- **API Integration:** RESTful endpoints for data access
- **Real-time Updates:** WebSocket integration for live data

## 5. Data Flow

The system follows a streamlined data flow for predictive maintenance:

1. **Sensor Data Simulation:** Python scripts simulate hydro station sensor readings
2. **Data Ingestion:** Mosquitto MQTT broker collects and forwards data
3. **Processing:** Node-RED processes and routes data to InfluxDB
4. **Storage:** InfluxDB manages time-series data for efficient querying
5. **Visualization:** Grafana provides primary visualization through dashboards
6. **AI Predictions:** Predictive maintenance models forecast potential equipment failures
7. **Frontend Integration:** (Under Development) Next.js interface for enhanced Grafana dashboard access

## 6. Technologies Used

### Core Services
- **Data Processing:** Node-RED
- **Time-Series Database:** InfluxDB v2.6
- **Message Broker:** Mosquitto MQTT v2.0.15
- **Visualization:** Grafana v10.0.0

### Data Simulation
- **Language:** Python 3.8+
- **Libraries:** 
  - Pandas for data manipulation
  - NumPy for numerical operations
  - Paho-MQTT for MQTT communication
  - Scikit-learn for machine learning

### Containerization
- **Platform:** Docker
- **Orchestration:** Docker Compose
- **Networking:** Custom bridge network

### Proposed Frontend
- **Framework:** Next.js 15
- **UI Library:** React 19
- **Styling:** Tailwind CSS
- **Type System:** TypeScript
- **State Management:** React Hooks
- **API Client:** Axios/Fetch

### Development Tools
- **Package Manager:** pnpm
- **Linting:** ESLint
- **CSS Processing:** PostCSS
- **Version Control:** Git
- **CI/CD:** GitHub Actions (planned)

## 7. Deployment

For production deployment, consider using DigitalOcean, AWS, or Azure for hosting the Docker containers. Follow these steps for deployment:

1. **Deploy Core Services:**
   ```bash
   docker-compose up -d
   ```

2. **Configure Grafana:**
   - Set up authentication
   - Import dashboards
   - Configure data sources
   - Set up alerts

3. **Optional: Deploy Frontend (When Ready)**
   ```bash
   cd frontend
   pnpm build
   pnpm start
   ```

Note: The frontend deployment is optional and can be added once development is complete.

## 8. Contact
For assistance or inquiries, contact **Michael Lumanga** at [qylumanga@gmail.com](mailto:qylumanga@gmail.com).

## 9. Acknowledgments
- Special thanks to the open-source community for invaluable resources
- Gratitude to Kaggle for the predictive maintenance dataset
- Appreciation to all contributors and maintainers of the open-source tools used in this project
- Recognition to the industrial IoT community for best practices and standards

