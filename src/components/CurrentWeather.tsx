// components/CurrentWeather.tsx
import React from 'react';
import { motion } from 'framer-motion';
import type { WeatherData } from '../types/weather';

interface CurrentWeatherProps {
  data: WeatherData;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data }) => {
  const getWeatherIcon = (iconCode: string): string => {
    return `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
  };

  const formatDate = (): string => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-2xl"
    >
      <div className="text-center mb-6">
        <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-gray-800">
          {data.name}, {data.sys.country}
        </motion.h2>
        <motion.p variants={itemVariants} className="text-gray-500 mt-1">
          {formatDate()}
        </motion.p>
      </div>

      <div className="text-center mb-8">
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-4 flex-wrap"
        >
          <img
            src={getWeatherIcon(data.weather[0].icon)}
            alt={data.weather[0].description}
            className="w-28 h-28 md:w-32 md:h-32"
          />
          <div className="text-left">
            <span className="text-6xl md:text-7xl font-bold text-purple-600">
              {Math.round(data.main.temp)}°
            </span>
            <span className="text-gray-500 block text-sm mt-1">
              Feels like {Math.round(data.main.feels_like)}°
            </span>
          </div>
        </motion.div>
        <motion.p variants={itemVariants} className="text-xl text-gray-600 mt-2 capitalize">
          {data.weather[0].description}
        </motion.p>
      </div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 flex items-center gap-4 cursor-pointer"
        >
          <div className="text-3xl">💧</div>
          <div>
            <p className="text-gray-500 text-sm uppercase tracking-wide">Humidity</p>
            <p className="text-2xl font-bold text-gray-800">{data.main.humidity}%</p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-4 flex items-center gap-4 cursor-pointer"
        >
          <div className="text-3xl">💨</div>
          <div>
            <p className="text-gray-500 text-sm uppercase tracking-wide">Wind Speed</p>
            <p className="text-2xl font-bold text-gray-800">
              {Math.round(data.wind.speed * 3.6)} km/h
            </p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-4 flex items-center gap-4 cursor-pointer"
        >
          <div className="text-3xl">📊</div>
          <div>
            <p className="text-gray-500 text-sm uppercase tracking-wide">Pressure</p>
            <p className="text-2xl font-bold text-gray-800">{data.main.pressure} hPa</p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default CurrentWeather;
