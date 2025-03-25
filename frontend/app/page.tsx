"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CalendarDays,
  AlertTriangle,
  Gauge,
  Droplets,
  Waves,
  Activity,
  Battery,
  Mountain,
  Wind,
  Zap,
  ThermometerIcon,
  CloudRain,
  Fish,
  Lock,
  BarChart2,
  Terminal,
} from "lucide-react"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { LatLngExpression } from "leaflet"
import "leaflet/dist/leaflet.css"
import { useGrafana, GrafanaDashboardEmbed } from '@/lib/grafana'

interface Dashboard {
  uid: string;
  title: string;
}

interface Alert {
  name: string;
  message: string;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      main: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      div: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
      h1: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
      h2: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
      button: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
      ul: React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>;
      li: React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>;
      span: React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;
      p: React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>;
    }
  }
}

const powerOutputData = [
  { time: "00:00", output: 110, demand: 100 },
  { time: "04:00", output: 95, demand: 90 },
  { time: "08:00", output: 130, demand: 125 },
  { time: "12:00", output: 150, demand: 155 },
  { time: "16:00", output: 160, demand: 165 },
  { time: "20:00", output: 140, demand: 145 },
  { time: "23:59", output: 120, demand: 115 },
]

const weeklyOutputData = [
  { day: "Mon", output: 2800 },
  { day: "Tue", output: 3200 },
  { day: "Wed", output: 3100 },
  { day: "Thu", output: 2950 },
  { day: "Fri", output: 3300 },
  { day: "Sat", output: 3000 },
  { day: "Sun", output: 2700 },
]

const reservoirData = [
  { name: "Current Level", value: 85 },
  { name: "Remaining Capacity", value: 15 },
]

const COLORS = ["#00f0ff", "#ff3e3e", "#FFBB28", "#FF8042"]

