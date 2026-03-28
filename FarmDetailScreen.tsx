import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronRight, 
  MoreVertical, 
  MapPin, 
  Calendar,
  Clock,
  CheckCircle2,
  Droplets,
  FlaskConical,
  Eye,
  AlertTriangle,
  MessageCircle,
  FileText,
  ChevronLeft,
  ShoppingCart,
  Plus
} from 'lucide-react';
import { SpeakerButton } from '@/components/SpeakerButton';
import type { Task, Product } from '@/types';

interface FarmDetailScreenProps {
  farmId: string;
  onBack: () => void;
  onNavigate: (screen: string) => void;
}

// Mock data
const mockFarm = {
  id: '1',
  farmerName: 'أحمد محمود',
  farmerPhone: '01001234567',
  area: 'الداخلة',
  areaFeddan: 8,
  cropType: 'نخيل مجدول',
  cropEmoji: '🌴',
  healthScore: 85,
  lastVisit: 'أمس',
  seasonDays: 120,
  engineerName: 'د. محمد سالم',
  currentStage: 'flowering' as const,
  stageProgress: 2,
  nextStageIn: 20,
};

const mockTasks: Task[] = [
  { id: '1', farmId: '1', engineerId: 'eng1', taskType: 'irrigation', title: 'ري الصباحي', dueDate: new Date(), status: 'pending', priority: 'high' },
  { id: '2', farmId: '1', engineerId: 'eng1', taskType: 'fertilizer', title: 'تسميد NPK', dueDate: new Date(), status: 'done', priority: 'medium' },
  { id: '3', farmId: '1', engineerId: 'eng1', taskType: 'inspection', title: 'فحص أوراق', dueDate: new Date(), status: 'pending', priority: 'low' },
];

const mockPhotos = [
  { id: '1', url: '', date: 'منذ 2 يوم' },
  { id: '2', url: '', date: 'منذ 5 أيام' },
  { id: '3', url: '', date: 'منذ أسبوع' },
];

const mockProducts: Product[] = [
  {
    id: '1',
    companyId: 'comp1',
    name: 'سماد NPK متوازن',
    category: 'fertilizers',
    price: 85,
    stock: 50,
    description: 'سماد متوازن للنخيل في مرحلة الإزهار',
    imageURLs: [],
    activeIngredients: ['Nitrogen', 'Phosphorus', 'Potassium'],
    usageInstructions: 'يستخدم مرة كل شهر',
    targetCrops: ['palm'],
    targetRegions: ['الداخلة'],
    rating: 4.5,
    salesCount: 1204,
    aiMatchTags: ['نخيل', 'إزهار'],
    isActive: true,
    createdAt: new Date(),
  },
  {
    id: '2',
    companyId: 'comp2',
    name: 'مبيد حشري عضوي',
    category: 'pesticides',
    price: 120,
    stock: 30,
    description: 'مبيد عضوي آمن للنخيل',
    imageURLs: [],
    activeIngredients: ['Neem Oil'],
    usageInstructions: 'يرش مرة كل أسبوعين',
    targetCrops: ['palm'],
    targetRegions: ['الداخلة'],
    rating: 4.3,
    salesCount: 856,
    aiMatchTags: ['نخيل', 'حشرات'],
    isActive: true,
    createdAt: new Date(),
  },
];

const aiAdvice = 'بناءً على حالة الطقس الحارة المتوقعة غداً، أنصحك بزيادة معدل الري بنسبة 20% ومراقبة مستوى الرطوبة في التربة. كما يُفضل تطبيق السماد في الصباح الباكر لتجنب التبخر.';

const stages = [
  { id: 'growth', label: 'نمو', emoji: '🌱' },
  { id: 'flowering', label: 'إزهار', emoji: '🌸' },
  { id: 'fruiting', label: 'عقد', emoji: '🫐' },
  { id: 'harvest', label: 'نضج', emoji: '🍊' },
];

const taskIcons = {
  irrigation: Droplets,
  fertilizer: FlaskConical,
  inspection: Eye,
  treatment: AlertTriangle,
  harvest: CheckCircle2,
};

