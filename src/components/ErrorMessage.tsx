// components/ErrorMessage.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      className="bg-white rounded-2xl p-8 text-center max-w-md mx-auto shadow-2xl"
    >
      <div className="text-6xl mb-4">⚠️</div>
      <h3 className="text-xl font-bold text-red-500 mb-2">Unable to fetch weather data</h3>
      <p className="text-gray-600 mb-6">{message}</p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onRetry}
        className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold px-6 py-3 rounded-full transition-all"
      >
        Try Again
      </motion.button>
    </motion.div>
  );
};

export default ErrorMessage;
