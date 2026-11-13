import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Cpu, Sparkles } from 'lucide-react';
import { SkillCard, SkillItem } from './SkillCard';
import { ScrollReveal } from './ScrollReveal';
import { useViewportTier } from '../hooks/useViewportTier';
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
    description: 'Writing structured and type-safe JavaScript.',
    icon: <TypeScriptIcon className="w-6 h-6" />,
    accentColor: '#3178C6',
    badgeText: 'Web Core',
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'Frontend Development',
    description: 'Exploring modern React-based web development.',
    icon: <NextJsIcon className="w-6 h-6" />,
    accentColor: '#38BDF8',
    badgeText: 'Modern Stack',
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'Frontend Development',
    description: 'Designing responsive interfaces with utility-first styling.',
    icon: <TailwindIcon className="w-6 h-6" />,
    accentColor: '#38BDF8',
    badgeText: 'Design System',
  },
  {
    id: 'agentic-ai',
    name: 'Agentic AI',
    category: 'Artificial Intelligence',
    description: 'Exploring intelligent agents and autonomous AI workflows.',
    icon: <AgenticAiIcon className="w-6 h-6" />,
    accentColor: '#8B5CF6',
    badgeText: 'Frontier AI',
  },
  {
    id: 'python',
    name: 'Python',
    category: 'Programming',
    description: 'Developing programming logic and exploring AI technologies.',
    icon: <PythonIcon className="w-6 h-6" />,
    accentColor: '#FFE873',
    badgeText: 'Core Logic',
  },
  {
    id: 'html',
    name: 'HTML',
    category: 'Frontend Development',
    description: 'Building the structure of modern web experiences.',
    icon: <HtmlIcon className="w-6 h-6" />,
    accentColor: '#E44D26',
    badgeText: 'Semantic Base',
  },
  {
    id: 'css',
    name: 'CSS',
    category: 'Frontend Development',
    description: 'Creating beautiful and responsive visual interfaces.',
    icon: <CssIcon className="w-6 h-6" />,
    accentColor: '#264DE4',
    badgeText: 'Styling & Layout',
  },
];

const CATEGORIES = [
  { key: 'All', label: 'All' },
  { key: 'Frontend', label: 'Frontend Development' },
  { key: 'Programming', label: 'Programming' },
  { key: 'AI', label: 'Artificial Intelligence' },
] as const;

export const SkillsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { parallaxRange, prefersReducedMotion } = useViewportTier();
  const [activeCategoryKey, setActiveCategoryKey] = useState<'All' | 'Frontend' | 'Programming' | 'AI'>('All');

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const rightOrbY = useTransform(
    scrollYProgress,
    [0, 1],
    [-parallaxRange * 0.7, prefersReducedMotion ? 0 : parallaxRange * 0.7]
  );
  const leftOrbY = useTransform(
    scrollYProgress,
    [0, 1],
    [parallaxRange * 0.7, prefersReducedMotion ? 0 : -parallaxRange * 0.7]
  );

  const filteredSkills = SKILLS_DATA.filter((s) => {
    if (activeCategoryKey === 'All') return true;
    if (activeCategoryKey === 'Frontend') return s.category === 'Frontend Development';
    if (activeCategoryKey === 'Programming') return s.category === 'Programming';
    if (activeCategoryKey === 'AI') return s.category === 'Artificial Intelligence';
    return true;
  });

  return (
    <section ref={sectionRef} id="skills" className="py-24 relative overflow-hidden bg-[#0A0E1D]">
      {/* Background ambient lighting with counter-directional scroll parallax */}
      <motion.div
        style={{ y: rightOrbY }}
        className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#38BDF8]/06 rounded-full blur-[140px] pointer-events-none"
      />
      <motion.div
        style={{ y: leftOrbY }}
        className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-[#8B5CF6]/06 rounded-full blur-[140px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal direction="up" className="mb-14 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#8B5CF6] mb-3">
            <Cpu className="w-4 h-4 text-[#38BDF8]" />
            <span>TECHNICAL PROFICIENCY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-[#F8FAFC] tracking-tight mb-4">
            My Technical Universe.
          </h2>
          <p className="text-base sm:text-lg text-[#94A3B8] font-light">
            Technologies I&apos;m learning, exploring, and working with.
          </p>

          {/* Interactive Category Filter Tabs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((cat) => (
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
        </ScrollReveal>

        {/* Skill Cards Grid (1 col Phone, 2 col Tablet, 3 col Laptop & Desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, index) => (
            <SkillCard key={skill.id} skill={skill} index={index} />
          ))}
        </div>

        {/* Footer Note on Growth */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="mt-14 p-6 rounded-2xl bg-[#101629]/40 border border-white/[0.05] text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#38BDF8] mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>EXPANDING CAPABILITIES</span>
            </div>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Consistently strengthening engineering fundamentals, building projects with type-safety, responsive layouts, and integrating intelligent autonomous agent workflows.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
