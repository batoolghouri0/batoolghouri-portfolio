import React from 'react';
import { motion } from 'motion/react';
import { useViewportTier } from '../hooks/useViewportTier';

export type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'scale';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: RevealDirection;
  delay?: number;
  index?: number;
  className?: string;
  once?: boolean;
}

/**
 * Adaptive scroll-triggered reveal wrapper that tailors travel distance,
 * timing, easing, and trigger thresholds across phone, tablet, laptop, and desktop.
 */
export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  index = 0,
  className = '',
  once = true,
}) => {
  const {
    isPhone,
    yDistance,
    xDistance,
    staggerDelay,
    duration,
    viewportAmount,
    viewportMargin,
    prefersReducedMotion,
  } = useViewportTier();

  // On phones, convert horizontal slides into clean vertical glides to prevent horizontal overflow
  const getInitialState = () => {
    if (prefersReducedMotion) return { opacity: 1, x: 0, y: 0, scale: 1 };

    switch (direction) {
      case 'down':
        return { opacity: 0, x: 0, y: -yDistance, scale: 1 };
      case 'left':
        return isPhone
          ? { opacity: 0, x: 0, y: yDistance, scale: 1 }
          : { opacity: 0, x: -xDistance, y: 0, scale: 1 };
      case 'right':
        return isPhone
          ? { opacity: 0, x: 0, y: yDistance, scale: 1 }
          : { opacity: 0, x: xDistance, y: 0, scale: 1 };
      case 'scale':
        return { opacity: 0, x: 0, y: yDistance * 0.65, scale: isPhone ? 0.96 : 0.93 };
      case 'up':
      default:
        return { opacity: 0, x: 0, y: yDistance, scale: 1 };
    }
  };

  return (
    <motion.div
      initial={getInitialState()}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once, amount: viewportAmount, margin: viewportMargin }}
      transition={{
        duration,
        delay: delay + index * staggerDelay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
