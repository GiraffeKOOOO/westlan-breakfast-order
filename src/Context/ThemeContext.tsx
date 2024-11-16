// libraries
import { useState, createContext, useEffect, ReactNode } from 'react';

const ThemeContext = createContext<{
  darkMode: boolean;
}>({
  darkMode: false,
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const storedDarkMode = window.localStorage.getItem('darkMode');
    if (storedDarkMode) {
      setDarkMode(storedDarkMode === 'true');
    }
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeContext;
