import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Smile, Search, Split, Compass, CheckCircle, RefreshCw, Lightbulb } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface StepConfig {
  num: string;
  titleKey: string;
  descKey: string;
  icon: React.ReactNode;
  accent: string;
}

const STEPS: StepConfig[] = [
  {
    num: '01',
    titleKey: 'approach.s1_title',
    descKey: 'approach.s1_desc',
    icon: <Smile className="w-5 h-5" />,
    accent: '#38BDF8',
  },
  {
    num: '02',
    titleKey: 'approach.s2_title',
    descKey: 'approach.s2_desc',
    icon: <Search className="w-5 h-5" />,
    accent: '#818CF8',
  },
  {
    num: '03',
    titleKey: 'approach.s3_title',
    descKey: 'approach.s3_desc',
    icon: <Split className="w-5 h-5" />,
    accent: '#8B5CF6',
  },
  {
    num: '04',
    titleKey: 'approach.s4_title',
    descKey: 'approach.s4_desc',
    icon: <Compass className="w-5 h-5" />,
    accent: '#A78BFA',
  },
  {
    num: '05',
    titleKey: 'approach.s5_title',
    descKey: 'approach.s5_desc',
    icon: <CheckCircle className="w-5 h-5" />,
    accent: '#38BDF8',
  },
  {
    num: '06',
    titleKey: 'approach.s6_title',
    descKey: 'approach.s6_desc',
    icon: <RefreshCw className="w-5 h-5" />,
    accent: '#EC4899',
  },
];

export const ProblemSolvingSection: React.FC = () => {
  const { t } = useLanguage();
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <section id="approach" className="py-24 relative overflow-hidden bg-[#080B16]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-[#8B5CF6]/06 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading & Subheading */}
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#8B5CF6] mb-3">
            <Lightbulb className="w-4 h-4 text-[#38BDF8]" />
            <span>{t('approach.kicker')}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-[#F8FAFC] tracking-tight mb-4">
            {t('approach.heading')}
          </h2>
          <p className="text-base sm:text-lg text-[#94A3B8] font-light">
            {t('approach.subheading')}
          </p>
        </div>

        {/* Vertically Numbered Interactive Process */}
        <div className="relative">
          
          {/* Continuous Line (Left-aligned for LTR, Right-aligned for RTL) */}
          <div className="absolute top-6 bottom-6 left-[23px] sm:left-[31px] rtl:left-auto rtl:right-[23px] sm:rtl:right-[31px] w-[2px] bg-gradient-to-b from-[#38BDF8] via-[#8B5CF6] to-[#EC4899] shadow-[0_0_10px_rgba(139,92,246,0.3)]" />

          <div className="space-y-6">
            {STEPS.map((step, idx) => {
              const isSelected = activeStep === idx;

              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  onClick={() => setActiveStep(idx)}
                  className={`relative flex items-start gap-4 sm:gap-6 p-4 sm:p-6 rounded-2xl border transition-all duration-300 cursor-pointer rtl:text-right ${
                    isSelected
                      ? 'bg-[#101730] border-[#8B5CF6]/60 shadow-[0_0_30px_rgba(139,92,246,0.25)] pl-5 sm:pl-7 rtl:pl-4 sm:rtl:pl-6 rtl:pr-5 sm:rtl:pr-7'
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
                        {t(step.titleKey)}
                      </h3>
                    </div>

                    <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed max-w-2xl">
                      {t(step.descKey)}
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
