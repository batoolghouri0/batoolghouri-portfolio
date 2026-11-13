import React, { useState, useRef } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Smile, Search, Split, Compass, CheckCircle, RefreshCw, Lightbulb } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { useViewportTier } from '../hooks/useViewportTier';

interface StepConfig {
  num: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  accent: string;
}

const STEPS: StepConfig[] = [
  {
    num: '01',
    title: 'STAY CALM',
    desc: 'Approach the challenge with a positive mindset and confidence that it can be solved.',
    icon: <Smile className="w-5 h-5" />,
    accent: '#38BDF8',
  },
  {
    num: '02',
    title: 'UNDERSTAND',
    desc: 'Identify the actual problem and understand what is causing it.',
    icon: <Search className="w-5 h-5" />,
    accent: '#818CF8',
  },
  {
    num: '03',
    title: 'BREAK IT DOWN',
    desc: 'Divide complex problems into smaller, manageable steps.',
    icon: <Split className="w-5 h-5" />,
    accent: '#8B5CF6',
  },
  {
    num: '04',
    title: 'RESEARCH',
    desc: 'Explore possible solutions, investigate different approaches, and find the most suitable one.',
    icon: <Compass className="w-5 h-5" />,
    accent: '#A78BFA',
  },
  {
    num: '05',
    title: 'IMPLEMENT & TEST',
    desc: 'Apply the selected solution and test whether it works as expected.',
    icon: <CheckCircle className="w-5 h-5" />,
    accent: '#38BDF8',
  },
  {
    num: '06',
    title: 'LEARN & IMPROVE',
    desc: 'Learn from mistakes, identify improvements, and refine the solution.',
    icon: <RefreshCw className="w-5 h-5" />,
    accent: '#EC4899',
  },
];

export const ProblemSolvingSection: React.FC = () => {
  const listRef = useRef<HTMLDivElement>(null);
  const {
    isPhone,
    xDistance,
    yDistance,
    staggerDelay,
    duration,
    viewportAmount,
    viewportMargin,
    prefersReducedMotion,
  } = useViewportTier();

  const [activeStep, setActiveStep] = useState<number>(0);

  // Scroll-scrubbed vertical line for steps
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start 75%', 'end 65%'],
  });
  const lineScaleY = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <section id="approach" className="py-24 relative overflow-hidden bg-[#080B16]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-[#8B5CF6]/06 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading & Subheading */}
        <ScrollReveal direction="up" className="mb-20 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#8B5CF6] mb-3">
            <Lightbulb className="w-4 h-4 text-[#38BDF8]" />
            <span>METHODICAL ENGINEERING</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-[#F8FAFC] tracking-tight mb-4">
            How I Turn Problems Into Solutions.
          </h2>
          <p className="text-base sm:text-lg text-[#94A3B8] font-light">
            Every challenge has a solution. The key is understanding the problem before rushing towards an answer.
          </p>
        </ScrollReveal>

        {/* Vertically Numbered Interactive Process */}
        <div ref={listRef} className="relative">
          {/* Base Connector Track */}
          <div className="absolute top-6 bottom-6 left-[23px] sm:left-[31px] w-[2px] bg-white/[0.08]" />

          {/* Continuous Scroll-Scrubbed Gradient Line */}
          <motion.div
            style={{ scaleY: prefersReducedMotion ? 1 : lineScaleY }}
            className="absolute top-6 bottom-6 left-[23px] sm:left-[31px] w-[2px] origin-top bg-gradient-to-b from-[#38BDF8] via-[#8B5CF6] to-[#EC4899] shadow-[0_0_12px_rgba(139,92,246,0.45)]"
          />

          <div className="space-y-6">
            {STEPS.map((step, idx) => {
              const isSelected = activeStep === idx;

              const initialStep = prefersReducedMotion
                ? { opacity: 1, x: 0, y: 0 }
                : isPhone
                ? { opacity: 0, x: 0, y: yDistance }
                : { opacity: 0, x: -xDistance * 0.75, y: yDistance * 0.25 };

              return (
                <motion.div
                  key={step.num}
                  initial={initialStep}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, amount: viewportAmount, margin: viewportMargin }}
                  transition={{
                    duration,
                    delay: idx * (staggerDelay * 0.75),
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  onClick={() => setActiveStep(idx)}
                  className={`relative flex items-start gap-4 sm:gap-6 p-4 sm:p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-[#101730] border-[#8B5CF6]/60 shadow-[0_0_30px_rgba(139,92,246,0.25)] pl-5 sm:pl-7'
                      : 'bg-[#0D1224]/80 border-white/[0.06] hover:bg-[#10162B] hover:border-white/15'
                  }`}
                >
                  {/* Step Number Circle on the Line */}
                  <div
                    className={`relative z-10 flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center font-display font-extrabold text-base sm:text-xl border-2 transition-all duration-300 ${
                      isSelected
                        ? 'bg-gradient-to-br from-[#8B5CF6] to-[#38BDF8] text-white border-white shadow-[0_0_20px_rgba(139,92,246,0.6)] scale-105'
                        : 'bg-[#080B16] text-[#94A3B8] border-white/10 hover:border-[#8B5CF6]/50'
                    }`}
                  >
                    {step.num}
                  </div>

                  {/* Step Details */}
                  <div className="flex-1 pt-1">
                    <div className="flex items-center gap-3 mb-1.5">
                      <div
                        className="p-1.5 rounded-lg text-white"
                        style={{ backgroundColor: `${step.accent}25` }}
                      >
                        <span style={{ color: step.accent }}>{step.icon}</span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-display font-bold text-[#F8FAFC] tracking-tight">
                        {step.title}
                      </h3>
                    </div>

                    <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed max-w-2xl">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
