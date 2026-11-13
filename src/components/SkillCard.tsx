import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { useViewportTier } from '../hooks/useViewportTier';

export interface SkillItem {
  id: string;
  name: string;
  category: 'Frontend Development' | 'Programming' | 'Artificial Intelligence';
  description: string;
  icon: React.ReactNode;
  accentColor: string;
  badgeText: string;
}

interface SkillCardProps {
  skill: SkillItem;
  index: number;
}

export const SkillCard: React.FC<SkillCardProps> = ({ skill, index }) => {
  const {
    isPhone,
    isTablet,
    yDistance,
    staggerDelay,
    duration,
    viewportMargin,
    prefersReducedMotion,
  } = useViewportTier();

  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isPhone) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normalizedX = x / rect.width - 0.5;
    const normalizedY = y / rect.height - 0.5;

    setRotateX(-normalizedY * 14);
    setRotateY(normalizedX * 14);

    setGlowPos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!cardRef.current || !e.touches[0]) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const y = e.touches[0].clientY - rect.top;
    setGlowPos({
      x: Math.max(0, Math.min(100, (x / rect.width) * 100)),
      y: Math.max(0, Math.min(100, (y / rect.height) * 100)),
    });
    setIsHovered(true);
  };

  const handleTouchEnd = () => {
    setTimeout(() => setIsHovered(false), 350);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  const getCategoryGradient = (cat: string) => {
    switch (cat) {
      case 'Artificial Intelligence':
        return 'from-[#8B5CF6]/30 via-[#C084FC]/10 to-transparent';
      case 'Programming':
        return 'from-[#38BDF8]/30 via-[#60A5FA]/10 to-transparent';
      default:
        return 'from-[#6366F1]/30 via-[#38BDF8]/10 to-transparent';
    }
  };

  // Column-aware stagger index for phone (1 col), tablet (2 col), laptop/desktop (3 col)
  const colModulo = isPhone ? 1 : isTablet ? 2 : 3;
  const colDelay = (index % colModulo) * staggerDelay + Math.floor(index / colModulo) * (staggerDelay * 0.5);

  return (
    <motion.div
      initial={
        prefersReducedMotion
          ? { opacity: 1 }
          : { opacity: 0, y: yDistance, scale: isPhone ? 0.98 : 0.95 }
      }
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 'some', margin: viewportMargin }}
      transition={{
        duration,
        delay: colDelay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="perspective-1000"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{
          transform: isPhone
            ? isHovered
              ? 'scale(0.985)'
              : 'scale(1)'
            : `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${
                isHovered ? 'scale(1.02)' : 'scale(1)'
              }`,
          transition: isHovered ? 'transform 0.12s ease-out' : 'transform 0.4s ease-out',
        }}
        className="group relative h-full rounded-2xl bg-[#0D1326] border border-white/[0.08] hover:border-white/25 active:border-white/30 p-6 shadow-xl backdrop-blur-md overflow-hidden cursor-pointer"
      >
        {/* Continuous Revolving Border Beam */}
        <div
          className={`absolute -inset-[1px] rounded-2xl transition-opacity duration-300 pointer-events-none ${
            isHovered ? 'opacity-100' : 'opacity-40 group-hover:opacity-100'
          }`}
          style={{
            background: `conic-gradient(from 0deg, transparent 0deg 340deg, ${skill.accentColor} 360deg)`,
            animation: 'border-rotate 6s linear infinite',
          }}
        />

        {/* Soft Radial Cursor / Touch Spotlight Glow (all screens) */}
        {isHovered && (
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle 180px at ${glowPos.x}% ${glowPos.y}%, ${skill.accentColor}30, transparent 80%)`,
            }}
          />
        )}

        {/* Category Ambient Tint */}
        <div
          className={`absolute top-0 right-0 w-36 h-36 rounded-full bg-gradient-to-br ${getCategoryGradient(
            skill.category
          )} blur-2xl pointer-events-none`}
        />

        {/* Card Content Structure */}
        <div className="relative z-10 flex flex-col justify-between h-full">
          <div>
            {/* Top row: Category tag & status indicator */}
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="text-[11px] font-mono tracking-wider uppercase text-[#94A3B8] group-hover:text-[#38BDF8] transition-colors">
                {skill.badgeText}
              </span>
              <div
                className="w-2 h-2 rounded-full transition-transform duration-300 group-hover:scale-125"
                style={{ backgroundColor: skill.accentColor, boxShadow: `0 0 8px ${skill.accentColor}` }}
              />
            </div>

            {/* Icon & Title Header */}
            <div className="flex items-center gap-3.5 mb-3">
              <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] group-hover:scale-110 group-hover:bg-white/[0.08] group-active:scale-105 transition-all duration-300 shrink-0">
                {skill.icon}
              </div>
              <div>
                <h3 className="text-lg font-display font-bold text-[#F8FAFC] tracking-tight group-hover:text-[#38BDF8] transition-colors">
                  {skill.name}
                </h3>
                <span className="text-[11px] text-[#94A3B8]/70">{skill.category}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-[#94A3B8] leading-relaxed group-hover:text-[#CBD5E1] transition-colors mt-2">
              {skill.description}
            </p>
          </div>

          {/* Bottom subtle border highlight */}
          <div className="mt-5 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-[#94A3B8]/70">
            <span>Hands-on Focus</span>
            <span className="group-hover:text-[#F8FAFC] group-hover:translate-x-0.5 transition-all">
              Active Exploration →
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
