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

export interface BatteryData {
  model: string;
  serialNumber: string;
  status: 'active' | 'under_repair' | 'inactive';
}

export interface ChargerData {
  type: 'Basic' | 'Advance';
  brand: string;
  model: string;
  serialNumber: string;
  rating: string;
  warranty: string;
  ipRated: boolean;
  status: 'active' | 'inactive';
}

export interface UserBatteries {
  own: BatteryData;
  service?: BatteryData;
}

export interface ServiceTicket {
  id: string;
  issue: string;
  status: 'Request Raised' | 'Battery Picked Up' | 'Under Repair' | 'Ready for Delivery';
  estimatedDays: number;
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
  totalLoan: number;
  paymentStatus: 'active' | 'overdue' | 'defaulted' | 'recovered';
  overdueDays?: number;
  outstandingAmount?: number;
  missedEmis?: number;
  recoveryDate?: string;
  gracePeriod?: number;
  dealer: string;
  warrantyExpiry: string;
  installDate: string;
  referralEnabled?: boolean;
  referralCode?: string;
  referralLink?: string;
  referrals?: Referral[];
  locationAvailable?: boolean;
  locationLastUpdated?: string;
  locationName?: string;
  coordinates?: { lat: number; lng: number };
  currentBatteryType: 'own' | 'service';
  batteries: UserBatteries;
  charger?: ChargerData;
  serviceTicket?: ServiceTicket;
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

export interface LoggedInUser {
  name: string;
  phone: string;
  vehicleModel?: string;
  city?: string;
  usageType?: 'Personal' | 'Commercial';
  applicationStarted?: boolean;
}

export type UserStatus = 'guest' | 'logged_in' | 'installed' | 'approved';
