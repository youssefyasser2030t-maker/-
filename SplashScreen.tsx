import { motion } from 'framer-motion';
import { AnimatedBackground } from '@/components/background/AnimatedBackground';
import { Wheat, Leaf } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Background - Full opacity for splash */}
      <AnimatedBackground opacity={1} />
      
      {/* Center Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        {/* Logo Icon */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="relative"
        >
          <div 
            className="w-28 h-28 flex items-center justify-center"
            style={{
              filter: 'drop-shadow(0 0 20px rgba(249, 168, 37, 0.7))',
            }}
          >
            <div className="relative">
              <Wheat size={80} className="text-[#F9A825]" strokeWidth={1.5} />
              <Leaf 
                size={40} 
                className="text-[#F9A825] absolute -bottom-2 -right-2" 
                strokeWidth={1.5}
              />
            </div>
          </div>
        </motion.div>
        
        {/* App Name Arabic */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-6 text-6xl font-black text-white"
          style={{
            fontFamily: 'Cairo, sans-serif',
            textShadow: '0 0 30px rgba(165, 214, 167, 0.9)',
          }}
        >
          محصولك
        </motion.h1>
        
        {/* App Name English */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-2 text-xl font-light text-[#A5D6A7]"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          Mahsoulak
        </motion.p>
        
        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-4 text-lg italic text-[#FFB300]"
          style={{ fontFamily: 'Tajawal, sans-serif' }}
        >
          قرارات صح ... في الوقت الصح
        </motion.p>
      </div>
      
      {/* Bottom Loading Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.5 }}
        className="absolute bottom-16 left-0 right-0 px-8"
      >
        {/* Loading Bar Container */}
        <div className="max-w-xs mx-auto">
          <div 
            className="h-1.5 rounded-full overflow-hidden"
            style={{ background: 'rgba(255, 255, 255, 0.3)' }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{
                background: 'linear-gradient(90deg, #43A047, #F9A825)',
              }}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2.5, ease: 'easeInOut' }}
              onAnimationComplete={onComplete}
            />
          </div>
          
          {/* Loading Text */}
          <p className="mt-3 text-center text-sm text-[#A5D6A7]">
            جاري التحميل...
          </p>
        </div>
      </motion.div>
    </div>
  );
}
