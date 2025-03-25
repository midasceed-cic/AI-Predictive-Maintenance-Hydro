# AI-Predictive-Maintenance-Hydro

## Project Overview
AI-Predictive-Maintenance-Hydro is an end-to-end project designed to simulate sensor data for hydro station maintenance, process it through Node-RED and InfluxDB, and visualize the results through Grafana dashboards. The project leverages AI for predictive maintenance, ensuring early fault detection, operational efficiency, and cost optimization in hydroelectric power stations.

The project is structured into two main parts:
1. **Backend Infrastructure**: Core services for data simulation, processing, and storage
2. **Visualization Layer**: Grafana dashboards for data visualization and monitoring
3. **Proposed Frontend**: A modern Next.js web interface for Grafana dashboard integration (under development)

---

## 1. Prerequisites
To successfully deploy and run this project, ensure you have the following tools installed:

- **Docker**: For containerizing and running services
- **WSL (Windows Subsystem for Linux)**: A Linux environment on Windows
- **Python 3.8+**: For simulating sensor data and preprocessing
- **Node.js 18+**: For the proposed frontend (optional)
- **pnpm**: A fast package manager for JavaScript projects (optional)
- **Grafana**: Primary visualization platform

---

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
├── node_red/             # Node-RED flows and configurations
├── config/               # Service configurations and environment variables
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

---

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

2. **Set Up Python Environment for Sensor Simulation:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: .\venv\Scripts\activate
   pip install -r requirements/requirements.txt
   ```

3. **Run the Sensor Simulation Script:**
   ```bash
   python python_scripts/simulate_sensors.py
   ```

4. **Access Grafana:**
   - Open your browser and navigate to `http://localhost:3000`
   - Default credentials: admin/admin123
   - Import the provided Grafana dashboards from the `data/grafana` directory

### Optional: Frontend Setup (Under Development)
The frontend is currently under development and will serve as a wrapper for Grafana dashboards, providing additional features like:
- Custom navigation and layout
- User authentication and authorization
- Additional UI components and interactions
- Mobile-responsive design

To set up the frontend (optional):
1. **Navigate to the Frontend Directory:**
   ```bash
   cd frontend
   ```

2. **Install Dependencies:**
   ```bash
   pnpm install
   ```

3. **Run the Development Server:**
   ```bash
   pnpm dev
   ```

Note: The frontend is still in development and not required for the core functionality of the system.

---

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

### Proposed Frontend (Under Development)
- **Grafana Integration:** Seamless embedding of Grafana dashboards
- **Modern UI:** Built with Next.js 15 and Tailwind CSS
- **Type Safety:** Ensures code quality with TypeScript
- **Dark Mode Support:** Seamless theme toggling
- **Custom Navigation:** Enhanced user experience for dashboard navigation

---

## 5. Data Flow

The system follows a streamlined data flow for predictive maintenance:

1. **Sensor Data Simulation:** Python scripts simulate hydro station sensor readings
2. **Data Ingestion:** Mosquitto MQTT broker collects and forwards data
3. **Processing:** Node-RED processes and routes data to InfluxDB
4. **Storage:** InfluxDB manages time-series data for efficient querying
5. **Visualization:** Grafana provides primary visualization through dashboards
6. **AI Predictions:** Predictive maintenance models forecast potential equipment failures
7. **Frontend Integration:** (Under Development) Next.js interface for enhanced Grafana dashboard access

---

## 6. Technologies Used

- **Core Services:** Node-RED, InfluxDB, Mosquitto (MQTT), Grafana
- **Data Simulation:** Python, Pandas, Numpy
- **Containerization:** Docker, Docker Compose
- **Proposed Frontend:** Next.js, React, Tailwind CSS, TypeScript
- **Development Tools:** ESLint, PostCSS, pnpm

---

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

---

## 8. Contact
For assistance or inquiries, contact **Michael Lumanga** at [qylumanga@gmail.com](mailto:qylumanga@gmail.com).

---

## 9. Acknowledgments
- Special thanks to the open-source community for invaluable resources
- Gratitude to Kaggle for the predictive maintenance dataset
- Appreciation to all contributors and maintainers of the open-source tools used in this project

