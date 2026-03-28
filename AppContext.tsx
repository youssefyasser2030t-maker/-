import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { User, UserRole, Notification, Engineer, Farmer, Company } from '@/types';

interface AppContextType {
  // User State
  currentUser: User | null;
  currentRole: UserRole | null;
  engineerProfile: Engineer | null;
  farmerProfile: Farmer | null;
  companyProfile: Company | null;
  
  // Actions
  setUser: (user: User | null) => void;
  setRole: (role: UserRole | null) => void;
  setEngineerProfile: (profile: Engineer | null) => void;
  setFarmerProfile: (profile: Farmer | null) => void;
  setCompanyProfile: (profile: Company | null) => void;
  login: (role: UserRole, userData: Partial<User>) => void;
  logout: () => void;
  
  // UI State
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  
  // Notifications
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  markNotificationAsRead: (id: string) => void;
  unreadCount: number;
  
  // TTS
  isSpeaking: boolean;
  speakText: (text: string) => void;
  stopSpeaking: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Mock data for demo
const mockEngineer: Engineer = {
  userId: 'eng1',
  workingAreas: ['الداخلة', 'الخارجة', 'الفرافرة'],
  qualityBadge: 'مهندس معتمد',
  rating: 4.8,
  totalRatings: 47,
  isVerified: true,
  totalClients: 24,
  totalEarnings: 2850,
  specialization: 'محاصيل حقلية',
  premiumPlan: true,
};

const mockFarmer: Farmer = {
  userId: 'farmer1',
  engineerId: 'eng1',
  location: { lat: 25.5, lng: 29.0, area: 'الداخلة' },
  subscriptionType: 'monthly',
  subscriptionStart: new Date('2025-01-01'),
  subscriptionEnd: new Date('2025-04-01'),
  subscriptionPrice: 150,
  isActive: true,
};

const mockCompany: Company = {
  userId: 'comp1',
  name: 'النيل للأسمدة والمبيدات',
  rating: 4.7,
  totalRatings: 128,
  salesCount: 1204,
  isVerified: true,
  adsCredits: 500,
  description: 'شركة رائدة في مجال المبيدات والأسمدة الزراعية',
  contactPhone: '01001234567',
  contactEmail: 'info@nile-agri.com',
  workingRegions: ['الداخلة', 'الخارجة', 'الفيوم'],
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentRole, setCurrentRole] = useState<UserRole | null>(null);
  const [engineerProfile, setEngineerProfile] = useState<Engineer | null>(null);
  const [farmerProfile, setFarmerProfile] = useState<Farmer | null>(null);
  const [companyProfile, setCompanyProfile] = useState<Company | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const login = useCallback((role: UserRole, userData: Partial<User>) => {
    const newUser: User = {
      id: userData.id || `${role}_${Date.now()}`,
      phone: userData.phone || '01001234567',
      email: userData.email,
      role,
      displayName: userData.displayName || (role === 'engineer' ? 'د. محمد سالم' : role === 'farmer' ? 'أحمد محمود' : 'النيل للأسمدة'),
      photoURL: userData.photoURL,
      createdAt: new Date(),
    };
    
    setCurrentUser(newUser);
    setCurrentRole(role);
    
    // Set mock profile based on role
    if (role === 'engineer') {
      setEngineerProfile(mockEngineer);
    } else if (role === 'farmer') {
      setFarmerProfile(mockFarmer);
    } else if (role === 'company') {
      setCompanyProfile(mockCompany);
    }
  }, []);

  const logout = useCallback(() => {
    setCurrentUser(null);
    setCurrentRole(null);
    setEngineerProfile(null);
    setFarmerProfile(null);
    setCompanyProfile(null);
  }, []);

  const addNotification = useCallback((notification: Notification) => {
    setNotifications(prev => [notification, ...prev]);
  }, []);

  const markNotificationAsRead = useCallback((id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
  }, []);

  // Text-to-Speech
  const speakText = useCallback((text: string) => {
    if ('speechSynthesis' in window) {
      // Stop any current speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ar-EG';
      utterance.rate = 0.85;
      utterance.pitch = 1.0;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  const stopSpeaking = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const value: AppContextType = {
    currentUser,
    currentRole,
    engineerProfile,
    farmerProfile,
    companyProfile,
    setUser: setCurrentUser,
    setRole: setCurrentRole,
    setEngineerProfile,
    setFarmerProfile,
    setCompanyProfile,
    login,
    logout,
    isLoading,
    setIsLoading,
    notifications,
    addNotification,
    markNotificationAsRead,
    unreadCount,
    isSpeaking,
    speakText,
    stopSpeaking,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
