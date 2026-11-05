import React, { useState, useEffect } from 'react';
import {
  Sun,
  Moon,
  Palette,
  Sparkles,
  KeyRound,
  Unlock,
  Menu,
  X,
  Send,
  MousePointer,
  Check,
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { ACCENT_PALETTES } from '../data/initialPortfolioData';
import { AccentColor } from '../types/portfolio';

interface HeaderProps {
  onOpenAdminGate: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAdminGate }) => {
  const {
    isDarkMode,
    toggleTheme,
    accent,
    setAccent,
    accentConfig,
    profile,
    activeSection,
    cursorEnabled,
    setCursorEnabled,
    isAdminAuthenticated,
  } = usePortfolio();

  const [isScrolled, setIsScrolled] = useState(false);
  const [showPaletteMenu, setShowPaletteMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Resume', href: '#resume', id: 'resume' },
    { label: 'Services', href: '#services', id: 'services' },
    { label: 'Portfolio', href: '#portfolio', id: 'portfolio' },
    { label: 'Testimonials', href: '#testimonials', id: 'testimonials' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const colorDots: Record<AccentColor, string> = {
    emerald: 'bg-emerald-500',
    blue: 'bg-blue-600',
    violet: 'bg-violet-600',
    amber: 'bg-amber-500',
    rose: 'bg-rose-500',
    cyan: 'bg-cyan-500',
  };

  const getInitials = (name: string) => {
    const parts = name.trim().split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase() || 'GK';
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'py-3.5 bg-white/80 dark:bg-slate-900/85 backdrop-blur-md shadow-sm border-b border-slate-200/60 dark:border-slate-800/80'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center gap-2 group focus:outline-none"
          >
            <div
              className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${accentConfig.gradient} flex items-center justify-center text-white font-bold text-lg shadow-md transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3`}
            >
              {getInitials(profile.name)}
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white transition-colors">
                {profile.name}
                <span className={accentConfig.text}>.</span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400 font-semibold">
                Portfolio
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/70 dark:bg-slate-800/70 backdrop-blur-sm px-4 py-1.5 rounded-full border border-slate-200/50 dark:border-slate-700/50 shadow-inner">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 ${
                    isActive
                      ? `${accentConfig.primary} text-white shadow-sm`
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-700/50'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Controls: Discreet Gateway Icon, Theme, Accent Color, Hire Me */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Discreet Access Icon - subtle glyph that blends in with tools */}
            <button
              onClick={onOpenAdminGate}
              title={isAdminAuthenticated ? 'Console Active (Click to open CMS)' : 'Access Key'}
              aria-label="Access Key"
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all border ${
                isAdminAuthenticated
                  ? `${accentConfig.bgSubtle} ${accentConfig.text} border-current shadow-xs`
                  : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 border-slate-200/80 dark:border-slate-700'
              }`}
            >
              {isAdminAuthenticated ? (
                <Unlock className="w-4 h-4" />
              ) : (
                <KeyRound className="w-4 h-4 opacity-75 hover:opacity-100" />
              )}
            </button>

            {/* Accent Palette Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowPaletteMenu(!showPaletteMenu)}
                title="Change Accent Color"
                className="w-9 h-9 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors border border-slate-200/80 dark:border-slate-700"
              >
                <Palette className="w-4 h-4" />
              </button>

              {showPaletteMenu && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowPaletteMenu(false)}
                  />
                  <div className="absolute right-0 mt-2 w-52 p-3 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2.5 px-1 flex items-center justify-between">
                      <span>Accent Color</span>
                      <Sparkles className="w-3 h-3 text-amber-400" />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {(Object.keys(ACCENT_PALETTES) as AccentColor[]).map((key) => {
                        const isSelected = accent === key;
                        const config = ACCENT_PALETTES[key];
                        return (
                          <button
                            key={key}
                            onClick={() => {
                              setAccent(key);
                              setShowPaletteMenu(false);
                            }}
                            className={`flex flex-col items-center gap-1 p-1.5 rounded-xl border text-[11px] font-medium transition-all ${
                              isSelected
                                ? 'border-slate-900 dark:border-white bg-slate-50 dark:bg-slate-800/80 shadow-sm'
                                : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                            }`}
                          >
                            <span
                              className={`w-5 h-5 rounded-full ${colorDots[key]} flex items-center justify-center shadow-xs`}
                            >
                              {isSelected && <Check className="w-3 h-3 text-white" />}
                            </span>
                            <span className="text-[10px] text-slate-600 dark:text-slate-400 truncate max-w-full">
                              {config.name.split(' ')[0]}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between px-1">
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                        <MousePointer className="w-3 h-3" /> Custom Cursor
                      </span>
                      <button
                        onClick={() => setCursorEnabled(!cursorEnabled)}
                        className={`text-[10px] px-2 py-0.5 rounded-full font-semibold transition-colors ${
                          cursorEnabled
                            ? `${accentConfig.bgSubtle} ${accentConfig.text}`
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                        }`}
                      >
                        {cursorEnabled ? 'ON' : 'OFF'}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Dark / Light Toggle */}
            <button
              onClick={toggleTheme}
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="w-9 h-9 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors border border-slate-200/80 dark:border-slate-700"
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-amber-400 transition-transform duration-300 hover:rotate-45" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700 transition-transform duration-300 hover:-rotate-12" />
              )}
            </button>

            {/* CTA: Hire Me */}
            <a
              href="#contact"
              className={`hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-white shadow-md transition-all duration-200 hover:scale-105 ${accentConfig.primary} ${accentConfig.primaryHover}`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>Hire Me</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-9 h-9 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 p-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  activeSection === item.id
                    ? `${accentConfig.bgSubtle} ${accentConfig.text}`
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdminGate();
                }}
                className="w-10 py-2.5 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500"
                title="System Key"
              >
                <KeyRound className="w-4 h-4" />
              </button>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex-1 py-2.5 text-center text-xs font-bold rounded-xl text-white ${accentConfig.primary}`}
              >
                Hire Me
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
