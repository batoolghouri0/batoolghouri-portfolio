import React from 'react';
import { Languages } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface LanguageToggleProps {
  className?: string;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ className = '' }) => {
  const { language, setLanguage, isUrdu } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(isUrdu ? 'en' : 'ur');
  };

  return (
    <div className={`relative inline-flex items-center ${className}`}>
      <button
        onClick={toggleLanguage}
        className="group relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#101629]/90 hover:bg-[#151D36] border border-white/10 hover:border-[#8B5CF6]/50 transition-all duration-300 cursor-pointer shadow-sm text-xs font-mono"
        title={isUrdu ? 'Switch to English' : 'اردو میں تبدیل کریں'}
        aria-label="Toggle language between English and Urdu"
      >
        <Languages className="w-3.5 h-3.5 text-[#38BDF8] group-hover:rotate-12 transition-transform" />
        
        {/* Language badges */}
        <div className="flex items-center gap-1 text-[11px] font-semibold">
          <span
            className={`px-1 rounded transition-colors ${
              !isUrdu
                ? 'text-[#F8FAFC] font-bold bg-[#8B5CF6]/30 text-[#C4B5FD]'
                : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            EN
          </span>
          <span className="text-[#94A3B8]/40">/</span>
          <span
            className={`px-1 rounded transition-colors ${
              isUrdu
                ? 'text-[#38BDF8] font-bold bg-[#38BDF8]/20'
                : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            اردو
          </span>
        </div>
      </button>
    </div>
  );
};
