# AI-Predictive-Maintenance-Hydro

## Project Overview
AI-Predictive-Maintenance-Hydro is an end-to-end project designed to simulate sensor data for hydro station maintenance, process it through Node-RED and InfluxDB, and visualize the results through a modern Next.js web interface. The project leverages AI for predictive maintenance, ensuring early fault detection and operational efficiency.

The project is structured into two main parts:
1. **Frontend**: A modern Next.js web application for data visualization and user interaction
2. **Backend**: Infrastructure and services for data processing and storage

---

## 1. Prerequisites
- **Docker**: Containerization of services
- **WSL (Windows Subsystem for Linux)**: Linux environment on Windows
- **Python**: Sensor simulation and data preprocessing
- **Node.js**: For running the Next.js application
- **pnpm**: Package manager for the Next.js application

---

## 2. Project Structure
```
.
├── frontend/              # Next.js web application
│   ├── app/              # Next.js pages and API routes
│   ├── components/       # React components
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   ├── public/          # Static assets
│   ├── styles/          # Global styles
│   └── ... (Next.js config files)
│
├── python_scripts/      # Sensor simulation scripts
├── node_red/           # Node-RED flows and configurations
├── config/             # Service configurations
├── docker/             # Docker-related files
├── requirements/       # Python dependencies
├── data/              # Data storage
│   ├── influxdb/     # InfluxDB data
│   ├── mosquitto/    # MQTT data
│   └── grafana/      # Grafana data
│
├── logs/             # Application logs
├── docker-compose.yml # Docker services configuration
└── predictive_maintenance.csv  # Dataset for AI model training
```

---

## 3. Setting Up the Environment

### Backend Services Setup
1. Start the backend services using Docker Compose:
   ```bash
   docker-compose up -d
   ```
   This will start:
   - MQTT Broker (Mosquitto) on port 1883
   - InfluxDB on port 8086
   - Node-RED on port 1880
   - Grafana on port 3000

2. Set up Python environment for sensor simulation:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: .\venv\Scripts\activate
   pip install -r requirements/requirements.txt
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Run the development server:
   ```bash
   pnpm dev
   ```

4. Build for production:
   ```bash
   pnpm build
   ```

5. Start production server:
   ```bash
   pnpm start
   ```

---

## 4. Features

### Frontend
- Modern UI built with Next.js 15 and React 19
- Real-time sensor data visualization
- Interactive dashboards
- AI prediction displays
- Responsive design with Tailwind CSS
- Type-safe development with TypeScript

### Backend
- Sensor data simulation
- MQTT message broker
- Time-series data storage with InfluxDB
- Data processing with Node-RED
- Visualization with Grafana
- AI-powered predictive maintenance

---

## 5. Data Flow
1. Python scripts simulate sensor data
2. MQTT broker (Mosquitto) receives the data
3. Node-RED processes and routes the data
4. InfluxDB stores the time-series data
5. Grafana provides visualization capabilities
6. Next.js web interface displays real-time data and predictions

---

## 6. Technologies Used
- **Frontend**: Next.js, React, Tailwind CSS, TypeScript
- **UI Components**: Radix UI, Shadcn UI
- **Data Visualization**: Recharts, Leaflet
- **Backend Services**: Node-RED, InfluxDB, Grafana
- **IoT**: MQTT (Mosquitto)
- **Development**: TypeScript, ESLint, PostCSS

---

## 7. Contact
For assistance or inquiries, contact **Michael Lumanga** at [qylumanga@gmail.com](mailto:qylumanga@gmail.com).

---

## 8. Acknowledgments
- Special thanks to the open-source community for resources
- Kaggle for the predictive maintenance dataset
- All contributors and maintainers of the open-source tools used in this project

