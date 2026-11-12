import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

export interface SkillItem {
  id: string;
  name: string;
  category: 'Frontend Development' | 'Programming' | 'Artificial Intelligence';
  descriptionKey: string;
  icon: React.ReactNode;
  accentColor: string;
  badgeText: string;
  badgeTextUrdu?: string;
}

interface SkillCardProps {
  skill: SkillItem;
  index: number;
}

export const SkillCard: React.FC<SkillCardProps> = ({ skill, index }) => {
  const { t, isUrdu } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normalizedX = (x / rect.width) - 0.5;
    const normalizedY = (y / rect.height) - 0.5;

    setRotateX(-normalizedY * 14);
    setRotateY(normalizedX * 14);

    setGlowPos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
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

  const categoryLabel = isUrdu
    ? skill.category === 'Frontend Development'
      ? 'فرنٹ اینڈ ڈویلپمنٹ'
      : skill.category === 'Programming'
      ? 'پروگرامنگ'
      : 'مصنوعی ذہانت'
    : skill.category;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="perspective-1000"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${
            isHovered ? 'scale(1.02)' : 'scale(1)'
          }`,
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.4s ease-out',
        }}
        className="group relative h-full rounded-2xl bg-[#0D1326] border border-white/[0.08] p-6 shadow-xl backdrop-blur-md overflow-hidden cursor-pointer rtl:text-right"
      >
        {/* Continuous Revolving Border Beam */}
        <div
          className="absolute -inset-[1px] rounded-2xl opacity-40 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `conic-gradient(from 0deg, transparent 0deg 340deg, ${skill.accentColor} 360deg)`,
            animation: 'border-rotate 6s linear infinite',
          }}
        />

        {/* Soft Radial Cursor Follower Glow */}
        {isHovered && (
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle 180px at ${glowPos.x}% ${glowPos.y}%, ${skill.accentColor}25, transparent 80%)`,
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
                {isUrdu && skill.badgeTextUrdu ? skill.badgeTextUrdu : skill.badgeText}
              </span>
              <div
                className="w-2 h-2 rounded-full transition-transform duration-300 group-hover:scale-125"
                style={{ backgroundColor: skill.accentColor, boxShadow: `0 0 8px ${skill.accentColor}` }}
              />
            </div>

            {/* Icon & Title Header */}
            <div className="flex items-center gap-3.5 mb-3">
              <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] group-hover:scale-110 group-hover:bg-white/[0.08] transition-all duration-300 shrink-0">
                {skill.icon}
              </div>
              <div>
                <h3 className="text-lg font-display font-bold text-[#F8FAFC] tracking-tight group-hover:text-[#38BDF8] transition-colors">
                  {skill.name}
                </h3>
                <span className="text-[11px] text-[#94A3B8]/70">{categoryLabel}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-[#94A3B8] leading-relaxed group-hover:text-[#CBD5E1] transition-colors mt-2">
              {t(skill.descriptionKey)}
            </p>
          </div>

          {/* Bottom subtle border highlight */}
          <div className="mt-5 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-[#94A3B8]/70">
            <span>{t('skills.focus_tag')}</span>
            <span className="group-hover:text-[#F8FAFC] transition-colors">{t('skills.active_tag')}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
