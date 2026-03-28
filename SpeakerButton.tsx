import { Volume2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';

interface SpeakerButtonProps {
  text: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function SpeakerButton({ text, size = 'md', className = '' }: SpeakerButtonProps) {
  const { isSpeaking, speakText, stopSpeaking } = useApp();
  
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-14 h-14',
  };
  
  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  const handleClick = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speakText(text);
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      className={`
        ${sizeClasses[size]}
        rounded-full flex items-center justify-center
        bg-gradient-to-br from-[#2E7D32] to-[#43A047]
        text-white shadow-lg
        transition-transform hover:scale-110
        ${isSpeaking ? 'ring-4 ring-[#43A047]/30' : ''}
        ${className}
      `}
      whileTap={{ scale: 0.95 }}
      aria-label="قراءة النص"
    >
      <motion.div
        animate={isSpeaking ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 0.5, repeat: Infinity }}
      >
        <Volume2 size={iconSizes[size]} />
      </motion.div>
      
      {/* Pulsing ring when speaking */}
      {isSpeaking && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-[#43A047]"
          animate={{ scale: [1, 1.5], opacity: [1, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      )}
    </motion.button>
  );
}
