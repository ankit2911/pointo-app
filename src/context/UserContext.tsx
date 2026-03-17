import React, { createContext, useContext, useState } from 'react';
import type { UserStatus, InstalledUser, ApprovedUser } from '../types';
import { installedUser } from '../data/userInstalled';
import { approvedUser } from '../data/userApproved';

interface UserContextType {
  status: UserStatus;
  user: InstalledUser | null;
  approvedUser: ApprovedUser | null;
  setStatus: (s: UserStatus) => void;
  activateReferral: () => void;
  pendingReferralCode: string | null;
  setPendingReferralCode: (code: string | null) => void;
}

const UserContext = createContext<UserContextType>({
  status: 'approved',
  user: installedUser,
  approvedUser: approvedUser,
  setStatus: () => {},
  activateReferral: () => {},
  pendingReferralCode: null,
  setPendingReferralCode: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [status, setStatus] = useState<UserStatus>('guest');
  const [currentInstalledUser, setCurrentInstalledUser] = useState<InstalledUser>(installedUser);
  const [currentApprovedUser, setCurrentApprovedUser] = useState<ApprovedUser>(approvedUser);
  const [pendingReferralCode, setPendingReferralCode] = useState<string | null>(null);

  const mockReferrals = [
    { id: '1', name: 'Rahul S', status: 'Approved', points: 500 },
    { id: '2', name: 'Priya N', status: 'Installed', points: 1000 },
  ];

  const activateReferral = () => {
    const referralCode = `${(status === 'installed' ? currentInstalledUser.name : currentApprovedUser.name).toUpperCase()}123`;
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
      setStatus,
      activateReferral,
      pendingReferralCode,
      setPendingReferralCode,
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
