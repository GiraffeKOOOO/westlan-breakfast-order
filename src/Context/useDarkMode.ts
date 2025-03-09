// libraries
import { useContext } from 'react';
// files
import { DarkModeContext, DarkModeContextType } from './DarkModeContext';

export function useDarkMode(): DarkModeContextType {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
