// src/services/citySuggestions.ts
export interface CitySuggestion {
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
}

// Using OpenWeatherMap's geo coding API
const GEO_API_URL = 'https://api.openweathermap.org/geo/1.0/direct';
const API_KEY = 'cdf4aaa8a522b7bf5599eca1b7cb5814';

export const fetchCitySuggestions = async (query: string): Promise<CitySuggestion[]> => {
  if (!query || query.length < 2) return [];

  try {
    const response = await fetch(
      `${GEO_API_URL}?q=${encodeURIComponent(query)}&limit=5&appid=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch suggestions');
    }

    const data = await response.json();
    return data.map((city: any) => ({
      name: city.name,
      country: city.country,
      state: city.state,
      lat: city.lat,
      lon: city.lon,
    }));
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    return [];
  }
};
