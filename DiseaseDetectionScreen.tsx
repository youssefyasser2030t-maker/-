import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  Camera, 
  Image as ImageIcon, 
  Leaf,
  AlertTriangle,
  Lightbulb,
  Pill,
  Send,
  Save,
  CheckCircle2
} from 'lucide-react';
import { SpeakerButton } from '@/components/SpeakerButton';

interface DiseaseDetectionScreenProps {
  onBack: () => void;
}

// Mock diagnosis result
const mockDiagnosis = {
  diseaseName: 'البياض الزغبي',
  confidence: 94,
  severity: 4,
  cause: 'رطوبة عالية + انخفاض درجات الحرارة الليلية',
  treatment: [
    'إزالة الأوراق المصابة فوراً وتدميرها',
    'رش مبيد فطري مثل الكبريت أو المانكوزب',
    'تحسين التهوية بين الأشجار',
  ],
  products: [
    { name: 'مبيد فطري عضوي', company: 'النيل للأسمدة', price: 85 },
    { name: 'كبريت زراعي', company: 'مصر للكيماويات', price: 45 },
  ],
};

export function DiseaseDetectionScreen({ onBack }: DiseaseDetectionScreenProps) {
  const [image, setImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [saved, setSaved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        startScanning();
      };
      reader.readAsDataURL(file);
    }
  };

  const startScanning = () => {
    setIsScanning(true);
    // Simulate AI analysis
    setTimeout(() => {
      setIsScanning(false);
      setShowResult(true);
    }, 3000);
  };

  const getSeverityLabel = (severity: number) => {
    if (severity <= 2) return { label: 'خفيف', color: '#4CAF50' };
    if (severity <= 3) return { label: 'متوسط', color: '#FDD835' };
    if (severity <= 4) return { label: 'عالي', color: '#FF9800' };
    return { label: 'خطير', color: '#F44336' };
  };

  const severityInfo = getSeverityLabel(mockDiagnosis.severity);

  return (
    <div className="min-h-screen bg-[#0A120A] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-[#43A047]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 px-6 pt-12 pb-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"
          >
            <ChevronRight size={24} className="text-white" />
          </button>
          <div className="flex-1 text-center">
            <h1 className="text-white text-xl font-bold">🔬 تشخيص الأمراض</h1>
            <p className="text-[#A5D6A7] text-sm mt-1">
              صوّر ورقة أو ثمرة أو نخلة كاملة
            </p>
          </div>
          <div className="w-10" />
        </div>
      </div>

      {/* Camera Area */}
      <div className="relative z-10 px-6">
        <div 
          className="relative w-full aspect-square max-w-sm mx-auto rounded-3xl overflow-hidden"
          style={{ border: '3px solid rgba(165, 214, 167, 0.5)' }}
        >
          {/* Corner Brackets */}
          <div className="absolute top-4 left-4 w-6 h-6 border-l-4 border-t-4 border-[#F9A825] rounded-tl-lg" />
          <div className="absolute top-4 right-4 w-6 h-6 border-r-4 border-t-4 border-[#F9A825] rounded-tr-lg" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-l-4 border-b-4 border-[#F9A825] rounded-bl-lg" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-r-4 border-b-4 border-[#F9A825] rounded-br-lg" />

          <AnimatePresence mode="wait">
            {!image && !showResult && (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-white/5 flex flex-col items-center justify-center"
              >
                <Leaf size={72} className="text-[#43A047] mb-4" />
                <p className="text-[#A5D6A7] text-center mb-6">
                  اضغط لتصوير أو رفع صورة
                </p>
                
                <div className="flex gap-4">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-6 py-3 rounded-2xl font-bold text-white flex items-center gap-2"
                    style={{ background: 'linear-gradient(135deg, #1B5E20, #2E7D32)' }}
                  >
                    <Camera size={20} />
                    تصوير
                  </button>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-6 py-3 rounded-2xl font-bold text-[#A5D6A7] border-2 border-[#A5D6A7]/50 flex items-center gap-2"
                  >
                    <ImageIcon size={20} />
                    من المعرض
                  </button>
                </div>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </motion.div>
            )}

            {image && isScanning && (
              <motion.div
                key="scanning"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0"
              >
                <img src={image} alt="Plant" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50" />
                
                {/* Scanning Line */}
                <motion.div
                  className="absolute left-0 right-0 h-1"
                  style={{
                    background: 'linear-gradient(90deg, transparent, #43A047, transparent)',
                    boxShadow: '0 0 20px rgba(67, 160, 71, 0.8)',
                  }}
                  animate={{ top: ['0%', '100%', '0%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
                
                {/* Center Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  >
                    <Leaf size={60} className="text-[#43A047]" />
                  </motion.div>
                  <p className="text-[#A5D6A7] mt-4">جاري تحليل الصورة...</p>
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-[#A5D6A7]"
                  >
                    ...
                  </motion.span>
                </div>
              </motion.div>
            )}

            {image && !isScanning && showResult && (
              <motion.div
                key="result-image"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0"
              >
                <img src={image} alt="Plant" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Result Card */}
      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[32px] shadow-[0_-12px_48px_rgba(0,0,0,0.35)] max-h-[70vh] overflow-auto"
          >
            {/* Drag Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 bg-gray-300 rounded-full" />
            </div>

            <div className="px-6 pb-8">
              {/* Result Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-bold text-[#C62828]">
                      🦠 {mockDiagnosis.diseaseName}
                    </h2>
                    <span className="px-3 py-1 bg-[#E8F5E9] text-[#2E7D32] text-sm font-bold rounded-full">
                      {mockDiagnosis.confidence}% دقة
                    </span>
                  </div>
                </div>
                <SpeakerButton text={`تم تشخيص ${mockDiagnosis.diseaseName} بدقة ${mockDiagnosis.confidence} بالمئة`} size="sm" />
              </div>

              {/* Severity Bar */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle size={18} className="text-gray-500" />
                  <span className="text-gray-600 text-sm">درجة الخطورة</span>
                </div>
                <div className="relative h-3 rounded-full overflow-hidden">
                  <div 
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(90deg, #4CAF50, #FDD835, #FF5722)',
                    }}
                  />
                  <div 
                    className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full shadow-lg border-2 border-gray-200"
                    style={{ left: `${(mockDiagnosis.severity / 5) * 100}%`, transform: 'translate(-50%, -50%)' }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>خفيف</span>
                  <span>متوسط</span>
                  <span>عالي</span>
                  <span>خطير</span>
                </div>
                <div 
                  className="mt-2 inline-block px-3 py-1 rounded-full text-sm font-bold"
                  style={{ backgroundColor: severityInfo.color + '20', color: severityInfo.color }}
                >
                  خطر {severityInfo.label} ⚠️
                </div>
              </div>

              {/* Cause */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb size={18} className="text-[#F9A825]" />
                  <span className="font-bold">السبب:</span>
                </div>
                <div className="flex items-start gap-2 bg-gray-50 p-4 rounded-xl">
                  <p className="flex-1">{mockDiagnosis.cause}</p>
                  <SpeakerButton text={mockDiagnosis.cause} size="sm" />
                </div>
              </div>

              {/* Treatment Steps */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Pill size={18} className="text-[#2E7D32]" />
                  <span className="font-bold">خطة العلاج:</span>
                </div>
                <div className="space-y-3">
                  {mockDiagnosis.treatment.map((step, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
                        style={{ background: 'linear-gradient(135deg, #1B5E20, #2E7D32)' }}
                      >
                        {index + 1}
                      </div>
                      <div className="flex-1 flex items-start gap-2">
                        <p className="flex-1">{step}</p>
                        <SpeakerButton text={step} size="sm" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Recommendations */}
              <div className="mb-6">
                <h3 className="font-bold mb-3">🛒 منتجات علاجية مقترحة</h3>
                <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
                  {mockDiagnosis.products.map((product, index) => (
                    <div key={index} className="flex-shrink-0 w-40 bg-gray-50 rounded-2xl p-4">
                      <div className="w-full h-20 bg-gradient-to-br from-[#E8F5E9] to-[#C8E6C9] rounded-xl flex items-center justify-center mb-3">
                        <Pill size={32} className="text-[#43A047]" />
                      </div>
                      <h4 className="font-bold text-sm">{product.name}</h4>
                      <p className="text-xs text-gray-500">{product.company}</p>
                      <p className="text-[#1B5E20] font-bold mt-2">{product.price} ج</p>
                      <button className="w-full mt-2 py-2 rounded-xl text-sm font-bold text-white"
                        style={{ background: 'linear-gradient(135deg, #F9A825, #FFB300)' }}
                      >
                        اشتري
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="flex gap-4">
                <button className="flex-1 py-4 border-2 border-[#2E7D32] rounded-2xl font-bold text-[#2E7D32] flex items-center justify-center gap-2">
                  <Send size={20} />
                  أرسل للمزارع
                </button>
                <button 
                  onClick={() => setSaved(true)}
                  className="flex-1 py-4 rounded-2xl font-bold text-white flex items-center justify-center gap-2"
                  style={{ background: 'linear-gradient(135deg, #1B5E20, #2E7D32)' }}
                >
                  {saved ? <CheckCircle2 size={20} /> : <Save size={20} />}
                  {saved ? 'تم الحفظ' : 'احفظ في السجل'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
