// src/components/SearchBar.tsx
import React, { useState, FormEvent, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchCitySuggestions, CitySuggestion } from '../services/citySuggestions';

interface SearchBarProps {
  onSearch: (city: string) => void;
  loading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, loading }) => {
  const [city, setCity] = useState<string>('');
  const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Fetch suggestions when user types
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (city.length >= 2) {
        setIsFetching(true);
        const results = await fetchCitySuggestions(city);
        setSuggestions(results);
        setShowSuggestions(results.length > 0);
        setIsFetching(false);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [city]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!showSuggestions) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % suggestions.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
      } else if (e.key === 'Enter' && selectedIndex >= 0) {
        e.preventDefault();
        handleSelectSuggestion(suggestions[selectedIndex]);
      } else if (e.key === 'Escape') {
        setShowSuggestions(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showSuggestions, suggestions, selectedIndex]);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
      setShowSuggestions(false);
      setSelectedIndex(-1);
    }
  };

  const handleSelectSuggestion = (suggestion: CitySuggestion) => {
    const fullCityName = suggestion.state
      ? `${suggestion.name}, ${suggestion.state}, ${suggestion.country}`
      : `${suggestion.name}, ${suggestion.country}`;
    setCity(fullCityName);
    setShowSuggestions(false);
    setSelectedIndex(-1);
    onSearch(suggestion.name);
  };

  const getCityDisplayName = (suggestion: CitySuggestion): string => {
    if (suggestion.state) {
      return `${suggestion.name}, ${suggestion.state}, ${suggestion.country}`;
    }
    return `${suggestion.name}, ${suggestion.country}`;
  };

  return (
    <motion.form
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto mb-10 px-4 relative"
    >
      <div className="relative">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center bg-white rounded-full shadow-xl p-1 md:p-1.5"
        >
          <span className="text-2xl pl-4 text-purple-500">🔍</span>
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
              placeholder="Enter city name (e.g., London, Tokyo, New York)..."
              className="w-full px-4 py-3 md:py-4 text-gray-700 placeholder-gray-400 focus:outline-none bg-transparent"
              disabled={loading}
              autoComplete="off"
            />
            {isFetching && (
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-500"></div>
              </div>
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading || !city.trim()}
            className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold px-6 py-2 md:px-8 md:py-3 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? 'Searching...' : 'Get Weather'}
          </motion.button>
        </motion.div>

        {/* Suggestions Dropdown */}
        <AnimatePresence>
          {showSuggestions && suggestions.length > 0 && (
            <motion.div
              ref={suggestionsRef}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute z-50 w-full mt-2 bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="max-h-80 overflow-y-auto">
                {suggestions.map((suggestion, index) => (
                  <motion.button
                    key={`${suggestion.lat}-${suggestion.lon}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleSelectSuggestion(suggestion)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`w-full text-left px-6 py-3 transition-all duration-200 ${
                      selectedIndex === index
                        ? 'bg-gradient-to-r from-purple-50 to-indigo-50'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-gray-800">
                          {suggestion.name}
                          {suggestion.state && (
                            <span className="text-gray-500 text-sm ml-1">, {suggestion.state}</span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">{suggestion.country}</div>
                      </div>
                      <div className="text-purple-500 text-xl">📍</div>
                    </div>
                  </motion.button>
                ))}
              </div>
              <div className="px-6 py-2 bg-gray-50 text-xs text-gray-500 text-center border-t">
                Press ↑ ↓ to navigate • Enter to select • Esc to close
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Popular cities quick suggestions */}
      {!city && !loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-center"
        >
          <p className="text-white/70 text-sm mb-2">Popular cities:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {['London', 'New York', 'Tokyo', 'Paris', 'Sydney', 'Dubai'].map((popularCity) => (
              <motion.button
                key={popularCity}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCity(popularCity);
                  onSearch(popularCity);
                }}
                className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm hover:bg-white/30 transition-all"
              >
                {popularCity}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.form>
  );
};

export default SearchBar;
