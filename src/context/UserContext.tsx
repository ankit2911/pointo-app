import React, { createContext, useContext, useState } from 'react';
import type { UserStatus, InstalledUser, ApprovedUser, LoggedInUser } from '../types';
import { installedUser } from '../data/userInstalled';
import { approvedUser } from '../data/userApproved';

interface UserContextType {
  status: UserStatus;
  user: InstalledUser | null;
  approvedUser: ApprovedUser | null;
  loggedInUser: LoggedInUser | null;
  setStatus: (s: UserStatus) => void;
  activateReferral: () => void;
  pendingReferralCode: string | null;
  setPendingReferralCode: (code: string | null) => void;
  updateLoggedInUser: (data: Partial<LoggedInUser>) => void;
}

const UserContext = createContext<UserContextType>({
  status: 'logged_in',
  user: null,
  approvedUser: null,
  loggedInUser: { name: 'Ankit', phone: '9876543210' },
  setStatus: () => {},
  activateReferral: () => {},
  pendingReferralCode: null,
  setPendingReferralCode: () => {},
  updateLoggedInUser: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [status, setStatus] = useState<UserStatus>('logged_in');
  const [currentInstalledUser, setCurrentInstalledUser] = useState<InstalledUser>(installedUser);
  const [currentApprovedUser, setCurrentApprovedUser] = useState<ApprovedUser>(approvedUser);
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState<LoggedInUser>({ 
    name: 'Ankit', 
    phone: '9876543210',
    vehicleModel: 'Ather 450X' 
  });
  const [pendingReferralCode, setPendingReferralCode] = useState<string | null>(null);

  const updateLoggedInUser = (data: Partial<LoggedInUser>) => {
    setCurrentLoggedInUser(prev => ({ ...prev, ...data }));
  };

  const mockReferrals = [
    { id: '1', name: 'Rahul S', status: 'Approved', points: 500 },
    { id: '2', name: 'Priya N', status: 'Installed', points: 1000 },
  ];

  const activateReferral = () => {
    const referralCode = `${(status === 'installed' ? currentInstalledUser.name : (status === 'approved' ? currentApprovedUser.name : currentLoggedInUser.name)).toUpperCase()}123`;
    const referralLink = `https://pointo.app/referral/${referralCode}`;

    if (status === 'installed') {
      setCurrentInstalledUser(prev => ({
        ...prev,
        referralEnabled: true,
        referralCode,
        referralLink,
        referrals: mockReferrals as any
      }));
    } else if (status === 'approved') {
      setCurrentApprovedUser(prev => ({
        ...prev,
        referralEnabled: true,
        referralCode,
        referralLink,
        referrals: mockReferrals as any
      }));
    }
  };

  return (
    <UserContext.Provider value={{
      status,
      user: status === 'installed' ? currentInstalledUser : null,
      approvedUser: status === 'approved' ? currentApprovedUser : null,
      loggedInUser: status === 'logged_in' ? currentLoggedInUser : null,
      setStatus,
      activateReferral,
      pendingReferralCode,
      setPendingReferralCode,
      updateLoggedInUser,
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
