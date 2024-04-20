// libraries
import { useState, createContext, useEffect } from 'react';
// providers
// files
import userType from './UserTypes';
// styles

const UserContext = createContext({
  userId: -1,
  userName: '',
  userRole: userType.user,
});

export function UserProvider({ children }) {
  const [userId, setUserId] = useState<number>();
  const [userName, setUserName] = useState<string>();
  const [userRole, setUserRole] = useState<userType>();

  useEffect(() => {
    const userId = window.localStorage.getItem('userId');
    if (userId) {
      setUserId(userId);
    }
    const userName = window.localStorage.getItem('userName');
    if (userName && typeof userName === 'string') {
      setUserName(userName);
    }
    const userRole = window.localStorage.getItem('userRole');
    if (userRole && (userRole === userType.admin || userRole === userType.user)) {
      setUserRole(userRole);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        userId,
        userName,
        userRole,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
