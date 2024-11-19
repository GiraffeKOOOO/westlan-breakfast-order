// libraries
import { useState, createContext, useEffect, ReactNode } from 'react';

export type ThemeContextType = {
  darkMode: boolean;
  enableDarkMode: () => void;
  disableDarkMode: () => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps): JSX.Element {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const enableDarkMode = () => {
    setDarkMode(true);
    window.localStorage.setItem('darkMode', 'true');
  };

  const disableDarkMode = () => {
    setDarkMode(false);
    window.localStorage.setItem('darkMode', 'false');
  };

  useEffect(() => {
    const storageDarkMode = window.localStorage.getItem('darkMode');
    if (storageDarkMode !== null) {
      setDarkMode(storageDarkMode === 'true');
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ darkMode, enableDarkMode, disableDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeContext;
