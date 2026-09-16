import { 
  User, 
  ScrapCategory, 
  Collector, 
  PickupRequest, 
  EcoBadge, 
  EcoReward, 
  SystemMetrics,
  RecyclerFacility
} from '../types';

export const MOCK_USERS: Record<string, User> = {
  'user@ekabaadi.com': {
    id: 'usr-101',
    name: 'Ananya Sharma',
    email: 'user@ekabaadi.com',
    phone: '+91 98290 14820',
    role: 'USER',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    address: 'Flat 402, Royal Palms, Sector 4',
    city: 'Neemrana',
    state: 'Rajasthan',
    ecoPoints: 840,
    totalKgRecycled: 12.5,
    co2SavedKg: 23.4,
    joinedDate: 'January 2025',
    verified: true,
  },
  'merchant@ekabaadi.com': {
    id: 'mer-201',
    name: 'Ramesh Kumar',
    email: 'merchant@ekabaadi.com',
    phone: '+91 94140 88219',
    role: 'MERCHANT',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    address: 'Shop 12, RIICO Industrial Hub',
    city: 'Neemrana',
    state: 'Rajasthan',
    rating: 4.8,
    totalKgRecycled: 1420,
    co2SavedKg: 2680,
    joinedDate: 'November 2024',
    verified: true,
    vehicleNumber: 'RJ-32-EA-4412 (Electric Cargo 3W)',
  },
  'admin@ekabaadi.com': {
    id: 'adm-001',
    name: 'Dr. Vikramaditya Rathore',
    email: 'admin@ekabaadi.com',
    phone: '+91 99822 55001',
    role: 'ADMIN',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    address: 'Command & Control Centre, Smart City ULB',
    city: 'Neemrana',
    state: 'Rajasthan',
    joinedDate: 'August 2024',
    verified: true,
  }
};

export const SCRAP_CATEGORIES: ScrapCategory[] = [
  {
    id: 'plastic',
    name: 'Plastic & Polymers',
    iconName: 'Package',
    avgPricePerKg: 18,
    unit: 'kg',
    description: 'PET bottles, HDPE containers, hard plastic crates, clean polythene',
    co2PerKg: 1.8,
    examples: ['Water bottles', 'Milk pouches', 'Containers', 'Buckets']
  },
  {
    id: 'paper',
    name: 'Paper & Cardboard',
    iconName: 'FileText',
    avgPricePerKg: 14,
    unit: 'kg',
    description: 'Corrugated cartons, old newspapers, notebooks, magazines',
    co2PerKg: 1.2,
    examples: ['Amazon boxes', 'Old books', 'Office paper', 'Magazines']
  },
  {
    id: 'metal',
    name: 'Metals & Alloys',
    iconName: 'Hammer',
    avgPricePerKg: 38,
    unit: 'kg',
    description: 'Iron, steel, brass, copper, aluminium cans, pipes and kitchenware',
    co2PerKg: 3.5,
    examples: ['Aluminium cans', 'Iron rods', 'Brass utensils', 'Copper wires']
  },
  {
    id: 'ewaste',
    name: 'E-Waste',
    iconName: 'Cpu',
    avgPricePerKg: 65,
    unit: 'kg',
    description: 'Printed circuit boards, motherboards, mobile phones, chargers, chips',
    co2PerKg: 6.2,
    examples: ['Old smartphones', 'PC parts', 'Chargers', 'Batteries']
  },
  {
    id: 'electronics',
    name: 'Consumer Electronics',
    iconName: 'Tv',
    avgPricePerKg: 45,
    unit: 'kg',
    description: 'Monitors, printers, sound systems, microwave components',
    co2PerKg: 4.8,
    examples: ['Old monitors', 'Printers', 'Audio decks', 'Tablets']
  },
  {
    id: 'appliances',
    name: 'Large Appliances',
    iconName: 'Refrigerator',
    avgPricePerKg: 28,
    unit: 'kg',
    description: 'Washing machines, AC units, refrigerators, water coolers',
    co2PerKg: 5.5,
    examples: ['Defunct AC', 'Washing machine parts', 'Cooler bodies']
  }
];

