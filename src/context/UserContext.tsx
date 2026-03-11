import React, { createContext, useContext, useState } from 'react';
import type { UserStatus, InstalledUser, ApprovedUser } from '../types';
import { installedUser } from '../data/userInstalled';
import { approvedUser } from '../data/userApproved';

interface UserContextType {
  status: UserStatus;
  user: InstalledUser | null;
  approvedUser: ApprovedUser | null;
  setStatus: (s: UserStatus) => void;
}

const UserContext = createContext<UserContextType>({
  status: 'approved',
  user: installedUser,
  approvedUser: approvedUser,
  setStatus: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [status, setStatus] = useState<UserStatus>('guest');

  return (
    <UserContext.Provider value={{
      status,
      user: status === 'installed' ? installedUser : null,
      approvedUser: status === 'approved' ? approvedUser : null,
      setStatus,
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
