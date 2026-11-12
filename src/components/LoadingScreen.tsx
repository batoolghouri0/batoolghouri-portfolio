import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BgMonogram } from './Icons';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFinishing, setIsFinishing] = useState(false);

  useEffect(() => {
    // Check if user has already loaded in this session to keep it brief for returning visitors
    const hasVisited = sessionStorage.getItem('bg_visited');
    const stepDuration = hasVisited ? 12 : 25;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsFinishing(true);
          setTimeout(() => {
            sessionStorage.setItem('bg_visited', 'true');
            onComplete();
          }, 800);
          return 100;
        }
        // Smooth logarithmic easing towards 100%
        const jump = Math.max(1, Math.floor((100 - prev) / 6));
        return Math.min(100, prev + jump);
      });
    }, stepDuration);

    return () => clearInterval(interval);
  }, [onComplete]);

  const handleSkip = () => {
    setProgress(100);
    setIsFinishing(true);
    setTimeout(() => {
      sessionStorage.setItem('bg_visited', 'true');
      onComplete();
    }, 400);
  };

  return (
    <AnimatePresence>
      {!isFinishing ? (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#080B16] text-[#F8FAFC] select-none"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-[#8B5CF6]/20 via-[#38BDF8]/15 to-transparent blur-[100px] pointer-events-none" />

          {/* Center Monogram + Circular Progress */}
          <div className="relative flex items-center justify-center w-48 h-48">
            {/* SVG Circular Progress Track */}
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle
                cx="96"
                cy="96"
                r="80"
                stroke="rgba(255, 255, 255, 0.06)"
                strokeWidth="2.5"
                fill="none"
              />
              <motion.circle
                cx="96"
                cy="96"
                r="80"
                stroke="url(#loaderStrokeGrad)"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
                strokeDasharray={2 * Math.PI * 80}
                strokeDashoffset={2 * Math.PI * 80 * (1 - progress / 100)}
                transition={{ duration: 0.1, ease: 'easeOut' }}
              />
              <defs>
                <linearGradient id="loaderStrokeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#38BDF8" />
                </linearGradient>
              </defs>
            </svg>

            {/* Pulsing Backlight */}
            <motion.div
              animate={{
                scale: [1, 1.08, 1],
                opacity: [0.35, 0.65, 0.35],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute w-28 h-28 rounded-full bg-[#8B5CF6]/30 blur-xl"
            />

            {/* BG Monogram */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative z-10"
            >
              <BgMonogram size={72} />
            </motion.div>
          </div>

          {/* Progress Metadata & Label */}
          <div className="mt-8 text-center space-y-2 z-10">
            <div className="text-[11px] font-mono tracking-[0.25em] text-[#94A3B8] uppercase">
              INITIALIZING EXPERIENCE...
            </div>
            <div className="text-xl font-mono font-medium text-[#F8FAFC] tracking-wider tabular-nums">
              {progress}
              <span className="text-xs text-[#38BDF8] ml-0.5">%</span>
            </div>
          </div>

          {/* Quick Skip Button for instant entry */}
          <button
            onClick={handleSkip}
            className="absolute bottom-10 text-xs font-mono text-[#94A3B8]/60 hover:text-[#38BDF8] transition-colors px-3 py-1.5 rounded border border-white/5 hover:border-[#38BDF8]/30"
          >
            Enter Now →
          </button>
        </motion.div>
      ) : (
        /* Cinematic Vertical Split Screen Reveal */
        <motion.div key="curtain" className="fixed inset-0 z-50 pointer-events-none flex flex-col">
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: '-100%' }}
            transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
            className="h-1/2 w-full bg-[#080B16] border-b border-[#8B5CF6]/40 shadow-[0_4px_30px_rgba(139,92,246,0.3)]"
          />
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: '100%' }}
            transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
            className="h-1/2 w-full bg-[#080B16] border-t border-[#38BDF8]/40 shadow-[0_-4px_30px_rgba(56,189,248,0.3)]"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
