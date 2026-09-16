export type UserRole = 'USER' | 'MERCHANT' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatar?: string;
  address?: string;
  city?: string;
  state?: string;
  ecoPoints?: number;
  totalKgRecycled?: number;
  co2SavedKg?: number;
  joinedDate?: string;
  verified?: boolean;
  rating?: number;
  vehicleNumber?: string;
}

export type ScrapCategoryType = 
  | 'plastic'
  | 'paper'
  | 'metal'
  | 'ewaste'
  | 'electronics'
  | 'appliances';

export interface ScrapCategory {
  id: ScrapCategoryType;
  name: string;
  iconName: string;
  avgPricePerKg: number;
  unit: string;
  description: string;
  co2PerKg: number;
  examples: string[];
}

export type PickupStatus = 
  | 'REQUESTED'
  | 'MATCHING'
  | 'ASSIGNED'
  | 'ON_THE_WAY'
  | 'ARRIVED'
  | 'VERIFIED'
  | 'PAID'
  | 'COMPLETED'
  | 'CANCELLED';

export interface ScrapItem {
  id?: string;
  category: ScrapCategoryType;
  materialName: string;
  estimatedWeightKg: number;
  estimatedPriceMin: number;
  estimatedPriceMax: number;
  confidence: number;
  ratePerKg?: number;
  imageUrl?: string;
  condition?: 'Good' | 'Fair' | 'Mixed';
  actualWeightKg?: number;
  finalPrice?: number;
  notes?: string;
}

export interface Collector {
  id: string;
  name: string;
  phone: string;
  rating: number;
  totalPickups?: number;
  avatar?: string;
  distanceKm: number;
  etaMinutes: number;
  verifiedBadge?: boolean;
  verified?: boolean;
  vehicle?: string;
  vehicleType?: string;
  vehicleNo?: string;
  currentLocation?: { lat: number; lng: number };
}

export interface RecyclerFacility {
  id: string;
  name: string;
  licenseNo: string;
  location: string;
  processType: string;
  complianceScore: number;
}

export interface ScrapJourneyStage {
  stage: 'CITIZEN_SUBMITTED' | 'COLLECTOR_PICKED' | 'FACILITY_VERIFIED' | 'RECYCLER_PROCESSING' | 'NEW_PRODUCT_CREATED';
  title: string;
  description: string;
  timestamp: string;
  actor: string;
  location: string;
  completed: boolean;
  badge?: string;
}

export interface PickupRequest {
  id: string;
  userId: string;
  userName: string;
  userPhone: string;
  userAddress: string;
  city: string;
  scrapItems: ScrapItem[];
  status: PickupStatus;
  scheduledDate: string;
  scheduledTimeSlot: string;
  createdAt: string;
  collector?: Collector;
  otpCode: string;
  finalAmount?: number;
  paymentMethod?: 'UPI' | 'CASH' | 'WALLET';
  transactionId?: string;
  ecoPointsAwarded?: number;
  journeyStages: ScrapJourneyStage[];
  recycler?: RecyclerFacility;
}

export interface EcoBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedDate?: string;
  requiredPoints: number;
}

export interface EcoReward {
  id: string;
  title: string;
  partner: string;
  discount: string;
  pointsCost: number;
  code: string;
  category: string;
  expiryDate: string;
}

export interface SystemMetrics {
  totalUsers: number;
  activeMerchants: number;
  activeCollectors?: number;
  partnerRecyclers?: number;
  payoutsDistributed?: number;
  pickupsToday: number;
  scrapCollectedKg: number;
  recycledMaterialKg: number;
  totalTransactionValue: number;
  co2SavedKg: number;
  ecoPointsDistributed: number;
  recyclingRatePercent: number;
}
