"use client"

import { useState, useEffect } from "react"
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
import "leaflet/dist/leaflet.css"

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

export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useState("overview")
  const [currentOutput, setCurrentOutput] = useState(127.5)
  const [isSimulationRunning, setIsSimulationRunning] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isDarkMode, setIsDarkMode] = useState(true)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isSimulationRunning) {
      interval = setInterval(() => {
        setCurrentOutput((prev) => {
          const change = (Math.random() - 0.5) * 5
          return Math.max(0, Math.min(200, prev + change))
        })
      }, 5000)
    }
    return () => clearInterval(interval)
  }, [isSimulationRunning])

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timeInterval)
  }, [])

  useEffect(() => {
    // Apply dark mode class to body
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-[#0a0e14] text-white">
      <div className="mx-auto max-w-full space-y-2 p-2">
        <header className="flex items-center justify-between bg-[#0a0e14] p-2 border-b border-[#00f0ff]/30">
          <div className="flex items-center">
            <div className="mr-4">
              <Avatar className="h-10 w-10 border border-[#00f0ff]">
                <AvatarImage
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20%283%29.jpg-S5P7abw3YajZt6rx5eIoocEy0bBKnF.jpeg"
                  alt="AI Logo"
                />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-[#00f0ff]">
                MIDAS <span className="text-xs bg-[#00f0ff]/20 px-1 py-0.5 text-[#00f0ff]">creed</span>
              </h1>
              <p className="text-xs text-[#00f0ff]/70">AI POWERED HYDROPOWER CONTROL SYSTEM</p>
            </div>
          </div>

          <div className="flex space-x-6 items-center">
            <div className="flex flex-col items-end">
              <div className="text-xs text-[#00f0ff]/70">Edition Information</div>
              <div className="text-xs text-[#00f0ff]/70">V0.04 14/08</div>
            </div>
            <div className="flex flex-col items-end">
              <div className="text-2xl font-mono text-[#00f0ff]">{formatTime(currentTime)}</div>
              <div className="text-xs text-[#00f0ff]/70">{formatDate(currentTime)}</div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-2 space-y-2">
            <div className="industrial-card p-3 h-full">
              <div className="corner-accent corner-accent-tl"></div>
              <div className="corner-accent corner-accent-tr"></div>
              <div className="corner-accent corner-accent-bl"></div>
              <div className="corner-accent corner-accent-br"></div>

              <div className="equipment-id mb-4">T3</div>
              <div className="text-xs text-[#00f0ff]/70 mb-1">SYSTEM INFO</div>

              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="status-indicator status-optimal"></div>
                  <div className="text-sm">Main Turbine Unit 1</div>
                </div>
                <div className="flex items-center">
                  <div className="status-indicator status-warning"></div>
                  <div className="text-sm">Dam Gates System</div>
                </div>
                <div className="flex items-center">
                  <div className="status-indicator status-optimal"></div>
                  <div className="text-sm">Generator Unit 1</div>
                </div>
                <div className="flex items-center">
                  <div className="status-indicator status-critical"></div>
                  <div className="text-sm">Reservoir Control</div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-[#00f0ff]/30">
                <div className="text-xs text-[#00f0ff]/70 mb-2">SYSTEM CONTROL</div>
                <Button
                  size="sm"
                  className="w-full mb-2 bg-[#00f0ff]/20 hover:bg-[#00f0ff]/30 text-[#00f0ff] border border-[#00f0ff]/50"
                  onClick={() => setIsSimulationRunning(!isSimulationRunning)}
                >
                  {isSimulationRunning ? "Stop Simulation" : "Start Simulation"}
                </Button>
                <Button
                  size="sm"
                  className="w-full bg-[#00f0ff]/20 hover:bg-[#00f0ff]/30 text-[#00f0ff] border border-[#00f0ff]/50"
                >
                  <Terminal className="mr-2 h-4 w-4" />
                  System Diagnostics
                </Button>
              </div>
            </div>
          </div>

          <div className="col-span-10 space-y-2">
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-2">
              <div className="flex justify-between items-center">
                <TabsList className="bg-[#0a0e14] border border-[#00f0ff]/30">
                  <TabsTrigger
                    value="overview"
                    className="data-[state=active]:bg-[#00f0ff]/20 data-[state=active]:text-[#00f0ff]"
                  >
                    Overview
                  </TabsTrigger>
                  <TabsTrigger
                    value="environmental"
                    className="data-[state=active]:bg-[#00f0ff]/20 data-[state=active]:text-[#00f0ff]"
                  >
                    Environmental
                  </TabsTrigger>
                  <TabsTrigger
                    value="maintenance"
                    className="data-[state=active]:bg-[#00f0ff]/20 data-[state=active]:text-[#00f0ff]"
                  >
                    Maintenance
                  </TabsTrigger>
                  <TabsTrigger
                    value="security"
                    className="data-[state=active]:bg-[#00f0ff]/20 data-[state=active]:text-[#00f0ff]"
                  >
                    Security
                  </TabsTrigger>
                  <TabsTrigger
                    value="analytics"
                    className="data-[state=active]:bg-[#00f0ff]/20 data-[state=active]:text-[#00f0ff]"
                  >
                    Analytics
                  </TabsTrigger>
                </TabsList>

                <div className="flex space-x-2">
                  <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white">
                    <Activity className="mr-2 h-4 w-4" />
                    System Health: Optimal
                  </Button>
                  <Button
                    size="sm"
                    className="bg-[#00f0ff]/20 hover:bg-[#00f0ff]/30 text-[#00f0ff] border border-[#00f0ff]/50"
                  >
                    <CalendarDays className="mr-2 h-4 w-4" />
                    Schedule Maintenance
                  </Button>
                </div>
              </div>

              <TabsContent value="overview" className="space-y-2 mt-2">
                <div className="grid grid-cols-4 gap-2">
                  <div className="col-span-4">
                    <div className="industrial-card p-4 relative">
                      <div className="corner-accent corner-accent-tl"></div>
                      <div className="corner-accent corner-accent-tr"></div>
                      <div className="corner-accent corner-accent-bl"></div>
                      <div className="corner-accent corner-accent-br"></div>

                      <div className="flex justify-between items-start">
                        <div>
                          <div className="equipment-id mb-2">LD-2</div>
                          <div className="text-xs text-[#00f0ff]/70">Primary Reservoir • Shire River Facility</div>
                        </div>
                        <HoverCard>
                          <HoverCardTrigger asChild>
                            <div className="text-right cursor-help">
                              <div className="text-xs text-[#00f0ff]/70">Current Output</div>
                              <div className="digital-readout">{currentOutput.toFixed(1)} MW</div>
                            </div>
                          </HoverCardTrigger>
                          <HoverCardContent className="w-80 bg-[#0a0e14] border border-[#00f0ff]/50 text-white">
                            <div className="flex justify-between space-x-4">
                              <div className="space-y-1">
                                <h4 className="text-sm font-semibold text-[#00f0ff]">Power Output Details</h4>
                                <p className="text-sm">
                                  Current output is at {((currentOutput / 150) * 100).toFixed(1)}% of maximum capacity.
                                </p>
                                <p className="text-sm">Peak today: 160 MW at 16:00</p>
                                <p className="text-sm">Daily average: 132.8 MW</p>
                              </div>
                            </div>
                          </HoverCardContent>
                        </HoverCard>
                      </div>

                      <div className="grid grid-cols-4 gap-4 mt-4 industrial-grid p-4">
                        <div className="flex flex-col space-y-1">
                          <div className="text-xs text-[#00f0ff]/70">Reservoir Level</div>
                          <div className="digital-readout">452.3 m</div>
                          <div className="text-xs text-[#00f0ff]/70">Above sea level</div>
                        </div>
                        <div className="flex flex-col space-y-1">
                          <div className="text-xs text-[#00f0ff]/70">Water Flow Rate</div>
                          <div className="digital-readout">850 m³/s</div>
                          <div className="text-xs text-[#00f0ff]/70">Current flow</div>
                        </div>
                        <div className="flex flex-col space-y-1">
                          <div className="text-xs text-[#00f0ff]/70">Turbine Efficiency</div>
                          <div className="digital-readout">92%</div>
                          <div className="text-xs text-[#00f0ff]/70">Overall efficiency</div>
                        </div>
                        <div className="flex flex-col space-y-1">
                          <div className="text-xs text-[#00f0ff]/70">Gate Opening</div>
                          <div className="digital-readout">75%</div>
                          <div className="text-xs text-[#00f0ff]/70">Current position</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  <div className="industrial-card p-3">
                    <div className="corner-accent corner-accent-tl"></div>
                    <div className="corner-accent corner-accent-tr"></div>
                    <div className="corner-accent corner-accent-bl"></div>
                    <div className="corner-accent corner-accent-br"></div>

                    <div className="flex justify-between items-center mb-2">
                      <div className="text-xs text-[#00f0ff]/70">Reservoir Level</div>
                      <Droplets className="h-4 w-4 text-[#00f0ff]" />
                    </div>

                    <div className="digital-readout mb-2">85%</div>
                    <div className="h-[100px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={reservoirData}
                            cx="50%"
                            cy="50%"
                            innerRadius={30}
                            outerRadius={40}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {reservoirData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="text-xs text-[#00f0ff]/70 mt-2">Current: 452.3 m above sea level</div>
                    <div className="text-xs text-[#00f0ff]/70">Max: 475 m | Min: 420 m</div>
                  </div>

                  <div className="industrial-card p-3">
                    <div className="corner-accent corner-accent-tl"></div>
                    <div className="corner-accent corner-accent-tr"></div>
                    <div className="corner-accent corner-accent-bl"></div>
                    <div className="corner-accent corner-accent-br"></div>

                    <div className="flex justify-between items-center mb-2">
                      <div className="text-xs text-[#00f0ff]/70">Turbine Performance</div>
                      <Gauge className="h-4 w-4 text-[#00f0ff]" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Efficiency</span>
                        <span className="text-[#00f0ff]">92%</span>
                      </div>
                      <Progress value={92} className="h-1 bg-[#00f0ff]/20" indicatorClassName="bg-[#00f0ff]" />

                      <div className="flex justify-between text-xs">
                        <span>RPM</span>
                        <span className="text-[#00f0ff]">180.5</span>
                      </div>
                      <Progress value={75} className="h-1 bg-[#00f0ff]/20" indicatorClassName="bg-[#00f0ff]" />

                      <div className="flex justify-between text-xs">
                        <span>Load</span>
                        <span className="text-[#00f0ff]">85%</span>
                      </div>
                      <Progress value={85} className="h-1 bg-[#00f0ff]/20" indicatorClassName="bg-[#00f0ff]" />

                      <div className="flex justify-between text-xs">
                        <span>Vibration</span>
                        <span className="text-[#00f0ff]">0.15 mm/s</span>
                      </div>
                      <Progress value={15} className="h-1 bg-[#00f0ff]/20" indicatorClassName="bg-[#00f0ff]" />
                    </div>
                  </div>

                  <div className="industrial-card p-3">
                    <div className="corner-accent corner-accent-tl"></div>
                    <div className="corner-accent corner-accent-tr"></div>
                    <div className="corner-accent corner-accent-bl"></div>
                    <div className="corner-accent corner-accent-br"></div>

                    <div className="flex justify-between items-center mb-2">
                      <div className="text-xs text-[#00f0ff]/70">Water Metrics</div>
                      <Waves className="h-4 w-4 text-[#00f0ff]" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1">
                          <Droplets className="h-3 w-3 text-[#00f0ff]" />
                          <span>Flow Rate</span>
                        </div>
                        <span className="text-[#00f0ff]">850 m³/s</span>
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1">
                          <Mountain className="h-3 w-3 text-[#00f0ff]" />
                          <span>Head</span>
                        </div>
                        <span className="text-[#00f0ff]">75 m</span>
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1">
                          <Wind className="h-3 w-3 text-[#00f0ff]" />
                          <span>Pressure</span>
                        </div>
                        <span className="text-[#00f0ff]">7.35 bar</span>
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1">
                          <ThermometerIcon className="h-3 w-3 text-[#00f0ff]" />
                          <span>Water Temp</span>
                        </div>
                        <span className="text-[#00f0ff]">22.5°C</span>
                      </div>
                    </div>
                  </div>

                  <div className="industrial-card-red p-3">
                    <div className="corner-accent corner-accent-tl"></div>
                    <div className="corner-accent corner-accent-tr"></div>
                    <div className="corner-accent corner-accent-bl"></div>
                    <div className="corner-accent corner-accent-br"></div>

                    <div className="flex justify-between items-center mb-2">
                      <div className="text-xs text-[#ff3e3e]/70">Active Alerts</div>
                      <AlertTriangle className="h-4 w-4 text-[#ff3e3e]" />
                    </div>

                    <div className="space-y-2">
                      <div className="bg-[#ff3e3e]/10 border-l-2 border-[#ff3e3e] p-2 text-xs">
                        <div className="flex items-center">
                          <AlertTriangle className="h-3 w-3 text-[#ff3e3e] mr-1" />
                          <div className="font-semibold text-[#ff3e3e]">High Sediment Level</div>
                        </div>
                        <div className="ml-4 mt-1">Requires gate adjustment</div>
                      </div>

                      <div className="bg-[#00f0ff]/10 border-l-2 border-[#00f0ff] p-2 text-xs">
                        <div className="flex items-center">
                          <Battery className="h-3 w-3 text-[#00f0ff] mr-1" />
                          <div className="font-semibold text-[#00f0ff]">Peak Demand Period</div>
                        </div>
                        <div className="ml-4 mt-1">Optimizing output</div>
                      </div>

                      <div className="bg-[#ffcc00]/10 border-l-2 border-[#ffcc00] p-2 text-xs">
                        <div className="flex items-center">
                          <Waves className="h-3 w-3 text-[#ffcc00] mr-1" />
                          <div className="font-semibold text-[#ffcc00]">Increased River Flow</div>
                        </div>
                        <div className="ml-4 mt-1">Monitor downstream levels</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="industrial-card p-3">
                    <div className="corner-accent corner-accent-tl"></div>
                    <div className="corner-accent corner-accent-tr"></div>
                    <div className="corner-accent corner-accent-bl"></div>
                    <div className="corner-accent corner-accent-br"></div>

                    <div className="equipment-id mb-2">BX [41]</div>
                    <div className="text-xs text-[#00f0ff]/70 mb-2">Power Generation Metrics</div>

                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="space-y-1">
                        <div className="text-xs text-[#00f0ff]/70">Daily Output</div>
                        <div className="digital-readout">2,856 MWh</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs text-[#00f0ff]/70">Efficiency</div>
                        <div className="digital-readout">92%</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs text-[#00f0ff]/70">Grid Frequency</div>
                        <div className="digital-readout">50.02 Hz</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs text-[#00f0ff]/70">Transformer Temp</div>
                        <div className="digital-readout">65°C</div>
                      </div>
                    </div>

                    <div className="h-[200px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={powerOutputData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 240, 255, 0.1)" />
                          <XAxis dataKey="time" stroke="rgba(0, 240, 255, 0.5)" />
                          <YAxis yAxisId="left" stroke="rgba(0, 240, 255, 0.5)" />
                          <YAxis yAxisId="right" orientation="right" stroke="rgba(0, 240, 255, 0.5)" />
                          <Tooltip contentStyle={{ backgroundColor: "#0a0e14", borderColor: "#00f0ff" }} />
                          <Line yAxisId="left" type="monotone" dataKey="output" stroke="#00f0ff" name="Output (MW)" />
                          <Line yAxisId="right" type="monotone" dataKey="demand" stroke="#ff3e3e" name="Demand (MW)" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="bg-[#00f0ff]/10 border-l-2 border-[#00f0ff] p-2 text-xs mt-3">
                      <div className="flex items-center">
                        <Zap className="h-3 w-3 text-[#00f0ff] mr-1" />
                        <div className="font-semibold text-[#00f0ff]">Current Generation</div>
                      </div>
                      <div className="ml-4 mt-1">
                        {currentOutput.toFixed(1)} MW -{" "}
                        {currentOutput > 140 ? "Peak" : currentOutput > 100 ? "Normal" : "Low"} output
                      </div>
                    </div>
                  </div>

                  <div className="industrial-card p-3">
                    <div className="corner-accent corner-accent-tl"></div>
                    <div className="corner-accent corner-accent-tr"></div>
                    <div className="corner-accent corner-accent-bl"></div>
                    <div className="corner-accent corner-accent-br"></div>

                    <div className="equipment-id mb-2">L3</div>
                    <div className="text-xs text-[#00f0ff]/70 mb-2">Weekly Power Output</div>

                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={weeklyOutputData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 240, 255, 0.1)" />
                          <XAxis dataKey="day" stroke="rgba(0, 240, 255, 0.5)" />
                          <YAxis stroke="rgba(0, 240, 255, 0.5)" />
                          <Tooltip contentStyle={{ backgroundColor: "#0a0e14", borderColor: "#00f0ff" }} />
                          <Bar dataKey="output" fill="#00f0ff" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="environmental" className="space-y-2 mt-2">
                <EnvironmentalMonitoringCard />
                <div className="grid grid-cols-2 gap-2">
                  <WaterQualityCard />
                  <FishLadderCard />
                </div>
                <GISMapCard />
              </TabsContent>

              <TabsContent value="maintenance" className="space-y-2 mt-2">
                <MaintenanceScheduleCard />
                <EquipmentHealthCard />
                <PredictiveMaintenanceCard />
              </TabsContent>

              <TabsContent value="security" className="space-y-2 mt-2">
                <SecurityOverviewCard />
                <AccessControlCard />
              </TabsContent>

              <TabsContent value="analytics" className="space-y-2 mt-2">
                <AIInsightsCard />
                <PerformanceMetricsCard />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
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
          center={[-15.7861, 35.0058]}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
          className="z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[-15.7861, 35.0058]}>
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

