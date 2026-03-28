import { motion } from 'framer-motion';
import { AnimatedBackground } from '@/components/background/AnimatedBackground';
import { ChevronLeft, Wheat, Building2, UserCog } from 'lucide-react';
import type { UserRole } from '@/types';

interface RoleSelectionScreenProps {
  onSelectRole: (role: UserRole) => void;
}

const roles = [
  {
    id: 'engineer' as UserRole,
    icon: UserCog,
    emoji: '🧑‍🌾',
    title: 'أنا مهندس زراعي',
    subtitle: 'أقدم استشارات وأتابع عملائي',
    gradient: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)',
    arrowColor: '#F9A825',
  },
  {
    id: 'farmer' as UserRole,
    icon: Wheat,
    emoji: '🌾',
    title: 'أنا مزارع',
    subtitle: 'أتابع أرضي وأتواصل مع مهندسي',
    gradient: 'linear-gradient(135deg, #2E7D32 0%, #43A047 100%)',
    arrowColor: '#FFB300',
  },
  {
    id: 'company' as UserRole,
    icon: Building2,
    emoji: '🏢',
    title: 'شركة منتجات',
    subtitle: 'أعرض منتجاتي وأوصل للمهندسين',
    gradient: 'linear-gradient(135deg, #00695C 0%, #00897B 100%)',
    arrowColor: '#F9A825',
  },
];

export function RoleSelectionScreen({ onSelectRole }: RoleSelectionScreenProps) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Background with overlay */}
      <AnimatedBackground opacity={0.88} showOverlay={true} />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen px-6 py-8">
        {/* Top Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 pt-4"
        >
          <div className="w-12 h-12 flex items-center justify-center">
            <Wheat size={32} className="text-[#F9A825]" />
          </div>
          <span className="text-white text-xl font-bold">محصولك</span>
        </motion.div>
        
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 text-center"
        >
          <h1 className="text-4xl font-black text-white" style={{ fontFamily: 'Cairo, sans-serif' }}>
            أنت مين؟
          </h1>
          <p className="mt-2 text-[#A5D6A7] text-base">
            اختار نوع حسابك عشان نبدأ
          </p>
        </motion.div>
        
        {/* Role Cards */}
        <div className="flex-1 flex flex-col justify-center gap-4 mt-8">
          {roles.map((role, index) => (
            <motion.button
              key={role.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.2 }}
              onClick={() => onSelectRole(role.id)}
              className="w-full text-right"
            >
              <div
                className="relative flex items-center gap-4 p-5 rounded-3xl transition-transform hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: role.gradient,
                  border: '2px solid rgba(165, 214, 167, 0.4)',
                  boxShadow: '0 16px 40px rgba(27, 94, 32, 0.5)',
                }}
              >
                {/* Icon */}
                <div className="text-5xl flex-shrink-0">
                  {role.emoji}
                </div>
                
                {/* Text Content */}
                <div className="flex-1">
                  <h3 className="text-white text-xl font-bold" style={{ fontFamily: 'Cairo, sans-serif' }}>
                    {role.title}
                  </h3>
                  <p className="text-[#A5D6A7] text-sm mt-1">
                    {role.subtitle}
                  </p>
                </div>
                
                {/* Arrow */}
                <ChevronLeft 
                  size={28} 
                  style={{ color: role.arrowColor }}
                  className="flex-shrink-0"
                />
              </div>
            </motion.button>
          ))}
        </div>
        
        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="pb-8"
        >
          {/* Step Indicator */}
          <div className="flex justify-center gap-2 mb-6">
            <div className="w-2.5 h-2.5 rounded-full bg-[#F9A825]" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/40" />
          </div>
          
          {/* Login Link */}
          <p className="text-center text-white">
            عندك حساب بالفعل؟{' '}
            <button className="underline hover:text-[#F9A825] transition-colors">
              سجّل دخول
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
