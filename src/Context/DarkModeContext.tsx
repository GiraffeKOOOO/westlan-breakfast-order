// libraries
import { useState, createContext, useEffect, ReactNode } from 'react';

export type DarkModeContextType = {
  darkMode: boolean;
  enableDarkMode: () => void;
  disableDarkMode: () => void;
};

export const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

interface DarkModeProviderProps {
  children: ReactNode;
}

export function DarkModeProvider({ children }: DarkModeProviderProps) {
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
    <DarkModeContext.Provider value={{ darkMode, enableDarkMode, disableDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export default DarkModeContext;
