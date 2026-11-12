import React, { useState } from 'react';
import { Cpu, Sparkles } from 'lucide-react';
import { SkillCard, SkillItem } from './SkillCard';
import { useLanguage } from '../context/LanguageContext';
import {
  HtmlIcon,
  CssIcon,
  TypeScriptIcon,
  NextJsIcon,
  TailwindIcon,
  PythonIcon,
  AgenticAiIcon,
} from './Icons';

const SKILLS_DATA: SkillItem[] = [
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'Frontend Development',
    descriptionKey: 'skills.desc_ts',
    icon: <TypeScriptIcon className="w-6 h-6" />,
    accentColor: '#3178C6',
    badgeText: 'Web Core',
    badgeTextUrdu: 'بنیادی ویب کوڈ',
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'Frontend Development',
    descriptionKey: 'skills.desc_next',
    icon: <NextJsIcon className="w-6 h-6" />,
    accentColor: '#38BDF8',
    badgeText: 'Modern Stack',
    badgeTextUrdu: 'جدید فریم ورک',
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'Frontend Development',
    descriptionKey: 'skills.desc_tailwind',
    icon: <TailwindIcon className="w-6 h-6" />,
    accentColor: '#38BDF8',
    badgeText: 'Design System',
    badgeTextUrdu: 'ڈیزائن سسٹم',
  },
  {
    id: 'agentic-ai',
    name: 'Agentic AI',
    category: 'Artificial Intelligence',
    descriptionKey: 'skills.desc_agentic',
    icon: <AgenticAiIcon className="w-6 h-6" />,
    accentColor: '#8B5CF6',
    badgeText: 'Frontier AI',
    badgeTextUrdu: 'خود مختار اے آئی',
  },
  {
    id: 'python',
    name: 'Python',
    category: 'Programming',
    descriptionKey: 'skills.desc_python',
    icon: <PythonIcon className="w-6 h-6" />,
    accentColor: '#FFE873',
    badgeText: 'Core Logic',
    badgeTextUrdu: 'منطقی پروگرامنگ',
  },
  {
    id: 'html',
    name: 'HTML',
    category: 'Frontend Development',
    descriptionKey: 'skills.desc_html',
    icon: <HtmlIcon className="w-6 h-6" />,
    accentColor: '#E44D26',
    badgeText: 'Semantic Base',
    badgeTextUrdu: 'بنیادی اسٹرکچر',
  },
  {
    id: 'css',
    name: 'CSS',
    category: 'Frontend Development',
    descriptionKey: 'skills.desc_css',
    icon: <CssIcon className="w-6 h-6" />,
    accentColor: '#264DE4',
    badgeText: 'Styling & Layout',
    badgeTextUrdu: 'اسٹائلنگ اور لے آؤٹ',
  },
];

export const SkillsSection: React.FC = () => {
  const { t } = useLanguage();
  const [activeCategoryKey, setActiveCategoryKey] = useState<'All' | 'Frontend' | 'Programming' | 'AI'>('All');

  const categories = [
    { key: 'All', label: t('skills.cat_all') },
    { key: 'Frontend', label: t('skills.cat_frontend') },
    { key: 'Programming', label: t('skills.cat_programming') },
    { key: 'AI', label: t('skills.cat_ai') },
  ] as const;

  const filteredSkills = SKILLS_DATA.filter((s) => {
    if (activeCategoryKey === 'All') return true;
    if (activeCategoryKey === 'Frontend') return s.category === 'Frontend Development';
    if (activeCategoryKey === 'Programming') return s.category === 'Programming';
    if (activeCategoryKey === 'AI') return s.category === 'Artificial Intelligence';
    return true;
  });

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-[#0A0E1D]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#38BDF8]/06 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-[#8B5CF6]/06 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-14 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#8B5CF6] mb-3">
            <Cpu className="w-4 h-4 text-[#38BDF8]" />
            <span>{t('skills.kicker')}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-[#F8FAFC] tracking-tight mb-4">
            {t('skills.heading')}
          </h2>
          <p className="text-base sm:text-lg text-[#94A3B8] font-light">
            {t('skills.subheading')}
          </p>

          {/* Interactive Category Filter Tabs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategoryKey(cat.key)}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer ${
                  activeCategoryKey === cat.key
                    ? 'bg-[#8B5CF6] text-white shadow-[0_0_20px_rgba(139,92,246,0.4)]'
                    : 'bg-[#101629] text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#161F38] border border-white/[0.06]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Skill Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, index) => (
            <SkillCard key={skill.id} skill={skill} index={index} />
          ))}
        </div>

        {/* Footer Note on Growth */}
        <div className="mt-14 p-6 rounded-2xl bg-[#101629]/40 border border-white/[0.05] text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#38BDF8] mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('skills.footer_kicker')}</span>
          </div>
          <p className="text-xs text-[#94A3B8] leading-relaxed">
            {t('skills.footer_desc')}
          </p>
        </div>

      </div>
    </section>
  );
};
