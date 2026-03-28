import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, 
  Settings,
  Star,
  Users,
  Package,
  TrendingUp,
  ChevronLeft,
  Plus,
  BarChart3,
  Store,
  Users2,
  Megaphone,
  Edit3
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface CompanyDashboardProps {
  onNavigate: (screen: string) => void;
}

// Mock data
const mockCompany = {
  name: 'النيل للأسمدة والمبيدات',
  rating: 4.7,
  totalRatings: 128,
  salesCount: 1204,
  totalRevenue: 48600,
  monthlyGrowth: 23,
  partnerEngineers: 47,
  verified: true,
  rank: 2,
};

const salesData = [
  { name: 'يناير', value: 3200 },
  { name: 'فبراير', value: 4100 },
  { name: 'مارس', value: 3800 },
  { name: 'أبريل', value: 5200 },
  { name: 'مايو', value: 4800 },
  { name: 'يونيو', value: 6100 },
];

const topEngineers = [
  { name: 'د. محمد سالم', purchases: 12500, rating: 4.9 },
  { name: 'د. أحمد علي', purchases: 9800, rating: 4.7 },
  { name: 'د. خالد محمود', purchases: 8200, rating: 4.8 },
  { name: 'د. سامي عبدالله', purchases: 6500, rating: 4.6 },
];

const products = [
  { id: '1', name: 'سماد NPK متوازن', stock: 45, sales: 320 },
  { id: '2', name: 'مبيد حشري عضوي', stock: 28, sales: 215 },
  { id: '3', name: 'منشط جذور', stock: 62, sales: 180 },
];

const ads = [
  { id: '1', name: 'حملة الصيف', views: 1204, status: 'active' },
];

