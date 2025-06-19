"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { BarChart3, TrendingUp, Activity } from "lucide-react"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, Filler)

interface WorkoutChartProps {
  timeView: "daily" | "weekly" | "monthly"
}

export default function WorkoutChart({ timeView }: WorkoutChartProps) {
  const [chartType, setChartType] = useState<"line" | "bar">("line")

  const getEmptyChartData = () => {
    switch (timeView) {
      case "daily":
        return {
          labels: ["6 AM", "9 AM", "12 PM", "3 PM", "6 PM", "9 PM"],
          datasets: [
            {
              label: "Workout Intensity",
              data: [0, 0, 0, 0, 0, 0],
              borderColor: "rgb(59, 130, 246)",
              backgroundColor: "rgba(59, 130, 246, 0.1)",
              fill: true,
              tension: 0.4,
            },
          ],
        }
      case "weekly":
        return {
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          datasets: [
            {
              label: "Workout Duration (min)",
              data: [0, 0, 0, 0, 0, 0, 0],
              borderColor: "rgb(59, 130, 246)",
              backgroundColor: "rgba(59, 130, 246, 0.1)",
              fill: true,
              tension: 0.4,
            },
          ],
        }
      case "monthly":
        return {
          labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
          datasets: [
            {
              label: "Total Workout Time (hours)",
              data: [0, 0, 0, 0],
              borderColor: "rgb(59, 130, 246)",
              backgroundColor: "rgba(59, 130, 246, 0.1)",
              fill: true,
              tension: 0.4,
            },
          ],
        }
    }
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: false,
        },
      },
      y: {
        display: true,
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
    },
    interaction: {
      mode: "nearest" as const,
      axis: "x" as const,
      intersect: false,
    },
  }

  const chartData = getEmptyChartData()
  const hasData = chartData.datasets[0].data.some((value) => value > 0)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Workout Trends
            </CardTitle>
            <CardDescription>
              {hasData
                ? `Your ${timeView} workout performance`
                : `Track your ${timeView} workout patterns - data will appear as you log activities`}
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              variant={chartType === "line" ? "default" : "outline"}
              size="sm"
              onClick={() => setChartType("line")}
            >
              <TrendingUp className="h-4 w-4" />
            </Button>
            <Button variant={chartType === "bar" ? "default" : "outline"} size="sm" onClick={() => setChartType("bar")}>
              <BarChart3 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] relative">
          {!hasData && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50/80 dark:bg-gray-800/80 rounded-lg z-10">
              <div className="text-center space-y-2">
                <Activity className="h-12 w-12 mx-auto text-gray-400" />
                <p className="text-gray-500 dark:text-gray-400">No workout data yet</p>
                <p className="text-sm text-gray-400">Start logging activities to see your trends</p>
              </div>
            </div>
          )}
          {chartType === "line" ? (
            <Line data={chartData} options={options} />
          ) : (
            <Bar data={chartData} options={options} />
          )}
        </div>
      </CardContent>
    </Card>
  )
}
