# 🌤️ Weather Dashboard

<div align="center">

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-10.0-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![OpenWeatherMap](https://img.shields.io/badge/OpenWeatherMap-API-FF6B6B?style=for-the-badge&logo=openweathermap&logoColor=white)

[![GitHub stars](https://img.shields.io/github/stars/yourusername/weather-dashboard?style=social)](https://github.com/yourusername/weather-dashboard)
[![GitHub forks](https://img.shields.io/github/forks/yourusername/weather-dashboard?style=social)](https://github.com/yourusername/weather-dashboard)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**A modern, production-ready weather dashboard with real-time data, beautiful animations, and intelligent search**

[Live Demo](https://yourusername.github.io/weather-dashboard) • [Report Bug](https://github.com/yourusername/weather-dashboard/issues) • [Request Feature](https://github.com/yourusername/weather-dashboard/issues)

</div>

---

## 📸 Screenshots

<div align="center">
  <img src="https://via.placeholder.com/800x400?text=Weather+Dashboard+Demo" alt="Weather Dashboard Screenshot" width="800"/>
  <br/>
  <em>Main dashboard showing current weather and 5-day forecast</em>
</div>

## ✨ Features

### Core Features

- 🔍 **Smart City Search** - Real-time autocomplete with debounced API calls
- 🌡️ **Current Weather** - Temperature, feels like, humidity, wind speed, pressure
- 📅 **5-Day Forecast** - Daily weather predictions with icons and details
- 💾 **Recent Searches** - Persists last 5 searched cities in localStorage
- 🎨 **Beautiful UI** - Gradient backgrounds with glass morphism effects
- 📱 **Fully Responsive** - Works perfectly on desktop, tablet, and mobile

### Advanced Features

- ⌨️ **Keyboard Navigation** - Navigate suggestions with arrow keys
- ⚡ **Parallel API Calls** - Optimized performance with Promise.all
- 🎭 **Smooth Animations** - Framer Motion powered transitions and hover effects
- 🛡️ **Type Safety** - Full TypeScript implementation
- 🚦 **Loading States** - Visual feedback during API calls
- ❌ **Error Handling** - User-friendly error messages with retry options
- 🎯 **Popular Cities** - Quick access to major world cities

### Developer Features

- 📦 **ESLint + Prettier** - Consistent code style and quality
- 🐛 **Git Hooks** - Pre-commit linting with Husky
- 🔄 **CI/CD Ready** - GitHub Actions workflow included
- 📝 **Comprehensive Documentation** - Easy to understand and extend

## 🚀 Tech Stack

### Frontend

| Technology    | Version | Purpose      |
| ------------- | ------- | ------------ |
| React         | 19.2.4  | UI Framework |
| TypeScript    | 4.9.5   | Type Safety  |
| Tailwind CSS  | 3.4.17  | Styling      |
| Framer Motion | 10.16.4 | Animations   |

### Development Tools

| Tool        | Purpose             |
| ----------- | ------------------- |
| ESLint      | Code linting        |
| Prettier    | Code formatting     |
| Husky       | Git hooks           |
| lint-staged | Staged file linting |

### API

- **OpenWeatherMap** - Weather data provider
  - Current Weather API
  - 5-Day Forecast API
  - Geocoding API (for autocomplete)

## 📦 Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Step 1: Clone the repository

```bash
git clone https://github.com/yourusername/weather-dashboard.git
cd weather-dashboard
```
