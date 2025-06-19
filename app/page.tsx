import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, Target, TrendingUp, Users, Smartphone, BarChart3, Award, Zap, Shield, Clock } from "lucide-react"

export default function HomePage() {
  const features = [
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Interactive charts and visualizations to track your progress with Chart.js integration",
    },
    {
      icon: Target,
      title: "Smart Goal Setting",
      description: "Set, track, and achieve your fitness goals with intelligent progress monitoring",
    },
    {
      icon: Activity,
      title: "Comprehensive Tracking",
      description: "Monitor steps, calories, workouts, and active time all in one place",
    },
    {
      icon: Smartphone,
      title: "Mobile Responsive",
      description: "Perfect experience on any device - desktop, tablet, or mobile",
    },
    {
      icon: Users,
      title: "Multiple Time Views",
      description: "Switch between daily, weekly, and monthly views to see your progress",
    },
    {
      icon: Zap,
      title: "Real-time Updates",
      description: "Live data updates and instant feedback on your fitness journey",
    },
  ]

  const benefits = [
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your data stays secure with client-side processing and no external tracking",
    },
    {
      icon: Clock,
      title: "Time Efficient",
      description: "Quick overview of all your fitness metrics in under 30 seconds",
    },
    {
      icon: Award,
      title: "Achievement System",
      description: "Celebrate milestones with visual progress indicators and achievement badges",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">FitTracker Pro</span>
          </div>
          <Link href="/dashboard">
            <Button size="lg" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              Open Dashboard
            </Button>
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <Badge variant="secondary" className="px-4 py-2 text-sm">
            🚀 The Ultimate Fitness Dashboard
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
            Track Your Fitness
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Journey</span>
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            The most comprehensive fitness tracking dashboard with interactive charts, smart goal setting, and real-time
            progress monitoring. Built for serious fitness enthusiasts.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg" className="gap-2 px-8 py-4 text-lg">
                <Activity className="h-5 w-5" />
                Start Tracking Now
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
              View Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-blue-600">8+</div>
            <div className="text-gray-600 dark:text-gray-300">Interactive Components</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-green-600">100%</div>
            <div className="text-gray-600 dark:text-gray-300">Mobile Responsive</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-purple-600">Real-time</div>
            <div className="text-gray-600 dark:text-gray-300">Data Updates</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-orange-600">Advanced</div>
            <div className="text-gray-600 dark:text-gray-300">Analytics</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Why Choose FitTracker Pro?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Built with modern technology and designed for the best user experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="relative overflow-hidden group hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/20 group-hover:bg-blue-200 transition-colors">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-16 bg-white/50 dark:bg-gray-800/50 rounded-3xl mx-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Built for Your Success</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Every feature designed to help you achieve your fitness goals faster
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <div key={index} className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{benefit.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{benefit.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-2xl mx-auto space-y-8">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Ready to Transform Your Fitness Journey?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Join thousands of users who have already improved their fitness with our advanced tracking system.
          </p>
          <Link href="/dashboard">
            <Button size="lg" className="gap-2 px-12 py-6 text-xl">
              <Activity className="h-6 w-6" />
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-6 w-6 text-blue-600" />
            <span className="font-bold text-gray-900 dark:text-white">FitTracker Pro</span>
          </div>
          <p className="text-gray-600 dark:text-gray-300">Built with Next.js, Chart.js & shadcn/ui</p>
        </div>
      </footer>
    </div>
  )
}
