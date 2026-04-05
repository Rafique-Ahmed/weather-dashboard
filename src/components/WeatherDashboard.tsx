// src/components/WeatherDashboard.tsx
import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchBar from './SearchBar';
import CurrentWeather from './CurrentWeather';
import Forecast from './Forecast';
import ErrorMessage from './ErrorMessage';
import LoadingSpinner from './LoadingSpinner';
import { fetchWeatherData, fetchForecastData } from '../services/weatherService';
import type { WeatherData, ForecastData } from '../types/weather';

const WeatherDashboard: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSearchedCity, setLastSearchedCity] = useState<string>('');
  const [recentCities, setRecentCities] = useState<string[]>([]);

  // Load recent cities from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentCities');
    if (saved) {
      try {
        setRecentCities(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load recent cities');
      }
    }
  }, []);

  // Save recent cities to localStorage
  const saveRecentCity = (city: string) => {
    const updated = [city, ...recentCities.filter((c) => c !== city)].slice(0, 5);
    setRecentCities(updated);
    localStorage.setItem('recentCities', JSON.stringify(updated));
  };

  const handleSearch = useCallback(async (city: string) => {
    if (!city.trim()) return;

    setLoading(true);
    setError(null);
    setLastSearchedCity(city);

    try {
      const [current, forecast] = await Promise.all([
        fetchWeatherData(city),
        fetchForecastData(city),
      ]);

      setWeatherData(current);
      setForecastData(forecast);
      saveRecentCity(city);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-700 py-8 px-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
          className="text-center mb-10"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-2">
            <span className="inline-block animate-float">🌤️</span>
            Weather Dashboard
          </h1>
          <p className="text-white/90 text-lg">Real-time weather & 5-day forecast</p>
        </motion.div>

        <SearchBar onSearch={handleSearch} loading={loading} />

        {/* Recent Searches */}
        {recentCities.length > 0 && !weatherData && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto mb-8"
          >
            <p className="text-white/70 text-sm text-center mb-2">Recent searches:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {recentCities.map((city) => (
                <motion.button
                  key={city}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSearch(city)}
                  className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm hover:bg-white/30 transition-all"
                >
                  🔄 {city}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LoadingSpinner />
            </motion.div>
          )}

          {error && (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <ErrorMessage message={error} onRetry={() => handleSearch(lastSearchedCity)} />
            </motion.div>
          )}

          {!loading && !error && weatherData && forecastData && (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.3 }}
              className="space-y-8"
            >
              <CurrentWeather data={weatherData} />
              <Forecast data={forecastData} />
            </motion.div>
          )}

          {!loading && !error && !weatherData && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-white py-16"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2, repeatDelay: 3 }}
                className="text-7xl mb-4"
              >
                🌍
              </motion.div>
              <h2 className="text-3xl font-semibold mb-2">Search for any city</h2>
              <p className="text-white/80">
                Start typing to see suggestions • Choose from popular cities
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default WeatherDashboard;
