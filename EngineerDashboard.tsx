import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, 
  Users, 
  CheckCircle2, 
  AlertTriangle, 
  Wallet,
  Sun,
  Cloud,
  CloudRain,
  Wind,
  Droplets,
  ChevronLeft,
  Bot,
  Home,
  Camera,
  Store
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import type { Farm, Task } from '@/types';

// Mock data
const mockFarms: Farm[] = [
  {
    id: '1',
    farmerId: 'f1',
    engineerId: 'eng1',
    areaFeddan: 8,
    soilType: 'sandy',
    waterSource: 'groundwater',
    irrigationType: 'drip',
    healthScore: 85,
    currentStage: 'flowering',
    photos: [],
  },
  {
    id: '2',
    farmerId: 'f2',
    engineerId: 'eng1',
    areaFeddan: 12,
    soilType: 'clay',
    waterSource: 'canal',
    irrigationType: 'flood',
    healthScore: 62,
    currentStage: 'growth',
    photos: [],
  },
  {
    id: '3',
    farmerId: 'f3',
    engineerId: 'eng1',
    areaFeddan: 5,
    soilType: 'silty',
    waterSource: 'network',
    irrigationType: 'sprinkler',
    healthScore: 92,
    currentStage: 'fruiting',
    photos: [],
  },
];

const mockTasks: Task[] = [
  { id: '1', farmId: '1', engineerId: 'eng1', taskType: 'irrigation', title: 'ري أحمد محمود', dueDate: new Date(), status: 'pending', priority: 'high' },
  { id: '2', farmId: '2', engineerId: 'eng1', taskType: 'fertilizer', title: 'تسميد محمود علي', dueDate: new Date(), status: 'done', priority: 'medium' },
  { id: '3', farmId: '3', engineerId: 'eng1', taskType: 'inspection', title: 'زيارة روتينية', dueDate: new Date(), status: 'pending', priority: 'low' },
];

const weatherData = {
  temp: 28,
  condition: 'sunny' as 'sunny' | 'cloudy' | 'rainy',
  humidity: 45,
  wind: 12,
  location: 'الداخلة',
  alert: 'موجة حر متوقعة غداً',
};

interface EngineerDashboardProps {
  onNavigate: (screen: string) => void;
}