export const MOCK_COLLECTOR: Collector = {
  id: 'col-704',
  name: 'Ramesh Kumar',
  phone: '+91 94140 88219',
  rating: 4.8,
  totalPickups: 874,
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  distanceKm: 1.2,
  etaMinutes: 8,
  verifiedBadge: true,
  vehicle: 'Electric Cargo Trike',
  vehicleNo: 'RJ-32-EA-4412',
  currentLocation: { lat: 27.9892, lng: 76.3882 }
};

export const MOCK_RECYCLER: RecyclerFacility = {
  id: 'rec-501',
  name: 'EcoGreen Circular Polymers Ltd.',
  licenseNo: 'CPCB/PWM/RAJ-2023/889',
  location: 'RIICO Phase II, Neemrana Green Cluster',
  processType: 'Mechanical Pelletization & Resin Extrusion',
  complianceScore: 98.4
};

export const INITIAL_PICKUP_REQUESTS: PickupRequest[] = [
  {
    id: 'EK-PK-8921',
    userId: 'usr-101',
    userName: 'Ananya Sharma',
    userPhone: '+91 98290 14820',
    userAddress: 'Flat 402, Royal Palms, Sector 4, Neemrana',
    city: 'Neemrana',
    status: 'COMPLETED',
    scheduledDate: 'Yesterday',
    scheduledTimeSlot: '11:00 AM - 01:00 PM',
    createdAt: '2026-09-14T10:15:00Z',
    collector: MOCK_COLLECTOR,
    otpCode: '5821',
    finalAmount: 450,
    paymentMethod: 'UPI',
    transactionId: 'UPI-RAZ-9821849182',
    ecoPointsAwarded: 50,
    recycler: MOCK_RECYCLER,
    scrapItems: [
      {
        category: 'paper',
        materialName: 'Corrugated Cardboard & Books',
        estimatedWeightKg: 15.0,
        actualWeightKg: 16.2,
        estimatedPriceMin: 220,
        estimatedPriceMax: 260,
        finalPrice: 243,
        confidence: 96,
        condition: 'Good',
        imageUrl: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=500&auto=format&fit=crop&q=80'
      },
      {
        category: 'metal',
        materialName: 'Iron & Aluminium Utensils',
        estimatedWeightKg: 5.0,
        actualWeightKg: 5.4,
        estimatedPriceMin: 190,
        estimatedPriceMax: 220,
        finalPrice: 207,
        confidence: 92,
        condition: 'Good',
        imageUrl: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=500&auto=format&fit=crop&q=80'
      }
    ],
    journeyStages: [
      {
        stage: 'CITIZEN_SUBMITTED',
        title: 'Request Logged & AI Classified',
        description: 'Scrap catalogued with 96% AI confidence via citizen portal.',
        timestamp: '14 Sep, 10:15 AM',
        actor: 'Ananya Sharma (Citizen)',
        location: 'Neemrana Sector 4',
        completed: true
      },
      {
        stage: 'COLLECTOR_PICKED',
        title: 'Doorstep Weight Verified & Paid',
        description: 'Digitally verified on Bluetooth smart-scale. 21.6 kg collected.',
        timestamp: '14 Sep, 11:42 AM',
        actor: 'Ramesh Kumar (Collector #704)',
        location: 'Sector 4 Hub',
        completed: true
      },
      {
        stage: 'FACILITY_VERIFIED',
        title: 'Aggregated at Central Sorting Hub',
        description: 'Batch grouped into high-grade cellulose fiber stream.',
        timestamp: '14 Sep, 03:30 PM',
        actor: 'Sorting Facility Node 02',
        location: 'RIICO Industrial Cluster',
        completed: true
      },
      {
        stage: 'RECYCLER_PROCESSING',
        title: 'Dispatched to Authorized Recycler',
        description: 'Shipped under CPCB Green Manifest with digital traceability tag.',
        timestamp: '15 Sep, 09:00 AM',
        actor: 'EcoGreen Circular Polymers',
        location: 'Green Cluster Plant A',
        completed: true
      },
      {
        stage: 'NEW_PRODUCT_CREATED',
        title: 'Reprocessed into Recycled Kraft Paper',
        description: 'Prevented 38.8 kg of landfill methane and saved 420 liters of water.',
        timestamp: '15 Sep, 04:15 PM',
        actor: 'Sustainable Kraft Mills Ltd',
        location: 'Closed-Loop Facility',
        completed: true,
        badge: 'Zero Landfill Certified'
      }
    ]
  },
  {
    id: 'EK-PK-9042',
    userId: 'usr-101',
    userName: 'Ananya Sharma',
    userPhone: '+91 98290 14820',
    userAddress: 'Flat 402, Royal Palms, Sector 4, Neemrana',
    city: 'Neemrana',
    status: 'COMPLETED',
    scheduledDate: '08 Sep 2026',
    scheduledTimeSlot: '02:00 PM - 04:00 PM',
    createdAt: '2026-09-08T09:00:00Z',
    collector: MOCK_COLLECTOR,
    otpCode: '4190',
    finalAmount: 180,
    paymentMethod: 'UPI',
    transactionId: 'UPI-RAZ-9810148810',
    ecoPointsAwarded: 30,
    recycler: MOCK_RECYCLER,
    scrapItems: [
      {
        category: 'plastic',
        materialName: 'Clean HDPE & PET Bottles',
        estimatedWeightKg: 8.5,
        actualWeightKg: 9.0,
        estimatedPriceMin: 160,
        estimatedPriceMax: 190,
        finalPrice: 180,
        confidence: 94,
        condition: 'Good',
        imageUrl: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=500&auto=format&fit=crop&q=80'
      }
    ],
    journeyStages: [
      {
        stage: 'CITIZEN_SUBMITTED',
        title: 'Request Submitted',
        description: 'Citizen tagged 9.0 kg PET bottles.',
        timestamp: '08 Sep, 09:00 AM',
        actor: 'Ananya Sharma',
        location: 'Sector 4',
        completed: true
      },
      {
        stage: 'COLLECTOR_PICKED',
        title: 'Collected & Paid',
        description: 'Verified weight and paid ₹180 instantly.',
        timestamp: '08 Sep, 02:40 PM',
        actor: 'Ramesh Kumar',
        location: 'Sector 4',
        completed: true
      },
      {
        stage: 'RECYCLER_PROCESSING',
        title: 'Flaked & Washed',
        description: 'Processed into food-grade rPET flakes.',
        timestamp: '10 Sep, 11:00 AM',
        actor: 'EcoGreen Circular Polymers',
        location: 'Neemrana Plant',
        completed: true
      }
    ]
  }
];

