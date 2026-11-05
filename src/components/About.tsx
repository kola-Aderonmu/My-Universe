import React from 'react';
import {
  Code,
  ShieldCheck,
  Zap,
  Layers,
  Check,
  Send,
  FileText,
  MapPin,
  Mail,
  Phone,
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface AboutProps {
  onOpenCvModal: () => void;
}

export const About: React.FC<AboutProps> = ({ onOpenCvModal }) => {
  const { profile, accentConfig } = usePortfolio();

  const stats = [
    { label: 'Years Experience', value: `${profile.yearsExperience}+` },
    { label: 'Completed Projects', value: `${profile.completedProjects}+` },
    { label: 'Satisfied Clients', value: `${profile.happyClients}+` },
    { label: 'Satisfaction Rate', value: `${profile.satisfactionRate}%` },
  ];

  const pillars = [
    {
      icon: Code,
      title: 'Clean, Scalable Code',
      description: 'Writing maintainable TypeScript and modular architectures that any team can pick up effortlessly.',
    },
    {
      icon: Layers,
      title: 'Pixel-Perfect UI/UX',
      description: 'Translating design visions into high-fidelity web experiences with micro-interactions and smooth flow.',
    },
    {
      icon: Zap,
      title: 'Fast Performance & SEO',
      description: 'Zero layout shift, optimized Core Web Vitals, and lightning-fast load times for high user retention.',
    },
    {
      icon: ShieldCheck,
      title: 'Enterprise Resilience',
      description: 'Built-in security, role-based access, automated workflows, and robust error management.',
    },
  ];

  return (
    <section id="about" className="py-24 sm:py-32 relative bg-slate-50/50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs mb-3">
            <span>Discover</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            About <span className={accentConfig.text}>Me</span>
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400">
            A developer who merges engineering precision with intuitive visual craftsmanship.
          </p>
        </div>

        {/* Top Grid: Bio Narrative & Key Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Left Column: Detailed Story */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Crafting digital products that solve real-world problems.
            </h3>
            
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed text-justify">
              {profile.detailedBio}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-200 text-sm">
                <MapPin className={`w-4 h-4 ${accentConfig.text} shrink-0`} />
                <span className="truncate">{profile.location}</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-200 text-sm">
                <Mail className={`w-4 h-4 ${accentConfig.text} shrink-0`} />
                <span className="truncate">{profile.email}</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-200 text-sm">
                <Phone className={`w-4 h-4 ${accentConfig.text} shrink-0`} />
                <span>{profile.phone}</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-200 text-sm">
                <Check className={`w-4 h-4 ${accentConfig.text} shrink-0`} />
                <span>Available for new contracts</span>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <button
                onClick={onOpenCvModal}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white shadow-md transition-all hover:scale-105 ${accentConfig.primary} ${accentConfig.primaryHover}`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>View Full Resume</span>
              </button>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-xs hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Get in Touch</span>
              </a>
            </div>
          </div>

          {/* Right Column: 4 Big Stat Cards */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-700/80 shadow-md hover:shadow-lg transition-all text-center group"
              >
                <p
                  className={`text-3xl sm:text-4xl font-extrabold ${accentConfig.text} tracking-tight group-hover:scale-105 transition-transform`}
                >
                  {stat.value}
                </p>
                <p className="mt-2 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom Feature Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/70 shadow-xs hover:border-slate-300 dark:hover:border-slate-600 transition-all space-y-3"
              >
                <div
                  className={`w-11 h-11 rounded-xl ${accentConfig.bgSubtle} ${accentConfig.text} flex items-center justify-center`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  {pillar.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
