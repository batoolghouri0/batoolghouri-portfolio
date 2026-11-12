import React from 'react';

// Brand & Technology Authentic SVG Icons
export const BgMonogram: React.FC<{ className?: string; size?: number; showBackground?: boolean }> = ({
  className = '',
  size = 36,
  showBackground = true,
}) => (
  <div
    style={{ width: size, height: size }}
    className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
  >
    {showBackground && (
      <div className="absolute inset-0 rounded-2xl bg-[#0C1122] border border-[#8B5CF6]/30 shadow-[0_0_15px_rgba(139,92,246,0.25)]" />
    )}
    <img
      src="/batool-logo.png"
      alt="Batool Ghouri Logo"
      className="relative z-10 w-full h-full object-contain p-1 rounded-xl transition-transform duration-300 group-hover:scale-105"
      onError={(e) => {
        // Fallback in case of image load delay
        const target = e.currentTarget;
        target.style.display = 'none';
      }}
    />
  </div>
);

export const HtmlIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M4 3L5.6 20.4L12 22L18.4 20.4L20 3H4Z" fill="#E44D26" />
    <path d="M12 4.4V20.3L17.1 18.9L18.4 4.4H12Z" fill="#F16529" />
    <path d="M8 7.5H16L15.6 11.5H12V14H15.4L15 17.5L12 18.3V15.7L12 14.7H10L10.3 11.5H8L8 7.5Z" fill="white" />
  </svg>
);

export const CssIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M4 3L5.6 20.4L12 22L18.4 20.4L20 3H4Z" fill="#264DE4" />
    <path d="M12 4.4V20.3L17.1 18.9L18.4 4.4H12Z" fill="#2965F1" />
    <path d="M8 7.5H16L15.8 9.5H10.1L10.3 11.5H15.6L15.2 15.5L12 16.4L8.8 15.5L8.6 13.5H10.6L10.7 14.3L12 14.7L13.3 14.3L13.4 13.5H8.3L8 7.5Z" fill="white" />
  </svg>
);

export const TypeScriptIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="4" fill="#3178C6" />
    <path d="M11.5 12H8.5V10.5H16V12H13V18H11.5V12Z" fill="white" />
    <path d="M20 13.5C20 12.5 19 12 17.8 12C16.5 12 15.5 12.6 15.5 13.6C15.5 15.6 19.8 14.6 19.8 16.6C19.8 17.6 18.8 18.2 17.5 18.2C16 18.2 15 17.4 15 16.2H16.4C16.4 16.8 16.9 17.1 17.5 17.1C18.1 17.1 18.5 16.8 18.5 16.4C18.5 14.8 14.2 15.5 14.2 13.4C14.2 12.1 15.4 11 17.6 11C19.5 11 20.3 12 20.3 13.5H20Z" fill="white" />
  </svg>
);

export const NextJsIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="11" fill="black" stroke="#38BDF8" strokeWidth="1" />
    <path d="M7 7.5V16.5M10.5 7.5L16.5 16.5M16.5 7.5V13" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const TailwindIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 6C9 6 7.5 7.5 7.5 10.5C8.25 9.38 9.19 8.81 10.31 8.81C11.63 8.81 12.56 9.75 13.5 10.69C15.03 12.22 16.78 14 20.5 14C23.5 14 25 12.5 25 9.5C24.25 10.62 23.31 11.19 22.19 11.19C20.87 11.19 19.94 10.25 19 9.31C17.47 7.78 15.72 6 12 6ZM3.5 13.5C0.5 13.5 -1 15 -1 18C-0.25 16.88 0.69 16.31 1.81 16.31C3.13 16.31 4.06 17.25 5 18.19C6.53 19.72 8.28 21.5 12 21.5C15 21.5 16.5 20 16.5 17C15.75 18.12 14.81 18.69 13.69 18.69C12.37 18.69 11.44 17.75 10.5 16.81C8.97 15.28 7.22 13.5 3.5 13.5Z" fill="#38BDF8" transform="scale(0.8) translate(3, 1)" />
  </svg>
);

export const PythonIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M11.9 2C8.6 2 8.8 3.4 8.8 3.4L8.8 4.9H12.1V5.4H5.3C5.3 5.4 2 5 2 8.3C2 11.6 4.9 11.4 4.9 11.4H6.5V9.8C6.5 8.1 7.9 6.7 9.6 6.7H13.6C14.7 6.7 15.6 5.8 15.6 4.7V3.5C15.6 2.3 14.3 2 11.9 2ZM10.5 3.2C11 3.2 11.3 3.6 11.3 4C11.3 4.4 11 4.8 10.5 4.8C10.1 4.8 9.7 4.4 9.7 4C9.7 3.6 10.1 3.2 10.5 3.2Z" fill="#387EB8" />
    <path d="M12.1 22C15.4 22 15.2 20.6 15.2 20.6V19.1H11.9V18.6H18.7C18.7 18.6 22 19 22 15.7C22 12.4 19.1 12.6 19.1 12.6H17.5V14.2C17.5 15.9 16.1 17.3 14.4 17.3H10.4C9.3 17.3 8.4 18.2 8.4 19.3V20.5C8.4 21.7 9.7 22 12.1 22ZM13.5 20.8C13 20.8 12.7 20.4 12.7 20C12.7 19.6 13 19.2 13.5 19.2C13.9 19.2 14.3 19.6 14.3 20C14.3 20.4 13.9 20.8 13.5 20.8Z" fill="#FFE873" />
  </svg>
);