export const MOCK_NEARBY_REQUESTS = [
  {
    id: 'EK-REQ-502',
    customerName: 'Rohit Verma',
    address: 'B-14, Japanese Zone, Neemrana',
    distanceKm: 1.2,
    etaMin: 6,
    category: 'ewaste' as const,
    title: 'E-Waste & Computer Components',
    approxWeight: '3.2 kg',
    estValue: '₹800 – ₹1,050',
    scheduledTime: 'Today, 10:30 AM',
    itemsSummary: 'Motherboards, SMPS, Defunct Routers',
    urgency: 'HIGH'
  },
  {
    id: 'EK-REQ-503',
    customerName: 'Meenakshi Sundaram',
    address: 'Villa 22, Ashiana Green Hills',
    distanceKm: 2.1,
    etaMin: 11,
    category: 'metal' as const,
    title: 'Iron Grills & Copper Pipe Sections',
    approxWeight: '18.5 kg',
    estValue: '₹720 – ₹890',
    scheduledTime: 'Today, 11:45 AM',
    itemsSummary: 'Old iron mesh, copper wiring remnants',
    urgency: 'MEDIUM'
  },
  {
    id: 'EK-REQ-504',
    customerName: 'Sunil Chhabra',
    address: 'Block C, St. Xavier Road',
    distanceKm: 0.8,
    etaMin: 4,
    category: 'paper' as const,
    title: 'Newspapers & Amazon Corrugated Packaging',
    approxWeight: '22.0 kg',
    estValue: '₹310 – ₹380',
    scheduledTime: 'Today, 02:00 PM',
    itemsSummary: '4 bundles of Hindi/English dailies, folded cartons',
    urgency: 'NORMAL'
  }
];

