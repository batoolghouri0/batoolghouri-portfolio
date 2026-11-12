import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Send,
  Mail,
  User,
  MessageSquare,
  Tag,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Sparkles,
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
import { useLanguage } from '../context/LanguageContext';

interface SocialLinkConfig {
  name: string;
  nameUrdu: string;
  icon: React.ReactNode;
  url: string;
  color: string;
  handleLabel: string;
}

const SOCIAL_LINKS: SocialLinkConfig[] = [
  {
    name: 'WhatsApp',
    nameUrdu: 'واٹس ایپ',
    icon: <WhatsAppIcon className="w-5 h-5" />,
    url: 'https://wa.me/qr/TKIOTXSVHLQZP1',
    color: '#25D366',
    handleLabel: '+92 310 3904174',
  },
  {
    name: 'Instagram',
    nameUrdu: 'انسٹاگرام',
    icon: <InstagramIcon className="w-5 h-5" />,
    url: 'https://www.instagram.com/batool__ghouri?psln=MTNsZWE4MGt1NHZhYQ==',
    color: '#E4405F',
    handleLabel: '@batool__ghouri',
  },
  {
    name: 'Facebook',
    nameUrdu: 'فیس بک',
    icon: <FacebookIcon className="w-5 h-5" />,
    url: 'https://www.facebook.com/share/1FALJNwPGj/',
    color: '#1877F2',
    handleLabel: 'Batool Ghouri',
  },
  {
    name: 'Threads',
    nameUrdu: 'تھریڈز',
    icon: <ThreadsIcon className="w-5 h-5" />,
    url: 'https://www.threads.com/@batool__ghouri',
    color: '#F8FAFC',
    handleLabel: '@batool__ghouri',
  },
  {
    name: 'Twitter (X)',
    nameUrdu: 'ٹوئٹر (ایکس)',
    icon: <XTwitterIcon className="w-5 h-5" />,
    url: 'https://x.com/BatoolGhouri',
    color: '#E2E8F0',
    handleLabel: '@BatoolGhouri',
  },
];

