import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Compass, Sparkles, UserCheck, BookOpen, Award } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { useViewportTier } from '../hooks/useViewportTier';

export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { parallaxRange, prefersReducedMotion } = useViewportTier();
  const profilePhotoUrl = '/batool-photo.jpg';
  const [isRevealed, setIsRevealed] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const ambientY = useTransform(
    scrollYProgress,
    [0, 1],
    [-parallaxRange * 0.6, prefersReducedMotion ? 0 : parallaxRange * 0.6]
  );

  return (
    <section ref={sectionRef} id="about" className="py-24 relative overflow-hidden bg-[#080B16]">
      {/* Background radial glow with scroll parallax */}
      <motion.div
        style={{ y: ambientY }}
        className="absolute top-1/2 left-0 w-96 h-96 bg-[#8B5CF6]/08 rounded-full blur-[120px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading & Subheading */}
        <ScrollReveal direction="up" className="mb-16 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#38BDF8] mb-3">
            <Compass className="w-4 h-4 text-[#8B5CF6]" />
            <span>DISCOVER THE JOURNEY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-[#F8FAFC] tracking-tight mb-4">
            Beyond The Code.
          </h2>
          <p className="text-base sm:text-lg text-[#94A3B8] font-light">
            Curiosity brought me here. Continuous learning keeps me moving.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Interactive Personal Identity Card (5 Cols) */}
          <ScrollReveal direction="scale" className="lg:col-span-5 flex justify-center">
            <div
              onMouseEnter={() => setIsRevealed(true)}
              onMouseLeave={() => setIsRevealed(false)}
              onClick={() => setIsRevealed(!isRevealed)}
              className="group relative w-full max-w-[370px] cursor-pointer select-none transition-transform duration-500 hover:-translate-y-1"
            >
              {/* Animated Revolving Gradient Border */}
              <div className="absolute -inset-[1.5px] rounded-3xl bg-gradient-to-br from-[#8B5CF6] via-[#38BDF8] to-[#6366F1] opacity-70 group-hover:opacity-100 blur-[2px] transition-all duration-500 animate-border-rotate" />

              {/* Inner Card Container */}
              <div className="relative rounded-3xl bg-[#0B1021] border border-white/10 p-7 sm:p-8 shadow-2xl backdrop-blur-2xl overflow-hidden transition-all duration-500 group-hover:shadow-[0_0_50px_rgba(139,92,246,0.4)]">
                {/* Background Glass Mesh Accent */}
                <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[#8B5CF6]/20 blur-3xl group-hover:scale-125 transition-transform duration-700 pointer-events-none" />
                <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-[#38BDF8]/20 blur-3xl group-hover:scale-125 transition-transform duration-700 pointer-events-none" />

                {/* Identity Frame (Reveals Batool's photo on hover/tap, Monogram by default) */}
                <div className="relative mx-auto w-44 h-44 sm:w-48 sm:h-48 rounded-2xl p-1 bg-gradient-to-tr from-[#8B5CF6] via-[#38BDF8] to-[#8B5CF6] shadow-xl mb-6 transition-all duration-500 group-hover:scale-105">
                  <div className="w-full h-full rounded-[14px] bg-[#090D1C] flex items-center justify-center overflow-hidden relative">
                    {/* Default State: BG Monogram */}
                    <div
                      className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 ${
                        isRevealed ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100'
                      }`}
                    >
                      <img
                        src="/batool-logo.png"
                        alt="Batool Ghouri BG Monogram"
                        className="w-24 h-24 object-contain transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>

                    {/* Hover/Revealed State: Actual Attached Photograph */}
                    <div
                      className={`absolute inset-0 transition-all duration-500 ease-out ${
                        isRevealed ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                      }`}
                    >
                      <img
                        src={profilePhotoUrl}
                        alt="Batool Ghouri"
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1021]/80 via-transparent to-transparent" />
                    </div>

                    {/* Soft glowing aura border */}
                    <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[14px] pointer-events-none" />
                  </div>
                </div>

                {/* Card Primary Content */}
                <div className="text-center">
                  <h3 className="text-2xl font-display font-bold text-[#F8FAFC] tracking-tight transition-colors group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#38BDF8]">
                    Batool Ghouri
                  </h3>
                  <p className="text-xs font-mono font-medium text-[#38BDF8] mt-1.5 mb-4">
                    Frontend Developer & AI Enthusiast
                  </p>

                  <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-[#8B5CF6] to-transparent mx-auto mb-4" />

                  {/* Dynamic Identity Details */}
                  <div className="space-y-2 text-left text-xs transition-all duration-300">
                    <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                      <span className="text-[#94A3B8] flex items-center gap-1.5">
                        <UserCheck className="w-3.5 h-3.5 text-[#8B5CF6]" />
                        Role:
                      </span>
                      <span className="font-semibold text-[#F8FAFC]">AI Mentor @ GIAIC</span>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                      <span className="text-[#94A3B8] flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-[#38BDF8]" />
                        Academic Stage:
                      </span>
                      <span className="font-semibold text-[#F8FAFC]">Quarter 4 Student</span>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                      <span className="text-[#94A3B8] flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-[#8B5CF6]" />
                        Certified:
                      </span>
                      <span className="font-semibold text-[#38BDF8]">PCAO-F Exam Cleared</span>
                    </div>

                    {/* Philosophy Reveal */}
                    <div
                      className={`overflow-hidden transition-all duration-500 ease-out ${
                        isRevealed ? 'max-h-24 opacity-100 pt-1.5' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="p-2.5 rounded-lg bg-gradient-to-r from-[#8B5CF6]/15 to-[#38BDF8]/10 border border-[#8B5CF6]/30 text-[11px] text-[#C4B5FD] leading-relaxed">
                        <span className="font-semibold text-white block mb-0.5">Philosophy:</span>
                        &quot;Turning curiosity into technical skills through continuous learning and mentoring.&quot;
                      </div>
                    </div>
                  </div>

                  {/* Interactive Hover/Tap Label */}
                  <div className="mt-4 pt-3 border-t border-white/[0.08] text-[11px] font-mono tracking-widest text-[#94A3B8] uppercase flex items-center justify-center gap-1.5 group-hover:text-[#38BDF8] transition-colors">
                    <Sparkles className="w-3 h-3 text-[#8B5CF6] group-hover:animate-spin" />
                    <span>{isRevealed ? 'PHOTO REVEALED' : 'HOVER TO REVEAL'}</span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Narrative Content & Values (7 Cols) */}
          <div className="lg:col-span-7 space-y-6 text-[#94A3B8] text-base leading-relaxed">
            <ScrollReveal direction="right" delay={0.05}>
              <div className="p-6 rounded-2xl bg-[#101629]/60 border border-white/[0.08] backdrop-blur-md hover:border-[#8B5CF6]/30 transition-colors">
                <p className="text-[#F8FAFC] text-lg font-medium leading-relaxed mb-4">
                  I&apos;m Batool Ghouri, a Computer Science student and aspiring technology professional. My journey started in 2024 through GIAIC (Governor&apos;s Initiative for AI and Computing), where I began exploring programming and modern technologies.
                </p>
                <p className="leading-relaxed">
                  Over the past two years, I&apos;ve developed my understanding of frontend development, programming, and Artificial Intelligence. Currently, I&apos;m in Quarter 4 of my learning journey. Alongside my studies, I&apos;ve taken on the role of an AI Mentor, helping fellow students understand concepts and prepare for their PCAO-F examinations.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.12}>
              <div className="p-6 rounded-2xl bg-gradient-to-r from-[#8B5CF6]/10 via-[#101629]/50 to-transparent border border-[#8B5CF6]/20 hover:border-[#38BDF8]/40 transition-colors">
                <h4 className="text-sm font-mono tracking-widest text-[#38BDF8] uppercase mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
                  CORE PERSPECTIVE
                </h4>
                <p className="text-[#F1F5F9] font-medium italic">
                  &quot;For me, technology is more than writing code. It&apos;s about curiosity, creativity, problem-solving, and never stopping the learning process.&quot;
                </p>
              </div>
            </ScrollReveal>

            {/* 3 Pillars of Identity */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <ScrollReveal direction="up" index={0}>
                <div className="h-full p-4 rounded-xl bg-[#101629]/40 border border-white/[0.05] hover:border-[#8B5CF6]/40 hover:-translate-y-1 transition-all duration-300">
                  <div className="text-[#8B5CF6] font-display font-bold text-lg mb-1">Curious Mind</div>
                  <p className="text-xs text-[#94A3B8]">
                    Continuously asking why, dissecting systems, and embracing technical challenges.
                  </p>
                </div>
              </ScrollReveal>
              <ScrollReveal direction="up" index={1}>
                <div className="h-full p-4 rounded-xl bg-[#101629]/40 border border-white/[0.05] hover:border-[#38BDF8]/40 hover:-translate-y-1 transition-all duration-300">
                  <div className="text-[#38BDF8] font-display font-bold text-lg mb-1">Creative Thinking</div>
                  <p className="text-xs text-[#94A3B8]">
                    Translating logical algorithms into fluid, intuitive user experiences.
                  </p>
                </div>
              </ScrollReveal>
              <ScrollReveal direction="up" index={2}>
                <div className="h-full p-4 rounded-xl bg-[#101629]/40 border border-white/[0.05] hover:border-[#C4B5FD]/40 hover:-translate-y-1 transition-all duration-300">
                  <div className="text-[#C4B5FD] font-display font-bold text-lg mb-1">Continuous Growth</div>
                  <p className="text-xs text-[#94A3B8]">
                    Evolving from learner to mentor and giving back to the community.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
