import React, { useState } from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import { ScrollProgress } from './components/ScrollProgress';
import { CursorSpotlight } from './components/CursorSpotlight';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { LearningTimeline } from './components/LearningTimeline';
import { MentorshipSection } from './components/MentorshipSection';
import { ProblemSolvingSection } from './components/ProblemSolvingSection';
import { EducationSection } from './components/EducationSection';
import { ContactSection } from './components/ContactSection';
import { ResumeModal } from './components/ResumeModal';
import { Footer } from './components/Footer';

export function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#080B16] text-[#F8FAFC] selection:bg-[#8B5CF6]/30 selection:text-[#38BDF8] overflow-x-hidden font-sans">
      {/* Desktop Soft Glowing Cursor Spotlight */}
      <CursorSpotlight />

      {/* Initial Mandatory Loading Screen */}
      {isLoading && (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      )}

      {/* Top Document Scroll Progress Bar & Desktop/Laptop Rail */}
      <ScrollProgress />

      {/* Sticky Glassmorphism Navigation */}
      <Navbar onOpenResume={() => setIsResumeOpen(true)} />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <HeroSection onOpenResume={() => setIsResumeOpen(true)} />
        <AboutSection />
        <SkillsSection />
        <LearningTimeline />
        <MentorshipSection />
        <ProblemSolvingSection />
        <EducationSection />
        <ContactSection />
      </main>

      {/* Global Footer & Back-to-Top */}
      <Footer />

      {/* Interactive Resume Modal with PDF Viewer & Download */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}

export default App;
