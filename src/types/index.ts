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
}
