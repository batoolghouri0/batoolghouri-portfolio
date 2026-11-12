import React from 'react';
import { ArrowUp } from 'lucide-react';
import { BgMonogram } from './Icons';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t, isUrdu } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#050711] border-t border-white/[0.08] text-[#94A3B8] text-xs py-14 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-20 bg-[#8B5CF6]/10 blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-white/[0.06]">
          
          {/* Brand Info */}
          <div className="flex items-center gap-3">
            <BgMonogram size={42} />
            <div>
              <div className="font-display font-bold text-base text-[#F8FAFC]">
                {t('hero.name')}
              </div>
              <div className="text-[11px] font-mono text-[#38BDF8]">
                {isUrdu ? 'فرنٹ اینڈ ڈویلپر | اے آئی کی دلدادہ · اے آئی مینٹر @ GIAIC' : 'Frontend Developer | AI Enthusiast · AI Mentor @ GIAIC'}
              </div>
            </div>
          </div>

          {/* Brand Philosophy */}
          <div className={`text-center ${isUrdu ? 'md:text-left' : 'md:text-right'} max-w-sm`}>
            <p className="italic text-[#C4B5FD] text-xs">
              {t('hero.statement')}
            </p>
            <p className="text-[11px] text-[#94A3B8]/60 mt-1">
              {isUrdu
                ? 'جدید ویب تجربات کی تعمیر اور خود مختار ایجنٹ ورک فلوز کی جستجو۔'
                : 'Building modern web experiences and exploring autonomous agent workflows.'}
            </p>
          </div>

        </div>

        {/* Links & Copyright Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs">
            <button onClick={() => scrollTo('hero')} className="hover:text-white transition-colors cursor-pointer">
              {t('nav.home')}
            </button>
            <button onClick={() => scrollTo('about')} className="hover:text-white transition-colors cursor-pointer">
              {t('nav.about')}
            </button>
            <button onClick={() => scrollTo('skills')} className="hover:text-white transition-colors cursor-pointer">
              {t('nav.skills')}
            </button>
            <button onClick={() => scrollTo('journey')} className="hover:text-white transition-colors cursor-pointer">
              {t('nav.journey')}
            </button>
            <button onClick={() => scrollTo('mentorship')} className="hover:text-white transition-colors cursor-pointer">
              {t('nav.mentorship')}
            </button>
            <button onClick={() => scrollTo('approach')} className="hover:text-white transition-colors cursor-pointer">
              {t('nav.approach')}
            </button>
            <button onClick={() => scrollTo('education')} className="hover:text-white transition-colors cursor-pointer">
              {t('nav.education')}
            </button>
            <button onClick={() => scrollTo('contact')} className="hover:text-white transition-colors cursor-pointer">
              {t('nav.contact')}
            </button>
          </div>

          {/* Copyright */}
          <div className={`text-[11px] font-mono text-[#94A3B8]/60 text-center ${isUrdu ? 'sm:text-left' : 'sm:text-right'}`}>
            {t('footer.rights')}
          </div>

        </div>
      </div>

      {/* Floating Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 ${isUrdu ? 'left-6' : 'right-6'} z-30 p-3 rounded-xl bg-[#101629]/90 border border-white/10 text-[#F8FAFC] hover:text-[#38BDF8] hover:border-[#38BDF8]/40 hover:shadow-[0_0_20px_rgba(56,189,248,0.3)] backdrop-blur-md transition-all duration-300 cursor-pointer shadow-xl group`}
        aria-label="Back to top"
      >
        <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
      </button>
    </footer>
  );
};