export const AgenticAiIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="4" fill="#8B5CF6" />
    <circle cx="12" cy="3" r="2" fill="#38BDF8" />
    <circle cx="21" cy="12" r="2" fill="#38BDF8" />
    <circle cx="12" cy="21" r="2" fill="#38BDF8" />
    <circle cx="3" cy="12" r="2" fill="#38BDF8" />
    <path d="M12 5V8M19 12H16M12 19V16M5 12H8" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="12" cy="12" r="8" stroke="#38BDF8" strokeWidth="1" strokeDasharray="2 3" opacity="0.6" />
  </svg>
);

// Social Media Authentic Logos
export const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path
      d="M17.5 14.4C17.2 14.2 15.6 13.4 15.3 13.3C15 13.2 14.8 13.1 14.6 13.4C14.4 13.7 13.8 14.4 13.6 14.6C13.4 14.8 13.2 14.8 12.9 14.7C12.6 14.5 11.6 14.2 10.4 13.1C9.5 12.3 8.9 11.3 8.7 11C8.5 10.7 8.7 10.6 8.8 10.4C9 10.3 9.1 10.1 9.3 9.9C9.4 9.7 9.5 9.6 9.6 9.4C9.7 9.2 9.6 9 9.5 8.9C9.4 8.8 8.8 7.3 8.6 6.7C8.4 6.1 8.2 6.2 8 6.2H7.5C7.3 6.2 6.9 6.3 6.6 6.6C6.3 6.9 5.5 7.7 5.5 9.2C5.5 10.7 6.6 12.2 6.8 12.4C7 12.6 9 15.7 12 17C12.7 17.3 13.3 17.5 13.8 17.7C14.6 17.9 15.3 17.9 15.9 17.8C16.5 17.7 17.8 17 18.1 16.2C18.4 15.4 18.4 14.7 18.3 14.6C18.2 14.5 17.9 14.5 17.5 14.4Z"
      fill="currentColor"
    />
    <path
      d="M12 2C6.5 2 2 6.5 2 12C2 13.8 2.5 15.5 3.4 17L2.1 21.8L7 20.5C8.5 21.4 10.2 21.9 12 21.9C17.5 21.9 22 17.4 22 11.9C22 6.4 17.5 2 12 2ZM12 20.1C10.4 20.1 8.9 19.6 7.6 18.8L7.3 18.6L4.4 19.4L5.2 16.6L5 16.3C4.1 14.9 3.6 13.5 3.6 12C3.6 7.4 7.4 3.7 12 3.7C16.6 3.7 20.3 7.4 20.3 12C20.3 16.6 16.6 20.1 12 20.1Z"
      fill="currentColor"
    />
  </svg>
);

export const LinkedInIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2C18.5 10.6 17.1 9.4 15.2 9.4C13.7 9.4 13 10.3 12.6 10.9V9.6H9.6V18.5H12.6V13.8C12.6 12.5 12.8 11.3 14.4 11.3C15.9 11.3 16 12.7 16 13.9V18.5H18.5M5.9 8.2C6.9 8.2 7.7 7.4 7.7 6.4C7.7 5.4 6.9 4.6 5.9 4.6C4.9 4.6 4.1 5.4 4.1 6.4C4.1 7.4 4.9 8.2 5.9 8.2M7.4 18.5V9.6H4.4V18.5H7.4Z" />
  </svg>
);

export const XTwitterIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

export const FacebookIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

export const ThreadsIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12.186 24C5.594 24 0 18.406 0 11.814 0 5.223 5.594 0 12.186 0c6.438 0 11.758 4.992 12.156 11.398h-2.688c-.378-4.945-4.52-8.812-9.468-8.812-5.228 0-9.497 4.269-9.497 9.497 0 5.228 4.269 9.497 9.497 9.497 3.518 0 6.6-1.942 8.196-4.819l2.297 1.399C20.655 21.674 16.711 24 12.186 24zm4.498-11.458c0 2.894-2.138 5.032-5.032 5.032-2.893 0-5.031-2.138-5.031-5.032 0-2.893 2.138-5.031 5.031-5.031 2.894 0 5.032 2.138 5.032 5.031zm-2.585 0c0-1.468-1.079-2.547-2.447-2.547-1.368 0-2.446 1.079-2.446 2.547 0 1.468 1.078 2.547 2.446 2.547 1.368 0 2.447-1.079 2.447-2.547z" />
  </svg>
);
