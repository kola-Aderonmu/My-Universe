import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const ScrollToTop: React.FC = () => {
  const { accentConfig } = usePortfolio();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full flex items-center justify-center bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-xl border border-slate-200/80 dark:border-slate-800 transition-all duration-300 hover:scale-110 group focus:outline-none"
      title="Scroll to Top"
      aria-label="Scroll to top of page"
    >
      {/* Circular Progress SVG */}
      <svg className="w-12 h-12 -rotate-90 pointer-events-none absolute inset-0">
        <circle
          cx="24"
          cy="24"
          r={radius}
          className="stroke-slate-200 dark:stroke-slate-800"
          strokeWidth="2.5"
          fill="none"
        />
        <circle
          cx="24"
          cy="24"
          r={radius}
          className="stroke-emerald-500 transition-all duration-150"
          strokeWidth="2.5"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{
            stroke:
              accentConfig.id === 'emerald'
                ? '#10b981'
                : accentConfig.id === 'blue'
                ? '#2563eb'
                : accentConfig.id === 'violet'
                ? '#7c3aed'
                : accentConfig.id === 'amber'
                ? '#f59e0b'
                : accentConfig.id === 'rose'
                ? '#f43f5e'
                : '#06b6d4',
          }}
        />
      </svg>

      <ArrowUp className="w-5 h-5 text-slate-700 dark:text-slate-300 group-hover:-translate-y-0.5 transition-transform" />
    </button>
  );
};