export const ECO_BADGES: EcoBadge[] = [
  {
    id: 'b-1',
    name: 'Starter Recycler',
    description: 'Completed your first scrap pickup on E-Kabaadi',
    icon: 'Leaf',
    unlocked: true,
    unlockedDate: '08 Sep 2026',
    requiredPoints: 50
  },
  {
    id: 'b-2',
    name: 'Plastic Terminator',
    description: 'Diverted over 10 kg of single-use polymers from landfills',
    icon: 'ShieldCheck',
    unlocked: true,
    unlockedDate: '14 Sep 2026',
    requiredPoints: 200
  },
  {
    id: 'b-3',
    name: 'Circular Champion',
    description: 'Earned 800+ Eco Points through consistent doorstep recycling',
    icon: 'Award',
    unlocked: true,
    unlockedDate: '15 Sep 2026',
    requiredPoints: 800
  },
  {
    id: 'b-4',
    name: 'Green Hero of Neemrana',
    description: 'Reach 1,000 Eco Points and earn municipal tax rebate certificate',
    icon: 'Crown',
    unlocked: false,
    requiredPoints: 1000
  }
];

export const ECO_REWARDS: EcoReward[] = [
  {
    id: 'rew-1',
    title: '₹50 Instant UPI Cashback',
    partner: 'E-Kabaadi Direct Wallet',
    discount: '₹50 Cashback',
    pointsCost: 400,
    code: 'CB50-EKAB-882',
    category: 'Cashback',
    expiryDate: '31 Oct 2026'
  },
  {
    id: 'rew-2',
    title: '25% Off Organic Compost & Plant Saplings',
    partner: 'Rajasthan Agro Nursery Hub',
    discount: '25% OFF',
    pointsCost: 350,
    code: 'GREEN25-NEEM',
    category: 'Home & Garden',
    expiryDate: '15 Nov 2026'
  },
  {
    id: 'rew-3',
    title: '₹150 Electricity Bill Concession Credit',
    partner: 'JVVNL Green Energy Incentive',
    discount: '₹150 Credit',
    pointsCost: 750,
    code: 'JVVNL-ECO-991',
    category: 'Utilities',
    expiryDate: '30 Dec 2026'
  },
  {
    id: 'rew-4',
    title: 'Free Zero-Waste Stainless Steel Bottle',
    partner: 'EcoWare Living',
    discount: '100% Free Gift',
    pointsCost: 900,
    code: 'ECOBOTTLE-FREE',
    category: 'Sustainable Goods',
    expiryDate: '20 Oct 2026'
  }
];

export const SYSTEM_METRICS: SystemMetrics = {
  totalUsers: 14850,
  activeMerchants: 342,
  pickupsToday: 184,
  scrapCollectedKg: 42890,
  recycledMaterialKg: 39420,
  totalTransactionValue: 1248900,
  co2SavedKg: 82450,
  ecoPointsDistributed: 420950,
  recyclingRatePercent: 91.9
};

