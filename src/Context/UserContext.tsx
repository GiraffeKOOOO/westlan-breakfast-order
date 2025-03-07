// libraries
import { useState, createContext, useEffect, ReactNode } from 'react';
// providers
// styles

const UserContext = createContext<{
  userName: string;
  userAvatar: string;
  userDiscordId: string;
}>({
  userName: '',
  userAvatar: '',
  userDiscordId: '',
});

export function UserProvider({ children }: { children: ReactNode }) {
  const [userName, setUserName] = useState<string>();
  const [userAvatar, setUserAvatar] = useState<string>();
  const [userDiscordId, setUserDiscordId] = useState<string>();

  useEffect(() => {
    const userName = window.localStorage.getItem('userName');
    if (userName && typeof userName === 'string') {
      setUserName(userName);
    }

    const userAvatar = window.localStorage.getItem('userAvatar');
    if (userAvatar && typeof userAvatar === 'string') {
      setUserAvatar(userAvatar);
    }

    const userDiscordId = window.localStorage.getItem('userDiscordId');
    if (userDiscordId && typeof userDiscordId === 'string') {
      setUserDiscordId(userDiscordId);
    }
  }, []);

  return (
    <UserContext.Provider value={{ userName, userAvatar, userDiscordId }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
