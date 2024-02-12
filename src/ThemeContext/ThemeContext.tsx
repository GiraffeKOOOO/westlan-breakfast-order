// libraries
import { useState, createContext, useEffect } from 'react';

type ThemeContextType = 'LIGHT' | 'DARK';

const ThemeContext = createContext<ThemeContextType>('LIGHT');

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  const enableDarkMode = () => {
    setDarkMode(true);
    window.localStorage.setItem('darkMode', true);
  };

  const disableDarkMode = () => {
    setDarkMode(false);
    window.localStorage.setItem('darkMode', false);
  };

  useEffect(() => {
    const storageDarkMode = window.localStorage.getItem('darkMode');
    if (storageDarkMode !== null) setDarkMode(JSON.parse(storageDarkMode));
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        enableDarkMode,
        disableDarkMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeContext;
