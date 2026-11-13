import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Award, Sparkles, Calendar, School } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { useViewportTier } from '../hooks/useViewportTier';

export const EducationSection: React.FC = () => {
  const {
    yDistance,
    staggerDelay,
    duration,
    viewportAmount,
    viewportMargin,
    prefersReducedMotion,
  } = useViewportTier();

  return (
    <section id="education" className="py-24 relative overflow-hidden bg-[#0A0E1F]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#38BDF8]/05 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading & Subheading */}
        <ScrollReveal direction="up" className="mb-16 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#38BDF8] mb-3">
            <GraduationCap className="w-4 h-4 text-[#8B5CF6]" />
            <span>KNOWLEDGE FOUNDATIONS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-[#F8FAFC] tracking-tight mb-4">
            Academic Foundations.
          </h2>
          <p className="text-base sm:text-lg text-[#94A3B8] font-light">
            Formal academics paired with continuous technical computing programs.
          </p>
        </ScrollReveal>

        {/* 3 Education Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 01: Intermediate */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: yDistance }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: viewportAmount, margin: viewportMargin }}
            transition={{ duration, delay: 0, ease: [0.22, 1, 0.36, 1] }}
            className="group relative rounded-2xl bg-[#0D1326] border border-white/[0.08] hover:border-[#8B5CF6]/50 p-6 sm:p-7 shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(139,92,246,0.25)] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-[#8B5CF6]/15 text-[#C4B5FD] border border-[#8B5CF6]/30">
                  <GraduationCap className="w-6 h-6 text-[#8B5CF6]" />
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-[#38BDF8] bg-[#38BDF8]/10 border border-[#38BDF8]/20">
                  <Calendar className="w-3 h-3" />
                  2026 – Present
                </span>
              </div>

              <h3 className="text-xl font-display font-bold text-[#F8FAFC] mb-1 group-hover:text-[#38BDF8] transition-colors">
                Intermediate — Computer Science
              </h3>
              <p className="text-xs font-mono text-[#94A3B8] mb-1">Government Degree Girls College Al-Noor</p>
              <p className="text-[11px] font-mono text-[#38BDF8] mb-4">First Year Student</p>

              <p className="text-sm text-[#94A3B8] leading-relaxed">
                Currently pursuing Intermediate education in Computer Science, reinforcing mathematics, algorithmic thinking, and core sciences.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.06] text-xs font-mono text-[#8B5CF6] flex items-center justify-between">
              <span>Status</span>
              <span>Currently Enrolled</span>
            </div>
          </motion.div>

          {/* Card 02: Matriculation */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: yDistance }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: viewportAmount, margin: viewportMargin }}
            transition={{ duration, delay: staggerDelay, ease: [0.22, 1, 0.36, 1] }}
            className="group relative rounded-2xl bg-[#0D1326] border border-white/[0.08] hover:border-[#38BDF8]/50 p-6 sm:p-7 shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(56,189,248,0.25)] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-[#38BDF8]/15 text-[#38BDF8] border border-[#38BDF8]/30">
                  <School className="w-6 h-6" />
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-[#94A3B8] bg-white/[0.04] border border-white/10">
                  <Calendar className="w-3 h-3" />
                  2025 – 2026
                </span>
              </div>

              <h3 className="text-xl font-display font-bold text-[#F8FAFC] mb-1 group-hover:text-[#38BDF8] transition-colors">
                Matriculation — Computer Science
              </h3>
              <p className="text-xs font-mono text-[#94A3B8] mb-4">The Best Future Grammar School</p>

              <p className="text-sm text-[#94A3B8] leading-relaxed">
                Successfully completed matriculation in Computer Science with a strong academic foundation in computing and quantitative studies.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.06] text-xs font-mono text-[#38BDF8] flex items-center justify-between">
              <span>Status</span>
              <span>Successfully Completed</span>
            </div>
          </motion.div>

          {/* Card 03: Technical Learning Card (GIAIC) */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: yDistance }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: viewportAmount, margin: viewportMargin }}
            transition={{ duration, delay: staggerDelay * 2, ease: [0.22, 1, 0.36, 1] }}
            className="group relative rounded-2xl bg-gradient-to-br from-[#101730] to-[#0A0E1D] border border-[#8B5CF6]/40 p-6 sm:p-7 shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_35px_rgba(139,92,246,0.35)] flex flex-col justify-between ring-1 ring-[#8B5CF6]/30"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-[#EC4899]/15 text-[#EC4899] border border-[#EC4899]/30">
                  <Award className="w-6 h-6" />
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-[#C4B5FD] bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 font-semibold">
                  <Sparkles className="w-3 h-3 text-[#38BDF8]" />
                  Quarter 4
                </span>
              </div>

              <h3 className="text-xl font-display font-bold text-[#F8FAFC] mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#38BDF8] transition-all">
                GIAIC Computing Initiative
              </h3>
              <p className="text-xs font-mono text-[#38BDF8] mb-4">Governor&apos;s Initiative for AI &amp; Computing</p>

              <div className="space-y-2 text-xs text-[#94A3B8]">
                <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                  <span>PCAO-F Exam</span>
                  <span className="text-[#38BDF8] font-bold">Successfully Cleared</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                  <span>Current Role</span>
                  <span className="text-[#F8FAFC] font-semibold">AI Mentor</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                  <span>Next Academic Goal</span>
                  <span className="text-[#A78BFA] font-medium">CCAO-F Prep</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.06] text-xs font-mono text-[#EC4899] flex items-center justify-between">
              <span>Program</span>
              <span>Advanced AI Track</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