export const SCRAP_ANALYTICS_BREAKDOWN = [
  { material: 'Plastic (PET/HDPE)', weightKg: 14800, percentage: 34.5, valueRupees: 266400, color: '#10b981' },
  { material: 'Paper & Cardboard', weightKg: 12400, percentage: 28.9, valueRupees: 173600, color: '#3b82f6' },
  { material: 'Metals & Alloys', weightKg: 8900, percentage: 20.7, valueRupees: 338200, color: '#f59e0b' },
  { material: 'E-Waste & Electronics', weightKg: 4200, percentage: 9.8, valueRupees: 273000, color: '#06b6d4' },
  { material: 'Appliances & Heavy', weightKg: 2590, percentage: 6.1, valueRupees: 72520, color: '#8b5cf6' },
];

export const AREA_COLLECTION_DATA = [
  { area: 'RIICO Japanese Zone', volumeKg: 14200, pickups: 320, activeCollectors: 18, recoveryRate: '94%' },
  { area: 'Neemrana City Centre & Sector 4', volumeKg: 11800, pickups: 440, activeCollectors: 24, recoveryRate: '92%' },
  { area: 'Ashiana Hill View & Residency', volumeKg: 8400, pickups: 290, activeCollectors: 14, recoveryRate: '90%' },
  { area: 'St. Xavier Institutional Hub', volumeKg: 5200, pickups: 160, activeCollectors: 8, recoveryRate: '88%' },
  { area: 'Shahjahanpur Boundary Node', volumeKg: 3290, pickups: 95, activeCollectors: 6, recoveryRate: '89%' },
];

export const SAMPLE_AI_DETECTIONS: Record<string, {
  material: string;
  category: 'plastic' | 'paper' | 'metal' | 'ewaste' | 'electronics' | 'appliances';
  confidence: number;
  weightMin: number;
  weightMax: number;
  priceMin: number;
  priceMax: number;
  condition: 'Good' | 'Fair' | 'Mixed';
  composition: string;
  carbonOffsetKg: number;
  recyclabilityIndex: string;
}> = {
  plastic: {
    material: 'Polyethylene Terephthalate (PET Grade 1)',
    category: 'plastic',
    confidence: 94,
    weightMin: 1.2,
    weightMax: 1.6,
    priceMin: 70,
    priceMax: 90,
    condition: 'Good',
    composition: 'Clean mineral bottles, uncrushed caps, zero chemical residue',
    carbonOffsetKg: 2.8,
    recyclabilityIndex: 'A+ (100% Closed Loop)'
  },
  paper: {
    material: 'Corrugated Fluted Packaging (OCC Grade)',
    category: 'paper',
    confidence: 97,
    weightMin: 14.0,
    weightMax: 18.0,
    priceMin: 210,
    priceMax: 260,
    condition: 'Good',
    composition: 'Double-walled carton cardboard, dry, unsoiled',
    carbonOffsetKg: 18.2,
    recyclabilityIndex: 'A (High Yield Pulp)'
  },
  metal: {
    material: 'Commercial Aluminium & Iron Alloys',
    category: 'metal',
    confidence: 93,
    weightMin: 4.5,
    weightMax: 6.0,
    priceMin: 220,
    priceMax: 280,
    condition: 'Good',
    composition: 'Aluminium frames & galvanized iron kitchenware',
    carbonOffsetKg: 16.5,
    recyclabilityIndex: 'A+ (Infinite Recyclability)'
  },
  ewaste: {
    material: 'Motherboards, SMPS & Gold-Contact PCB',
    category: 'ewaste',
    confidence: 91,
    weightMin: 2.8,
    weightMax: 3.5,
    priceMin: 850,
    priceMax: 1100,
    condition: 'Good',
    composition: 'FR4 Printed Circuit Boards with copper & traces',
    carbonOffsetKg: 22.4,
    recyclabilityIndex: 'Specialized (Certified E-Waste Dismantler)'
  }
};

export const USER_BADGES = ECO_BADGES;