export function FarmDetailScreen({ farmId, onBack, onNavigate }: FarmDetailScreenProps) {
  const [showFullAdvice, setShowFullAdvice] = useState(false);
  
  // Use farmId for data fetching (mock)
  console.log('Viewing farm:', farmId);

  const getStatusColor = (score: number) => {
    if (score >= 80) return '#388E3C';
    if (score >= 60) return '#FFB300';
    return '#C62828';
  };

  return (
    <div className="min-h-screen bg-[#E8F5E9] pb-24">
      {/* Hero Section */}
      <div 
        className="relative h-64 rounded-b-[44px] overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1B5E20, #2E7D32)' }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-white/10" />
          <div className="absolute bottom-10 left-10 w-24 h-24 rounded-full bg-white/10" />
        </div>
        
        {/* Header Actions */}
        <div className="absolute top-12 left-6 right-6 flex justify-between z-10">
          <button 
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm"
          >
            <ChevronRight size={24} className="text-white" />
          </button>
          <button className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
            <MoreVertical size={24} className="text-white" />
          </button>
        </div>
        
        {/* Center Content */}
        <div className="absolute bottom-8 left-0 right-0 text-center">
          <div className="text-5xl mb-2">{mockFarm.cropEmoji}</div>
          <h1 className="text-white text-2xl font-bold">{mockFarm.farmerName}</h1>
          <div className="flex justify-center gap-2 mt-3">
            <span className="px-3 py-1 bg-white/20 rounded-full text-white text-sm backdrop-blur-sm">
              📍 {mockFarm.area}
            </span>
            <span className="px-3 py-1 bg-white/20 rounded-full text-white text-sm backdrop-blur-sm">
              📐 {mockFarm.areaFeddan} أفدان
            </span>
            <span className="px-3 py-1 bg-white/20 rounded-full text-white text-sm backdrop-blur-sm">
              {mockFarm.cropEmoji} {mockFarm.cropType}
            </span>
          </div>
        </div>
      </div>

      {/* Health Card */}
      <div className="px-6 -mt-10 relative z-10">
        <div className="bg-white rounded-3xl shadow-xl p-6">
          <div className="flex items-center gap-6">
            {/* Health Gauge */}
            <div className="relative">
              <svg className="w-28 h-28 -rotate-90">
                <circle
                  cx="56"
                  cy="56"
                  r="48"
                  fill="none"
                  stroke="#E8F5E9"
                  strokeWidth="8"
                />
                <circle
                  cx="56"
                  cy="56"
                  r="48"
                  fill="none"
                  stroke={getStatusColor(mockFarm.healthScore)}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${(mockFarm.healthScore / 100) * 301} 301`}
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold" style={{ color: getStatusColor(mockFarm.healthScore) }}>
                  {mockFarm.healthScore}%
                </span>
                <span className="text-sm text-gray-500">جيد 🌿</span>
              </div>
            </div>
            
            {/* Info */}
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-[#43A047]" />
                <span className="text-gray-600 text-sm">آخر زيارة:</span>
                <span className="font-medium">{mockFarm.lastVisit}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-[#43A047]" />
                <span className="text-gray-600 text-sm">الموسم:</span>
                <span className="font-medium">{mockFarm.seasonDays} يوم</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-[#43A047]" />
                <span className="text-gray-600 text-sm">المهندس:</span>
                <span className="font-medium text-[#1B5E20]">{mockFarm.engineerName}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Season Progress */}
      <div className="px-6 mt-6">
        <h3 className="text-lg font-bold text-[#1B5E20] mb-4">🌱 مرحلة الموسم الحالية</h3>
        <div className="bg-white rounded-2xl shadow-lg p-5">
          {/* Progress Line */}
          <div className="relative flex justify-between items-center mb-4">
            <div className="absolute left-0 right-0 top-1/2 h-1 bg-gray-200 -translate-y-1/2 rounded-full" />
            <div 
              className="absolute left-0 top-1/2 h-1 bg-[#2E7D32] -translate-y-1/2 rounded-full transition-all"
              style={{ width: `${((mockFarm.stageProgress) / (stages.length - 1)) * 100}%` }}
            />
            {stages.map((stage, index) => (
              <div 
                key={stage.id}
                className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                  index <= mockFarm.stageProgress
                    ? 'bg-[#2E7D32] text-white'
                    : 'bg-white border-2 border-gray-200'
                } ${index === mockFarm.stageProgress ? 'ring-4 ring-[#2E7D32]/30' : ''}`}
              >
                {stage.emoji}
              </div>
            ))}
          </div>
          
          {/* Stage Labels */}
          <div className="flex justify-between text-xs text-gray-500">
            {stages.map((stage) => (
              <span key={stage.id} className="w-10 text-center">{stage.label}</span>
            ))}
          </div>
          
          {/* Current Stage Info */}
          <div className="mt-4 p-3 bg-[#E8F5E9] rounded-xl">
            <p className="text-sm text-gray-600">
              في مرحلة <span className="font-bold text-[#1B5E20]">الإزهار</span> منذ 15 يوم
            </p>
            <p className="text-xs text-amber-600 mt-1">
              العقد متوقع خلال {mockFarm.nextStageIn} يوم
            </p>
          </div>
        </div>
      </div>

      {/* Tasks Section */}
      <div className="px-6 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-[#1B5E20]">📋 مهام اليوم</h3>
          <button className="flex items-center gap-1 text-[#F9A825] text-sm">
            <Plus /> إضافة مهمة
          </button>
        </div>
        
        <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
          {mockTasks.map((task) => {
            const Icon = taskIcons[task.taskType];
            return (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`flex-shrink-0 w-40 p-4 rounded-2xl ${
                  task.status === 'done' ? 'bg-[#E8F5E9]' : 'bg-white'
                } shadow-lg`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    task.status === 'done' ? 'bg-[#43A047]' : 'bg-[#E8F5E9]'
                  }`}>
                    <Icon size={20} className={task.status === 'done' ? 'text-white' : 'text-[#43A047]'} />
                  </div>
                  {task.priority === 'high' && (
                    <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs rounded-full">عاجل</span>
                  )}
                </div>
                <h4 className="font-bold text-sm">{task.title}</h4>
                <p className="text-gray-500 text-xs mt-1">8:00 ص</p>
                <div className="mt-2">
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    task.status === 'done' 
                      ? 'bg-[#43A047] border-[#43A047]' 
                      : 'border-[#A5D6A7]'
                  }`}>
                    {task.status === 'done' && <CheckCircle2 size={14} className="text-white" />}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Photos Section */}
      <div className="px-6 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-[#1B5E20]">📸 آخر الصور</h3>
          <button className="text-[#F9A825] text-sm flex items-center gap-1">
            عرض الكل <ChevronLeft size={16} />
          </button>
        </div>
        
        <div className="flex gap-3">
          {mockPhotos.map((photo) => (
            <div 
              key={photo.id}
              className="relative w-28 h-28 rounded-2xl overflow-hidden bg-gray-200"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <span className="absolute bottom-2 right-2 text-white text-xs">{photo.date}</span>
            </div>
          ))}
          <button className="w-28 h-28 rounded-2xl bg-gray-100 flex flex-col items-center justify-center text-gray-500">
            <span className="text-2xl">+12</span>
            <span className="text-xs">المزيد</span>
          </button>
        </div>
      </div>

      {/* AI Advice Card */}
      <div className="px-6 mt-6">
        <div 
          className="rounded-2xl p-5"
          style={{ background: 'linear-gradient(135deg, #00695C, #00897B)' }}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-bold flex items-center gap-2">
              🤖 زيد ينصحك
            </h3>
            <SpeakerButton text={aiAdvice} size="sm" />
          </div>
          
          <p className={`text-white/90 text-sm leading-relaxed ${showFullAdvice ? '' : 'line-clamp-3'}`}>
            {aiAdvice}
          </p>
          
          <button 
            onClick={() => setShowFullAdvice(!showFullAdvice)}
            className="mt-3 text-[#FFB300] text-sm font-medium"
          >
            {showFullAdvice ? 'إخفاء ↑' : 'اقرأ المزيد ↓'}
          </button>
          
          <div className="mt-4 pt-4 border-t border-white/20 flex gap-4 text-xs text-white/70">
            <span>🌦️ الطقس</span>
            <span>🌱 حالة المحصول</span>
          </div>
        </div>
      </div>

      {/* Product Recommendations */}
      <div className="px-6 mt-6">
        <h3 className="text-lg font-bold text-[#1B5E20] mb-4">🛒 منتجات مقترحة لهذه الأرض</h3>
        
        <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
          {mockProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex-shrink-0 w-44 bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              {/* Product Image */}
              <div className="h-28 bg-gradient-to-br from-[#E8F5E9] to-[#C8E6C9] flex items-center justify-center">
                <ShoppingCart size={40} className="text-[#43A047]" />
              </div>
              
              <div className="p-4">
                <p className="text-xs text-[#43A047] mb-1">✓ مناسب لنخيل في مرحلة الإزهار</p>
                <h4 className="font-bold text-sm mb-1">{product.name}</h4>
                <p className="text-[#1B5E20] font-bold text-lg">{product.price} ج</p>
                <button 
                  onClick={() => onNavigate(`product/${product.id}`)}
                  className="w-full mt-3 py-2 rounded-xl text-sm font-bold text-white"
                  style={{ background: 'linear-gradient(135deg, #1B5E20, #2E7D32)' }}
                >
                  اشتري
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] safe-area-bottom">
        <div className="flex gap-4">
          <button 
            onClick={() => onNavigate('chat')}
            className="flex-1 py-4 border-2 border-[#2E7D32] rounded-2xl font-bold text-[#2E7D32] flex items-center justify-center gap-2"
          >
            <MessageCircle size={20} />
            راسل المزارع
          </button>
          <button 
            onClick={() => onNavigate('report')}
            className="flex-1 py-4 rounded-2xl font-bold text-white flex items-center justify-center gap-2"
            style={{ background: 'linear-gradient(135deg, #1B5E20, #2E7D32)' }}
          >
            <FileText size={20} />
            تقرير كامل
          </button>
        </div>
      </div>
    </div>
  );
}
