// User Types
export type UserRole = 'engineer' | 'farmer' | 'company';

export interface User {
  id: string;
  phone: string;
  email?: string;
  role: UserRole;
  displayName: string;
  photoURL?: string;
  createdAt: Date;
  fcmToken?: string;
}

// Engineer Types
export interface Engineer {
  userId: string;
  certificateURL?: string;
  workingAreas: string[];
  qualityBadge?: string;
  rating: number;
  totalRatings: number;
  isVerified: boolean;
  totalClients: number;
  totalEarnings: number;
  specialization: string;
  premiumPlan: boolean;
  premiumExpiry?: Date;
}

// Farmer Types
export interface Farmer {
  userId: string;
  engineerId: string;
  location: {
    lat: number;
    lng: number;
    area: string;
  };
  subscriptionType: 'monthly' | 'seasonal';
  subscriptionStart: Date;
  subscriptionEnd: Date;
  subscriptionPrice: number;
  isActive: boolean;
}

// Farm Types
export interface Farm {
  id: string;
  farmerId: string;
  engineerId: string;
  areaFeddan: number;
  soilType: 'sandy' | 'clay' | 'silty' | 'mixed';
  waterSource: 'groundwater' | 'canal' | 'network';
  irrigationType: 'drip' | 'sprinkler' | 'flood';
  healthScore: number;
  currentStage: CropStage;
  photos: string[];
  gpsLocation?: {
    lat: number;
    lng: number;
  };
}

// Crop Types
export type CropType = 'palm' | 'olive' | 'wheat' | 'tomato' | 'corn' | 'vegetables';
export type CropStage = 'growth' | 'flowering' | 'fruiting' | 'harvest';

export interface Crop {
  id: string;
  farmId: string;
  cropType: CropType;
  variety: string;
  count?: number;
  areaPlanted?: number;
  ageMonths: number;
  currentStage: CropStage;
  diseaseHistory: string[];
  productsUsed: string[];
  notes?: string;
}

// Disease Diagnosis Types
export interface Diagnosis {
  id: string;
  farmId: string;
  engineerId: string;
  imageURL: string;
  diseaseName: string;
  severity: 1 | 2 | 3 | 4 | 5;
  cause: string;
  treatment: string[];
  suggestedProducts?: Product[];
  aiConfidence: number;
  sentToFarmer: boolean;
  createdAt: Date;
}

// Task Types
export type TaskType = 'irrigation' | 'fertilizer' | 'inspection' | 'treatment' | 'harvest';
export type TaskStatus = 'pending' | 'done' | 'skipped';
export type TaskPriority = 'high' | 'medium' | 'low';

export interface Task {
  id: string;
  farmId: string;
  engineerId: string;
  taskType: TaskType;
  title: string;
  dueDate: Date;
  status: TaskStatus;
  notes?: string;
  completedAt?: Date;
  priority: TaskPriority;
}

// Company Types
export interface Company {
  userId: string;
  name: string;
  logoURL?: string;
  coverPhotoURL?: string;
  rating: number;
  totalRatings: number;
  salesCount: number;
  isVerified: boolean;
  adsCredits: number;
  description?: string;
  contactPhone?: string;
  contactEmail?: string;
  website?: string;
  workingRegions: string[];
}

// Product Types
export type ProductCategory = 'pesticides' | 'fertilizers' | 'seeds' | 'equipment' | 'irrigation';

export interface Product {
  id: string;
  companyId: string;
  name: string;
  nameEn?: string;
  category: ProductCategory;
  price: number;
  stock: number;
  description: string;
  imageURLs: string[];
  activeIngredients: string[];
  usageInstructions: string;
  targetCrops: CropType[];
  targetRegions: string[];
  rating: number;
  salesCount: number;
  aiMatchTags: string[];
  isActive: boolean;
  createdAt: Date;
}

// Order Types
export type OrderStatus = 'pending' | 'confirmed' | 'delivered';

export interface Order {
  id: string;
  productId: string;
  companyId: string;
  buyerId: string;
  buyerType: UserRole;
  quantity: number;
  totalPrice: number;
  appCommission: number;
  status: OrderStatus;
  createdAt: Date;
  deliveryAddress?: string;
}

// Notification Types
export type NotificationType = 'urgent' | 'reminder' | 'info';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  body: string;
  isRead: boolean;
  createdAt: Date;
  relatedId?: string;
  relatedType?: string;
  actionURL?: string;
}

// Weather Types
export interface WeatherData {
  area: string;
  temperature: number;
  humidity: number;
  wind: number;
  condition: 'sunny' | 'cloudy' | 'rainy' | 'windy';
  forecast: WeatherForecast[];
  alerts: WeatherAlert[];
  lastUpdated: Date;
}

export interface WeatherForecast {
  date: Date;
  temperature: number;
  condition: string;
  humidity: number;
}

export interface WeatherAlert {
  type: 'heat' | 'cold' | 'wind' | 'rain';
  message: string;
  severity: 'low' | 'medium' | 'high';
}

// Chat Types
export interface ChatMessage {
  id: string;
  userId: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  products?: Product[];
}

// Earnings Types
export interface Earning {
  id: string;
  engineerId: string;
  type: 'subscription' | 'product' | 'premium';
  title: string;
  amount: number;
  date: Date;
  status: 'transferred' | 'pending';
  relatedId?: string;
}

// Store Types
export interface Store {
  companyId: string;
  storeName: string;
  storeDescription?: string;
  coverPhotoURL?: string;
  themeColor?: string;
  featuredProducts: string[];
  announcements: string[];
  totalViews: number;
  followers: string[];
}

// App State
export interface AppState {
  currentUser: User | null;
  currentRole: UserRole | null;
  isLoading: boolean;
  notifications: Notification[];
}