export function EngineerDashboard({ onNavigate }: EngineerDashboardProps) {
  const { currentUser, engineerProfile, unreadCount } = useApp();
  const [activeTab, setActiveTab] = useState('home');

  const getWeatherIcon = () => {
    switch (weatherData.condition) {
      case 'sunny': return <Sun className="text-[#F9A825]" size={40} />;
      case 'cloudy': return <Cloud className="text-gray-400" size={40} />;
      case 'rainy': return <CloudRain className="text-blue-400" size={40} />;
      default: return <Sun className="text-[#F9A825]" size={40} />;
    }
  };

  const getStatusColor = (score: number) => {
    if (score >= 80) return '#388E3C';
    if (score >= 60) return '#FFB300';
    return '#C62828';
  };

  const getStageEmoji = (stage: string) => {
    switch (stage) {
      case 'growth': return '🌱';
      case 'flowering': return '🌸';
      case 'fruiting': return '🫐';
      case 'harvest': return '🍊';
      default: return '🌱';
    }
  };

  const pendingTasks = mockTasks.filter(t => t.status === 'pending').length;
  const totalTasks = mockTasks.length;

  return (
    <div className="min-h-screen bg-[#E8F5E9] pb-24">
      {/* Header */}
      <div 
        className="relative px-6 pt-12 pb-20 rounded-b-[44px]"
        style={{ background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 50%, #00897B 100%)' }}
      >
        {/* Top Row */}
        <div className="flex items-center justify-between">
          {/* Avatar & Name */}
          <div className="flex items-center gap-3">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold"
              style={{ 
                background: 'linear-gradient(135deg, #43A047, #2E7D32)',
                border: '3px solid #F9A825'
              }}
            >
              {currentUser?.displayName?.charAt(0) || 'م'}
            </div>
            <div>
              <p className="text-[#A5D6A7] text-sm">صباح الخير 🌿</p>
              <h2 className="text-white text-xl font-bold">
                {currentUser?.displayName || 'د. محمد سالم'}
              </h2>
            </div>
          </div>
          
          {/* Notification Bell */}
          <button 
            onClick={() => onNavigate('notifications')}
            className="relative p-2"
          >
            <Bell size={28} className="text-white" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full" />
            )}
          </button>
        </div>
        
        {/* Quality Badge */}
        <div className="flex gap-2 mt-4">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#F9A825] text-[#1A1A1A]">
            ⭐ مهندس معتمد
          </span>
          {engineerProfile?.rating && engineerProfile.rating >= 4.5 && (
            <span className="px-3 py-1 rounded-full text-xs font-bold border border-white/50 text-white">
              🏆 الأفضل في الداخلة
            </span>
          )}
        </div>
        
        {/* Weather Card */}
        <div 
          className="absolute -bottom-10 left-6 right-6 glass rounded-2xl p-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {getWeatherIcon()}
              <div>
                <p className="text-white text-3xl font-bold">{weatherData.temp}°C</p>
                <p className="text-[#A5D6A7] text-sm">{weatherData.location}</p>
              </div>
            </div>
            <div className="h-10 w-px bg-white/30" />
            <div className="flex gap-4">
              <div className="flex items-center gap-1 text-white">
                <Droplets size={16} className="text-blue-300" />
                <span className="text-sm">{weatherData.humidity}%</span>
              </div>
              <div className="flex items-center gap-1 text-white">
                <Wind size={16} className="text-gray-300" />
                <span className="text-sm">{weatherData.wind} كم/س</span>
              </div>
            </div>
          </div>
          
          {/* Weather Alert */}
          {weatherData.alert && (
            <div 
              className="mt-3 p-2 rounded-xl text-center"
              style={{ background: 'linear-gradient(90deg, #FF6F00, #F9A825)' }}
            >
              <p className="text-white text-sm font-medium">
                🔥 {weatherData.alert} — اضغط للتفاصيل
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Quick Stats */}
      <div className="px-6 mt-16">
        <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
          {/* Clients Stat */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex-shrink-0 w-36 bg-white rounded-2xl p-4 shadow-lg"
          >
            <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
              <Users size={14} />
              <span>عملائي</span>
            </div>
            <p className="text-3xl font-bold text-[#1B5E20]">
              {engineerProfile?.totalClients || 24}
            </p>
          </motion.div>
          
          {/* Tasks Stat */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex-shrink-0 w-36 bg-white rounded-2xl p-4 shadow-lg"
          >
            <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
              <CheckCircle2 size={14} />
              <span>مهام اليوم</span>
            </div>
            <p className="text-3xl font-bold text-[#2E7D32]">
              {pendingTasks} <span className="text-lg text-gray-400">من {totalTasks}</span>
            </p>
            <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#2E7D32] rounded-full"
                style={{ width: `${(pendingTasks / totalTasks) * 100}%` }}
              />
            </div>
          </motion.div>
          
          {/* Alerts Stat */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex-shrink-0 w-36 bg-white rounded-2xl p-4 shadow-lg"
          >
            <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
              <AlertTriangle size={14} />
              <span>تنبيهات</span>
            </div>
            <p className="text-3xl font-bold text-[#C62828]">
              3
            </p>
          </motion.div>
          
          {/* Earnings Stat */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex-shrink-0 w-36 bg-white rounded-2xl p-4 shadow-lg"
          >
            <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
              <Wallet size={14} />
              <span>إيراد الشهر</span>
            </div>
            <p className="text-2xl font-bold text-[#F9A825]">
              {engineerProfile?.totalEarnings?.toLocaleString() || '2,850'} ج
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Urgent Alerts */}
      <div className="px-6 mt-6">
        <div 
          className="rounded-3xl p-5"
          style={{ 
            background: 'linear-gradient(135deg, #FF6F00, #F9A825)',
            boxShadow: '0 8px 32px rgba(255, 111, 0, 0.35)'
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-bold text-lg">⚡ تنبيهات عاجلة</h3>
            <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full">2</span>
          </div>
          <p className="text-white/90 text-sm mb-3">
            🌡️ موجة حر في الداخلة — 5 مزارعين متأثرين
          </p>
          <button 
            onClick={() => onNavigate('alerts')}
            className="px-4 py-2 border border-white/50 rounded-xl text-white text-sm hover:bg-white/10 transition-colors"
          >
            تصرف الآن ←
          </button>
        </div>
      </div>
      
      {/* Clients Section */}
      <div className="px-6 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[#1B5E20] font-bold text-xl">عملائي</h3>
          <button 
            onClick={() => onNavigate('clients')}
            className="text-[#F9A825] text-sm flex items-center gap-1 hover:underline"
          >
            عرض الكل <ChevronLeft size={16} />
          </button>
        </div>
        
        <div className="space-y-3">
          {mockFarms.map((farm, index) => (
            <motion.div
              key={farm.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              onClick={() => onNavigate(`farm/${farm.id}`)}
              className="bg-white rounded-3xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
            >
              {/* Status Strip */}
              <div 
                className="h-2"
                style={{ backgroundColor: getStatusColor(farm.healthScore) }}
              />
              
              <div className="p-4">
                <div className="flex items-start gap-3">
                  {/* Avatar */}
                  <div 
                    className="w-14 h-14 rounded-full flex items-center justify-center text-white text-lg font-bold flex-shrink-0"
                    style={{ 
                      background: `linear-gradient(135deg, ${getStatusColor(farm.healthScore)}, ${getStatusColor(farm.healthScore)}aa)`
                    }}
                  >
                    أ
                  </div>
                  
                  {/* Info */}
                  <div className="flex-1">
                    <h4 className="font-bold text-lg">أحمد محمود</h4>
                    <p className="text-gray-500 text-sm">
                      📍 الداخلة — {getStageEmoji(farm.currentStage)} نخيل مجدول
                    </p>
                    
                    <div className="flex items-center gap-3 mt-2">
                      {/* Health Gauge */}
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-12 h-12 rounded-full flex items-center justify-center border-4"
                          style={{ borderColor: getStatusColor(farm.healthScore) }}
                        >
                          <span className="text-sm font-bold">{farm.healthScore}%</span>
                        </div>
                      </div>
                      
                      {/* Subscription Tag */}
                      <span className="px-2 py-1 bg-[#E8F5E9] text-[#1B5E20] text-xs rounded-full">
                        اشتراك شهري
                      </span>
                      
                      {/* Days Remaining */}
                      <span className="text-amber-600 text-xs">
                        28 يوم متبقي
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Disease Alert (if low health) */}
                {farm.healthScore < 70 && (
                  <div className="mt-3 p-2 bg-red-50 rounded-lg">
                    <p className="text-[#C62828] text-sm">
                      🦠 بياض زغبي محتمل — افحص الآن
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* AI Chatbot FAB */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring' }}
        onClick={() => onNavigate('chatbot')}
        className="fixed bottom-28 left-6 w-16 h-16 rounded-full flex items-center justify-center z-50"
        style={{ 
          background: 'linear-gradient(135deg, #1B5E20, #43A047)',
          boxShadow: '0 12px 40px rgba(27, 94, 32, 0.5)'
        }}
      >
        <Bot size={32} className="text-white" />
        
        {/* Pulsing Ring */}
        <div 
          className="absolute inset-0 rounded-full border-2 border-[#43A047] animate-ping"
          style={{ animationDuration: '2s' }}
        />
        
        {/* Label */}
        <span className="absolute -bottom-6 text-xs text-[#1B5E20] font-medium">
          زيد
        </span>
      </motion.button>
      
      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.1)] safe-area-bottom z-40">
        <div className="max-w-md mx-auto flex justify-around items-center h-18 py-2">
          {[
            { id: 'home', icon: Home, label: 'الرئيسية' },
            { id: 'clients', icon: Users, label: 'عملائي' },
            { id: 'diagnosis', icon: Camera, label: 'تشخيص' },
            { id: 'stores', icon: Store, label: 'متاجر' },
            { id: 'earnings', icon: Wallet, label: 'إيراداتي' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                if (tab.id !== 'home') onNavigate(tab.id);
              }}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-colors ${
                activeTab === tab.id ? 'text-[#1B5E20]' : 'text-gray-400'
              }`}
            >
              <tab.icon size={24} />
              <span className="text-xs">{tab.label}</span>
              {activeTab === tab.id && (
                <div className="w-1 h-1 rounded-full bg-[#2E7D32]" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
