import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, ExternalLink } from 'lucide-react';
import { BgMonogram } from './Icons';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [viewMode, setViewMode] = useState<'interactive' | 'pdf'>('interactive');
  const resumePdfPath = '/Batool_Ghouri_Resume.pdf';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#04060E]/85 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl bg-[#0D1326] border border-white/15 shadow-2xl overflow-hidden z-10"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0A0E1D]">
            <div className="flex items-center gap-3">
              <BgMonogram size={32} />
              <div>
                <h3 className="text-base font-display font-bold text-[#F8FAFC]">
                  Batool Ghouri — Official Resume
                </h3>
                <span className="text-xs font-mono text-[#94A3B8]">
                  Frontend Developer &amp; AI Enthusiast · GIAIC AI Mentor
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center p-0.5 rounded-lg bg-[#141B33] border border-white/10 text-xs">
                <button
                  onClick={() => setViewMode('interactive')}
                  className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                    viewMode === 'interactive'
                      ? 'bg-[#8B5CF6] text-white'
                      : 'text-[#94A3B8] hover:text-white'
                  }`}
                >
                  Digital Sheet
                </button>
                <button
                  onClick={() => setViewMode('pdf')}
                  className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                    viewMode === 'pdf'
                      ? 'bg-[#8B5CF6] text-white'
                      : 'text-[#94A3B8] hover:text-white'
                  }`}
                >
                  Embedded PDF
                </button>
              </div>

              <a
                href={resumePdfPath}
                download="Batool_Ghouri_Resume.pdf"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#8B5CF6] to-[#38BDF8] text-white text-xs font-semibold hover:opacity-90 transition-opacity shadow-md"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </a>

              <a
                href={resumePdfPath}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center p-2 rounded-lg text-[#94A3B8] hover:text-white hover:bg-white/5 transition-colors"
                title="Open PDF in new tab"
              >
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                onClick={onClose}
                className="p-2 rounded-lg text-[#94A3B8] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close resume modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-[#090D1C] text-[#F8FAFC]">
            {viewMode === 'interactive' ? (
              <div className="max-w-2xl mx-auto rounded-2xl bg-[#0F162E] border border-white/10 p-6 sm:p-10 shadow-xl space-y-8 font-sans">
                <div className="border-b border-white/10 pb-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h1 className="text-3xl font-display font-extrabold text-[#F8FAFC] tracking-tight">
                        Batool Ghouri
                      </h1>
                      <p className="text-sm font-medium text-[#38BDF8] mt-1">
                        Frontend Developer | AI &amp; Agentic AI Enthusiast
                      </p>
                      <p className="text-xs text-[#94A3B8] mt-1">
                        AI Mentor at GIAIC · Karachi, Pakistan
                      </p>
                    </div>
                    <div className="text-left sm:text-right text-xs font-mono text-[#94A3B8] space-y-1">
                      <div className="text-[#38BDF8]">batoolghouri000@gmail.com</div>
                      <div>+92 310 3904174</div>
                      <div className="text-[#8B5CF6]">PCAO-F Certified</div>
                    </div>
                  </div>

                  <div className="mt-4 p-3 rounded-lg bg-white/[0.03] border border-white/[0.05] text-xs italic text-[#C4B5FD]">
                    &quot;Curious Mind. Creative Thinking. Continuous Growth.&quot;
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-[#38BDF8] font-semibold mb-2">
                    Professional Summary
                  </h4>
                  <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                    Passionate frontend developer and AI enthusiast with two years of hands-on technical learning since 2024. Expanding technical knowledge through GIAIC in Quarter 4, serving as an AI Mentor assisting fellow peers for their PCAO-F examinations. Committed to problem-solving, clean code, and autonomous AI agents.
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-[#8B5CF6] font-semibold mb-3">
                    Technical Universe
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                      <span className="font-semibold text-[#F8FAFC] block mb-1">Frontend Engineering</span>
                      <p className="text-[#94A3B8]">HTML5, CSS3, TypeScript, Next.js, Tailwind CSS</p>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                      <span className="font-semibold text-[#F8FAFC] block mb-1">Programming &amp; AI</span>
                      <p className="text-[#94A3B8]">Python, Agentic AI, Autonomous Workflows, LLM Prompts</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-[#38BDF8] font-semibold mb-3">
                    Milestones &amp; GIAIC Journey
                  </h4>
                  <div className="space-y-3 text-xs">
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                      <div className="flex justify-between items-center text-[#F8FAFC] font-semibold mb-1">
                        <span>AI Mentor &amp; Quarter 4 Scholar</span>
                        <span className="text-[#8B5CF6] font-mono">Present</span>
                      </div>
                      <p className="text-[#94A3B8] leading-relaxed">
                        Successfully cleared the PCAO-F examination. Guiding peers, sharing knowledge, and preparing fellow students for examinations. Currently preparing for the CCAO-F examination.
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                      <div className="flex justify-between items-center text-[#F8FAFC] font-semibold mb-1">
                        <span>Quarter 01 – Quarter 03</span>
                        <span className="text-[#38BDF8] font-mono">2024 – 2025</span>
                      </div>
                      <p className="text-[#94A3B8] leading-relaxed">
                        Mastered TypeScript, modern Next.js frontend architectures, Python fundamentals, and autonomous Agentic AI systems. Successfully cleared all quarter examinations.
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                      <div className="flex justify-between items-center text-[#F8FAFC] font-semibold mb-1">
                        <span>Governor House Sindh IT Initiative</span>
                        <span className="text-[#94A3B8] font-mono">2024</span>
                      </div>
                      <p className="text-[#94A3B8] leading-relaxed">
                        Selected among 50,000 qualified students from over 5 million applicants at Governor House Sindh IT Marquee.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-[#8B5CF6] font-semibold mb-3">
                    Academic Foundations
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center p-2.5 rounded-lg bg-white/[0.03]">
                      <div>
                        <span className="font-semibold text-white block">Intermediate — Computer Science</span>
                        <span className="text-[#94A3B8] text-[11px] block">Government Degree Girls College Al-Noor</span>
                        <span className="text-[#38BDF8] text-[11px]">First Year Student</span>
                      </div>
                      <span className="font-mono text-[#94A3B8]">2026 – Present</span>
                    </div>

                    <div className="flex justify-between items-center p-2.5 rounded-lg bg-white/[0.03]">
                      <div>
                        <span className="font-semibold text-white block">Matriculation — Computer Science</span>
                        <span className="text-[#94A3B8]">The Best Future Grammar School</span>
                      </div>
                      <span className="font-mono text-[#94A3B8]">2025 – 2026</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-[#38BDF8] font-semibold mb-2">
                    Problem-Solving Framework
                  </h4>
                  <div className="flex flex-wrap gap-2 text-[11px] font-mono text-[#94A3B8]">
                    <span className="px-2.5 py-1 rounded bg-white/[0.04]">01. Stay Calm</span>
                    <span className="px-2.5 py-1 rounded bg-white/[0.04]">02. Understand</span>
                    <span className="px-2.5 py-1 rounded bg-white/[0.04]">03. Break It Down</span>
                    <span className="px-2.5 py-1 rounded bg-white/[0.04]">04. Research</span>
                    <span className="px-2.5 py-1 rounded bg-white/[0.04]">05. Implement &amp; Test</span>
                    <span className="px-2.5 py-1 rounded bg-white/[0.04]">06. Learn &amp; Improve</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full h-[650px] rounded-2xl overflow-hidden border border-white/10 bg-[#050711]">
                <iframe
                  src={`${resumePdfPath}#toolbar=1&navpanes=0`}
                  title="Batool Ghouri Resume PDF Preview"
                  className="w-full h-full border-none"
                />
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-between px-6 py-3.5 border-t border-white/10 bg-[#0A0E1D] text-xs text-[#94A3B8]">
            <span>Asset: Batool_Ghouri_Resume.pdf</span>
            <div className="flex items-center gap-3">
              <a
                href={resumePdfPath}
                download="Batool_Ghouri_Resume.pdf"
                className="text-[#38BDF8] hover:underline font-medium flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" />
                Download PDF
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
