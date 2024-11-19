import React from 'react';
import ThemeContext, { ThemeContextType } from './ThemeContext';

// Custom hook to use the ThemeContext
export function useTheme(): ThemeContextType {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