export const WARD_COLLECTION_DATA = [
  { wardId: 'Ward 1', name: 'Industrial South (RIICO)', activePickups: 14, dominantMaterial: 'Metals & Scrap Alloys', totalKg: 4200, recoveryRate: 94.2 },
  { wardId: 'Ward 2', name: 'Japanese Industrial Cluster', activePickups: 22, dominantMaterial: 'PET & HDPE Plastic', totalKg: 6800, recoveryRate: 96.1 },
  { wardId: 'Ward 3', name: 'Neemrana City Centre', activePickups: 18, dominantMaterial: 'Paper & Cardboard', totalKg: 3100, recoveryRate: 91.5 },
  { wardId: 'Ward 4', name: 'Sector 4 Residential Hub', activePickups: 29, dominantMaterial: 'Household Polymers & E-Waste', totalKg: 5400, recoveryRate: 92.8 },
  { wardId: 'Ward 5', name: 'Central Material Recovery Hub', activePickups: 35, dominantMaterial: 'Mixed Domestic Scrap', totalKg: 8900, recoveryRate: 95.0 },
  { wardId: 'Ward 6', name: 'Institutional Corridor', activePickups: 12, dominantMaterial: 'Books & Office Paper', totalKg: 2800, recoveryRate: 89.4 },
  { wardId: 'Ward 7', name: 'Ashiana Green Hills Residency', activePickups: 19, dominantMaterial: 'Appliances & Metals', totalKg: 3900, recoveryRate: 93.1 },
  { wardId: 'Ward 8', name: 'Shahjahanpur Boundary Node', activePickups: 8, dominantMaterial: 'Corrugated Packaging', totalKg: 1900, recoveryRate: 88.7 }
];

export const RECYCLER_FACILITIES = [
  {
    id: 'REC-501',
    name: 'EcoGreen Circular Polymers Ltd.',
    location: 'RIICO Phase II, Neemrana Green Cluster',
    acceptedMaterials: ['PET Bottles', 'HDPE Containers', 'PP Caps'],
    capacityTonsPerYear: 18000,
    cpcbLicense: 'CPCB/PWM/RAJ-2023/889'
  },
  {
    id: 'REC-502',
    name: 'Sustainable Kraft Pulp & Paper Mills',
    location: 'Shahjahanpur Industrial Corridor',
    acceptedMaterials: ['OCC Cardboard', 'Office Paper', 'Newspapers'],
    capacityTonsPerYear: 32000,
    cpcbLicense: 'CPCB/PULP/RAJ-2022/412'
  },
  {
    id: 'REC-503',
    name: 'Hindustan Circular Smelting & E-Waste Facility',
    location: 'Behror-Neemrana Recovery Park',
    acceptedMaterials: ['Circuit Boards', 'Aluminium Utensils', 'Copper Cables'],
    capacityTonsPerYear: 12500,
    cpcbLicense: 'CPCB/EWASTE/RAJ-2024/104'
  }
];

export const RECENT_TRANSACTIONS = [
  { id: 'TXN-901', material: 'PET Plastic Grade 1', weightKg: 1.6, collector: 'Ramesh Kumar', recycler: 'EcoGreen Circular Polymers Ltd.', amountPaid: 96, timestamp: '10 mins ago' },
  { id: 'TXN-902', material: 'Corrugated Cardboard', weightKg: 22.0, collector: 'Mukesh Saini', recycler: 'Sustainable Kraft Pulp & Paper Mills', amountPaid: 352, timestamp: '24 mins ago' },
  { id: 'TXN-903', material: 'Aluminium Utensils', weightKg: 6.4, collector: 'Dinesh Yadav', recycler: 'Hindustan Circular Smelting', amountPaid: 288, timestamp: '42 mins ago' },
  { id: 'TXN-904', material: 'E-Waste PCB Boards', weightKg: 3.2, collector: 'Sanjay Prajapat', recycler: 'Hindustan Circular Smelting', amountPaid: 960, timestamp: '1 hour ago' }
];

