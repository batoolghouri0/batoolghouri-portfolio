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

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
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
        isScrolled || mobileMenuOpen
          ? 'py-3 bg-[#080B16]/90 backdrop-blur-md border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'py-4 sm:py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4 lg:gap-8">
        {/* Zone 1: Brand Wordmark & Monogram (flex-1 min-w-0 on small phones so right controls never overflow) */}
        <button
          onClick={() => scrollTo('hero')}
          className="flex items-center gap-2 sm:gap-3 group text-left cursor-pointer focus:outline-none min-w-0 shrink"
        >
          <div className="relative shrink-0">
            <BgMonogram
              size={34}
              className="sm:w-[38px] sm:h-[38px] transition-transform duration-300 group-hover:scale-105 group-active:scale-95"
            />
            <div className="absolute inset-0 rounded-2xl bg-[#8B5CF6]/25 blur-md opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-display font-bold text-sm sm:text-base text-[#F8FAFC] tracking-tight truncate group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#F8FAFC] group-hover:via-[#8B5CF6] group-hover:to-[#38BDF8] transition-all">
              Batool Ghouri
            </span>
            <span className="text-[10px] sm:text-[11px] font-mono text-[#94A3B8] tracking-wider uppercase truncate">
              AI Mentor &amp; Dev
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links (Laptop & Desktop) */}
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
                    : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/[0.06] hover:shadow-[0_0_10px_rgba(56,189,248,0.15)]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action (Resume) + Mobile/Tablet Hamburger Button */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* View Resume Button (compact on narrow phones, full label on sm+) */}
          <button
            onClick={onOpenResume}
            className="group relative inline-flex items-center justify-center p-[1px] text-xs font-semibold rounded-lg overflow-hidden transition-all duration-300 cursor-pointer shadow-[0_0_16px_rgba(139,92,246,0.25)] hover:shadow-[0_0_25px_rgba(56,189,248,0.45)] active:scale-95"
          >
            {/* Animated Gradient Border */}
            <span className="absolute inset-0 bg-gradient-to-r from-[#8B5CF6] via-[#38BDF8] to-[#8B5CF6] bg-[length:200%_auto] animate-border-rotate" />
            {/* Inner Background */}
            <span className="relative z-10 flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-[7px] bg-[#0C1224] text-[#F8FAFC] group-hover:bg-[#101730] transition-colors whitespace-nowrap">
              <FileText className="w-3.5 h-3.5 text-[#38BDF8] group-hover:scale-110 transition-transform" />
              <span className="sm:hidden">Resume</span>
              <span className="hidden sm:inline">View Resume</span>
            </span>
          </button>

          {/* Mobile & Tablet Hamburger Button (Always visible & crisp on < lg screens) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className={`lg:hidden flex items-center justify-center w-10 h-10 rounded-xl border transition-all duration-200 cursor-pointer active:scale-95 shrink-0 ${
              mobileMenuOpen
                ? 'bg-[#8B5CF6]/25 border-[#8B5CF6] text-[#38BDF8] shadow-[0_0_18px_rgba(139,92,246,0.4)]'
                : 'bg-[#101629]/90 border-white/15 text-[#F8FAFC] hover:border-[#38BDF8]/60 hover:text-[#38BDF8] hover:shadow-[0_0_15px_rgba(56,189,248,0.25)]'
            }`}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Backdrop overlay when mobile/tablet drawer is open */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="lg:hidden fixed inset-0 top-full bg-black/50 backdrop-blur-xs -z-10"
          aria-hidden="true"
        />
      )}

      {/* Mobile & Tablet Drawer (Attached directly below header via top-full) */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-[#080B16]/95 backdrop-blur-xl border-b border-white/15 p-5 sm:p-6 shadow-2xl transition-all max-h-[calc(100vh-70px)] overflow-y-auto">
          <nav className="flex flex-col gap-1.5">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all text-left cursor-pointer active:scale-[0.99] ${
                    isActive
                      ? 'bg-gradient-to-r from-[#8B5CF6]/20 to-[#38BDF8]/10 text-[#F8FAFC] border-l-2 border-[#8B5CF6]'
                      : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/[0.05] active:bg-white/[0.08]'
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
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#38BDF8] text-white font-medium text-sm shadow-lg hover:opacity-95 active:scale-[0.98] transition-all cursor-pointer"
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
