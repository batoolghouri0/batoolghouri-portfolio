import React, { useState, useEffect } from 'react';
import { Menu, X, FileText } from 'lucide-react';
import { BgMonogram } from './Icons';

interface NavbarProps {
  onOpenResume: () => void;
}

const NAV_ITEMS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'journey', label: 'Journey' },
  { id: 'mentorship', label: 'Mentorship' },
  { id: 'approach', label: 'Approach' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Section spy
      const sections = NAV_ITEMS.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 180;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(NAV_ITEMS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-[#080B16]/85 backdrop-blur-md border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 lg:gap-8">
        {/* Zone 1: Brand Wordmark & Monogram */}
        <button
          onClick={() => scrollTo('hero')}
          className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none shrink-0"
        >
          <div className="relative">
            <BgMonogram size={38} className="transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 rounded-2xl bg-[#8B5CF6]/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-base text-[#F8FAFC] tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#F8FAFC] group-hover:via-[#8B5CF6] group-hover:to-[#38BDF8] transition-all">
              Batool Ghouri
            </span>
            <span className="text-[11px] font-mono text-[#94A3B8] tracking-wider uppercase">
              AI Mentor & Dev
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links (Desktop & Laptop) */}
        <nav className="hidden lg:flex items-center gap-1 p-1 bg-[#101629]/60 backdrop-blur-md border border-white/[0.06] rounded-full">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`relative px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'text-[#F8FAFC] bg-gradient-to-r from-[#8B5CF6]/30 to-[#38BDF8]/20 border border-[#8B5CF6]/50 shadow-[0_0_12px_rgba(139,92,246,0.3)]'
                    : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/[0.04]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action (Resume) + Mobile/Tablet Menu Button */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* View Resume Button */}
          <button
            onClick={onOpenResume}
            className="group relative inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 text-xs font-semibold rounded-lg overflow-hidden transition-all duration-300 cursor-pointer shadow-[0_0_20px_rgba(139,92,246,0.25)] hover:shadow-[0_0_25px_rgba(56,189,248,0.4)]"
          >
            {/* Animated Gradient Border */}
            <span className="absolute inset-0 rounded-lg p-[1px] bg-gradient-to-r from-[#8B5CF6] via-[#38BDF8] to-[#8B5CF6] bg-[length:200%_auto] animate-border-rotate" />
            {/* Inner Background */}
            <span className="relative z-10 flex items-center gap-2 px-3 py-1.5 rounded-[7px] bg-[#0C1224] text-[#F8FAFC] group-hover:bg-[#101730] transition-colors whitespace-nowrap">
              <FileText className="w-3.5 h-3.5 text-[#38BDF8] group-hover:scale-110 transition-transform" />
              <span>View Resume</span>
            </span>
          </button>

          {/* Mobile & Tablet Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-[#101629] border border-white/10 text-[#F8FAFC] hover:text-[#38BDF8] transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bg-[#080B16]/95 backdrop-blur-xl border-b border-white/10 p-6 shadow-2xl transition-all max-h-[calc(100vh-65px)] overflow-y-auto">
          <nav className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left ${
                    isActive
                      ? 'bg-gradient-to-r from-[#8B5CF6]/20 to-[#38BDF8]/10 text-[#F8FAFC] border-l-2 border-[#8B5CF6]'
                      : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/[0.03]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="text-xs font-mono text-[#38BDF8]">Active</span>}
                </button>
              );
            })}
            <div className="pt-4 mt-2 border-t border-white/10">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-gradient-to-r from-[#8B5CF6] to-[#38BDF8] text-white font-medium text-sm shadow-lg cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                View Resume
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
