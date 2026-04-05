// src/App.tsx
import { motion } from 'framer-motion';
import React, { useState } from 'react';

const API_KEY = 'cdf4aaa8a522b7bf5599eca1b7cb5814';

const App: React.FC = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) throw new Error('City not found');
      const data = await response.json();
      setWeather(data);
    } catch (err: any) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-700 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-5xl font-bold text-white text-center mb-8"
        >
          🌤️ Weather Dashboard
        </motion.h1>

        <div className="flex gap-2 mb-8">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && searchWeather()}
            placeholder="Enter city name..."
            className="flex-1 px-4 py-3 rounded-lg focus:outline-none"
          />
          <button
            onClick={searchWeather}
            disabled={loading}
            className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 disabled:opacity-50"
          >
            {loading ? '...' : 'Search'}
          </button>
        </div>

        {error && <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">{error}</div>}

        {weather && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/95 rounded-2xl p-6"
          >
            <h2 className="text-3xl font-bold text-center mb-4">
              {weather.name}, {weather.sys.country}
            </h2>
            <div className="text-center">
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                alt={weather.weather[0].description}
                className="w-32 h-32 mx-auto"
              />
              <div className="text-6xl font-bold text-purple-600">
                {Math.round(weather.main.temp)}°
              </div>
              <div className="text-gray-600 capitalize mt-2">{weather.weather[0].description}</div>
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div>
                  <div className="text-2xl">💧</div>
                  <div className="text-sm text-gray-500">Humidity</div>
                  <div className="font-bold">{weather.main.humidity}%</div>
                </div>
                <div>
                  <div className="text-2xl">💨</div>
                  <div className="text-sm text-gray-500">Wind</div>
                  <div className="font-bold">{Math.round(weather.wind.speed * 3.6)} km/h</div>
                </div>
                <div>
                  <div className="text-2xl">📊</div>
                  <div className="text-sm text-gray-500">Pressure</div>
                  <div className="font-bold">{weather.main.pressure} hPa</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default App;
