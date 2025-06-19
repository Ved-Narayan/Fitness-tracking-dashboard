"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Activity } from "lucide-react"
import StatsCards from "@/components/stats-cards"
import WorkoutChart from "@/components/workout-chart"
import CaloriesChart from "@/components/calories-chart"
import ActivityTable from "@/components/activity-table"
import GoalsSection from "@/components/goals-section"
import WeeklyProgress from "@/components/weekly-progress"

export default function Dashboard() {
  const [timeView, setTimeView] = useState<"daily" | "weekly" | "monthly">("weekly")

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Activity className="h-8 w-8 text-blue-600" />
              Fitness Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-300">Track your progress and achieve your goals</p>
          </div>

          {/* Time View Toggle */}
          <div className="flex gap-2">
            {(["daily", "weekly", "monthly"] as const).map((view) => (
              <Button
                key={view}
                variant={timeView === view ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeView(view)}
                className="capitalize"
              >
                {view}
              </Button>
            ))}
          </div>
        </div>

        {/* Stats Cards */}
        <StatsCards timeView={timeView} />

        {/* Goals Section */}
        <GoalsSection />

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <WorkoutChart timeView={timeView} />
          <CaloriesChart timeView={timeView} />
        </div>

        {/* Weekly Progress */}
        <WeeklyProgress />

        {/* Activity Table */}
        <ActivityTable timeView={timeView} />
      </div>
    </div>
  )
}