export default function Home() {
  const grafana = useGrafana()
  const [dashboards, setDashboards] = useState<Dashboard[]>([])
  const [selectedDashboard, setSelectedDashboard] = useState<string | null>(null)
  const [alerts, setAlerts] = useState<Alert[]>([])

  useEffect(() => {
    // Fetch available dashboards
    grafana.getDashboards()
      .then((data: Dashboard[]) => setDashboards(data))
      .catch(console.error)

    // Fetch current alerts
    grafana.getAlerts()
      .then((data: Alert[]) => setAlerts(data))
      .catch(console.error)

    // Refresh alerts every minute
    const alertInterval = setInterval(() => {
      grafana.getAlerts()
        .then((data: Alert[]) => setAlerts(data))
        .catch(console.error)
    }, 60000)

    return () => clearInterval(alertInterval)
  }, [])

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">
          Hydro Station Monitoring
              </h1>

        {/* Dashboard Selection */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Dashboards</h2>
          <div className="flex gap-4">
            {dashboards.map((dashboard: Dashboard) => (
              <button
                key={dashboard.uid}
                onClick={() => setSelectedDashboard(dashboard.uid)}
                className={`px-4 py-2 rounded ${
                  selectedDashboard === dashboard.uid
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                {dashboard.title}
              </button>
            ))}
            </div>
          </div>

        {/* Active Alerts */}
        {alerts.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Active Alerts</h2>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <ul className="space-y-2">
                {alerts.map((alert: Alert, index: number) => (
                  <li
                    key={index}
                    className="flex items-center text-red-700"
                  >
                    <span className="mr-2">⚠️</span>
                    {alert.name}: {alert.message}
                  </li>
                ))}
              </ul>
                </div>
              </div>
        )}

        {/* Dashboard Display */}
        {selectedDashboard ? (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <GrafanaDashboardEmbed
              dashboardUid={selectedDashboard}
              height="800px"
            />
                        </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">
              Select a dashboard to view
            </p>
                              </div>
        )}
                            </div>
    </main>
  )
}

function EnvironmentalMonitoringCard() {
  return (
    <div className="industrial-card p-3">
      <div className="corner-accent corner-accent-tl"></div>
      <div className="corner-accent corner-accent-tr"></div>
      <div className="corner-accent corner-accent-bl"></div>
      <div className="corner-accent corner-accent-br"></div>

      <div className="equipment-id mb-2">A7</div>
      <div className="text-xs text-[#00f0ff]/70 mb-3">Environmental Monitoring</div>

      <div className="flex items-center justify-between mb-4">
        <div className="space-y-1">
          <div className="text-xs text-[#00f0ff]/70">Upstream River Flow</div>
          <div className="digital-readout">980 m³/s</div>
        </div>
        <div className="space-y-1">
          <div className="text-xs text-[#00f0ff]/70">Downstream Flow</div>
          <div className="digital-readout">850 m³/s</div>
        </div>
      </div>

      <div className="space-y-1 mb-4">
        <div className="text-xs text-[#00f0ff]/70">Recent Rainfall</div>
        <Progress value={45} className="h-1 bg-[#00f0ff]/20" indicatorClassName="bg-[#00f0ff]" />
        <div className="text-xs text-[#00f0ff]/70">45mm in last 24 hours</div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="space-y-1">
          <div className="text-xs text-[#00f0ff]/70">Water Quality pH</div>
          <div className="digital-readout">7.2</div>
        </div>
        <div className="space-y-1">
          <div className="text-xs text-[#00f0ff]/70">Dissolved Oxygen</div>
          <div className="digital-readout">8.5 mg/L</div>
        </div>
      </div>

      <div className="bg-[#00f0ff]/10 border-l-2 border-[#00f0ff] p-2 text-xs">
        <div className="flex items-center">
          <CloudRain className="h-3 w-3 text-[#00f0ff] mr-1" />
          <div className="font-semibold text-[#00f0ff]">Weather Forecast</div>
        </div>
        <div className="ml-4 mt-1">Heavy rainfall expected in 48 hours</div>
      </div>
    </div>
  )
}

function WaterQualityCard() {
  return (
    <div className="industrial-card p-3">
      <div className="corner-accent corner-accent-tl"></div>
      <div className="corner-accent corner-accent-tr"></div>
      <div className="corner-accent corner-accent-bl"></div>
      <div className="corner-accent corner-accent-br"></div>

      <div className="equipment-id mb-2">D6</div>
      <div className="text-xs text-[#00f0ff]/70 mb-2">Water Quality Trends</div>

      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={[
              { date: "2023-06-01", ph: 7.1, oxygen: 8.2 },
              { date: "2023-06-02", ph: 7.2, oxygen: 8.3 },
              { date: "2023-06-03", ph: 7.0, oxygen: 8.1 },
              { date: "2023-06-04", ph: 7.3, oxygen: 8.4 },
              { date: "2023-06-05", ph: 7.2, oxygen: 8.5 },
            ]}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 240, 255, 0.1)" />
            <XAxis dataKey="date" stroke="rgba(0, 240, 255, 0.5)" />
            <YAxis yAxisId="left" stroke="rgba(0, 240, 255, 0.5)" />
            <YAxis yAxisId="right" orientation="right" stroke="rgba(0, 240, 255, 0.5)" />
            <Tooltip contentStyle={{ backgroundColor: "#0a0e14", borderColor: "#00f0ff" }} />
            <Line yAxisId="left" type="monotone" dataKey="ph" stroke="#00f0ff" name="pH" />
            <Line yAxisId="right" type="monotone" dataKey="oxygen" stroke="#ffcc00" name="Dissolved Oxygen (mg/L)" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

function FishLadderCard() {
  return (
    <div className="industrial-card p-3">
      <div className="corner-accent corner-accent-tl"></div>
      <div className="corner-accent corner-accent-tr"></div>
      <div className="corner-accent corner-accent-bl"></div>
      <div className="corner-accent corner-accent-br"></div>

      <div className="equipment-id mb-2">S3</div>
      <div className="text-xs text-[#00f0ff]/70 mb-2">Fish Ladder Monitoring</div>

      <div className="space-y-3 mb-3">
        <div className="space-y-1">
          <div className="text-xs text-[#00f0ff]/70">Fish Passage Count (Last 24h)</div>
          <div className="digital-readout">1,245</div>
        </div>
        <div className="space-y-1">
          <div className="text-xs text-[#00f0ff]/70">Water Flow in Fish Ladder</div>
          <div className="digital-readout">1.2 m³/s</div>
        </div>
        <div className="space-y-1">
          <div className="text-xs text-[#00f0ff]/70">Water Temperature</div>
          <div className="digital-readout">18.5°C</div>
        </div>
      </div>

      <div className="h-[150px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={[
              { time: "00:00", count: 20 },
              { time: "04:00", count: 40 },
              { time: "08:00", count: 100 },
              { time: "12:00", count: 80 },
              { time: "16:00", count: 120 },
              { time: "20:00", count: 60 },
              { time: "23:59", count: 30 },
            ]}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 240, 255, 0.1)" />
            <XAxis dataKey="time" stroke="rgba(0, 240, 255, 0.5)" />
            <YAxis stroke="rgba(0, 240, 255, 0.5)" />
            <Tooltip contentStyle={{ backgroundColor: "#0a0e14", borderColor: "#00f0ff" }} />
            <Area type="monotone" dataKey="count" stroke="#00f0ff" fill="rgba(0, 240, 255, 0.2)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-[#00f0ff]/10 border-l-2 border-[#00f0ff] p-2 text-xs mt-3">
        <div className="flex items-center">
          <Fish className="h-3 w-3 text-[#00f0ff] mr-1" />
          <div className="font-semibold text-[#00f0ff]">Peak Migration Season</div>
        </div>
        <div className="ml-4 mt-1">Increased monitoring in effect</div>
      </div>
    </div>
  )
}

function GISMapCard() {
  const center: LatLngExpression = [-15.7861, 35.0058];
  
  return (
    <div className="industrial-card p-3">
      <div className="corner-accent corner-accent-tl"></div>
      <div className="corner-accent corner-accent-tr"></div>
      <div className="corner-accent corner-accent-bl"></div>
      <div className="corner-accent corner-accent-br"></div>

      <div className="equipment-id mb-2">DR1</div>
      <div className="text-xs text-[#00f0ff]/70 mb-2">GIS Environmental Monitoring</div>

      <div className="h-[400px] border border-[#00f0ff]/30">
        <MapContainer
          center={center}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
          className="z-0"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={center}>
            <Popup>Shire River Hydropower Complex</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  )
}

function MaintenanceScheduleCard() {
  return (
    <div className="industrial-card p-3">
      <div className="corner-accent corner-accent-tl"></div>
      <div className="corner-accent corner-accent-tr"></div>
      <div className="corner-accent corner-accent-bl"></div>
      <div className="corner-accent corner-accent-br"></div>

      <div className="equipment-id mb-2">T3</div>
      <div className="text-xs text-[#00f0ff]/70 mb-3">Maintenance Schedule</div>

      <div className="space-y-3 mb-3">
        <div className="space-y-1">
          <div className="text-xs text-[#00f0ff]/70">Next Planned Outage</div>
          <div className="digital-readout">2025-03-30</div>
          <div className="text-xs text-[#00f0ff]/70">Turbine Unit 2 Overhaul</div>
        </div>

        <div className="space-y-1">
          <div className="text-xs text-[#00f0ff]/70">Upcoming Inspections</div>
          <ul className="list-disc pl-4 text-xs text-[#00f0ff]">
            <li>Dam Structure Assessment (2025-05-1)</li>
            <li>Generator Winding Test (2025-05-24)</li>
            <li>Spillway Gate Lubrication (2025-05-01)</li>
          </ul>
        </div>
      </div>

      <div className="bg-[#00f0ff]/10 border-l-2 border-[#00f0ff] p-2 text-xs">
        <div className="flex items-center">
          <CalendarDays className="h-3 w-3 text-[#00f0ff] mr-1" />
          <div className="font-semibold text-[#00f0ff]">Scheduled Maintenance</div>
        </div>
        <div className="ml-4 mt-1">Turbine Unit 1 inspection in 5 days</div>
      </div>
    </div>
  )
}

function EquipmentHealthCard() {
  return (
    <div className="industrial-card p-3">
      <div className="corner-accent corner-accent-tl"></div>
      <div className="corner-accent corner-accent-tr"></div>
      <div className="corner-accent corner-accent-bl"></div>
      <div className="corner-accent corner-accent-br"></div>

      <div className="equipment-id mb-2">BX [41]</div>
      <div className="text-xs text-[#00f0ff]/70 mb-3">Equipment Health Overview</div>

      <div className="space-y-3">
        <div className="flex items-center">
          <span className="text-xs w-1/3">Turbine Unit 1:</span>
          <Progress value={92} className="h-1 flex-1 bg-[#00f0ff]/20" indicatorClassName="bg-[#00f0ff]" />
          <span className="text-xs ml-2 text-[#00f0ff]">92%</span>
        </div>
        <div className="flex items-center">
          <span className="text-xs w-1/3">Generator Unit 1:</span>
          <Progress value={88} className="h-1 flex-1 bg-[#00f0ff]/20" indicatorClassName="bg-[#00f0ff]" />
          <span className="text-xs ml-2 text-[#00f0ff]">88%</span>
        </div>
        <div className="flex items-center">
          <span className="text-xs w-1/3">Dam Gates:</span>
          <Progress value={78} className="h-1 flex-1 bg-[#ffcc00]/20" indicatorClassName="bg-[#ffcc00]" />
          <span className="text-xs ml-2 text-[#ffcc00]">78%</span>
        </div>
        <div className="flex items-center">
          <span className="text-xs w-1/3">Transformers:</span>
          <Progress value={95} className="h-1 flex-1 bg-[#00f0ff]/20" indicatorClassName="bg-[#00f0ff]" />
          <span className="text-xs ml-2 text-[#00f0ff]">95%</span>
        </div>
      </div>
    </div>
  )
}

function PredictiveMaintenanceCard() {
  return (
    <div className="industrial-card p-3">
      <div className="corner-accent corner-accent-tl"></div>
      <div className="corner-accent corner-accent-tr"></div>
      <div className="corner-accent corner-accent-bl"></div>
      <div className="corner-accent corner-accent-br"></div>

      <div className="equipment-id mb-2">L3</div>
      <div className="text-xs text-[#00f0ff]/70 mb-3">Predictive Maintenance</div>

      <div className="space-y-3 mb-3">
        <div className="space-y-1">
          <div className="text-xs text-[#00f0ff]/70">Next Predicted Failure</div>
          <div className="digital-readout">Turbine Bearing (Unit 2)</div>
          <div className="text-xs text-[#00f0ff]/70">Estimated in 45 days</div>
        </div>

        <div className="space-y-1">
          <div className="text-xs text-[#00f0ff]/70">Recommended Action</div>
          <div className="text-xs text-[#00f0ff]">Schedule bearing replacement within 30 days</div>
        </div>
      </div>

      <div className="bg-[#00f0ff]/10 border-l-2 border-[#00f0ff] p-2 text-xs">
        <div className="flex items-center">
          <BarChart2 className="h-3 w-3 text-[#00f0ff] mr-1" />
          <div className="font-semibold text-[#00f0ff]">AI-Driven Insight</div>
        </div>
        <div className="ml-4 mt-1">Unusual vibration pattern detected in Generator Unit 1</div>
      </div>
    </div>
  )
}

function SecurityOverviewCard() {
  return (
    <div className="industrial-card p-3">
      <div className="corner-accent corner-accent-tl"></div>
      <div className="corner-accent corner-accent-tr"></div>
      <div className="corner-accent corner-accent-bl"></div>
      <div className="corner-accent corner-accent-br"></div>

      <div className="equipment-id mb-2">S3</div>
      <div className="text-xs text-[#00f0ff]/70 mb-3">Security Overview</div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="space-y-1">
          <div className="text-xs text-[#00f0ff]/70">Active Alarms</div>
          <div className="digital-readout">0</div>
        </div>
        <div className="space-y-1">
          <div className="text-xs text-[#00f0ff]/70">Perimeter Status</div>
          <div className="digital-readout">Secure</div>
        </div>
      </div>

      <div className="space-y-1 mb-4">
        <div className="text-xs text-[#00f0ff]/70">Recent Access Logs</div>
        <ul className="list-disc pl-4 text-xs text-[#00f0ff]">
          <li>Main Gate Access - Limbani Banda (08:30 AM)</li>
          <li>Control Room Entry - Michael Lumanga (09:15 AM)</li>
          <li>Server Room Access - Tech Team (10:45 AM)</li>
        </ul>
      </div>

      <div className="bg-[#00f0ff]/10 border-l-2 border-[#00f0ff] p-2 text-xs">
        <div className="flex items-center">
          <Lock className="h-3 w-3 text-[#00f0ff] mr-1" />
          <div className="font-semibold text-[#00f0ff]">Security Update</div>
        </div>
        <div className="ml-4 mt-1">All systems operating normally. Last security scan: 15 minutes ago.</div>
      </div>
    </div>
  )
}

function AccessControlCard() {
  return (
    <div className="industrial-card p-3">
      <div className="corner-accent corner-accent-tl"></div>
      <div className="corner-accent corner-accent-tr"></div>
      <div className="corner-accent corner-accent-bl"></div>
      <div className="corner-accent corner-accent-br"></div>

      <div className="equipment-id mb-2">A7</div>
      <div className="text-xs text-[#00f0ff]/70 mb-3">Access Control Management</div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-xs">Two-Factor Authentication</span>
          <Switch className="data-[state=checked]:bg-[#00f0ff]" />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs">Biometric Access</span>
          <Switch className="data-[state=checked]:bg-[#00f0ff]" />
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-xs text-[#00f0ff]/70">Access Levels</div>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" className="text-xs border-[#00f0ff] text-[#00f0ff] hover:bg-[#00f0ff]/10">
            Operators
          </Button>
          <Button variant="outline" size="sm" className="text-xs border-[#00f0ff] text-[#00f0ff] hover:bg-[#00f0ff]/10">
            Maintenance
          </Button>
          <Button variant="outline" size="sm" className="text-xs border-[#00f0ff] text-[#00f0ff] hover:bg-[#00f0ff]/10">
            Security
          </Button>
          <Button variant="outline" size="sm" className="text-xs border-[#00f0ff] text-[#00f0ff] hover:bg-[#00f0ff]/10">
            Management
          </Button>
        </div>
      </div>
    </div>
  )
}

function AIInsightsCard() {
  return (
    <div className="industrial-card p-3">
      <div className="corner-accent corner-accent-tl"></div>
      <div className="corner-accent corner-accent-tr"></div>
      <div className="corner-accent corner-accent-bl"></div>
      <div className="corner-accent corner-accent-br"></div>

      <div className="equipment-id mb-2">T3</div>
      <div className="text-xs text-[#00f0ff]/70 mb-3">AI-Driven Insights</div>

      <div className="space-y-2">
        <div className="bg-[#00f0ff]/10 border-l-2 border-[#00f0ff] p-2 text-xs">
          <div className="flex items-center">
            <Zap className="h-3 w-3 text-[#00f0ff] mr-1" />
            <div className="font-semibold text-[#00f0ff]">Efficiency Opportunity</div>
          </div>
          <div className="ml-4 mt-1">AI suggests adjusting turbine angle by 2° to increase efficiency by 1.5%</div>
        </div>

        <div className="bg-[#00f0ff]/10 border-l-2 border-[#00f0ff] p-2 text-xs">
          <div className="flex items-center">
            <CloudRain className="h-3 w-3 text-[#00f0ff] mr-1" />
            <div className="font-semibold text-[#00f0ff]">Weather Impact Prediction</div>
          </div>
          <div className="ml-4 mt-1">Forecasted rainfall may increase power output by 10% next week</div>
        </div>

        <div className="bg-[#00f0ff]/10 border-l-2 border-[#00f0ff] p-2 text-xs">
          <div className="flex items-center">
            <BarChart2 className="h-3 w-3 text-[#00f0ff] mr-1" />
            <div className="font-semibold text-[#00f0ff]">Maintenance Recommendation</div>
          </div>
          <div className="ml-4 mt-1">
            Schedule preventive maintenance for Generator2 within 30 days to avoid potential failure
          </div>
        </div>
      </div>
    </div>
  )
}

function PerformanceMetricsCard() {
  return (
    <div className="industrial-card p-3">
      <div className="corner-accent corner-accent-tl"></div>
      <div className="corner-accent corner-accent-tr"></div>
      <div className="corner-accent corner-accent-bl"></div>
      <div className="corner-accent corner-accent-br"></div>

      <div className="equipment-id mb-2">BX [41]</div>
      <div className="text-xs text-[#00f0ff]/70 mb-3">Performance Metrics</div>

      <div className="grid grid-cols-2 gap-4 mb-3">
        <div className="space-y-1">
          <div className="text-xs text-[#00f0ff]/70">Overall Efficiency</div>
          <div className="digital-readout">92.5%</div>
        </div>
        <div className="space-y-1">
          <div className="text-xs text-[#00f0ff]/70">Capacity Factor</div>
          <div className="digital-readout">78.3%</div>
        </div>
        <div className="space-y-1">
          <div className="text-xs text-[#00f0ff]/70">Availability Factor</div>
          <div className="digital-readout">99.1%</div>
        </div>
        <div className="space-y-1">
          <div className="text-xs text-[#00f0ff]/70">Water Usage Efficiency</div>
          <div className="digital-readout">95.7%</div>
        </div>
      </div>

      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={[
              { month: "Jan", efficiency: 91, capacity: 76 },
              { month: "Feb", efficiency: 92, capacity: 77 },
              { month: "Mar", efficiency: 93, capacity: 79 },
              { month: "Apr", efficiency: 92, capacity: 78 },
              { month: "May", efficiency: 92.5, capacity: 78.3 },
            ]}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 240, 255, 0.1)" />
            <XAxis dataKey="month" stroke="rgba(0, 240, 255, 0.5)" />
            <YAxis stroke="rgba(0, 240, 255, 0.5)" />
            <Tooltip contentStyle={{ backgroundColor: "#0a0e14", borderColor: "#00f0ff" }} />
            <Legend wrapperStyle={{ color: "rgba(0, 240, 255, 0.7)" }} />
            <Line type="monotone" dataKey="efficiency" stroke="#00f0ff" name="Efficiency %" />
            <Line type="monotone" dataKey="capacity" stroke="#ffcc00" name="Capacity Factor %" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

function EquipmentCard({
  title,
  type,
  status,
  daysToMaintenance,
}: {
  title: string
  type: string
  status: "warning" | "optimal" | "critical" | "maintenance"
  daysToMaintenance: number
}) {
  const statusConfig = {
    warning: { color: "status-warning", text: "Warning" },
    optimal: { color: "status-optimal", text: "Optimal" },
    critical: { color: "status-critical", text: "Critical" },
    maintenance: { color: "status-optimal", text: "Maintenance" },
  }

  return (
    <div className="industrial-card p-3">
      <div className="corner-accent corner-accent-tl"></div>
      <div className="corner-accent corner-accent-tr"></div>
      <div className="corner-accent corner-accent-bl"></div>
      <div className="corner-accent corner-accent-br"></div>

      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <div className={`status-indicator ${statusConfig[status].color}`}></div>
          <div className="text-xs">{statusConfig[status].text}</div>
        </div>
      </div>

      <div className="equipment-id mb-1">{title.split(" ").pop()}</div>
      <div className="text-xs text-[#00f0ff]/70 mb-1">{title}</div>
      <div className="text-xs text-[#00f0ff]/70 mb-3">{type}</div>

      <div className="flex items-center gap-2 text-xs">
        <CalendarDays className="h-3 w-3 text-[#00f0ff]/70" />
        <span>
          Next maintenance: {daysToMaintenance} {daysToMaintenance === 1 ? "day" : "days"}
        </span>
      </div>
    </div>
  )
}

