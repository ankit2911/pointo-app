import React, { createContext, useContext, useState } from 'react';
import type { UserStatus, InstalledUser } from '../types';
import { installedUser } from '../data/userInstalled';

interface UserContextType {
  status: UserStatus;
  user: InstalledUser | null;
  setStatus: (s: UserStatus) => void;
}

const UserContext = createContext<UserContextType>({
  status: 'installed',
  user: installedUser,
  setStatus: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [status, setStatus] = useState<UserStatus>('installed');

  return (
    <UserContext.Provider value={{
      status,
      user: status === 'installed' ? installedUser : null,
      setStatus,
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
