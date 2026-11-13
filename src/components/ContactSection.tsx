import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import {
  Send,
  Mail,
  User,
  Tag,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Info,
  ShieldCheck,
} from 'lucide-react';
import {
  WhatsAppIcon,
  FacebookIcon,
  InstagramIcon,
  XTwitterIcon,
  ThreadsIcon,
} from './Icons';
import { ScrollReveal } from './ScrollReveal';
import { useViewportTier } from '../hooks/useViewportTier';

interface SocialLinkConfig {
  name: string;
  icon: React.ReactNode;
  url: string;
  color: string;
  handleLabel: string;
}

const SOCIAL_LINKS: SocialLinkConfig[] = [
  {
    name: 'WhatsApp',
    icon: <WhatsAppIcon className="w-5 h-5" />,
    url: 'https://wa.me/qr/TKIOTXSVHLQZP1',
    color: '#25D366',
    handleLabel: '+92 310 3904174',
  },
  {
    name: 'Instagram',
    icon: <InstagramIcon className="w-5 h-5" />,
    url: 'https://www.instagram.com/batool__ghouri?psln=MTNsZWE4MGt1NHZhYQ==',
    color: '#E4405F',
    handleLabel: '@batool__ghouri',
  },
  {
    name: 'Facebook',
    icon: <FacebookIcon className="w-5 h-5" />,
    url: 'https://www.facebook.com/share/1FALJNwPGj/',
    color: '#1877F2',
    handleLabel: 'Batool Ghouri',
  },
  {
    name: 'Threads',
    icon: <ThreadsIcon className="w-5 h-5" />,
    url: 'https://www.threads.com/@batool__ghouri',
    color: '#F8FAFC',
    handleLabel: '@batool__ghouri',
  },
  {
    name: 'Twitter (X)',
    icon: <XTwitterIcon className="w-5 h-5" />,
    url: 'https://x.com/BatoolGhouri',
    color: '#E2E8F0',
    handleLabel: '@BatoolGhouri',
  },
];