export const ContactSection: React.FC = () => {
  const { t, isUrdu } = useLanguage();
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
    configured: boolean;
    recipient: string;
  }>({
    configured: false,
    recipient: 'batoolghouri000@gmail.com',
  });
  const [unconfiguredNotice, setUnconfiguredNotice] = useState<string | null>(null);

  // Check email backend status
  useEffect(() => {
    fetch('/api/contact/status')
      .then((res) => res.json())
      .then((data) => {
        setBackendConfig({
          configured: data.configured,
          recipient: data.recipient,
        });
      })
      .catch(() => {
        // Dev server fallback
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (status !== 'idle') setStatus('idle');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setStatus('error');
      setStatusMessage(isUrdu ? 'براہ کرم ارسال کرنے سے پہلے تمام خانے پر کریں۔' : 'Please complete all fields before sending.');
      return;
    }

    setIsSubmitting(true);
    setStatus('idle');
    setStatusMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success && result.deliveryMode === 'resend_live') {
        setStatus('success');
        setStatusMessage(
          isUrdu
            ? 'آپ کا پیغام کامیابی کے ساتھ بتول غوری کے ان باکس میں پہنچا دیا گیا ہے!'
            : 'Your message was delivered directly to Batool Ghouri’s inbox!'
        );
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
        setStatusMessage(
          result.error ||
          (isUrdu
            ? 'پیغام بھیجنے میں ناکامی۔ براہ کرم دوبارہ کوشش کریں۔'
            : 'Email delivery failed. No message was sent.')
        );
      }
    } catch (err: any) {
      setStatus('error');
      setStatusMessage(isUrdu ? 'سرور سے رابطہ کرنے میں نیٹ ورک کی خرابی۔' : 'Network error while connecting to server. Please verify your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialClick = (social: SocialLinkConfig) => {
    if (!social.url) {
      setUnconfiguredNotice(
        isUrdu
          ? `پروفائل لنک ابھی زیر ترتیب ہے۔`
          : `The ${social.name} profile link is awaiting configuration.`
      );
      setTimeout(() => setUnconfiguredNotice(null), 5000);
      return;
    }
    window.open(social.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#080B16]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-[#8B5CF6]/08 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-[500px] h-[500px] bg-[#38BDF8]/06 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading & Subheading */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#38BDF8] mb-3">
            <Mail className="w-4 h-4 text-[#8B5CF6]" />
            <span>{t('contact.kicker')}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-[#F8FAFC] tracking-tight mb-4">
            {t('contact.heading')}
          </h2>
          <p className="text-base sm:text-lg text-[#94A3B8] font-light">
            {t('contact.subheading')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Social Links & Delivery Information (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-7 rounded-3xl bg-[#0D1326] border border-white/10 shadow-xl backdrop-blur-xl">
              <h3 className="text-xl font-display font-bold text-[#F8FAFC] mb-2">
                {t('contact.channels_title')}
              </h3>
              <p className="text-xs text-[#94A3B8] mb-6 leading-relaxed">
                {t('contact.channels_desc')}
              </p>

              {/* Social Channels List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SOCIAL_LINKS.map((social) => {
                  const isReady = Boolean(social.url);

                  return (
                    <button
                      key={social.name}
                      onClick={() => handleSocialClick(social)}
                      className={`group relative flex items-center gap-3 p-3.5 rounded-xl border transition-all duration-300 ${isUrdu ? 'text-right' : 'text-left'} cursor-pointer ${
                        isReady
                          ? 'bg-[#101730] border-white/10 hover:border-[#38BDF8]/50 hover:shadow-[0_0_20px_rgba(56,189,248,0.2)]'
                          : 'bg-white/[0.02] border-white/[0.05] hover:border-amber-400/30'
                      }`}
                    >
                      <div
                        className="p-2 rounded-lg text-white transition-transform group-hover:scale-110 flex-shrink-0"
                        style={{ backgroundColor: `${social.color}25`, color: social.color }}
                      >
                        {social.icon}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-[#F8FAFC] flex items-center justify-between">
                          <span>{isUrdu ? social.nameUrdu : social.name}</span>
                          {isReady ? (
                            <ExternalLink className="w-3 h-3 text-[#94A3B8] opacity-0 group-hover:opacity-100 transition-opacity" />
                          ) : (
                            <span className="text-[9px] font-mono text-amber-400/80 bg-amber-400/10 px-1.5 py-0.2 rounded">
                              {isUrdu ? 'ترتیب' : 'Setup'}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-[#94A3B8] truncate block mt-0.5">
                          {isReady ? (isUrdu ? 'فعال پروفائل' : 'Active Profile') : (isUrdu ? 'زیر التواء لنک' : 'Pending Link')}
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
            <div className="p-6 rounded-3xl bg-gradient-to-br from-[#101730] to-[#0A0E1D] border border-white/10 shadow-lg">
              <div className="flex items-center gap-2 text-xs font-mono text-[#38BDF8] mb-2 uppercase">
                <ShieldCheck className="w-4 h-4 text-[#8B5CF6]" />
                <span>{isUrdu ? 'براہ راست میل فارورڈنگ' : 'DIRECT INBOX FORWARDING'}</span>
              </div>
              <div className="text-sm font-semibold text-[#F8FAFC] mb-1">
                {t('contact.inbox_info')} <span className="text-[#38BDF8] font-mono">{backendConfig.recipient}</span>
              </div>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                {isUrdu
                  ? 'یہ فارم سرور سائیڈ API کے ذریعے منسلک ہے۔ پیغامات محفوظ طریقے سے لاگ اور ای میل ان باکس میں ارسال کیے جاتے ہیں۔'
                  : 'Form submissions are processed via our server-side API. Messages are securely logged and forwarded directly to the recipient inbox.'}
              </p>
            </div>

          </div>

          {/* Right Column: Premium Contact Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl bg-[#0D1326] border border-white/15 p-7 sm:p-9 shadow-2xl backdrop-blur-xl">
              
              {/* Animated Revolving Border Glow */}
              <div className="absolute -inset-[1px] rounded-3xl opacity-20 pointer-events-none bg-gradient-to-r from-[#8B5CF6] via-[#38BDF8] to-[#8B5CF6] animate-border-rotate" />

              <h3 className="text-2xl font-display font-bold text-[#F8FAFC] mb-1">
                {t('contact.form_title')}
              </h3>
              <p className="text-xs text-[#94A3B8] mb-6">
                {t('contact.form_desc')}
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#94A3B8] mb-2">
                    {t('contact.label_name')} <span className="text-[#8B5CF6]">*</span>
                  </label>
                  <div className="relative">
                    <User className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8] ${isUrdu ? 'right-3.5' : 'left-3.5'}`} />
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={isUrdu ? 'مثال: محمد احمد' : 'e.g. Alex Morgan'}
                      className={`w-full py-3 rounded-xl bg-[#080B16] border border-white/10 text-sm text-[#F8FAFC] placeholder-[#94A3B8]/40 focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6] transition-all ${
                        isUrdu ? 'pr-10 pl-4' : 'pl-10 pr-4'
                      }`}
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#94A3B8] mb-2">
                    {t('contact.label_email')} <span className="text-[#38BDF8]">*</span>
                  </label>
                  <div className="relative">
                    <Mail className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8] ${isUrdu ? 'right-3.5' : 'left-3.5'}`} />
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="alex@example.com"
                      dir="ltr"
                      className={`w-full py-3 rounded-xl bg-[#080B16] border border-white/10 text-sm text-[#F8FAFC] placeholder-[#94A3B8]/40 focus:outline-none focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] transition-all ${
                        isUrdu ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4'
                      }`}
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#94A3B8] mb-2">
                    {t('contact.label_subject')} <span className="text-[#8B5CF6]">*</span>
                  </label>
                  <div className="relative">
                    <Tag className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8] ${isUrdu ? 'right-3.5' : 'left-3.5'}`} />
                    <input
                      type="text"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder={isUrdu ? 'مثال: اے آئی پروجیکٹ / تعاون / سوال' : 'e.g. Opportunity / AI Collaboration / Question'}
                      className={`w-full py-3 rounded-xl bg-[#080B16] border border-white/10 text-sm text-[#F8FAFC] placeholder-[#94A3B8]/40 focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6] transition-all ${
                        isUrdu ? 'pr-10 pl-4' : 'pl-10 pr-4'
                      }`}
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-[#94A3B8]">
                      {t('contact.label_message')} <span className="text-[#38BDF8]">*</span>
                    </label>
                    <span className="text-[11px] font-mono text-[#94A3B8]/60">
                      {formData.message.length} / 3000
                    </span>
                  </div>
                  <div className="relative">
                    <textarea
                      name="message"
                      required
                      rows={5}
                      maxLength={3000}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={isUrdu ? 'اپنے خیالات، تجاویز یا پیغام یہاں تحریر کریں...' : 'Share your thoughts, opportunity, or feedback...'}
                      className="w-full p-4 rounded-xl bg-[#080B16] border border-white/10 text-sm text-[#F8FAFC] placeholder-[#94A3B8]/40 focus:outline-none focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] transition-all resize-none leading-relaxed"
                    />
                  </div>
                </div>

                {/* Status Messages */}
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-200 text-xs flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-400 mt-0.5" />
                    <div>
                      <span className="font-bold block mb-0.5">{isUrdu ? 'پیغام کامیابی سے موصول ہوا!' : 'Message Sent Successfully!'}</span>
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
                      <span className="font-bold block mb-0.5">{isUrdu ? 'پیغام بھیجنے میں رکاوٹ' : 'Unable to Send Message'}</span>
                      <span>{statusMessage}</span>
                    </div>
                  </motion.div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full group relative inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl font-medium text-sm text-white overflow-hidden transition-all duration-300 shadow-[0_0_30px_rgba(139,92,246,0.35)] hover:shadow-[0_0_40px_rgba(56,189,248,0.5)] cursor-pointer disabled:opacity-50"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-[#8B5CF6] via-[#6366F1] to-[#38BDF8] group-hover:opacity-90 transition-opacity" />
                  <span className="relative z-10 flex items-center gap-2 font-semibold tracking-wide">
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>{t('contact.btn_sending')}</span>
                      </>
                    ) : (
                      <>
                        <span>{t('contact.btn_send')}</span>
                        <Send className={`w-4 h-4 text-white transition-transform ${isUrdu ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'} group-hover:-translate-y-1`} />
                      </>
                    )}
                  </span>
                </button>

              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
