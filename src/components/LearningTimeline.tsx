import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { CheckCircle2, Milestone, Award, Compass } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { useViewportTier } from '../hooks/useViewportTier';

interface MilestoneConfig {
  id: string;
  period: string;
  title: string;
  desc: string;
  tag: string;
  status: 'completed' | 'current' | 'upcoming';
  badgeColor: string;
}

const MILESTONES: MilestoneConfig[] = [
  {
    id: 'm1',
    period: '2024',
    title: 'THE BEGINNING',
    desc: 'Selected among 50,000 qualified students from over 5 million students. My learning journey began at Governor House Sindh IT Marquee, where I studied HTML and CSS as prerequisites.',
    tag: 'Governor House Sindh',
    status: 'completed',
    badgeColor: '#38BDF8',
  },
  {
    id: 'm2',
    period: 'QUARTER 01',
    title: 'TYPESCRIPT',
    desc: 'Explored TypeScript, strengthened my programming fundamentals, and successfully cleared the quarter examination.',
    tag: 'Exam Cleared',
    status: 'completed',
    badgeColor: '#3178C6',
  },
  {
    id: 'm3',
    period: 'QUARTER 02',
    title: 'FRONTEND DEVELOPMENT',
    desc: 'Learned Next.js and Tailwind CSS, expanding my understanding of modern frontend development. Successfully cleared the quarter examination.',
    tag: 'Exam Cleared',
    status: 'completed',
    badgeColor: '#38BDF8',
  },
  {
    id: 'm4',
    period: 'QUARTER 03',
    title: 'PYTHON & AGENTIC AI',
    desc: 'Entered the world of Python and Agentic AI, explored intelligent technologies, and successfully cleared the quarter examination.',
    tag: 'Exam Cleared',
    status: 'completed',
    badgeColor: '#8B5CF6',
  },
  {
    id: 'm5',
    period: 'QUARTER 04',
    title: 'AI MENTOR',
    desc: 'Successfully cleared the PCAO-F examination and earned the opportunity to become an AI Mentor. Now helping fellow students understand concepts, prepare for examinations, and progress in their learning journey.',
    tag: 'Active Role & PCAO-F',
    status: 'current',
    badgeColor: '#EC4899',
  },
  {
    id: 'm6',
    period: 'NEXT MILESTONE',
    title: 'CCAO-F',
    desc: 'Preparing for my next academic milestone: successfully clearing the CCAO-F examination.',
    tag: 'Preparation Phase',
    status: 'upcoming',
    badgeColor: '#94A3B8',
  },
];

