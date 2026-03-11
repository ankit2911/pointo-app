export interface BatteryProduct {
  id: string;
  name: string;
  voltage: string;
  range: string;
  chargeTime: string;
  warranty: string;
  price: number;
  emiPrice: number;
  image?: string;
  tag?: string;
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
  comments: number;
  timeAgo: string;
  isPointoOwner?: boolean;
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
}

export type UserStatus = 'guest' | 'installed';
