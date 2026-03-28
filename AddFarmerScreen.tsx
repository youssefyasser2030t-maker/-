import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  ChevronLeft, 
  User, 
  MapPin, 
  Upload,
  Calendar,
  Sprout,
  Check
} from 'lucide-react';
import type { CropType, CropStage } from '@/types';

type SoilType = 'sandy' | 'clay' | 'silty' | 'mixed';
type WaterSource = 'groundwater' | 'canal' | 'network';
type IrrigationType = 'drip' | 'sprinkler' | 'flood';

interface AddFarmerScreenProps {
  onBack: () => void;
  onComplete: () => void;
}

const steps = ['بيانات المزارع', 'بيانات الأرض', 'بيانات المحصول'];

const areas = ['الداخلة', 'الخارجة', 'الفرافرة', 'باريس', 'موط', 'الشيخ مرزوق'];

const soilTypes: { id: SoilType; label: string; emoji: string }[] = [
  { id: 'sandy', label: 'رملية', emoji: '🏖️' },
  { id: 'clay', label: 'طينية', emoji: '🟤' },
  { id: 'silty', label: 'طميية', emoji: '🌊' },
  { id: 'mixed', label: 'مختلطة', emoji: '🔄' },
];

const waterSources: { id: WaterSource; label: string; emoji: string }[] = [
  { id: 'groundwater', label: 'مياه جوفية', emoji: '💧' },
  { id: 'canal', label: 'ترعة/نهر', emoji: '🌊' },
  { id: 'network', label: 'شبكة حكومية', emoji: '🚰' },
];

const irrigationTypes: { id: IrrigationType; label: string; emoji: string }[] = [
  { id: 'drip', label: 'تنقيط', emoji: '💧' },
  { id: 'sprinkler', label: 'رش', emoji: '🚿' },
  { id: 'flood', label: 'غمر', emoji: '🌊' },
];

const cropTypes: { id: CropType; label: string; emoji: string }[] = [
  { id: 'palm', label: 'نخيل', emoji: '🌴' },
  { id: 'olive', label: 'زيتون', emoji: '🫒' },
  { id: 'wheat', label: 'قمح', emoji: '🌾' },
  { id: 'tomato', label: 'طماطم', emoji: '🍅' },
  { id: 'corn', label: 'ذرة', emoji: '🌽' },
  { id: 'vegetables', label: 'خضروات', emoji: '🥬' },
];

const cropStages: { id: CropStage; label: string; emoji: string }[] = [
  { id: 'growth', label: 'نمو', emoji: '🌱' },
  { id: 'flowering', label: 'إزهار', emoji: '🌸' },
  { id: 'fruiting', label: 'عقد', emoji: '🫐' },
  { id: 'harvest', label: 'نضج', emoji: '🍊' },
];

