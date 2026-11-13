import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Sparkles, Send, FileText, Bot } from 'lucide-react';
import { BgMonogram, TypeScriptIcon, NextJsIcon, PythonIcon, AgenticAiIcon } from './Icons';
import { useViewportTier } from '../hooks/useViewportTier';

interface HeroSectionProps {
  onOpenResume: () => void;
}

const INITIAL_FULL_TITLE = 'Frontend Developer & AI Enthusiast.';
const CYCLING_TITLES = ['Frontend Developer', 'AI Enthusiast', 'AI Mentor @ GIAIC'];

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenResume }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const { parallaxRange, isPhone, prefersReducedMotion } = useViewportTier();

  const [displayedTitle, setDisplayedTitle] = useState('');
  const [isTypingDone, setIsTypingDone] = useState(false);

  // Mouse parallax state for 3D gyro orb
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Responsive scroll-driven parallax for phone, tablet, laptop, desktop
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const textParallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, prefersReducedMotion ? 0 : parallaxRange * 0.55]
  );
  const orbParallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, prefersReducedMotion ? 0 : -parallaxRange * 0.85]
  );
  const bgGlowY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, prefersReducedMotion ? 0 : parallaxRange * 1.3]
  );
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, isPhone ? 0.85 : 0.35]);
  const orbScale = useTransform(scrollYProgress, [0, 1], [1, isPhone ? 0.96 : 0.88]);

  useEffect(() => {
    let isCancelled = false;
    let timer: ReturnType<typeof setTimeout>;

    setDisplayedTitle('');
    setIsTypingDone(false);

    // Phase 1: Type full initial title character by character
    let charIndex = 0;
    const typeInitial = () => {
      if (isCancelled) return;
      if (charIndex <= INITIAL_FULL_TITLE.length) {
        setDisplayedTitle(INITIAL_FULL_TITLE.slice(0, charIndex));
        charIndex++;
        timer = setTimeout(typeInitial, 45);
      } else {
        setIsTypingDone(true);
        timer = setTimeout(startCycling, 2200);
      }
    };

    // Phase 2: Cycle through the three titles
    let cycleIdx = 0;
    const startCycling = () => {
      eraseTitle();
    };

    const eraseTitle = () => {
      if (isCancelled) return;
      setDisplayedTitle((current) => {
        if (current.length > 0) {
          timer = setTimeout(eraseTitle, 28);
          return current.slice(0, -1);
        } else {
          timer = setTimeout(typeNextTitle, 350);
          return '';
        }
      });
    };

    const typeNextTitle = () => {
      if (isCancelled) return;
      const targetText = CYCLING_TITLES[cycleIdx % CYCLING_TITLES.length];
      let len = 0;

      const typeChars = () => {
        if (isCancelled) return;
        if (len <= targetText.length) {
          setDisplayedTitle(targetText.slice(0, len));
          len++;
          timer = setTimeout(typeChars, 50);
        } else {
          cycleIdx++;
          timer = setTimeout(eraseTitle, 2400);
        }
      };

      typeChars();
    };

    typeInitial();

    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isPhone) return;
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    setMousePos({ x, y });
  };

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const displayName = 'Batool Ghouri';
  const nameLetters = displayName.split('');

  return (
    <section
      ref={sectionRef}
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden"
    >
      {/* Background Gradient Mesh & Deep Glows with Scroll Parallax */}
      <motion.div
        style={{ y: bgGlowY }}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        <div className="absolute -top-[15%] -left-[10%] w-[600px] h-[600px] rounded-full bg-[#8B5CF6]/12 blur-[130px]" />
        <div className="absolute top-[20%] -right-[10%] w-[550px] h-[550px] rounded-full bg-[#38BDF8]/10 blur-[140px]" />
        <div className="absolute -bottom-[20%] left-[25%] w-[700px] h-[400px] rounded-full bg-[#6366F1]/08 blur-[150px]" />

        {/* Subtle geometric grid background */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `linear-gradient(to right, #8B5CF6 1px, transparent 1px), linear-gradient(to bottom, #8B5CF6 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typographic Hierarchy & CTAs (7 Cols) */}
          <motion.div
            style={{ y: textParallaxY, opacity: heroOpacity }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Introductory Micro-Kicker & Role Highlight */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap items-center gap-3 mb-4"
            >
              <span className="text-xs font-mono font-semibold tracking-[0.2em] text-[#38BDF8] uppercase flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6]" />
                HELLO, WORLD! I&apos;M
              </span>
              <span className="text-slate-600">·</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#8B5CF6]/15 text-[#C4B5FD] border border-[#8B5CF6]/30 shadow-[0_0_15px_rgba(139,92,246,0.2)]">
                <Bot className="w-3.5 h-3.5 text-[#38BDF8]" />
                AI Mentor @ GIAIC
              </span>
            </motion.div>

            {/* Main Heading: Character-by-Character Animated Name */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold tracking-tight text-[#F8FAFC] leading-[1.08] mb-3">
              {nameLetters.map((char, index) => (
                <motion.span
                  key={`${displayName}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.15 + index * 0.035,
                    ease: 'easeOut',
                  }}
                  className={
                    char === ' '
                      ? 'inline-block w-3 sm:w-4'
                      : 'inline-block transition-colors hover:text-[#38BDF8]'
                  }
                >
                  {char}
                </motion.span>
              ))}
            </h1>

            {/* Professional Title with Typing Animation & Blinking Cursor */}
            <div className="h-10 sm:h-12 flex items-center mb-6">
              <span className="text-xl sm:text-2xl md:text-3xl font-display font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#A78BFA] to-[#38BDF8]">
                {displayedTitle}
              </span>
              <span
                className={`inline-block w-[3px] h-6 sm:h-7 mx-1.5 bg-[#38BDF8] shadow-[0_0_8px_#38BDF8] ${
                  isTypingDone ? 'animate-pulse' : 'opacity-100'
                }`}
              />
            </div>

            {/* Supporting Description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-base sm:text-lg text-[#94A3B8] leading-relaxed max-w-xl mb-8"
            >
              Exploring the intersection of modern web development and intelligent technologies. Learning, building, and evolving with every line of code.
            </motion.p>

            {/* Brand Statement Capsule */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mb-8 px-4 py-2 rounded-lg bg-[#101629]/80 border border-white/[0.08] backdrop-blur-md flex items-center gap-3 text-xs sm:text-sm text-[#F8FAFC]"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] shadow-[0_0_8px_#8B5CF6]" />
              <span className="italic font-mono text-[#C4B5FD]">
                &quot;Curious Mind. Creative Thinking. Continuous Growth.&quot;
              </span>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-wrap items-center gap-4 w-full sm:w-auto"
            >
              {/* Primary CTA: Explore My Journey */}
              <button
                onClick={() => scrollTo('journey')}
                className="group relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-medium text-sm text-[#F8FAFC] overflow-hidden transition-all duration-300 shadow-[0_0_30px_rgba(139,92,246,0.35)] hover:shadow-[0_0_45px_rgba(56,189,248,0.5)] cursor-pointer"
              >
                {/* Rotating Gradient Outline */}
                <span className="absolute inset-0 rounded-xl p-[1.5px] bg-gradient-to-r from-[#8B5CF6] via-[#38BDF8] to-[#8B5CF6] bg-[length:200%_auto] animate-border-rotate" />
                <span className="relative z-10 flex items-center gap-2.5 px-5 py-2.5 rounded-[10px] bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] group-hover:from-[#7C3AED] group-hover:to-[#2563EB] transition-all">
                  <span>Explore My Journey</span>
                  <ArrowRight className="w-4 h-4 text-[#38BDF8] group-hover:translate-x-1 transition-transform" />
                </span>
              </button>

              {/* Secondary CTA: Let's Connect */}
              <button
                onClick={() => scrollTo('contact')}
                className="group relative inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-medium text-sm text-[#F8FAFC] bg-[#101629]/90 hover:bg-[#151D36] border border-white/10 hover:border-[#38BDF8]/50 transition-all duration-300 shadow-lg hover:shadow-[0_0_25px_rgba(56,189,248,0.25)] cursor-pointer"
              >
                <Send className="w-4 h-4 text-[#38BDF8] group-hover:rotate-12 transition-transform" />
                <span>Let&apos;s Connect</span>
              </button>

              {/* Tertiary Action: View Resume */}
              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-4 py-3 text-xs font-mono text-[#94A3B8] hover:text-[#F8FAFC] transition-colors cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-[#8B5CF6]" />
                <span>Resume (PDF)</span>
              </button>
            </motion.div>
          </motion.div>

          {/* Right Column: Futuristic 3D-Inspired Gyro Composition (5 Cols) with Scroll Depth */}
          <motion.div
            style={{ y: orbParallaxY, scale: orbScale, opacity: heroOpacity }}
            className="lg:col-span-5 flex justify-center items-center relative"
          >
            <motion.div
              style={{
                transform: isPhone
                  ? undefined
                  : `perspective(1000px) rotateY(${mousePos.x * 24}deg) rotateX(${-mousePos.y * 24}deg)`,
                transition: 'transform 0.15s ease-out',
              }}
              className="relative w-[300px] h-[300px] sm:w-[360px] sm:h-[360px] lg:w-[380px] lg:h-[380px] flex items-center justify-center"
            >
              {/* Outer Glowing Orbital Ring 1 */}
              <div className="absolute inset-0 rounded-full border border-[#8B5CF6]/30 animate-spin" style={{ animationDuration: '32s' }}>
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#8B5CF6] shadow-[0_0_12px_#8B5CF6]" />
              </div>

              {/* Middle Orbital Ring 2 (Counter Rotation) */}
              <div className="absolute inset-6 rounded-full border border-dashed border-[#38BDF8]/40 animate-spin" style={{ animationDuration: '24s', animationDirection: 'reverse' }}>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#38BDF8] shadow-[0_0_10px_#38BDF8]" />
              </div>

              {/* Inner Elliptical Orbital Ring 3 (Tilted) */}
              <div className="absolute inset-12 rounded-full border border-[#818CF8]/30 rotate-45 animate-pulse" />

              {/* Central Abstract Glowing Core Container */}
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-3xl bg-gradient-to-br from-[#101629]/95 via-[#0C1224]/90 to-[#080B16] border border-white/10 shadow-[0_0_60px_rgba(139,92,246,0.35)] backdrop-blur-2xl flex flex-col items-center justify-center p-6 group">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-[#8B5CF6]/20 to-[#38BDF8]/20 opacity-40 group-hover:opacity-70 transition-opacity" />

                {/* Center Monogram */}
                <div className="relative z-10 transition-transform duration-500 group-hover:scale-110">
                  <BgMonogram size={78} />
                </div>

                <div className="relative z-10 mt-3 text-center">
                  <span className="text-[10px] font-mono tracking-widest text-[#94A3B8] uppercase block">
                    FOUNDATION
                  </span>
                  <span className="text-xs font-semibold text-[#F8FAFC]">
                    GIAIC Quarter 4
                  </span>
                </div>
              </div>

              {/* Orbiting Tech Node 1: TypeScript */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-3 left-6 sm:left-8 p-2.5 rounded-xl bg-[#101629]/90 border border-white/10 shadow-lg backdrop-blur-md flex items-center gap-2 text-xs font-medium text-[#F8FAFC]"
              >
                <TypeScriptIcon className="w-5 h-5" />
                <span className="font-mono text-[11px]">TypeScript</span>
              </motion.div>

              {/* Orbiting Tech Node 2: Next.js */}
              <motion.div
                animate={{ y: [0, 9, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute top-12 -right-2 sm:-right-4 p-2.5 rounded-xl bg-[#101629]/90 border border-white/10 shadow-lg backdrop-blur-md flex items-center gap-2 text-xs font-medium text-[#F8FAFC]"
              >
                <NextJsIcon className="w-5 h-5" />
                <span className="font-mono text-[11px]">Next.js</span>
              </motion.div>

              {/* Orbiting Tech Node 3: Agentic AI */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-4 right-8 sm:right-10 p-2.5 rounded-xl bg-[#101629]/90 border border-[#8B5CF6]/40 shadow-[0_0_20px_rgba(139,92,246,0.25)] backdrop-blur-md flex items-center gap-2 text-xs font-medium text-[#F8FAFC]"
              >
                <AgenticAiIcon className="w-5 h-5" />
                <span className="font-mono text-[11px] text-[#C4B5FD]">Agentic AI</span>
              </motion.div>

              {/* Orbiting Tech Node 4: Python */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                className="absolute bottom-16 -left-3 sm:-left-6 p-2.5 rounded-xl bg-[#101629]/90 border border-white/10 shadow-lg backdrop-blur-md flex items-center gap-2 text-xs font-medium text-[#F8FAFC]"
              >
                <PythonIcon className="w-5 h-5" />
                <span className="font-mono text-[11px]">Python</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
