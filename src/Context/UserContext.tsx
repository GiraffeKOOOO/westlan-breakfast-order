// libraries
import { useState, createContext, useEffect, ReactNode } from 'react';
// providers
// styles

const UserContext = createContext({
  userName: '',
});

export function UserProvider({ children }: { children: ReactNode }) {
  const [userName, setUserName] = useState<string>();

  useEffect(() => {
    const userName = window.localStorage.getItem('userName');
    if (userName && typeof userName === 'string') {
      setUserName(userName);
    }
  }, []);

  return <UserContext.Provider value={{ userName }}>{children}</UserContext.Provider>;
}

export default UserContext;
