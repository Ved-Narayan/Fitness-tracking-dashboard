"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Activity, Flame, Footprints, Clock, Plus, Minus, Target } from "lucide-react"
import { useLocalStorage } from "@/hooks/useLocalStorage"

interface StatsCardsProps {
  timeView: "daily" | "weekly" | "monthly"
}

export default function StatsCards({ timeView }: StatsCardsProps) {
  const [statsData, setStatsData] = useLocalStorage("fitness-stats", {
    daily: {
      steps: { current: 0, target: 10000 },
      calories: { current: 0, target: 2500 },
      workouts: { current: 0, target: 1 },
      activeTime: { current: 0, target: 60 },
    },
    weekly: {
      steps: { current: 0, target: 70000 },
      calories: { current: 0, target: 17500 },
      workouts: { current: 0, target: 6 },
      activeTime: { current: 0, target: 420 },
    },
    monthly: {
      steps: { current: 0, target: 300000 },
      calories: { current: 0, target: 75000 },
      workouts: { current: 0, target: 24 },
      activeTime: { current: 0, target: 1800 },
    },
  })

  const currentStats = statsData[timeView]

  const updateStat = (statType: keyof typeof currentStats, field: "current" | "target", value: number) => {
    setStatsData((prev) => ({
      ...prev,
      [timeView]: {
        ...prev[timeView],
        [statType]: {
          ...prev[timeView][statType],
          [field]: Math.max(0, value),
        },
      },
    }))
  }

  const adjustStat = (statType: keyof typeof currentStats, amount: number) => {
    const newValue = currentStats[statType].current + amount
    updateStat(statType, "current", Math.max(0, newValue))
  }

  const statsConfig = [
    {
      title: "Steps",
      icon: Footprints,
      data: currentStats.steps,
      unit: "steps",
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
      increment: timeView === "daily" ? 100 : timeView === "weekly" ? 1000 : 5000,
    },
    {
      title: "Calories Burned",
      icon: Flame,
      data: currentStats.calories,
      unit: "kcal",
      color: "text-orange-600",
      bgColor: "bg-orange-100 dark:bg-orange-900/20",
      increment: timeView === "daily" ? 50 : timeView === "weekly" ? 200 : 1000,
    },
    {
      title: "Workouts",
      icon: Activity,
      data: currentStats.workouts,
      unit: "sessions",
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/20",
      increment: 1,
    },
    {
      title: "Active Time",
      icon: Clock,
      data: currentStats.activeTime,
      unit: "min",
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900/20",
      increment: timeView === "daily" ? 5 : timeView === "weekly" ? 30 : 60,
    },
  ]

  const hasAnyData = Object.values(currentStats).some((stat) => stat.current > 0)

  return (
    <div className="space-y-4">
      {!hasAnyData && (
        <Card className="border-dashed border-2 border-blue-300 bg-blue-50/50 dark:bg-blue-900/10">
          <CardContent className="flex items-center justify-center py-8">
            <div className="text-center space-y-2">
              <Target className="h-12 w-12 mx-auto text-blue-500 opacity-50" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Start Tracking Your Fitness</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Hover over the cards below and use the + buttons or input fields to log your {timeView} activity
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsConfig.map((stat, index) => {
          const percentage = stat.data.target > 0 ? Math.round((stat.data.current / stat.data.target) * 100) : 0
          const Icon = stat.icon
          const statKey = Object.keys(currentStats)[index] as keyof typeof currentStats

          return (
            <Card key={index} className="relative overflow-hidden group hover:shadow-lg transition-all duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">{stat.title}</CardTitle>
                <div className={`p-2 rounded-full ${stat.bgColor} group-hover:scale-110 transition-transform`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-baseline gap-2">
                    <div className="text-2xl font-bold">
                      {stat.data.current === 0 ? (
                        <span className="text-gray-400">0</span>
                      ) : (
                        stat.data.current.toLocaleString()
                      )}
                    </div>
                    <div className="text-sm text-gray-500">
                      / {stat.data.target.toLocaleString()} {stat.unit}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Progress</span>
                      <span
                        className={
                          percentage >= 100 ? "text-green-600" : percentage > 0 ? "text-blue-600" : "text-gray-400"
                        }
                      >
                        {percentage}%
                      </span>
                    </div>
                    <Progress value={percentage} className={`h-2 ${percentage === 0 ? "opacity-50" : ""}`} />
                  </div>

                  {/* Interactive Controls - Always visible for empty state */}
                  <div
                    className={`${stat.data.current === 0 ? "opacity-100" : "opacity-0 group-hover:opacity-100"} transition-opacity`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-6 w-6 p-0 hover:bg-red-50 hover:border-red-300"
                          onClick={() => adjustStat(statKey, -stat.increment)}
                          disabled={stat.data.current === 0}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-6 w-6 p-0 hover:bg-green-50 hover:border-green-300"
                          onClick={() => adjustStat(statKey, stat.increment)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-1">
                        <Input
                          type="number"
                          value={stat.data.current}
                          onChange={(e) => updateStat(statKey, "current", Number.parseInt(e.target.value) || 0)}
                          className="h-6 w-16 text-xs text-center"
                          min="0"
                          placeholder="0"
                        />
                        <span className="text-xs text-gray-400">{stat.unit}</span>
                      </div>
                    </div>

                    {/* Target adjustment */}
                    <div className="flex items-center justify-between gap-2 mt-2 pt-2 border-t border-gray-100">
                      <span className="text-xs text-gray-500">Target:</span>
                      <Input
                        type="number"
                        value={stat.data.target}
                        onChange={(e) => updateStat(statKey, "target", Number.parseInt(e.target.value) || 1)}
                        className="h-6 w-20 text-xs text-center"
                        min="1"
                      />
                    </div>
                  </div>

                  {percentage >= 100 && (
                    <Badge variant="secondary" className="text-xs bg-green-100 text-green-800 animate-pulse">
                      Goal Achieved! 🎉
                    </Badge>
                  )}

                  {stat.data.current === 0 && (
                    <div className="text-xs text-gray-400 text-center">Click + to start tracking</div>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