export function AddFarmerScreen({ onBack, onComplete }: AddFarmerScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [subscriptionType, setSubscriptionType] = useState<'monthly' | 'seasonal'>('monthly');
  const [selectedSoil, setSelectedSoil] = useState<SoilType | null>(null);
  const [selectedWater, setSelectedWater] = useState<WaterSource | null>(null);
  const [selectedIrrigation, setSelectedIrrigation] = useState<IrrigationType | null>(null);
  const [selectedCrop, setSelectedCrop] = useState<CropType | null>(null);
  const [selectedStage, setSelectedStage] = useState<CropStage>('growth');

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  return (
    <div className="min-h-screen bg-[#E8F5E9]">
      {/* Header */}
      <div 
        className="px-6 pt-12 pb-6"
        style={{ background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)' }}
      >
        <div className="flex items-center gap-4">
          <button 
            onClick={handleBack}
            className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"
          >
            <ChevronRight size={24} className="text-white" />
          </button>
          <h1 className="text-white text-xl font-bold">إضافة مزارع جديد</h1>
        </div>
        
        {/* Step Progress */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            {steps.map((_, index) => (
              <div key={index} className="flex items-center">
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    index <= currentStep 
                      ? 'bg-[#F9A825] text-[#1A1A1A]' 
                      : 'bg-white/20 text-white'
                  }`}
                >
                  {index < currentStep ? (
                    <Check size={16} />
                  ) : (
                    index + 1
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div 
                    className={`w-12 h-0.5 mx-1 ${
                      index < currentStep ? 'bg-[#F9A825]' : 'bg-white/20'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-white/70">
            {steps.map((s, index) => (
              <span key={index} className={index === currentStep ? 'text-white' : ''}>
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6 pb-32">
        <AnimatePresence mode="wait">
          {/* Step 1: Farmer Personal Data */}
          {currentStep === 0 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-6"
            >
              {/* Section Title */}
              <div className="flex items-center gap-2">
                <div className="w-1 h-6 bg-[#43A047] rounded-full" />
                <h2 className="text-lg font-bold text-[#1B5E20]">👤 بيانات المزارع</h2>
              </div>

              {/* Form Card */}
              <div className="bg-white rounded-2xl shadow-lg p-5 space-y-4">
                {/* Name Field */}
                <div>
                  <label className="block text-sm text-gray-600 mb-2">الاسم بالكامل</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="مثال: أحمد محمود عبدالله"
                      className="w-full h-14 px-4 pr-12 border border-gray-200 rounded-xl text-right focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/20 transition-all"
                    />
                    <User className="absolute right-4 top-1/2 -translate-y-1/2 text-[#43A047]" size={20} />
                  </div>
                </div>

                {/* Phone Field */}
                <div>
                  <label className="block text-sm text-gray-600 mb-2">رقم الموبايل</label>
                  <div className="relative flex gap-2">
                    <div className="flex items-center gap-2 px-3 bg-[#E8F5E9] rounded-xl border border-[#A5D6A7]">
                      <span>🇪🇬</span>
                      <span className="text-sm font-medium">+20</span>
                    </div>
                    <input
                      type="tel"
                      placeholder="01X XXXX XXXX"
                      className="flex-1 h-14 px-4 border border-gray-200 rounded-xl text-right focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/20 transition-all"
                    />
                  </div>
                </div>

                {/* Area Field */}
                <div>
                  <label className="block text-sm text-gray-600 mb-2">المنطقة</label>
                  <div className="relative">
                    <select className="w-full h-14 px-4 pr-12 border border-gray-200 rounded-xl text-right appearance-none focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/20 transition-all bg-white">
                      <option value="">اختر المنطقة</option>
                      {areas.map(area => (
                        <option key={area} value={area}>{area}</option>
                      ))}
                    </select>
                    <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 text-[#43A047]" size={20} />
                    <ChevronLeft className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  </div>
                </div>

                {/* Photo Upload */}
                <div>
                  <label className="block text-sm text-gray-600 mb-2">صورة (اختياري)</label>
                  <div className="w-20 h-20 border-2 border-dashed border-[#A5D6A7] rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-[#E8F5E9] transition-colors">
                    <Upload size={24} className="text-[#43A047]" />
                    <span className="text-xs text-gray-500 mt-1">رفع</span>
                  </div>
                </div>
              </div>

              {/* Subscription Type */}
              <div className="flex items-center gap-2">
                <div className="w-1 h-6 bg-[#43A047] rounded-full" />
                <h2 className="text-lg font-bold text-[#1B5E20]">💳 نوع الاشتراك</h2>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Monthly */}
                <button
                  onClick={() => setSubscriptionType('monthly')}
                  className={`p-4 rounded-2xl border-2 transition-all ${
                    subscriptionType === 'monthly'
                      ? 'border-[#2E7D32] bg-[#E8F5E9]'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <Calendar size={28} className="text-[#2E7D32]" />
                    {subscriptionType === 'monthly' && (
                      <div className="w-5 h-5 rounded-full bg-[#2E7D32] flex items-center justify-center">
                        <Check size={12} className="text-white" />
                      </div>
                    )}
                  </div>
                  <h3 className="font-bold text-lg">شهري</h3>
                  <p className="text-[#1B5E20] font-bold text-xl mt-1">150 ج/شهر</p>
                </button>

                {/* Seasonal */}
                <button
                  onClick={() => setSubscriptionType('seasonal')}
                  className={`p-4 rounded-2xl border-2 transition-all relative ${
                    subscriptionType === 'seasonal'
                      ? 'border-[#2E7D32] bg-[#E8F5E9]'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <span className="absolute -top-2 left-2 px-2 py-0.5 bg-[#F9A825] text-xs font-bold rounded-full">
                    وفّر 11%
                  </span>
                  <div className="flex justify-between items-start mb-2">
                    <Sprout size={28} className="text-[#2E7D32]" />
                    {subscriptionType === 'seasonal' && (
                      <div className="w-5 h-5 rounded-full bg-[#2E7D32] flex items-center justify-center">
                        <Check size={12} className="text-white" />
                      </div>
                    )}
                  </div>
                  <h3 className="font-bold text-lg">موسمي</h3>
                  <p className="text-[#1B5E20] font-bold text-xl mt-1">400 ج/موسم</p>
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Farm Data */}
          {currentStep === 1 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-6"
            >
              {/* Area in Feddan */}
              <div className="bg-white rounded-2xl shadow-lg p-5">
                <label className="block text-sm text-gray-600 mb-2">المساحة (فدان)</label>
                <div className="relative">
                  <input
                    type="number"
                    placeholder="مثال: 8"
                    className="w-full h-14 px-4 border border-gray-200 rounded-xl text-right focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/20 transition-all"
                  />
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">فدان</span>
                </div>
              </div>

              {/* Soil Type */}
              <div>
                <h3 className="text-lg font-bold text-[#1B5E20] mb-3">نوع التربة</h3>
                <div className="grid grid-cols-2 gap-3">
                  {soilTypes.map((soil) => (
                    <button
                      key={soil.id}
                      onClick={() => setSelectedSoil(soil.id)}
                      className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center ${
                        selectedSoil === soil.id
                          ? 'border-[#2E7D32] bg-[#E8F5E9]'
                          : 'border-gray-200 bg-white'
                      }`}
                    >
                      <span className="text-3xl mb-2">{soil.emoji}</span>
                      <span className="font-medium">{soil.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Water Source */}
              <div>
                <h3 className="text-lg font-bold text-[#1B5E20] mb-3">مصدر المياه</h3>
                <div className="space-y-2">
                  {waterSources.map((source) => (
                    <button
                      key={source.id}
                      onClick={() => setSelectedWater(source.id)}
                      className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center gap-3 ${
                        selectedWater === source.id
                          ? 'border-[#2E7D32] bg-[#E8F5E9]'
                          : 'border-gray-200 bg-white'
                      }`}
                    >
                      <span className="text-2xl">{source.emoji}</span>
                      <span className="font-medium flex-1 text-right">{source.label}</span>
                      {selectedWater === source.id && (
                        <Check size={20} className="text-[#2E7D32]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Irrigation Type */}
              <div>
                <h3 className="text-lg font-bold text-[#1B5E20] mb-3">نوع الري</h3>
                <div className="grid grid-cols-3 gap-2">
                  {irrigationTypes.map((irrigation) => (
                    <button
                      key={irrigation.id}
                      onClick={() => setSelectedIrrigation(irrigation.id)}
                      className={`p-3 rounded-2xl border-2 transition-all flex flex-col items-center ${
                        selectedIrrigation === irrigation.id
                          ? 'border-[#2E7D32] bg-[#E8F5E9]'
                          : 'border-gray-200 bg-white'
                      }`}
                    >
                      <span className="text-2xl mb-1">{irrigation.emoji}</span>
                      <span className="text-sm font-medium">{irrigation.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Crop Data */}
          {currentStep === 2 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-6"
            >
              {/* Crop Type */}
              <div>
                <h3 className="text-lg font-bold text-[#1B5E20] mb-3">نوع المحصول</h3>
                <div className="grid grid-cols-3 gap-3">
                  {cropTypes.map((crop) => (
                    <button
                      key={crop.id}
                      onClick={() => setSelectedCrop(crop.id)}
                      className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center ${
                        selectedCrop === crop.id
                          ? 'border-[#2E7D32] bg-[#E8F5E9]'
                          : 'border-gray-200 bg-white'
                      }`}
                    >
                      <span className="text-3xl mb-2">{crop.emoji}</span>
                      <span className="text-sm font-medium">{crop.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Variety */}
              <div className="bg-white rounded-2xl shadow-lg p-5">
                <label className="block text-sm text-gray-600 mb-2">الصنف</label>
                <input
                  type="text"
                  placeholder="مثال: مجدول، سيوي، برحي..."
                  className="w-full h-14 px-4 border border-gray-200 rounded-xl text-right focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/20 transition-all"
                />
              </div>

              {/* Count/Age */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl shadow-lg p-5">
                  <label className="block text-sm text-gray-600 mb-2">
                    {selectedCrop === 'palm' || selectedCrop === 'olive' ? 'عدد الأشجار' : 'المساحة المزروعة'}
                  </label>
                  <input
                    type="number"
                    placeholder={selectedCrop === 'palm' || selectedCrop === 'olive' ? 'مثال: 50' : 'مثال: 5'}
                    className="w-full h-14 px-4 border border-gray-200 rounded-xl text-right focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/20 transition-all"
                  />
                </div>
                <div className="bg-white rounded-2xl shadow-lg p-5">
                  <label className="block text-sm text-gray-600 mb-2">عمر المحصول (شهور)</label>
                  <input
                    type="number"
                    placeholder="مثال: 18"
                    className="w-full h-14 px-4 border border-gray-200 rounded-xl text-right focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/20 transition-all"
                  />
                </div>
              </div>

              {/* Current Stage */}
              <div>
                <h3 className="text-lg font-bold text-[#1B5E20] mb-3">المرحلة الحالية</h3>
                <div className="flex gap-2">
                  {cropStages.map((stage) => (
                    <button
                      key={stage.id}
                      onClick={() => setSelectedStage(stage.id)}
                      className={`flex-1 p-3 rounded-2xl border-2 transition-all flex flex-col items-center ${
                        selectedStage === stage.id
                          ? 'border-[#2E7D32] bg-[#E8F5E9]'
                          : 'border-gray-200 bg-white'
                      }`}
                    >
                      <span className="text-2xl mb-1">{stage.emoji}</span>
                      <span className="text-xs font-medium">{stage.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div className="bg-white rounded-2xl shadow-lg p-5">
                <label className="block text-sm text-gray-600 mb-2">ملاحظات (اختياري)</label>
                <textarea
                  rows={3}
                  placeholder="أي ملاحظات إضافية عن المحصول..."
                  className="w-full p-4 border border-gray-200 rounded-xl text-right focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/20 transition-all resize-none"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-6 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] safe-area-bottom">
        <div className="flex gap-4">
          {currentStep > 0 && (
            <button
              onClick={handleBack}
              className="px-6 py-4 border-2 border-gray-200 rounded-2xl font-bold text-gray-600 hover:bg-gray-50 transition-colors"
            >
              رجوع
            </button>
          )}
          <button
            onClick={handleNext}
            className="flex-1 py-4 rounded-2xl font-bold text-white"
            style={{ background: 'linear-gradient(135deg, #F9A825, #FFB300)' }}
          >
            {currentStep === steps.length - 1 ? '✅ إضافة المزارع' : 'التالي'}
          </button>
        </div>
      </div>
    </div>
  );
}
