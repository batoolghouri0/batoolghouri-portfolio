import React from 'react';
import { Users, Award, Network, ShieldCheck, HeartHandshake } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const MentorshipSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="mentorship" className="py-24 relative overflow-hidden bg-[#0A0F22]">
      {/* Background radial spotlight and network aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-[#8B5CF6]/12 via-[#38BDF8]/10 to-transparent rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading & Subheading */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#38BDF8] mb-3">
            <HeartHandshake className="w-4 h-4 text-[#EC4899]" />
            <span>{t('mentorship.kicker')}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-[#F8FAFC] tracking-tight mb-4">
            {t('mentorship.heading')}
          </h2>
          <p className="text-base sm:text-lg text-[#94A3B8] font-light">
            {t('mentorship.subheading')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Inspiring Achievement Highlight Card (5 Cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[400px]">
              
              {/* Glowing Aura Behind Card */}
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#38BDF8] opacity-60 blur-xl animate-pulse-subtle" />

              {/* Main Card */}
              <div className="relative rounded-3xl bg-[#0E152D] border border-white/15 p-8 shadow-2xl backdrop-blur-2xl overflow-hidden rtl:text-right">
                
                {/* Decorative Spotlight Sweep */}
                <div className="absolute -top-24 -left-24 w-52 h-52 bg-[#8B5CF6]/30 rounded-full blur-3xl pointer-events-none" />

                {/* Badge Header */}
                <div className="flex items-center justify-between gap-3 mb-6">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-[#8B5CF6]/20 to-[#EC4899]/20 border border-[#8B5CF6]/40 text-[#C4B5FD]">
                    <Award className="w-7 h-7 text-[#EC4899]" />
                  </div>
                  <span className="text-[11px] font-mono tracking-widest text-[#38BDF8] px-3 py-1 rounded-full bg-[#38BDF8]/10 border border-[#38BDF8]/30 uppercase font-semibold">
                    {t('mentorship.badge')}
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-mono text-[#94A3B8] uppercase tracking-wider block mb-1">
                      {t('mentorship.org_label')}
                    </span>
                    <h3 className="text-2xl font-display font-bold text-[#F8FAFC]">
                      {t('mentorship.org_val')}
                    </h3>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <span className="text-[11px] font-mono text-[#94A3B8] block mb-1">
                      {t('mentorship.cred_label')}
                    </span>
                    <div className="text-sm font-semibold text-[#38BDF8] flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#38BDF8]" />
                      {t('mentorship.cred_val')}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#8B5CF6]/15 to-[#38BDF8]/10 border border-[#8B5CF6]/30">
                    <span className="text-[11px] font-mono text-[#C4B5FD] block mb-1">
                      {t('mentorship.role_label')}
                    </span>
                    <div className="text-sm font-bold text-white flex items-center gap-2">
                      <Users className="w-4 h-4 text-[#8B5CF6]" />
                      {t('mentorship.role_val')}
                    </div>
                  </div>
                </div>

                {/* Quote in Card */}
                <div className="mt-6 pt-5 border-t border-white/10 text-xs text-[#94A3B8] italic leading-relaxed">
                  {t('mentorship.quote')}
                </div>

              </div>
            </div>
          </div>

          {/* Right Column: Narrative Journey & Interactive Values (7 Cols) */}
          <div className="lg:col-span-7 space-y-6 rtl:text-right">
            
            <div className="p-8 rounded-3xl bg-[#0E152D]/80 border border-white/10 backdrop-blur-xl shadow-xl">
              <p className="text-lg text-[#F8FAFC] font-medium leading-relaxed mb-4">
                {t('mentorship.p1')}
              </p>
              <p className="text-[#94A3B8] leading-relaxed mb-4">
                {t('mentorship.p2')}
              </p>
              <p className="text-[#94A3B8] leading-relaxed">
                {t('mentorship.p3')}
              </p>
            </div>

            {/* Core Mentorship Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              <div className="p-5 rounded-2xl bg-[#0E152D]/50 border border-white/[0.06] hover:border-[#8B5CF6]/40 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-[#8B5CF6]/20 flex items-center justify-center text-[#8B5CF6] mb-3">
                  <Network className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white mb-1">{t('mentorship.pillar1_title')}</h4>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  {t('mentorship.pillar1_desc')}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#0E152D]/50 border border-white/[0.06] hover:border-[#38BDF8]/40 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-[#38BDF8]/20 flex items-center justify-center text-[#38BDF8] mb-3">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white mb-1">{t('mentorship.pillar2_title')}</h4>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  {t('mentorship.pillar2_desc')}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#0E152D]/50 border border-white/[0.06] hover:border-[#EC4899]/40 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-[#EC4899]/20 flex items-center justify-center text-[#EC4899] mb-3">
                  <Users className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white mb-1">{t('mentorship.pillar3_title')}</h4>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  {t('mentorship.pillar3_desc')}
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
