import { motion } from 'framer-motion';

interface AnimatedBackgroundProps {
  opacity?: number;
  showOverlay?: boolean;
}

export function AnimatedBackground({ opacity = 0.88, showOverlay = false }: AnimatedBackgroundProps) {
  return (
    <div 
      className="fixed inset-0 overflow-hidden"
      style={{ 
        opacity,
        zIndex: -1,
      }}
    >
      {/* Layer 1 - Sky */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #87CEEB 0%, #B3E5FC 40%, #E8F5E9 100%)',
          height: '35%',
        }}
      />
      
      {/* Sunlight Rays */}
      <div className="absolute top-0 right-0 w-96 h-96 pointer-events-none">
        <motion.div
          className="absolute top-0 right-0 w-full h-full"
          style={{
            background: 'conic-gradient(from 0deg at 100% 0%, transparent 0deg, rgba(255, 224, 130, 0.15) 30deg, transparent 60deg)',
          }}
          animate={{ rotate: [0, 10, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
      
      {/* Clouds */}
      <motion.div
        className="absolute top-8"
        style={{
          width: 120,
          height: 50,
          background: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '50px',
          filter: 'blur(2px)',
        }}
        animate={{ x: ['110vw', '-200px'] }}
        transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute top-16"
        style={{
          width: 80,
          height: 35,
          background: 'rgba(255, 255, 255, 0.8)',
          borderRadius: '35px',
          filter: 'blur(1px)',
        }}
        animate={{ x: ['110vw', '-200px'] }}
        transition={{ duration: 120, repeat: Infinity, ease: 'linear', delay: -30 }}
      />
      <motion.div
        className="absolute top-24"
        style={{
          width: 60,
          height: 25,
          background: 'rgba(255, 255, 255, 0.7)',
          borderRadius: '25px',
          filter: 'blur(1px)',
        }}
        animate={{ x: ['110vw', '-200px'] }}
        transition={{ duration: 75, repeat: Infinity, ease: 'linear', delay: -50 }}
      />
      
      {/* Layer 2 - Farmland */}
      <div 
        className="absolute left-0 right-0"
        style={{
          top: '35%',
          height: '40%',
          background: 'linear-gradient(180deg, #E8F5E9 0%, #C8E6C9 100%)',
        }}
      >
        {/* Hills */}
        <motion.div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: '70%',
            background: '#2E7D32',
            borderRadius: '50% 50% 0 0 / 100% 100% 0 0',
            transformOrigin: 'bottom center',
          }}
          animate={{ scaleX: [1, 1.02, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: '50%',
            background: '#388E3C',
            borderRadius: '50% 50% 0 0 / 100% 100% 0 0',
            transformOrigin: 'bottom center',
          }}
          animate={{ scaleX: [1, 1.02, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: -4 }}
        />
        <motion.div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: '30%',
            background: '#43A047',
            borderRadius: '50% 50% 0 0 / 100% 100% 0 0',
            transformOrigin: 'bottom center',
          }}
          animate={{ scaleX: [1, 1.02, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: -2 }}
        />
        
        {/* Palm Trees */}
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              bottom: `${20 + i * 15}%`,
              right: `${10 + i * 22}%`,
              transformOrigin: 'bottom center',
            }}
            animate={{ rotate: [-3, 3, -3] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: -i * 2 }}
          >
            {/* Trunk */}
            <div 
              className="w-2 h-16 mx-auto"
              style={{
                background: 'linear-gradient(180deg, #1B5E20, #0D3310)',
                borderRadius: '4px',
              }}
            />
            {/* Leaves */}
            <div className="relative -top-2">
              {[0, 1, 2, 3, 4].map((j) => (
                <div
                  key={j}
                  className="absolute w-8 h-2"
                  style={{
                    background: '#1B5E20',
                    borderRadius: '50%',
                    transform: `rotate(${j * 72 - 144}deg)`,
                    transformOrigin: 'left center',
                    left: '50%',
                    top: '50%',
                  }}
                />
              ))}
            </div>
          </motion.div>
        ))}
        
        {/* Crop Rows */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 overflow-hidden">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="absolute w-full h-3"
              style={{
                bottom: `${i * 20}%`,
                background: i % 2 === 0 ? '#4CAF50' : '#66BB6A',
                opacity: 0.6,
              }}
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear', delay: -i * 2 }}
            />
          ))}
        </div>
      </div>
      
      {/* Layer 3 - Foreground */}
      <div 
        className="absolute left-0 right-0 bottom-0"
        style={{
          height: '25%',
          background: 'linear-gradient(180deg, #C8E6C9 0%, #43A047 100%)',
        }}
      >
        {/* Grass */}
        <div 
          className="absolute top-0 left-0 right-0 h-16"
          style={{
            background: '#43A047',
            borderRadius: '50% 50% 0 0 / 100% 100% 0 0',
          }}
        />
        
        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 3 + Math.random() * 3,
              height: 3 + Math.random() * 3,
              background: '#F9A825',
              right: `${Math.random() * 100}%`,
              bottom: `${Math.random() * 20}%`,
            }}
            animate={{
              y: [0, -window.innerHeight * 0.8],
              x: [0, (Math.random() - 0.5) * 40],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
      
      {/* Dark Overlay (optional) */}
      {showOverlay && (
        <div className="absolute inset-0 bg-black/45" />
      )}
    </div>
  );
}
