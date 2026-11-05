import React, { useState } from 'react';
import {
  Home,
  User,
  GraduationCap,
  Wrench,
  FolderGit2,
  MessageSquareQuote,
  Mail,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const BottomNav: React.FC = () => {
  const { activeSection, accentConfig } = usePortfolio();
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, href: '#home' },
    { id: 'about', label: 'About', icon: User, href: '#about' },
    { id: 'resume', label: 'Resume', icon: GraduationCap, href: '#resume' },
    { id: 'services', label: 'Services', icon: Wrench, href: '#services' },
    { id: 'portfolio', label: 'Work', icon: FolderGit2, href: '#portfolio' },
    { id: 'testimonials', label: 'Reviews', icon: MessageSquareQuote, href: '#testimonials' },
    { id: 'contact', label: 'Contact', icon: Mail, href: '#contact' },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center">
      {/* Collapse Toggle Mini Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        title={collapsed ? 'Show Navigation Menu' : 'Minimize Navigation Menu'}
        className="mb-1.5 p-1 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white shadow-sm transition-all text-[10px] flex items-center justify-center opacity-80 hover:opacity-100"
      >
        {collapsed ? (
          <ChevronUp className="w-3.5 h-3.5" />
        ) : (
          <ChevronDown className="w-3.5 h-3.5" />
        )}
      </button>

      {/* Floating Dock */}
      {!collapsed && (
        <nav className="flex items-center gap-1 sm:gap-2 px-2.5 sm:px-4 py-2 rounded-full bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800/90 shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <a
                key={item.id}
                href={item.href}
                className={`group relative flex items-center justify-center p-2 sm:px-3 sm:py-2 rounded-full transition-all duration-300 ${
                  isActive
                    ? `${accentConfig.primary} text-white shadow-md scale-105`
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/80'
                }`}
                aria-label={item.label}
              >
                <Icon className="w-4 h-4 sm:w-4 sm:h-4" />

                {/* Desktop text label */}
                <span
                  className={`hidden md:inline ml-1.5 text-xs font-semibold tracking-tight ${
                    isActive ? 'text-white' : ''
                  }`}
                >
                  {item.label}
                </span>

                {/* Floating Tooltip for mobile/tablets */}
                <span className="absolute -top-9 scale-0 group-hover:scale-100 transition-all duration-150 px-2 py-0.5 rounded-md bg-slate-900 dark:bg-slate-800 text-white text-[10px] font-medium tracking-wide shadow-md whitespace-nowrap pointer-events-none md:hidden">
                  {item.label}
                </span>
              </a>
            );
          })}
        </nav>
      )}
    </div>
  );
};
