// components/Forecast.tsx
import React from 'react';
import { motion } from 'framer-motion';
import type { ForecastData, ForecastItem } from '../types/weather';

interface ForecastProps {
  data: ForecastData;
}

const Forecast: React.FC<ForecastProps> = ({ data }) => {
  const getDailyForecast = (forecastList: ForecastItem[]): ForecastItem[] => {
    const dailyMap = new Map<string, ForecastItem>();

    forecastList.forEach((item) => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      if (!dailyMap.has(date)) {
        dailyMap.set(date, item);
      }
    });

    return Array.from(dailyMap.values()).slice(0, 5);
  };

  const dailyForecast = getDailyForecast(data.list);

  const formatDay = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-2xl"
    >
      <motion.h3
        variants={cardVariants}
        className="text-2xl font-bold text-gray-800 mb-6 text-center"
      >
        📅 5-Day Forecast
      </motion.h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {dailyForecast.map((day, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{ scale: 1.05, y: -10 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-4 text-center cursor-pointer"
          >
            <div className="font-bold text-purple-600 text-lg">{formatDay(day.dt)}</div>
            <div className="text-gray-500 text-sm mb-3">{formatDate(day.dt)}</div>
            <img
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
              alt={day.weather[0].description}
              className="w-16 h-16 mx-auto my-2"
            />
            <div className="text-2xl font-bold text-gray-800 my-2">
              {Math.round(day.main.temp)}°
            </div>
            <div className="text-gray-600 text-sm capitalize mb-2">
              {day.weather[0].description.split(' ').slice(0, 2).join(' ')}
            </div>
            <div className="flex justify-center gap-3 text-xs text-gray-500">
              <span>💧 {day.main.humidity}%</span>
              <span>💨 {Math.round(day.wind.speed * 3.6)} km/h</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Forecast;
