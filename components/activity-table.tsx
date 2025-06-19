"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Activity, Calendar, Clock, Flame, Plus, X, Trash2 } from "lucide-react"
import { useLocalStorage } from "@/hooks/useLocalStorage"

interface ActivityTableProps {
  timeView: "daily" | "weekly" | "monthly"
}

interface ActivityEntry {
  id: number
  time: string
  activity: string
  duration: number
  calories: number
  intensity: "Low" | "Medium" | "High" | "Rest"
}

export default function ActivityTable({ timeView }: ActivityTableProps) {
  const [activities, setActivities] = useLocalStorage<ActivityEntry[]>("fitness-activities", [])
  const [showAddForm, setShowAddForm] = useState(false)
  const [formData, setFormData] = useState({
    time: "",
    activity: "",
    duration: "",
    calories: "",
    intensity: "Medium" as const,
  })

  const handleAddActivity = () => {
    if (!formData.time || !formData.activity || !formData.duration) {
      alert("Please fill in Time, Activity, and Duration")
      return
    }

    const newActivity: ActivityEntry = {
      id: Math.max(...activities.map((a) => a.id), 0) + 1,
      time: formData.time,
      activity: formData.activity,
      duration: Number.parseInt(formData.duration),
      calories: Number.parseInt(formData.calories) || 0,
      intensity: formData.intensity,
    }

    setActivities([...activities, newActivity])
    setFormData({
      time: "",
      activity: "",
      duration: "",
      calories: "",
      intensity: "Medium",
    })
    setShowAddForm(false)
  }

  const handleDeleteActivity = (activityId: number) => {
    if (confirm("Are you sure you want to delete this activity?")) {
      setActivities(activities.filter((activity) => activity.id !== activityId))
    }
  }

  const getIntensityColor = (intensity: string) => {
    switch (intensity.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300"
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
      case "rest":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300"
    }
  }

  const getTimeLabel = () => {
    switch (timeView) {
      case "daily":
        return "Time"
      case "weekly":
        return "Day"
      case "monthly":
        return "Date"
      default:
        return "Time"
    }
  }

  const getTimePlaceholder = () => {
    switch (timeView) {
      case "daily":
        return "e.g., 6:00 PM, Morning, Evening"
      case "weekly":
        return "e.g., Monday, Tuesday, Wed"
      case "monthly":
        return "e.g., Jan 15, Week 1, 2025-01-15"
      default:
        return "Enter time"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Activity Log {activities.length > 0 && `(${activities.length})`}
            </CardTitle>
            <CardDescription>
              {activities.length === 0
                ? `Log your ${timeView} activities to track your fitness journey`
                : `Your ${timeView} activity history and performance`}
            </CardDescription>
          </div>
          <Button size="sm" className="gap-2" onClick={() => setShowAddForm(!showAddForm)}>
            {showAddForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            {showAddForm ? "Cancel" : "Log Activity"}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add Activity Form */}
        {showAddForm && (
          <Card className="border-dashed border-2 border-green-300 bg-green-50/50 dark:bg-green-900/10">
            <CardHeader>
              <CardTitle className="text-lg">Log New Activity</CardTitle>
              <CardDescription>Record your workout or physical activity</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="time">{getTimeLabel()} *</Label>
                  <Input
                    id="time"
                    placeholder={getTimePlaceholder()}
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="activity">Activity *</Label>
                  <Input
                    id="activity"
                    placeholder="e.g., Running, Weight Training, Yoga"
                    value={formData.activity}
                    onChange={(e) => setFormData({ ...formData, activity: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (minutes) *</Label>
                  <Input
                    id="duration"
                    type="number"
                    placeholder="e.g., 30, 45, 60"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    min="1"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="calories">Calories Burned</Label>
                  <Input
                    id="calories"
                    type="number"
                    placeholder="e.g., 200, 350, 500"
                    value={formData.calories}
                    onChange={(e) => setFormData({ ...formData, calories: e.target.value })}
                    min="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="intensity">Intensity</Label>
                  <select
                    className="w-full p-2 border rounded-md bg-background"
                    value={formData.intensity}
                    onChange={(e) => setFormData({ ...formData, intensity: e.target.value as any })}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Rest">Rest Day</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleAddActivity} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Log Activity
                </Button>
                <Button variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Empty State */}
        {activities.length === 0 && !showAddForm && (
          <Card className="border-dashed border-2 border-gray-300">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center space-y-4">
              <Activity className="h-16 w-16 text-gray-400" />
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">No Activities Logged</h3>
                <p className="text-gray-600 dark:text-gray-300 max-w-md">
                  Start logging your workouts and activities to track your fitness progress over time. Every workout
                  counts!
                </p>
              </div>
              <Button onClick={() => setShowAddForm(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                Log Your First Activity
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Activities Table */}
        {activities.length > 0 && (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {getTimeLabel()}
                  </TableHead>
                  <TableHead>Activity</TableHead>
                  <TableHead className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Duration
                  </TableHead>
                  <TableHead className="flex items-center gap-2">
                    <Flame className="h-4 w-4" />
                    Calories
                  </TableHead>
                  <TableHead>Intensity</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activities.map((activity) => (
                  <TableRow key={activity.id} className="group">
                    <TableCell className="font-medium">{activity.time}</TableCell>
                    <TableCell>{activity.activity}</TableCell>
                    <TableCell>{activity.duration} min</TableCell>
                    <TableCell>
                      <span className="font-semibold">
                        {activity.calories > 0 ? activity.calories.toLocaleString() : "-"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={getIntensityColor(activity.intensity)}>
                        {activity.intensity}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDeleteActivity(activity.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
