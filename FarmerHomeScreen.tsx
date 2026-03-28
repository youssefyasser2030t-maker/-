import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  MessageCircle, 
  Sprout, 
  ShoppingCart,
  Sun,
  Cloud,
  Wind,
  Droplets,
  Calendar,
  ChevronLeft
} from 'lucide-react';
import { SpeakerButton } from '@/components/SpeakerButton';
import { useApp } from '@/context/AppContext';

interface FarmerHomeScreenProps {
  onNavigate: (screen: string) => void;
}

const weatherData = {
  temp: 28,
  condition: 'sunny' as 'sunny' | 'cloudy' | 'rainy',
  humidity: 45,
  wind: 'خفيفة',
  sunrise: '6:15',
  alert: 'حر شديد — مطلوب ري إضافي اليوم',
};

const engineerAdvice = 'النهاردة لازم تزود الري شوية عشان الجو حر. رش الأشجار بالمية كمان عشان تبردها. لو لاحظت أي بقع بيضاء على الأوراق، كلمني فوراً.';

const farmPhotos = [
  { id: '1', date: 'منذ 2 يوم' },
  { id: '2', date: 'منذ 5 أيام' },
  { id: '3', date: 'منذ أسبوع' },
];

export function FarmerHomeScreen({ onNavigate }: FarmerHomeScreenProps) {
  const { currentUser } = useApp();
  const [activeTab, setActiveTab] = useState('home');
  const daysLeft = 5;

  const getAnimatedWeather = () => {
    switch (weatherData.condition) {
      case 'sunny':
        return (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <Sun size={80} className="text-[#F9A825]" />
          </motion.div>
        );
      case 'cloudy':
        return (
          <motion.div
            animate={{ x: [-5, 5, -5] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Cloud size={80} className="text-gray-400" />
          </motion.div>
        );
      default:
        return <Sun size={80} className="text-[#F9A825]" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#E8F5E9] pb-24">
      {/* Header */}
      <div 
        className="relative px-6 pt-12 pb-8 rounded-b-[44px]"
        style={{ background: 'rgba(27, 94, 32, 0.88)', backdropFilter: 'blur(10px)' }}
      >
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div 
            className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold"
            style={{ 
              background: 'linear-gradient(135deg, #43A047, #2E7D32)',
              border: '3px solid #F9A825'
            }}
          >
            {currentUser?.displayName?.charAt(0) || 'أ'}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-white text-2xl font-bold">
                أهلاً يا {currentUser?.displayName?.split(' ')[0] || 'حاج أحمد'} 🌾
              </h1>
              <SpeakerButton text={`أهلاً يا ${currentUser?.displayName?.split(' ')[0] || 'حاج أحمد'}`} size="sm" />
            </div>
            <button 
              onClick={() => onNavigate('chat-engineer')}
              className="text-[#A5D6A7] text-lg mt-1 hover:underline"
            >
              مهندسك: د. محمد سالم
            </button>
          </div>
        </div>
      </div>

      {/* Weather Card */}
      <div className="px-6 -mt-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[28px] shadow-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-gray-600 text-lg">الجو في أرضك النهاردة</span>
              <SpeakerButton text={`الجو في أرضك النهاردة ${weatherData.temp} درجة`} size="sm" />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            {/* Animated Weather Icon */}
            <div className="flex-shrink-0">
              {getAnimatedWeather()}
            </div>
            
            {/* Temperature */}
            <div className="text-center">
              <span className="text-6xl font-black text-[#1B5E20]">
                {weatherData.temp}°C
              </span>
            </div>
          </div>
          
          {/* Weather Details */}
          <div className="flex justify-center gap-6 mt-6 text-lg">
            <div className="flex items-center gap-2">
              <Droplets size={24} className="text-blue-400" />
              <span>رطوبة {weatherData.humidity}%</span>
            </div>
            <div className="flex items-center gap-2">
              <Wind size={24} className="text-gray-400" />
              <span>رياح {weatherData.wind}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={24} className="text-[#F9A825]" />
              <span>شروق {weatherData.sunrise}</span>
            </div>
          </div>
          
          {/* Weather Alert */}
          {weatherData.alert && (
            <div 
              className="mt-4 p-4 rounded-2xl"
              style={{ background: 'linear-gradient(90deg, #FF6F00, #F9A825)' }}
            >
              <div className="flex items-center gap-2">
                <span className="text-white text-xl font-bold">🔥 {weatherData.alert}</span>
                <SpeakerButton text={weatherData.alert} size="sm" />
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Engineer Advice Card */}
      <div className="px-6 mt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-3xl p-6"
          style={{ background: 'linear-gradient(135deg, #1B5E20, #2E7D32)' }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-white text-xl font-bold">📋 توصية مهندسك النهاردة</span>
              <SpeakerButton text={engineerAdvice} size="sm" />
            </div>
          </div>
          
          <div className="h-px bg-[#43A047] mb-4" />
          
          <p className="text-white text-xl leading-relaxed">
            {engineerAdvice}
          </p>
          
          <p className="text-[#A5D6A7] text-base mt-4">منذ 2 ساعة</p>
          
          <button 
            onClick={() => onNavigate('chat-engineer')}
            className="w-full mt-4 py-4 border-2 border-[#F9A825] rounded-2xl text-[#F9A825] font-bold text-lg hover:bg-[#F9A825] hover:text-[#1A1A1A] transition-colors"
          >
            💬 كلّم مهندسك
          </button>
        </motion.div>
      </div>

      {/* Farm Photos */}
      <div className="px-6 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[#1B5E20] text-2xl font-bold">📸 صور أرضك</h2>
          <button 
            onClick={() => onNavigate('photos')}
            className="text-[#F9A825] flex items-center gap-1"
          >
            المزيد <ChevronLeft size={20} />
          </button>
        </div>
        
        <div className="flex gap-3">
          {farmPhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="relative w-32 h-32 rounded-2xl overflow-hidden bg-gradient-to-br from-[#C8E6C9] to-[#A5D6A7]"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <span className="absolute bottom-2 right-2 text-white text-sm font-bold">
                {photo.date}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Subscription Card */}
      {daysLeft <= 7 && (
        <div className="px-6 mt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-3xl p-6"
            style={{ background: 'linear-gradient(135deg, #FF8F00, #FFB300)' }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[#1A1A1A] text-xl font-bold">
                ⏰ اشتراكك هينتهي خلال {daysLeft} أيام
              </span>
              <SpeakerButton text={`اشتراكك هينتهي خلال ${daysLeft} أيام`} size="sm" />
            </div>
            
            <button 
              onClick={() => onNavigate('renew')}
              className="w-full py-4 rounded-2xl font-bold text-lg text-[#1A1A1A]"
              style={{ background: 'linear-gradient(135deg, #F9A825, #FFB300)' }}
            >
              🔄 جدد دلوقتي
            </button>
          </motion.div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.1)] safe-area-bottom z-40">
        <div className="flex justify-around items-center h-20">
          {[
            { id: 'home', icon: Home, label: 'البيت' },
            { id: 'chat-engineer', icon: MessageCircle, label: 'المهندس' },
            { id: 'farm', icon: Sprout, label: 'أرضي' },
            { id: 'products', icon: ShoppingCart, label: 'منتجات' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                onNavigate(tab.id);
              }}
              className={`flex flex-col items-center gap-1 px-4 py-2 ${
                activeTab === tab.id ? 'text-[#1B5E20]' : 'text-gray-400'
              }`}
            >
              <tab.icon size={28} />
              <span className="text-sm font-medium">{tab.label}</span>
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="w-1.5 h-1.5 rounded-full bg-[#2E7D32]"
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
