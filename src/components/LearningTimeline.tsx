import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Milestone, Award, Compass } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface MilestoneConfig {
  id: string;
  period: string;
  titleKey: string;
  descKey: string;
  tagKey: string;
  status: 'completed' | 'current' | 'upcoming';
  badgeColor: string;
}

const MILESTONES: MilestoneConfig[] = [
  {
    id: 'm1',
    period: '2024',
    titleKey: 'journey.m1_title',
    descKey: 'journey.m1_desc',
    tagKey: 'journey.m1_tag',
    status: 'completed',
    badgeColor: '#38BDF8',
  },
  {
    id: 'm2',
    period: 'QUARTER 01',
    titleKey: 'journey.m2_title',
    descKey: 'journey.m2_desc',
    tagKey: 'journey.m2_tag',
    status: 'completed',
    badgeColor: '#3178C6',
  },
  {
    id: 'm3',
    period: 'QUARTER 02',
    titleKey: 'journey.m3_title',
    descKey: 'journey.m3_desc',
    tagKey: 'journey.m3_tag',
    status: 'completed',
    badgeColor: '#38BDF8',
  },
  {
    id: 'm4',
    period: 'QUARTER 03',
    titleKey: 'journey.m4_title',
    descKey: 'journey.m4_desc',
    tagKey: 'journey.m4_tag',
    status: 'completed',
    badgeColor: '#8B5CF6',
  },
  {
    id: 'm5',
    period: 'QUARTER 04',
    titleKey: 'journey.m5_title',
    descKey: 'journey.m5_desc',
    tagKey: 'journey.m5_tag',
    status: 'current',
    badgeColor: '#EC4899',
  },
  {
    id: 'm6',
    period: 'NEXT MILESTONE',
    titleKey: 'journey.m6_title',
    descKey: 'journey.m6_desc',
    tagKey: 'journey.m6_tag',
    status: 'upcoming',
    badgeColor: '#94A3B8',
  },
];

export const LearningTimeline: React.FC = () => {
  const { t, isUrdu } = useLanguage();
  const [hoveredMilestone, setHoveredMilestone] = useState<string | null>(null);

  return (
    <section id="journey" className="py-24 relative overflow-hidden bg-[#080B16]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#8B5CF6]/05 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading & Subheading */}
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#38BDF8] mb-3">
            <Milestone className="w-4 h-4 text-[#8B5CF6]" />
            <span>{t('journey.kicker')}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-[#F8FAFC] tracking-tight mb-4">
            {t('journey.heading')}
          </h2>
          <p className="text-base sm:text-lg text-[#94A3B8] font-light">
            {t('journey.subheading')}
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          
          {/* Central Vertical Timeline Line (Desktop centered, Mobile left-aligned) */}
          <div className="absolute top-0 bottom-0 left-6 md:left-1/2 md:-translate-x-1/2 w-[2px] bg-gradient-to-b from-[#8B5CF6] via-[#38BDF8] to-[#94A3B8]/20 shadow-[0_0_12px_rgba(139,92,246,0.5)]" />

          {/* Timeline Milestones */}
          <div className="space-y-12 md:space-y-16">
            {MILESTONES.map((item, index) => {
              const isEven = index % 2 === 0;
              const isCurrent = item.status === 'current';
              const isUpcoming = item.status === 'upcoming';

              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setHoveredMilestone(item.id)}
                  onMouseLeave={() => setHoveredMilestone(null)}
                  className={`relative flex flex-col md:flex-row items-start md:items-center ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Content Card (Half Width on Desktop) */}
                  <div className="w-full pl-16 md:pl-0 md:w-[45%]">
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className={`relative group rounded-2xl p-6 sm:p-7 backdrop-blur-xl border transition-all duration-300 hover:-translate-y-1 rtl:text-right ${
                        isCurrent
                          ? 'bg-[#101730] border-[#8B5CF6]/70 shadow-[0_0_35px_rgba(139,92,246,0.35)] ring-1 ring-[#8B5CF6]/40 hover:shadow-[0_0_50px_rgba(139,92,246,0.5)]'
                          : isUpcoming
                          ? 'bg-[#0C1122]/70 border-white/[0.08] hover:border-[#8B5CF6]/40 hover:shadow-[0_0_25px_rgba(139,92,246,0.2)]'
                          : 'bg-[#0E1428] border-white/[0.08] hover:border-[#38BDF8]/60 hover:shadow-[0_0_35px_rgba(56,189,248,0.3)] shadow-xl'
                      }`}
                    >
                      {/* Active Indicator Pulse for Current Role */}
                      {isCurrent && (
                        <div className="absolute -top-3 right-6 rtl:right-auto rtl:left-6 px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-white font-bold shadow-[0_0_15px_rgba(236,72,153,0.5)] flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                          <span>{t('journey.current_badge')}</span>
                        </div>
                      )}

                      {/* Header Row: Period & Tag */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-xs font-mono font-semibold tracking-wider text-[#38BDF8]">
                          {item.period}
                        </span>
                        <span
                          className="text-[11px] font-mono px-2.5 py-0.5 rounded-md border"
                          style={{
                            borderColor: `${item.badgeColor}40`,
                            backgroundColor: `${item.badgeColor}12`,
                            color: item.badgeColor,
                          }}
                        >
                          {t(item.tagKey)}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl sm:text-2xl font-display font-bold text-[#F8FAFC] tracking-tight mb-3">
                        {t(item.titleKey)}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-[#94A3B8] leading-relaxed">
                        {t(item.descKey)}
                      </p>

                      {/* Subtle Milestone Bottom Note */}
                      <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-[#94A3B8]">
                        <span className="flex items-center gap-1.5">
                          {isCurrent ? (
                            <Award className="w-3.5 h-3.5 text-[#EC4899]" />
                          ) : isUpcoming ? (
                            <Compass className="w-3.5 h-3.5 text-[#94A3B8]" />
                          ) : (
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#38BDF8]" />
                          )}
                          <span className="capitalize">{item.status}</span>
                        </span>
                        {isCurrent && <span className="font-mono text-[#38BDF8]">GIAIC Q4</span>}
                      </div>
                    </motion.div>
                  </div>

                  {/* Central Node Indicator Icon */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-20">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-transform duration-300 ${
                        isCurrent
                          ? 'bg-[#8B5CF6] border-white shadow-[0_0_20px_#8B5CF6] scale-110 animate-pulse'
                          : isUpcoming
                          ? 'bg-[#080B16] border-[#94A3B8]/40 text-[#94A3B8]'
                          : 'bg-[#0D1326] border-[#38BDF8] text-[#38BDF8] shadow-[0_0_12px_rgba(56,189,248,0.5)]'
                      }`}
                    >
                      {isCurrent ? (
                        <Award className="w-4 h-4 text-white" />
                      ) : isUpcoming ? (
                        <div className="w-2.5 h-2.5 rounded-full bg-[#94A3B8]" />
                      ) : (
                        <CheckCircle2 className="w-4 h-4 text-[#38BDF8]" />
                      )}
                    </div>
                  </div>

                  {/* Empty Spacer on Opposite Side (Desktop only) */}
                  <div className="hidden md:block md:w-[45%]" />
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
