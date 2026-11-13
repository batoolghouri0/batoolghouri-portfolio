import { useState, useEffect } from 'react';

export type ViewportTier = 'phone' | 'tablet' | 'laptop' | 'desktop';

export interface ResponsiveScrollConfig {
  tier: ViewportTier;
  isPhone: boolean;
  isTablet: boolean;
  isLaptop: boolean;
  isDesktop: boolean;
  prefersReducedMotion: boolean;
  /** Vertical reveal travel distance in pixels */
  yDistance: number;
  /** Horizontal reveal travel distance in pixels (0 on phone to avoid overflow) */
  xDistance: number;
  /** Parallax drift amplitude in pixels */
  parallaxRange: number;
  /** Stagger step delay between consecutive items */
  staggerDelay: number;
  /** Base animation duration */
  duration: number;
  /** IntersectionObserver trigger threshold */
  viewportAmount: number;
  /** Viewport root margin */
  viewportMargin: string;
}

const CONFIG_BY_TIER: Record<ViewportTier, Omit<ResponsiveScrollConfig, 'tier' | 'isPhone' | 'isTablet' | 'isLaptop' | 'isDesktop' | 'prefersReducedMotion'>> = {
  phone: {
    yDistance: 18,
    xDistance: 0,
    parallaxRange: 18,
    staggerDelay: 0.05,
    duration: 0.42,
    viewportAmount: 0.1,
    viewportMargin: '-20px',
  },
  tablet: {
    yDistance: 24,
    xDistance: 18,
    parallaxRange: 34,
    staggerDelay: 0.07,
    duration: 0.48,
    viewportAmount: 0.15,
    viewportMargin: '-40px',
  },
  laptop: {
    yDistance: 32,
    xDistance: 28,
    parallaxRange: 56,
    staggerDelay: 0.08,
    duration: 0.56,
    viewportAmount: 0.18,
    viewportMargin: '-60px',
  },
  desktop: {
    yDistance: 42,
    xDistance: 40,
    parallaxRange: 84,
    staggerDelay: 0.1,
    duration: 0.64,
    viewportAmount: 0.2,
    viewportMargin: '-80px',
  },
};

function getTierFromWidth(width: number): ViewportTier {
  if (width < 640) return 'phone';
  if (width < 1024) return 'tablet';
  if (width < 1440) return 'laptop';
  return 'desktop';
}

export function useViewportTier(): ResponsiveScrollConfig {
  const [tier, setTier] = useState<ViewportTier>(() => {
    if (typeof window === 'undefined') return 'laptop';
    return getTierFromWidth(window.innerWidth);
  });

  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    const handleResize = () => {
      setTier(getTierFromWidth(window.innerWidth));
    };

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    mediaQuery.addEventListener('change', handleMotionChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      mediaQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  const base = CONFIG_BY_TIER[tier];

  if (prefersReducedMotion) {
    return {
      tier,
      isPhone: tier === 'phone',
      isTablet: tier === 'tablet',
      isLaptop: tier === 'laptop',
      isDesktop: tier === 'desktop',
      prefersReducedMotion: true,
      yDistance: 0,
      xDistance: 0,
      parallaxRange: 0,
      staggerDelay: 0,
      duration: 0.01,
      viewportAmount: 0.05,
      viewportMargin: '0px',
    };
  }

  return {
    tier,
    isPhone: tier === 'phone',
    isTablet: tier === 'tablet',
    isLaptop: tier === 'laptop',
    isDesktop: tier === 'desktop',
    prefersReducedMotion: false,
    ...base,
  };
}
