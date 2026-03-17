export interface BatteryProduct {
  id: string;
  name: string;
  voltage: string;
  capacity: string; // Added back for detail display if needed
  range: string;
  chargeTime: string;
  cycleLife: string;
  weight: string;
  warranty: string;
  price: number;
  emiPrice: number;
  image?: string;
  tag?: string;
  description?: string;
  chargerName?: string;
  chargerSpecs?: string[];
  chargerWarranty?: string;
}

export interface CommunityPost {
  id: string;
  name: string;
  avatar: string;
  distance: string;
  message: string;
  savings?: string;
  rangeImprovement?: string;
  likes: number;
  timeAgo: string;
  isPointoOwner?: boolean;
  isUpgradePending?: boolean;
  hasMedia?: boolean;
}

export interface Referral {
  id: string;
  name: string;
  status: 'Signed Up' | 'Application Submitted' | 'Approved' | 'Installed';
  points: number;
}

export interface InstalledUser {
  name: string;
  vehicle: string;
  batteryModel: string;
  batteryHealth: number;
  rangeEstimate: number;
  chargeCycles: number;
  batteryScore: number;
  chargingBehaviour: string;
  usageEfficiency: string;
  emiAmount: number;
  emiPaid: number;
  emiTotal: number;
  dealer: string;
  warrantyExpiry: string;
  installDate: string;
  referralEnabled?: boolean;
  referralCode?: string;
  referralLink?: string;
  referrals?: Referral[];
}

export interface ApprovedUser {
  name: string;
  vehicle: string;
  batteryModel: string;
  dealer: string;
  dealerPhone: string;
  installationStatus: string;
  financingApproved: boolean;
  emiAmount: number;
  referralEnabled?: boolean;
  referralCode?: string;
  referralLink?: string;
  referrals?: Referral[];
}

export type UserStatus = 'guest' | 'installed' | 'approved';
