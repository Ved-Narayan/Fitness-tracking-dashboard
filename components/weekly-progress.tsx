"use client"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Calendar, CheckCircle, Target } from "lucide-react"

export default function WeeklyProgress() {
  const [weeklyData, setWeeklyData] = useLocalStorage("fitness-weekly-progress", [
    {
      day: "Monday",
      date: "Jan 13",
      completed: false,
      workoutType: "",
      duration: 0,
      calories: 0,
      steps: 0,
    },
    {
      day: "Tuesday",
      date: "Jan 14",
      completed: false,
      workoutType: "",
      duration: 0,
      calories: 0,
      steps: 0,
    },
    {
      day: "Wednesday",
      date: "Jan 15",
      completed: false,
      workoutType: "",
      duration: 0,
      calories: 0,
      steps: 0,
    },
    {
      day: "Thursday",
      date: "Jan 16",
      completed: false,
      workoutType: "",
      duration: 0,
      calories: 0,
      steps: 0,
    },
    {
      day: "Friday",
      date: "Jan 17",
      completed: false,
      workoutType: "",
      duration: 0,
      calories: 0,
      steps: 0,
    },
    {
      day: "Saturday",
      date: "Jan 18",
      completed: false,
      workoutType: "",
      duration: 0,
      calories: 0,
      steps: 0,
    },
    {
      day: "Sunday",
      date: "Jan 19",
      completed: false,
      workoutType: "",
      duration: 0,
      calories: 0,
      steps: 0,
    },
  ])

  const toggleDayCompletion = (dayIndex: number) => {
    setWeeklyData((prev) =>
      prev.map((day, index) => (index === dayIndex ? { ...day, completed: !day.completed } : day)),
    )
  }

  const completedDays = weeklyData.filter((day) => day.completed).length
  const totalDays = weeklyData.length
  const weekProgress = Math.round((completedDays / totalDays) * 100)
  const hasAnyActivity = weeklyData.some((day) => day.completed)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Weekly Progress
            </CardTitle>
            <CardDescription>
              {hasAnyActivity
                ? "Your daily activity breakdown for this week"
                : "Click on days below to mark them as completed when you finish your workouts"}
            </CardDescription>
          </div>
          <div className="text-right">
            <div className={`text-2xl font-bold ${completedDays > 0 ? "text-green-600" : "text-gray-400"}`}>
              {completedDays}/{totalDays}
            </div>
            <div className="text-sm text-gray-500">Days completed</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Week Progress</span>
            <span className={`font-medium ${weekProgress > 0 ? "text-green-600" : "text-gray-400"}`}>
              {weekProgress}%
            </span>
          </div>
          <Progress value={weekProgress} className="h-2" />
        </div>

        {!hasAnyActivity && (
          <Card className="border-dashed border-2 border-blue-300 bg-blue-50/50 dark:bg-blue-900/10">
            <CardContent className="flex items-center justify-center py-6">
              <div className="text-center space-y-2">
                <Target className="h-8 w-8 mx-auto text-blue-500 opacity-50" />
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Click on the day cards below to mark your workout days as completed
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
          {weeklyData.map((day, index) => (
            <Card
              key={index}
              className={`relative cursor-pointer transition-all hover:shadow-md ${
                day.completed
                  ? "bg-green-50 border-green-200 dark:bg-green-900/10 hover:bg-green-100"
                  : "bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50"
              }`}
              onClick={() => toggleDayCompletion(index)}
            >
              <CardContent className="p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm">{day.day}</div>
                    <div className="text-xs text-gray-500">{day.date}</div>
                  </div>
                  {day.completed && <CheckCircle className="h-4 w-4 text-green-600" />}
                </div>

                <div className="space-y-1">
                  <Badge
                    variant="secondary"
                    className={`text-xs ${
                      day.completed
                        ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
                        : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {day.completed ? "Completed" : "Planned"}
                  </Badge>

                  {!day.completed && (
                    <div className="text-xs text-gray-400 text-center py-1">Click to mark complete</div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {completedDays > 0 && (
          <div className="text-center py-4">
            <Badge variant="secondary" className="bg-green-100 text-green-800 px-4 py-2">
              🎉 Great job! You've completed {completedDays} day{completedDays !== 1 ? "s" : ""} this week
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