export const LearningTimeline: React.FC = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const {
    isPhone,
    isTablet,
    xDistance,
    yDistance,
    duration,
    viewportAmount,
    viewportMargin,
    prefersReducedMotion,
  } = useViewportTier();

  // Scroll-scrubbed vertical timeline beam across phone, tablet, laptop, desktop
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 75%', 'end 65%'],
  });
  const lineScaleY = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <section id="journey" className="py-24 relative overflow-hidden bg-[#080B16]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#8B5CF6]/05 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading & Subheading */}
        <ScrollReveal direction="up" className="mb-20 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#38BDF8] mb-3">
            <Milestone className="w-4 h-4 text-[#8B5CF6]" />
            <span>PROGRESSION TIMELINE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-[#F8FAFC] tracking-tight mb-4">
            Every Milestone Has a Story.
          </h2>
          <p className="text-base sm:text-lg text-[#94A3B8] font-light">
            From being a curious learner to becoming a mentor.
          </p>
        </ScrollReveal>

        {/* Timeline Container */}
        <div ref={timelineRef} className="relative">
          {/* Base Track Line */}
          <div className="absolute top-0 bottom-0 left-6 md:left-1/2 md:-translate-x-1/2 w-[2px] bg-white/[0.08]" />

          {/* Active Scroll-Scrubbed Gradient Line */}
          <motion.div
            style={{ scaleY: prefersReducedMotion ? 1 : lineScaleY }}
            className="absolute top-0 bottom-0 left-6 md:left-1/2 md:-translate-x-1/2 w-[2px] origin-top bg-gradient-to-b from-[#8B5CF6] via-[#38BDF8] to-[#EC4899] shadow-[0_0_14px_rgba(139,92,246,0.65)]"
          />

          {/* Timeline Milestones */}
          <div className="space-y-12 md:space-y-16">
            {MILESTONES.map((item, index) => {
              const isEven = index % 2 === 0;
              const isCurrent = item.status === 'current';
              const isUpcoming = item.status === 'upcoming';

              // Responsive animation per device tier:
              // Phone: crisp vertical glide (no horizontal shift)
              // Tablet (<768px stacked): gentle slide from right
              // Tablet (>=768px) / Laptop / Desktop: alternating opposing slide
              const initialMotion = prefersReducedMotion
                ? { opacity: 1, x: 0, y: 0 }
                : isPhone
                ? { opacity: 0, x: 0, y: yDistance }
                : isTablet
                ? { opacity: 0, x: xDistance, y: yDistance * 0.35 }
                : { opacity: 0, x: isEven ? xDistance : -xDistance, y: 0 };

              return (
                <div
                  key={item.id}
                  className={`relative flex flex-col md:flex-row items-start md:items-center ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Content Card (Half Width on Desktop/Laptop/md-Tablet) */}
                  <div className="w-full pl-16 md:pl-0 md:w-[45%]">
                    <motion.div
                      initial={initialMotion}
                      whileInView={{ opacity: 1, x: 0, y: 0 }}
                      viewport={{ once: true, amount: viewportAmount, margin: viewportMargin }}
                      transition={{ duration, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                      className={`interactive-card relative group rounded-2xl p-6 sm:p-7 backdrop-blur-xl border ${
                        isCurrent
                          ? 'interactive-card-pink bg-[#101730] border-[#8B5CF6]/70 shadow-[0_0_35px_rgba(139,92,246,0.35)] ring-1 ring-[#8B5CF6]/40 hover:shadow-[0_0_50px_rgba(139,92,246,0.5)]'
                          : isUpcoming
                          ? 'interactive-card-violet bg-[#0C1122]/70 border-white/[0.08] hover:border-[#8B5CF6]/45 hover:shadow-[0_0_25px_rgba(139,92,246,0.25)]'
                          : 'interactive-card-cyan bg-[#0E1428] border-white/[0.08] hover:border-[#38BDF8]/60 hover:shadow-[0_0_35px_rgba(56,189,248,0.3)] shadow-xl'
                      }`}
                    >
                      {/* Active Indicator Pulse for Current Role */}
                      {isCurrent && (
                        <div className="absolute -top-3 right-6 px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-white font-bold shadow-[0_0_15px_rgba(236,72,153,0.5)] flex items-center gap-1.5 group-hover:scale-105 transition-transform duration-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                          <span>CURRENT MILESTONE</span>
                        </div>
                      )}

                      {/* Header Row: Period & Tag */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-xs font-mono font-semibold tracking-wider text-[#38BDF8] group-hover:text-white transition-colors duration-300">
                          {item.period}
                        </span>
                        <span
                          className="text-[11px] font-mono px-2.5 py-0.5 rounded-md border transition-transform duration-300 group-hover:scale-105"
                          style={{
                            borderColor: `${item.badgeColor}40`,
                            backgroundColor: `${item.badgeColor}12`,
                            color: item.badgeColor,
                          }}
                        >
                          {item.tag}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl sm:text-2xl font-display font-bold text-[#F8FAFC] tracking-tight mb-3 group-hover:text-[#38BDF8] transition-colors duration-300">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-[#94A3B8] leading-relaxed group-hover:text-[#CBD5E1] transition-colors duration-300">
                        {item.desc}
                      </p>

                      {/* Subtle Milestone Bottom Note */}
                      <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-[#94A3B8]">
                        <span className="flex items-center gap-1.5">
                          {isCurrent ? (
                            <Award className="w-3.5 h-3.5 text-[#EC4899] group-hover:scale-110 transition-transform" />
                          ) : isUpcoming ? (
                            <Compass className="w-3.5 h-3.5 text-[#94A3B8] group-hover:rotate-45 transition-transform duration-300" />
                          ) : (
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#38BDF8] group-hover:scale-110 transition-transform" />
                          )}
                          <span className="capitalize">{item.status}</span>
                        </span>
                        {isCurrent && <span className="font-mono text-[#38BDF8]">GIAIC Q4</span>}
                      </div>
                    </motion.div>
                  </div>

                  {/* Central Node Indicator Icon with Scale-In on Scroll */}
                  <motion.div
                    initial={prefersReducedMotion ? { scale: 1 } : { scale: 0.6, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: viewportAmount }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-20"
                  >
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-transform duration-300 hover:scale-115 active:scale-95 ${
                        isCurrent
                          ? 'bg-[#8B5CF6] border-white shadow-[0_0_20px_#8B5CF6] scale-110 animate-pulse'
                          : isUpcoming
                          ? 'bg-[#080B16] border-[#94A3B8]/40 text-[#94A3B8] hover:border-[#8B5CF6]/60'
                          : 'bg-[#0D1326] border-[#38BDF8] text-[#38BDF8] shadow-[0_0_12px_rgba(56,189,248,0.5)] hover:shadow-[0_0_20px_rgba(56,189,248,0.75)]'
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
                  </motion.div>

                  {/* Empty Spacer on Opposite Side (Desktop/Laptop/md-Tablet only) */}
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
