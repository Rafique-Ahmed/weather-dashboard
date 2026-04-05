// src/services/weatherService.ts
import { WeatherData, ForecastData } from '../types/weather';

const API_KEY = 'cdf4aaa8a522b7bf5599eca1b7cb5814';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeatherData = async (city: string): Promise<WeatherData> => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`City "${city}" not found. Please check the spelling and try again.`);
      } else if (response.status === 401) {
        throw new Error('Invalid API key. Please check your configuration.');
      } else {
        throw new Error('Unable to fetch weather data. Please try again later.');
      }
    }

    const data: WeatherData = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'TypeError') {
        throw new Error('Network error. Please check your internet connection.');
      }
      throw error;
    }
    throw new Error('An unexpected error occurred');
  }
};

export const fetchForecastData = async (city: string): Promise<ForecastData> => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error('Unable to fetch forecast data.');
    }

    const data: ForecastData = await response.json();
    return data;
  } catch (error) {
    throw new Error('Network error. Please check your connection.');
  }
};