export function CompanyDashboard({ onNavigate }: CompanyDashboardProps) {
  const { unreadCount } = useApp();
  const [activeTab, setActiveTab] = useState('stats');

  return (
    <div className="min-h-screen bg-[#E8F5E9] pb-24">
      {/* Header */}
      <div 
        className="relative px-6 pt-12 pb-20 rounded-b-[36px]"
        style={{ background: 'linear-gradient(135deg, #1B5E20 0%, #00695C 100%)' }}
      >
        {/* Top Actions */}
        <div className="flex justify-end gap-3 mb-6">
          <button 
            onClick={() => onNavigate('settings')}
            className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"
          >
            <Settings size={20} className="text-white" />
          </button>
          <button 
            onClick={() => onNavigate('notifications')}
            className="relative w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"
          >
            <Bell size={20} className="text-white" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
        
        {/* Company Info */}
        <div className="text-center">
          <div 
            className="w-20 h-20 mx-auto rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4"
            style={{ 
              background: 'linear-gradient(135deg, #43A047, #2E7D32)',
              border: '3px solid #F9A825'
            }}
          >
            {mockCompany.name.charAt(0)}
          </div>
          <h1 className="text-white text-2xl font-bold">{mockCompany.name}</h1>
          <div className="flex justify-center gap-3 mt-3">
            {mockCompany.verified && (
              <span className="px-3 py-1 bg-[#F9A825] text-[#1A1A1A] text-sm font-bold rounded-full">
                ✅ متجر موثّق
              </span>
            )}
            <span className="px-3 py-1 bg-white/20 text-white text-sm rounded-full flex items-center gap-1">
              <Star size={14} className="text-[#F9A825]" />
              {mockCompany.rating}
            </span>
          </div>
        </div>
      </div>

      {/* Performance Score Card */}
      <div className="px-6 -mt-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[28px] shadow-xl p-6"
        >
          <p className="text-gray-500 text-sm mb-2">أداؤك هذا الشهر</p>
          
          <div className="flex items-center justify-between">
            <div>
              {/* Stars */}
              <div className="flex gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={20}
                    className={star <= Math.floor(mockCompany.rating) ? 'text-[#F9A825] fill-[#F9A825]' : 'text-gray-300'}
                  />
                ))}
              </div>
              <p className="text-4xl font-black text-[#1B5E20]">
                {mockCompany.rating} <span className="text-lg text-gray-400">من 5</span>
              </p>
            </div>
            
            {/* Rank Badge */}
            <div 
              className="px-4 py-2 rounded-xl"
              style={{ background: 'linear-gradient(135deg, #F9A825, #FFB300)' }}
            >
              <p className="text-sm font-bold text-[#1A1A1A]">
                🏆 الشركة #{mockCompany.rank}
              </p>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full"
                style={{ 
                  width: '94%',
                  background: 'linear-gradient(90deg, #1B5E20, #F9A825)'
                }}
              />
            </div>
          </div>
          
          <p className="text-[#43A047] text-sm mt-2 flex items-center gap-1">
            <TrendingUp size={16} />
            ارتفع 0.2 عن الشهر السابق
          </p>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <div className="px-6 mt-6">
        <div className="grid grid-cols-2 gap-4">
          {/* Partner Engineers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-5"
          >
            <div className="w-12 h-12 rounded-xl bg-[#E8F5E9] flex items-center justify-center mb-3">
              <Users size={24} className="text-[#43A047]" />
            </div>
            <p className="text-gray-500 text-sm">مهندس شريك</p>
            <p className="text-2xl font-bold text-[#1B5E20]">{mockCompany.partnerEngineers}</p>
            <div className="h-10 mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData}>
                  <Line type="monotone" dataKey="value" stroke="#43A047" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
          
          {/* Products Sold */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-5"
          >
            <div className="w-12 h-12 rounded-xl bg-[#E8F5E9] flex items-center justify-center mb-3">
              <Package size={24} className="text-[#43A047]" />
            </div>
            <p className="text-gray-500 text-sm">منتج مباع</p>
            <p className="text-2xl font-bold text-[#1B5E20]">{mockCompany.salesCount.toLocaleString()}</p>
            <div className="h-10 mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData}>
                  <Line type="monotone" dataKey="value" stroke="#F9A825" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
          
          {/* Total Revenue */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-5"
          >
            <div className="w-12 h-12 rounded-xl bg-[#E8F5E9] flex items-center justify-center mb-3">
              <TrendingUp size={24} className="text-[#43A047]" />
            </div>
            <p className="text-gray-500 text-sm">إجمالي المبيعات</p>
            <p className="text-2xl font-bold text-[#1B5E20]">{mockCompany.totalRevenue.toLocaleString()} ج</p>
          </motion.div>
          
          {/* Monthly Growth */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg p-5"
          >
            <div className="w-12 h-12 rounded-xl bg-[#E8F5E9] flex items-center justify-center mb-3">
              <BarChart3 size={24} className="text-[#43A047]" />
            </div>
            <p className="text-gray-500 text-sm">نمو شهري</p>
            <p className="text-2xl font-bold text-[#43A047]">+{mockCompany.monthlyGrowth}%</p>
          </motion.div>
        </div>
      </div>

      {/* Store Quick Access */}
      <div className="px-6 mt-6">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onClick={() => onNavigate('store-management')}
          className="w-full p-5 rounded-2xl flex items-center justify-between"
          style={{ background: 'linear-gradient(135deg, #1B5E20, #2E7D32)' }}
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
              <Store size={28} className="text-white" />
            </div>
            <div className="text-right">
              <h3 className="text-white text-xl font-bold">🏪 إدارة المتجر</h3>
              <p className="text-[#A5D6A7] text-sm">{products.length} منتجات | {mockCompany.salesCount} مبيعة</p>
            </div>
          </div>
          <ChevronLeft size={24} className="text-white" />
        </motion.button>
      </div>

      {/* Top Engineers */}
      <div className="px-6 mt-6">
        <h3 className="text-lg font-bold text-[#1B5E20] mb-4">🏆 أكثر المهندسين شراءً</h3>
        
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {topEngineers.map((engineer, index) => (
            <div
              key={engineer.name}
              className={`flex items-center gap-4 p-4 ${
                index !== topEngineers.length - 1 ? 'border-b border-gray-100' : ''
              } ${index === 0 ? 'bg-[#FFF8E1]' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                index === 0 ? 'bg-[#F9A825] text-white' : 'bg-gray-100 text-gray-600'
              }`}>
                {index + 1}
              </div>
              
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                style={{ background: 'linear-gradient(135deg, #43A047, #2E7D32)' }}
              >
                {engineer.name.charAt(0)}
              </div>
              
              <div className="flex-1">
                <p className="font-bold">{engineer.name}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Star size={14} className="text-[#F9A825]" />
                  {engineer.rating}
                </div>
              </div>
              
              <p className="font-bold text-[#1B5E20]">{engineer.purchases.toLocaleString()} ج</p>
            </div>
          ))}
        </div>
      </div>

      {/* Products Quick View */}
      <div className="px-6 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-[#1B5E20]">منتجاتي</h3>
          <button 
            onClick={() => onNavigate('add-product')}
            className="flex items-center gap-1 text-[#F9A825]"
          >
            <Plus size={18} />
            إضافة
          </button>
        </div>
        
        <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
          {products.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-shrink-0 w-44 bg-white rounded-2xl shadow-lg p-4"
            >
              <div className="w-full h-24 bg-gradient-to-br from-[#E8F5E9] to-[#C8E6C9] rounded-xl flex items-center justify-center mb-3">
                <Package size={32} className="text-[#43A047]" />
              </div>
              <h4 className="font-bold text-sm">{product.name}</h4>
              <p className="text-gray-500 text-xs mt-1">مخزون: {product.stock}</p>
              <button 
                onClick={() => onNavigate(`edit-product/${product.id}`)}
                className="mt-3 w-full py-2 border border-[#2E7D32] rounded-xl text-[#2E7D32] text-sm font-bold flex items-center justify-center gap-1"
              >
                <Edit3 size={14} />
                تعديل
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Sponsored Ads */}
      <div className="px-6 mt-6 mb-6">
        <h3 className="text-lg font-bold text-[#1B5E20] mb-4">📢 حملاتي الإعلانية</h3>
        
        {ads.map((ad) => (
          <div key={ad.id} className="bg-white rounded-2xl shadow-lg p-4 border-2 border-[#43A047]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#E8F5E9] flex items-center justify-center">
                  <Megaphone size={24} className="text-[#43A047]" />
                </div>
                <div>
                  <h4 className="font-bold">{ad.name}</h4>
                  <p className="text-gray-500 text-sm">{ad.views.toLocaleString()} مشاهدة</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-[#E8F5E9] text-[#2E7D32] text-sm font-bold rounded-full">
                نشط
              </span>
            </div>
          </div>
        ))}
        
        <button 
          onClick={() => onNavigate('create-ad')}
          className="w-full mt-4 py-4 border-2 border-dashed border-[#2E7D32] rounded-2xl text-[#2E7D32] font-bold flex items-center justify-center gap-2"
        >
          <Plus size={20} />
          إضافة حملة جديدة
        </button>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.1)] safe-area-bottom z-40">
        <div className="flex justify-around items-center h-18 py-2">
          {[
            { id: 'stats', icon: BarChart3, label: 'إحصائيات' },
            { id: 'store', icon: Store, label: 'متجري' },
            { id: 'engineers', icon: Users2, label: 'المهندسون' },
            { id: 'ads', icon: Megaphone, label: 'إعلانات' },
            { id: 'settings', icon: Settings, label: 'إعدادات' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                if (tab.id !== 'stats') onNavigate(tab.id);
              }}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-colors ${
                activeTab === tab.id ? 'text-[#1B5E20]' : 'text-gray-400'
              }`}
            >
              <tab.icon size={22} />
              <span className="text-xs">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
