import React from 'react';
import {
  Github,
  Linkedin,
  Twitter,
  Dribbble,
  Mail,
  ArrowUp,
  Heart,
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface FooterProps {
  onReplaySplash?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onReplaySplash }) => {
  const { profile, accentConfig } = usePortfolio();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="pt-16 pb-28 sm:pb-24 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-slate-100 dark:border-slate-800/80">
          
          {/* Logo & Slogan */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <a href="#home" className="flex items-center gap-2 group mb-2">
              <span className="font-extrabold text-2xl tracking-tight text-slate-900 dark:text-white">
                {profile.name}
                <span className={accentConfig.text}>.</span>
              </span>
            </a>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm">
              Building responsive, high-performance web products with clean code, modern stacks, and seamless user experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold">
            <a href="#home" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Home
            </a>
            <a href="#about" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              About
            </a>
            <a href="#resume" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Resume
            </a>
            <a href="#services" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Services
            </a>
            <a href="#portfolio" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Portfolio
            </a>
            <a href="#contact" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Contact
            </a>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            {profile.socials.github && (
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {profile.socials.linkedin && (
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            {profile.socials.twitter && (
              <a
                href={profile.socials.twitter}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
                title="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            )}
            <a
              href={`mailto:${profile.email}`}
              className="w-9 h-9 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
              title="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-500 gap-4">
          <p>© {currentYear} {profile.name}. All rights reserved.</p>
          
          {onReplaySplash && (
            <button
              onClick={onReplaySplash}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-slate-100 dark:bg-slate-800/90 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer shadow-xs hover:scale-105"
              title="Replay Dramatic Intro"
            >
              <span>🎬 Replay Dramatic Intro</span>
            </button>
          )}

          <div className="flex items-center gap-1">
            <span>Designed & Engineered with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 inline fill-rose-500" />
            <span>in TypeScript & Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
