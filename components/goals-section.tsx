"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Target, Award, Plus, X, Trash2 } from "lucide-react"
import { useLocalStorage } from "@/hooks/useLocalStorage"

interface Goal {
  id: number
  title: string
  description: string
  current: number
  target: number
  unit: string
  deadline: string
  category: string
  status: "in-progress" | "achieved" | "behind"
}

export default function GoalsSection() {
  const [goals, setGoals] = useLocalStorage<Goal[]>("fitness-goals", [])
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingGoal, setEditingGoal] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    target: "",
    unit: "",
    deadline: "",
    category: "Health",
  })

  const categories = ["Weight Loss", "Performance", "Consistency", "Health", "Strength", "Endurance"]

  const handleAddGoal = () => {
    if (!formData.title || !formData.target || !formData.unit) {
      alert("Please fill in all required fields (Title, Target Value, and Unit)")
      return
    }

    const newGoal: Goal = {
      id: Math.max(...goals.map((g) => g.id), 0) + 1,
      title: formData.title,
      description: formData.description,
      current: 0,
      target: Number.parseInt(formData.target),
      unit: formData.unit,
      deadline: formData.deadline || "No deadline",
      category: formData.category,
      status: "in-progress",
    }

    setGoals([...goals, newGoal])
    setFormData({ title: "", description: "", target: "", unit: "", deadline: "", category: "Health" })
    setShowAddForm(false)
  }

  const handleUpdateProgress = (goalId: number, newCurrent: number) => {
    setGoals(
      goals.map((goal) => {
        if (goal.id === goalId) {
          const updated = { ...goal, current: newCurrent }
          // Auto-update status based on progress
          if (newCurrent >= goal.target) {
            updated.status = "achieved"
          } else if (newCurrent < goal.target * 0.3) {
            updated.status = "behind"
          } else {
            updated.status = "in-progress"
          }
          return updated
        }
        return goal
      }),
    )
  }

  const handleDeleteGoal = (goalId: number) => {
    if (confirm("Are you sure you want to delete this goal?")) {
      setGoals(goals.filter((goal) => goal.id !== goalId))
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "achieved":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
      case "in-progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300"
      case "behind":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300"
    }
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "Weight Loss": "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300",
      Performance: "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300",
      Consistency: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300",
      Health: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300",
      Strength: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300",
      Endurance: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300",
    }
    return colors[category] || "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300"
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Fitness Goals {goals.length > 0 && `(${goals.length})`}
            </CardTitle>
            <CardDescription>
              {goals.length === 0
                ? "Set your first fitness goal to start tracking your progress"
                : "Track your fitness objectives and milestones"}
            </CardDescription>
          </div>
          <Button size="sm" className="gap-2" onClick={() => setShowAddForm(!showAddForm)}>
            {showAddForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            {showAddForm ? "Cancel" : "Add Goal"}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add Goal Form */}
        {showAddForm && (
          <Card className="border-dashed border-2 border-blue-300 bg-blue-50/50 dark:bg-blue-900/10">
            <CardHeader>
              <CardTitle className="text-lg">Create New Goal</CardTitle>
              <CardDescription>Set a specific, measurable fitness objective</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Goal Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Run 5K, Lose 10 lbs, Bench 200 lbs"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <select
                    className="w-full p-2 border rounded-md bg-background"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Input
                  id="description"
                  placeholder="Describe your goal and why it's important to you..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="target">Target Value *</Label>
                  <Input
                    id="target"
                    type="number"
                    placeholder="e.g., 10, 5000, 200"
                    value={formData.target}
                    onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unit">Unit *</Label>
                  <Input
                    id="unit"
                    placeholder="e.g., km, lbs, min, reps"
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deadline">Deadline (Optional)</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleAddGoal} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Create Goal
                </Button>
                <Button variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Empty State */}
        {goals.length === 0 && !showAddForm && (
          <Card className="border-dashed border-2 border-gray-300">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center space-y-4">
              <Target className="h-16 w-16 text-gray-400" />
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">No Goals Set Yet</h3>
                <p className="text-gray-600 dark:text-gray-300 max-w-md">
                  Start your fitness journey by setting your first goal. Whether it's weight loss, strength building, or
                  endurance improvement, every great achievement starts with a clear goal.
                </p>
              </div>
              <Button onClick={() => setShowAddForm(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                Set Your First Goal
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Goals Grid */}
        {goals.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {goals.map((goal) => {
              const percentage =
                goal.status === "achieved" ? 100 : Math.min(100, Math.round((goal.current / goal.target) * 100))

              return (
                <Card key={goal.id} className="relative group hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1 flex-1">
                        <CardTitle className="text-lg flex items-center gap-2">
                          {goal.status === "achieved" && <Award className="h-4 w-4 text-yellow-500" />}
                          {goal.title}
                        </CardTitle>
                        {goal.description && <CardDescription className="text-sm">{goal.description}</CardDescription>}
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className={getStatusColor(goal.status)}>
                          {goal.status === "achieved"
                            ? "Achieved"
                            : goal.status === "behind"
                              ? "Behind"
                              : "In Progress"}
                        </Badge>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDeleteGoal(goal.id)}
                            className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progress</span>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={goal.current}
                          onChange={(e) => handleUpdateProgress(goal.id, Number.parseInt(e.target.value) || 0)}
                          className="w-16 h-6 text-xs text-center"
                          min="0"
                          max={goal.target * 2}
                          placeholder="0"
                        />
                        <span className="font-medium">
                          / {goal.target} {goal.unit}
                        </span>
                      </div>
                    </div>

                    <Progress value={percentage} className="h-2" />

                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className={getCategoryColor(goal.category)}>
                        {goal.category}
                      </Badge>
                      <span className="text-xs text-gray-500">Due: {goal.deadline}</span>
                    </div>

                    {goal.status === "achieved" && (
                      <div className="flex items-center gap-2 text-green-600 text-sm animate-pulse">
                        <Award className="h-4 w-4" />
                        Goal completed! 🎉
                      </div>
                    )}

                    {goal.current === 0 && goal.status !== "achieved" && (
                      <div className="text-xs text-gray-400 text-center py-2 bg-gray-50 dark:bg-gray-800 rounded">
                        Update your progress above to start tracking
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
