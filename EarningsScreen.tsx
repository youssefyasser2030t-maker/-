import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronRight, 
  ChevronLeft,
  TrendingUp,
  Users,
  ShoppingBag,
  Crown,
  CreditCard,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface EarningsScreenProps {
  onBack: () => void;
}

const monthlyData = [
  { month: 'يناير', value: 2100 },
  { month: 'فبراير', value: 2350 },
  { month: 'مارس', value: 2430 },
  { month: 'أبريل', value: 2680 },
  { month: 'مايو', value: 2850 },
];

const breakdownData = [
  { name: 'اشتراكات', value: 60, color: '#2E7D32' },
  { name: 'عمولات منتجات', value: 25, color: '#F9A825' },
  { name: 'باقة مميزة', value: 15, color: '#00897B' },
];

const earnings = [
  { id: '1', type: 'subscription', title: 'اشتراك أحمد محمود', amount: 250, date: '15 مارس', status: 'transferred' },
  { id: '2', type: 'product', title: 'عمولة منتج سماد', amount: 45, date: '14 مارس', status: 'transferred' },
  { id: '3', type: 'subscription', title: 'اشتراك محمود علي', amount: 200, date: '12 مارس', status: 'transferred' },
  { id: '4', type: 'premium', title: 'باقة مميزة شهرياً', amount: 49, date: '1 مارس', status: 'transferred' },
  { id: '5', type: 'subscription', title: 'اشتراك خالد عبدالله', amount: 300, date: '10 مارس', status: 'pending' },
  { id: '6', type: 'product', title: 'عمولة مبيد حشري', amount: 68, date: '8 مارس', status: 'pending' },
];

const months = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];

export function EarningsScreen({ onBack }: EarningsScreenProps) {
  const [currentMonth, setCurrentMonth] = useState(2); // March

  const totalRevenue = 2850;
  const previousMonthRevenue = 2430;
  const change = totalRevenue - previousMonthRevenue;
  const changePercent = ((change / previousMonthRevenue) * 100).toFixed(1);

  const pendingAmount = earnings.filter(e => e.status === 'pending').reduce((sum, e) => sum + e.amount, 0);

  const getIcon = (type: string) => {
    switch (type) {
      case 'subscription': return Users;
      case 'product': return ShoppingBag;
      case 'premium': return Crown;
      default: return CheckCircle2;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'subscription': return '#2E7D32';
      case 'product': return '#F9A825';
      case 'premium': return '#00897B';
      default: return '#43A047';
    }
  };

  return (
    <div className="min-h-screen bg-[#E8F5E9] pb-24">
      {/* Header */}
      <div 
        className="px-6 pt-12 pb-6"
        style={{ background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)' }}
      >
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"
          >
            <ChevronRight size={24} className="text-white" />
          </button>
          <h1 className="text-white text-xl font-bold">💰 إيراداتي</h1>
        </div>
        
        {/* Month Selector */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <button 
            onClick={() => setCurrentMonth(Math.max(0, currentMonth - 1))}
            className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"
          >
            <ChevronRight size={20} className="text-white" />
          </button>
          <span className="text-white text-xl font-bold">
            {months[currentMonth]} 2025
          </span>
          <button 
            onClick={() => setCurrentMonth(Math.min(11, currentMonth + 1))}
            className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"
          >
            <ChevronLeft size={20} className="text-white" />
          </button>
        </div>
      </div>

      {/* Total Revenue Hero Card */}
      <div className="px-6 -mt-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[28px] shadow-xl p-6"
        >
          <p className="text-gray-500 text-sm mb-2">إجمالي الشهر</p>
          <p className="text-5xl font-black text-[#1B5E20]">
            {totalRevenue.toLocaleString()} ج
          </p>
          <div className="flex items-center gap-2 mt-2">
            <TrendingUp size={18} className="text-[#43A047]" />
            <span className="text-[#43A047] text-sm font-medium">
              +{change.toLocaleString()} ج عن الشهر السابق ({changePercent}%)
            </span>
          </div>
          
          {/* Mini Sparkline */}
          <div className="h-16 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#2E7D32" 
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Breakdown Section */}
      <div className="px-6 mt-6">
        <h3 className="text-lg font-bold text-[#1B5E20] mb-4">تفصيل الإيرادات</h3>
        
        <div className="bg-white rounded-2xl shadow-lg p-5">
          <div className="flex items-center gap-6">
            {/* Donut Chart */}
            <div className="w-32 h-32">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={breakdownData}
                    cx="50%"
                    cy="50%"
                    innerRadius={35}
                    outerRadius={50}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                  >
                    {breakdownData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            {/* Legend */}
            <div className="flex-1 space-y-3">
              {breakdownData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <span className="font-bold">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pending Section */}
      {pendingAmount > 0 && (
        <div className="px-6 mt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl p-5"
            style={{ background: 'linear-gradient(135deg, #FF8F00, #FFB300)' }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#1A1A1A] font-bold text-lg">
                  في انتظار التحويل: {pendingAmount} ج
                </p>
                <p className="text-[#1A1A1A]/70 text-sm mt-1">
                  يُحوَّل تلقائياً خلال 3 أيام
                </p>
              </div>
              <Clock size={40} className="text-[#1A1A1A]/30" />
            </div>
          </motion.div>
        </div>
      )}

      {/* Income Items List */}
      <div className="px-6 mt-6">
        <h3 className="text-lg font-bold text-[#1B5E20] mb-4">تفاصيل المدفوعات</h3>
        
        <div className="space-y-3">
          {earnings.map((earning, index) => {
            const Icon = getIcon(earning.type);
            const iconColor = getIconColor(earning.type);
            
            return (
              <motion.div
                key={earning.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="bg-white rounded-2xl shadow-lg p-4"
              >
                <div className="flex items-center gap-4">
                  {/* Icon */}
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${iconColor}20` }}
                  >
                    <Icon size={22} style={{ color: iconColor }} />
                  </div>
                  
                  {/* Info */}
                  <div className="flex-1">
                    <h4 className="font-bold">{earning.title}</h4>
                    <p className="text-gray-500 text-sm">{earning.date}</p>
                  </div>
                  
                  {/* Amount & Status */}
                  <div className="text-right">
                    <p className="text-[#43A047] font-bold text-lg">+{earning.amount} ج</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      earning.status === 'transferred'
                        ? 'bg-[#E8F5E9] text-[#2E7D32]'
                        : 'bg-amber-100 text-amber-600'
                    }`}>
                      {earning.status === 'transferred' ? 'محوّل' : 'معلق'}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Withdraw Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-6 shadow-[0_-4px-20px_rgba(0,0,0,0.1)] safe-area-bottom">
        <button 
          className="w-full py-4 rounded-2xl font-bold text-lg text-[#1A1A1A] flex items-center justify-center gap-2"
          style={{ background: 'linear-gradient(135deg, #F9A825, #FFB300)' }}
        >
          <CreditCard size={22} />
          💳 سحب الأرباح الآن
        </button>
      </div>
    </div>
  );
}
