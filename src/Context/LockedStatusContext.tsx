/* eslint-disable @typescript-eslint/no-explicit-any */
// libraries
import { useState, createContext, useEffect } from 'react';
// providers
// files
// styles

const LockedStatusContext = createContext<{
  lockedStatus: boolean;
}>({
  lockedStatus: false,
});

export function LockedStatusProvider({ children }: { children: React.ReactNode }) {
  const [lockedStatus, setLockedStatus] = useState<boolean>(false);

  useEffect(() => {
    const storedLocked = window.localStorage.getItem('lockedStatus');
    if (storedLocked) {
      setLockedStatus(storedLocked === 'true');
    }
  }, []);

  return (
    <LockedStatusContext.Provider value={{ lockedStatus }}>{children}</LockedStatusContext.Provider>
  );
}

export default LockedStatusContext;