export const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const statusBannerRef = useRef<HTMLDivElement>(null);
  const { parallaxRange, prefersReducedMotion } = useViewportTier();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const glowY = useTransform(
    scrollYProgress,
    [0, 1],
    [-parallaxRange * 0.6, prefersReducedMotion ? 0 : parallaxRange * 0.6]
  );

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [backendConfig, setBackendConfig] = useState<{
    status: 'loading' | 'active' | 'not_configured' | 'unreachable';
    recipient: string;
    detail?: string;
  }>({
    status: 'loading',
    recipient: 'batoolghouri000@gmail.com',
  });
  const [unconfiguredNotice, setUnconfiguredNotice] = useState<string | null>(null);

  const checkBackendStatus = async (attempt = 0) => {
    try {
      const res = await fetch('/api/contact/status', {
        cache: 'no-store',
        credentials: 'same-origin',
      });
      const contentType = res.headers.get('content-type') || '';

      if (!res.ok || !contentType.includes('application/json')) {
        if (attempt < 2) {
          setTimeout(() => checkBackendStatus(attempt + 1), 1200);
          return;
        }
        setBackendConfig((prev) => ({
          ...prev,
          status: 'unreachable',
          detail:
            res.status === 404
              ? 'Email API route not found on this deployment URL (re-share/deploy the full-stack app or use the Dev Preview).'
              : 'Unable to verify API status (check browser third-party cookie settings or reload).',
        }));
        return;
      }

      const data = await res.json();
      setBackendConfig({
        status: data.configured ? 'active' : 'not_configured',
        recipient: data.recipient || 'batoolghouri000@gmail.com',
        detail: data.message,
      });
    } catch {
      if (attempt < 2) {
        setTimeout(() => checkBackendStatus(attempt + 1), 1200);
        return;
      }
      setBackendConfig((prev) => ({
        ...prev,
        status: 'unreachable',
        detail: 'Could not reach the backend email server. Please reload or retry.',
      }));
    }
  };

  useEffect(() => {
    checkBackendStatus();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (status !== 'idle') setStatus('idle');
  };

  const scrollStatusIntoView = () => {
    setTimeout(() => {
      statusBannerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 60);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      subject: formData.subject.trim(),
      message: formData.message.trim(),
    };

    if (!payload.name || !payload.email || !payload.subject || !payload.message) {
      setStatus('error');
      setStatusMessage('Please complete all fields before sending.');
      scrollStatusIntoView();
      return;
    }

    if (payload.name.length < 2) {
      setStatus('error');
      setStatusMessage('Please enter your name (at least 2 characters).');
      scrollStatusIntoView();
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(payload.email)) {
      setStatus('error');
      setStatusMessage('Please enter a valid email address.');
      scrollStatusIntoView();
      return;
    }

    if (payload.message.length < 3) {
      setStatus('error');
      setStatusMessage('Please enter a brief message (at least 3 characters).');
      scrollStatusIntoView();
      return;
    }

    setIsSubmitting(true);
    setStatus('idle');
    setStatusMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const rawText = await response.text();
      let result: any = null;
      try {
        result = rawText ? JSON.parse(rawText) : null;
      } catch {
        result = null;
      }

      if (response.ok && result?.success && result?.deliveryMode === 'resend_live') {
        setStatus('success');
        setStatusMessage('Your message was delivered directly to Batool Ghouri’s inbox!');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
        setStatusMessage(
          result?.error ||
            `Email delivery failed (HTTP ${response.status}). Please verify configuration or try again.`
        );
      }
      scrollStatusIntoView();
    } catch {
      setStatus('error');
      setStatusMessage('Network error while connecting to server. Please verify your connection.');
      scrollStatusIntoView();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialClick = (social: SocialLinkConfig) => {
    if (!social.url) {
      setUnconfiguredNotice(`The ${social.name} profile link is awaiting configuration.`);
      setTimeout(() => setUnconfiguredNotice(null), 5000);
      return;
    }
    window.open(social.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section ref={sectionRef} id="contact" className="py-24 relative overflow-hidden bg-[#080B16]">
      {/* Background ambient lighting with scroll parallax */}
      <motion.div
        style={{ y: glowY }}
        className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-[#8B5CF6]/08 rounded-full blur-[160px] pointer-events-none"
      />
      <motion.div
        style={{ y: glowY }}
        className="absolute bottom-10 left-1/4 w-[500px] h-[500px] bg-[#38BDF8]/06 rounded-full blur-[140px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading & Subheading */}
        <ScrollReveal direction="up" className="mb-16 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#38BDF8] mb-3">
            <Mail className="w-4 h-4 text-[#8B5CF6]" />
            <span>GET IN TOUCH</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-[#F8FAFC] tracking-tight mb-4">
            Let&apos;s Build Connections.
          </h2>
          <p className="text-base sm:text-lg text-[#94A3B8] font-light">
            I&apos;m always excited to connect with fellow developers, technology enthusiasts, learners, and people who believe in continuous growth. Have an opportunity, an idea, or simply want to connect? Feel free to reach out.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Social Links & Delivery Information (5 Cols) */}
          <ScrollReveal direction="left" className="lg:col-span-5 space-y-6">
            <div className="interactive-card interactive-card-cyan p-7 rounded-3xl bg-[#0D1326] border border-white/10 shadow-xl backdrop-blur-xl">
              <h3 className="text-xl font-display font-bold text-[#F8FAFC] mb-2">
                Connect Directly
              </h3>
              <p className="text-xs text-[#94A3B8] mb-6 leading-relaxed">
                Choose your preferred network below. Profiles launch instantly in a new browser tab.
              </p>

              {/* Social Channels List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SOCIAL_LINKS.map((social) => {
                  const isReady = Boolean(social.url);

                  return (
                    <button
                      key={social.name}
                      type="button"
                      onClick={() => handleSocialClick(social)}
                      className={`group relative flex items-center gap-3 p-3.5 rounded-xl border transition-all duration-300 text-left cursor-pointer active:scale-[0.98] ${
                        isReady
                          ? 'bg-[#101730] border-white/10 hover:border-[#38BDF8]/50 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(56,189,248,0.25)] active:border-[#38BDF8]/60'
                          : 'bg-white/[0.02] border-white/[0.05] hover:border-amber-400/30'
                      }`}
                    >
                      <div
                        className="p-2 rounded-lg text-white transition-transform duration-300 group-hover:scale-110 group-active:scale-105 flex-shrink-0"
                        style={{ backgroundColor: `${social.color}25`, color: social.color }}
                      >
                        {social.icon}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-[#F8FAFC] flex items-center justify-between">
                          <span className="group-hover:text-[#38BDF8] transition-colors">{social.name}</span>
                          {isReady ? (
                            <ExternalLink className="w-3 h-3 text-[#94A3B8] opacity-60 sm:opacity-0 group-hover:opacity-100 transition-opacity" />
                          ) : (
                            <span className="text-[9px] font-mono text-amber-400/80 bg-amber-400/10 px-1.5 py-0.2 rounded">
                              Setup
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-[#94A3B8] truncate block mt-0.5">
                          {isReady ? 'Active Profile' : 'Pending Link'}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Unconfigured Alert Notice if clicked */}
              {unconfiguredNotice && (
                <div className="mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-start gap-2 animate-fadeIn">
                  <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>{unconfiguredNotice}</span>
                </div>
              )}
            </div>

            {/* Email Target Status Card */}
            <div className="interactive-card interactive-card-violet p-6 rounded-3xl bg-gradient-to-br from-[#101730] to-[#0A0E1D] border border-white/10 shadow-lg">
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2 text-xs font-mono text-[#38BDF8] uppercase">
                  <ShieldCheck className="w-4 h-4 text-[#8B5CF6]" />
                  <span>DIRECT INBOX FORWARDING</span>
                </div>
                {backendConfig.status === 'loading' && (
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono bg-white/10 text-[#94A3B8] border border-white/15">
                    Checking...
                  </span>
                )}
                {backendConfig.status === 'active' && (
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Active
                  </span>
                )}
                {backendConfig.status === 'not_configured' && (
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono bg-rose-500/15 text-rose-300 border border-rose-500/30">
                    Not Configured
                  </span>
                )}
                {backendConfig.status === 'unreachable' && (
                  <button
                    type="button"
                    onClick={() => {
                      setBackendConfig((prev) => ({ ...prev, status: 'loading' }));
                      checkBackendStatus();
                    }}
                    className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono bg-amber-500/15 text-amber-300 border border-amber-500/30 hover:bg-amber-500/25 transition-colors cursor-pointer"
                  >
                    Retry Check
                  </button>
                )}
              </div>
              <div className="text-sm font-semibold text-[#F8FAFC] mb-1 break-all">
                Direct delivery routed to:{' '}
                <span className="text-[#38BDF8] font-mono">{backendConfig.recipient}</span>
              </div>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                {(backendConfig.status === 'unreachable' ||
                  backendConfig.status === 'not_configured') &&
                backendConfig.detail
                  ? backendConfig.detail
                  : 'Form submissions are processed securely via our server-side email API and delivered directly to the recipient inbox.'}
              </p>
            </div>
          </ScrollReveal>

          {/* Right Column: Premium Contact Form (7 Cols) */}
          <ScrollReveal direction="right" delay={0.08} className="lg:col-span-7">
            <div className="relative rounded-3xl bg-[#0D1326] border border-white/15 hover:border-[#8B5CF6]/45 transition-colors duration-300 p-6 sm:p-9 shadow-2xl backdrop-blur-xl overflow-hidden">
              {/* Clipped Animated Gradient Glow Accent */}
              <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-[#8B5CF6]/10 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-[#38BDF8]/10 blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <h3 className="text-2xl font-display font-bold text-[#F8FAFC] mb-1">
                  Send a Message
                </h3>
                <p className="text-xs text-[#94A3B8] mb-6">
                  Fill in your details below and I will respond to your inquiry promptly.
                </p>

                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-mono uppercase tracking-wider text-[#94A3B8] mb-2">
                      Full Name <span className="text-[#8B5CF6]">*</span>
                    </label>
                    <div className="relative group">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8] group-focus-within:text-[#8B5CF6] transition-colors" />
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Alex Morgan"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#080B16] border border-white/10 hover:border-[#8B5CF6]/40 text-sm text-[#F8FAFC] placeholder-[#94A3B8]/40 focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6] transition-all"
                      />
                    </div>
                  </div>

                  {/* Email Address */}
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-mono uppercase tracking-wider text-[#94A3B8] mb-2">
                      Email Address <span className="text-[#38BDF8]">*</span>
                    </label>
                    <div className="relative group">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8] group-focus-within:text-[#38BDF8] transition-colors" />
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="alex@example.com"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#080B16] border border-white/10 hover:border-[#38BDF8]/40 text-sm text-[#F8FAFC] placeholder-[#94A3B8]/40 focus:outline-none focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] transition-all"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="contact-subject" className="block text-xs font-mono uppercase tracking-wider text-[#94A3B8] mb-2">
                      Subject <span className="text-[#8B5CF6]">*</span>
                    </label>
                    <div className="relative group">
                      <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8] group-focus-within:text-[#8B5CF6] transition-colors" />
                      <input
                        id="contact-subject"
                        type="text"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="e.g. Opportunity / AI Collaboration / Question"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#080B16] border border-white/10 hover:border-[#8B5CF6]/40 text-sm text-[#F8FAFC] placeholder-[#94A3B8]/40 focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6] transition-all"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label htmlFor="contact-message" className="text-xs font-mono uppercase tracking-wider text-[#94A3B8]">
                        Message <span className="text-[#38BDF8]">*</span>
                      </label>
                      <span className="text-[11px] font-mono text-[#94A3B8]/60">
                        {formData.message.length} / 3000
                      </span>
                    </div>
                    <div className="relative">
                      <textarea
                        id="contact-message"
                        name="message"
                        required
                        rows={5}
                        maxLength={3000}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Share your thoughts, opportunity, or feedback..."
                        className="w-full p-4 rounded-xl bg-[#080B16] border border-white/10 hover:border-[#38BDF8]/40 text-sm text-[#F8FAFC] placeholder-[#94A3B8]/40 focus:outline-none focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] transition-all resize-none leading-relaxed"
                      />
                    </div>
                  </div>

                  {/* Status Messages */}
                  <div ref={statusBannerRef}>
                    {status === 'success' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-200 text-xs flex items-start gap-3"
                      >
                        <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-400 mt-0.5" />
                        <div>
                          <span className="font-bold block mb-0.5">Message Sent Successfully!</span>
                          <span>{statusMessage}</span>
                        </div>
                      </motion.div>
                    )}

                    {status === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-200 text-xs flex items-start gap-3"
                      >
                        <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-400 mt-0.5" />
                        <div>
                          <span className="font-bold block mb-0.5">Unable to Send Message</span>
                          <span>{statusMessage}</span>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full group relative inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl font-medium text-sm text-white overflow-hidden transition-all duration-300 shadow-[0_0_30px_rgba(139,92,246,0.35)] hover:shadow-[0_0_40px_rgba(56,189,248,0.55)] hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer disabled:opacity-50"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-[#8B5CF6] via-[#6366F1] to-[#38BDF8] group-hover:opacity-90 transition-opacity" />
                    <span className="relative z-10 flex items-center gap-2 font-semibold tracking-wide">
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Dispatching Message...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send className="w-4 h-4 text-white transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </>
                      )}
                    </span>
                  </button>
                </form>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
