import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { useViewportTier } from '../hooks/useViewportTier';

const SECTIONS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'journey', label: 'Journey' },
  { id: 'mentorship', label: 'Mentorship' },
  { id: 'approach', label: 'Approach' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

export const ScrollProgress: React.FC = () => {
  const { isPhone, isTablet, isDesktop } = useViewportTier();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: isPhone ? 240 : 180,
    damping: isPhone ? 30 : 26,
    restDelta: 0.001,
  });

  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(SECTIONS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Adaptive bar thickness per device tier
  const barHeightClass = isPhone
    ? 'h-[3px]'
    : isTablet
    ? 'h-[3px]'
    : isDesktop
    ? 'h-[3px]'
    : 'h-[2.5px]';

  return (
    <>
      {/* Top Document Scroll Progress Bar (Phone, Tablet, Laptop, Desktop) */}
      <div className={`fixed top-0 left-0 right-0 ${barHeightClass} z-50 bg-white/[0.03] pointer-events-none`}>
        <motion.div
          className="h-full w-full origin-left bg-gradient-to-r from-[#8B5CF6] via-[#6366F1] to-[#38BDF8] shadow-[0_0_10px_rgba(56,189,248,0.8)]"
          style={{ scaleX }}
        />
      </div>

      {/* Right-Edge Section Scroll Rail (Laptop & Desktop viewports) */}
      <nav
        aria-label="Section scroll progress"
        className="hidden lg:flex fixed right-5 xl:right-7 top-1/2 -translate-y-1/2 z-30 flex-col items-end gap-3"
      >
        {SECTIONS.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => scrollTo(sec.id)}
              className="group flex items-center gap-2.5 cursor-pointer focus:outline-none py-0.5"
              aria-label={`Scroll to ${sec.label}`}
            >
              <span
                className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#0D1326]/90 border border-white/10 backdrop-blur-md transition-all duration-200 ${
                  isActive
                    ? 'text-[#38BDF8] opacity-0 group-hover:opacity-100 translate-x-0'
                    : 'text-[#94A3B8] opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0'
                }`}
              >
                {sec.label}
              </span>
              <span
                className={`block rounded-full transition-all duration-300 ${
                  isActive
                    ? isDesktop
                      ? 'w-3 h-3 bg-[#38BDF8] shadow-[0_0_12px_#38BDF8] ring-2 ring-[#8B5CF6]/50'
                      : 'w-2.5 h-2.5 bg-[#38BDF8] shadow-[0_0_10px_#38BDF8] ring-2 ring-[#8B5CF6]/40'
                    : 'w-1.5 h-1.5 bg-white/25 group-hover:bg-[#8B5CF6] group-hover:scale-125'
                }`}
              />
            </button>
          );
        })}
      </nav>
    </>
  );
};
