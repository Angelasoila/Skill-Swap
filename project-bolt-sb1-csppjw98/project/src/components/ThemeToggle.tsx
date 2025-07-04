import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useApp } from '../context/AppContext';

const ThemeToggle = () => {
  const { state, dispatch } = useApp();

  return (
    <button
      onClick={() => dispatch({ type: 'TOGGLE_DARK_MODE' })}
      className={`p-2 rounded-lg transition-colors ${
        state.darkMode
          ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
      title={state.darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {state.darkMode ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

export default ThemeToggle;