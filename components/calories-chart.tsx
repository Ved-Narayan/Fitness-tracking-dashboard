"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Flame, Target } from "lucide-react"

ChartJS.register(ArcElement, Tooltip, Legend)

interface CaloriesChartProps {
  timeView: "daily" | "weekly" | "monthly"
}

export default function CaloriesChart({ timeView }: CaloriesChartProps) {
  const getEmptyCaloriesData = () => {
    switch (timeView) {
      case "daily":
        return {
          burned: 0,
          consumed: 0,
          target: 2500,
        }
      case "weekly":
        return {
          burned: 0,
          consumed: 0,
          target: 17500,
        }
      case "monthly":
        return {
          burned: 0,
          consumed: 0,
          target: 75000,
        }
    }
  }

  const caloriesData = getEmptyCaloriesData()
  const remaining = Math.max(0, caloriesData.target - caloriesData.consumed)
  const hasData = caloriesData.burned > 0 || caloriesData.consumed > 0

  const data = {
    labels: ["Burned", "Consumed", "Remaining"],
    datasets: [
      {
        data: hasData ? [caloriesData.burned, caloriesData.consumed, remaining] : [1, 1, 1], // Show equal segments when no data
        backgroundColor: hasData
          ? ["rgba(34, 197, 94, 0.8)", "rgba(239, 68, 68, 0.8)", "rgba(156, 163, 175, 0.3)"]
          : ["rgba(156, 163, 175, 0.2)", "rgba(156, 163, 175, 0.2)", "rgba(156, 163, 175, 0.2)"],
        borderColor: hasData
          ? ["rgba(34, 197, 94, 1)", "rgba(239, 68, 68, 1)", "rgba(156, 163, 175, 1)"]
          : ["rgba(156, 163, 175, 0.5)", "rgba(156, 163, 175, 0.5)", "rgba(156, 163, 175, 0.5)"],
        borderWidth: 2,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          padding: 20,
          usePointStyle: true,
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            if (!hasData) return `${context.label}: No data yet`
            return `${context.label}: ${context.parsed.toLocaleString()} kcal`
          },
        },
      },
    },
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Flame className="h-5 w-5" />
          Calories Overview
        </CardTitle>
        <CardDescription>
          {hasData
            ? `Your ${timeView} calorie balance`
            : `Track your ${timeView} calorie intake and burn - start by logging activities`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] flex items-center justify-center relative">
          {!hasData && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50/80 dark:bg-gray-800/80 rounded-lg z-10">
              <div className="text-center space-y-2">
                <Target className="h-12 w-12 mx-auto text-gray-400" />
                <p className="text-gray-500 dark:text-gray-400">No calorie data yet</p>
                <p className="text-sm text-gray-400">Log activities to track calories burned</p>
              </div>
            </div>
          )}
          <div className="w-full max-w-[250px]">
            <Doughnut data={data} options={options} />
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className={`text-2xl font-bold ${hasData ? "text-green-600" : "text-gray-400"}`}>
              {caloriesData.burned.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500">Burned</div>
          </div>
          <div>
            <div className={`text-2xl font-bold ${hasData ? "text-red-600" : "text-gray-400"}`}>
              {caloriesData.consumed.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500">Consumed</div>
          </div>
          <div>
            <div className={`text-2xl font-bold ${hasData ? "text-gray-600" : "text-gray-400"}`}>
              {remaining.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500">Remaining</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
