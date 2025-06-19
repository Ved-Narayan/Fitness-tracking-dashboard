# 🏋️‍♂️ Fitness Tracker Dashboard

A comprehensive, modern fitness tracking dashboard built with Next.js, featuring interactive charts, goal management, and real-time progress monitoring. Track your fitness journey with beautiful visualizations and persistent local storage.

![Fitness Dashboard](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chart.js&logoColor=white)

## ✨ Features

### 🎯 **Smart Goal Management**
- Create custom fitness goals with categories (Weight Loss, Performance, Consistency, Health, Strength, Endurance)
- Real-time progress tracking with visual indicators
- Auto-status updates (In Progress, Behind, Achieved)
- Goal achievement celebrations with badges

### 📊 **Interactive Analytics**
- **Dynamic Stats Cards**: Track steps, calories, workouts, and active time
- **Advanced Charts**: Line and bar charts for workout trends using Chart.js
- **Calorie Balance**: Doughnut chart showing burned vs consumed calories
- **Multiple Time Views**: Switch between daily, weekly, and monthly perspectives

### 📋 **Activity Logging**
- Comprehensive workout logging with duration, calories, and intensity
- Flexible time entries for different view modes
- Activity history with search and filter capabilities
- Delete and edit logged activities

### 📅 **Weekly Progress Tracker**
- Interactive day cards to mark workout completion
- Visual progress indicators and completion percentages
- Weekly achievement tracking

### 💾 **Data Persistence**
- **Local Storage Integration**: All data persists across browser sessions
- **Privacy First**: No external servers, data stays on your device
- **Offline Capable**: Works without internet connection
- **Instant Loading**: Fast data retrieval from local storage

### 🎨 **Modern UI/UX**
- **Responsive Design**: Perfect on desktop, tablet, and mobile
- **Dark Mode Ready**: Built-in theme support
- **Smooth Animations**: Hover effects and transitions
- **Accessibility First**: Screen reader friendly, keyboard navigation

## 🚀 Live Demo

[View Live Demo](https://fitness-tracking-dashboard-ved.vercel.app) *(Replace with your actual deployment URL)*

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Charts**: Chart.js with react-chartjs-2
- **Icons**: Lucide React
- **State Management**: React Hooks with Local Storage
- **Deployment**: Vercel

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Clone the Repository
```bash
git clone https://github.com/Ved-Narayan/Fitness-tracking-dashboard.git
cd Fitness-tracking-dashboard
```

### Install Dependencies
```bash
npm install
# or
yarn install
```

### Run Development Server
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎯 Usage

### Getting Started
1. **Visit the Dashboard**: Navigate to the main dashboard
2. **Set Your First Goal**: Click "Add Goal" to create your fitness objective
3. **Log Activities**: Use "Log Activity" to record your workouts
4. **Track Progress**: Update your stats using the interactive cards
5. **Monitor Weekly Progress**: Click on day cards to mark completed workouts

### Key Features Guide

#### Stats Cards
- **Hover to Edit**: Hover over cards to reveal +/- buttons and input fields
- **Quick Adjustments**: Use increment buttons for fast updates
- **Direct Input**: Click input fields for precise values
- **Custom Targets**: Adjust your daily/weekly/monthly targets

#### Goal Management
- **Create Goals**: Set specific, measurable objectives
- **Track Progress**: Update progress with input fields
- **Visual Feedback**: Watch progress bars and achievement badges
- **Delete Goals**: Remove completed or unwanted goals

#### Activity Logging
- **Flexible Entries**: Log activities for daily, weekly, or monthly views
- **Detailed Tracking**: Record duration, calories, and intensity
- **History Management**: View and manage your activity history

## 🏗️ Project Structure

```
fitness-tracking-dashboard/
├── app/
│   ├── dashboard/
│   │   └── page.tsx          # Main dashboard page
│   ├── page.tsx              # Landing page
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── ui/                   # shadcn/ui components
│   ├── stats-cards.tsx       # Interactive stats display
│   ├── goals-section.tsx     # Goal management
│   ├── activity-table.tsx    # Activity logging
│   ├── workout-chart.tsx     # Workout trend charts
│   ├── calories-chart.tsx    # Calorie balance chart
│   └── weekly-progress.tsx   # Weekly progress tracker
├── hooks/
│   └── useLocalStorage.ts    # Local storage hook
└── lib/
    └── utils.ts              # Utility functions
```

## 🎨 Component Architecture

### Core Components (8 Total)
1. **StatsCards** - Interactive fitness metrics
2. **GoalsSection** - Goal creation and management
3. **WorkoutChart** - Trend visualization with Chart.js
4. **CaloriesChart** - Calorie balance doughnut chart
5. **ActivityTable** - Comprehensive activity logging
6. **WeeklyProgress** - Weekly completion tracking
7. **Table** - Custom responsive table component
8. **Tabs** - Navigation component

## 🔧 Customization

### Adding New Goal Categories
Edit the categories array in `components/goals-section.tsx`:
```typescript
const categories = ["Weight Loss", "Performance", "Consistency", "Health", "Strength", "Endurance", "Your Category"]
```

### Modifying Chart Colors
Update chart colors in `components/workout-chart.tsx` and `components/calories-chart.tsx`:
```typescript
borderColor: "rgb(59, 130, 246)", // Your color
backgroundColor: "rgba(59, 130, 246, 0.1)", // Your background
```

### Customizing Stats Increments
Adjust increment values in `components/stats-cards.tsx`:
```typescript
increment: timeView === "daily" ? 100 : timeView === "weekly" ? 1000 : 5000,
```

## 🚀 Deployment

### Deploy to Vercel
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with one click

### Deploy to Netlify
1. Build the project: `npm run build`
2. Deploy the `out` folder to Netlify

### Other Platforms
The app works on any static hosting platform that supports Next.js.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Guidelines
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 👨‍💻 Author

**Ved Narayan**
- GitHub: [@Ved-Narayan](https://github.com/Ved-Narayan)
- LinkedIn: [Your LinkedIn](https://www.linkedin.com/in/ved-narayan/)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Chart.js](https://www.chartjs.org/) for powerful charting capabilities
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Lucide](https://lucide.dev/) for beautiful icons

## 📊 Project Stats

- **Components**: 8+ interactive components
- **Features**: 15+ core features
- **Responsive**: 100% mobile-friendly
- **Performance**: Optimized for speed
- **Accessibility**: WCAG compliant

---

⭐ **Star this repository if you found it helpful!**

📧 **Questions?** Feel free to open an issue or reach out!
```
