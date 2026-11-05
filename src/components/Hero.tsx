import React, { useState, useEffect } from 'react';
import {
  ArrowDown,
  Download,
  Send,
  Github,
  Linkedin,
  Twitter,
  Dribbble,
  Mail,
  CheckCircle,
  Briefcase,
  Sparkles,
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface HeroProps {
  onOpenCvModal: () => void;
  onOpenProfileEditor?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCvModal }) => {
  const { profile, accentConfig } = usePortfolio();
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect for roles
  useEffect(() => {
    const roles = profile.roles.length > 0 ? profile.roles : ['Full-Stack Developer'];
    const currentFullRole = roles[currentRoleIndex % roles.length];
    const typingSpeed = isDeleting ? 40 : 80;
    const pauseTime = 1800;

    let timer: NodeJS.Timeout;

    if (!isDeleting && displayedRole === currentFullRole) {
      timer = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && displayedRole === '') {
      setIsDeleting(false);
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    } else {
      timer = setTimeout(() => {
        setDisplayedRole((prev) =>
          isDeleting
            ? currentFullRole.substring(0, prev.length - 1)
            : currentFullRole.substring(0, prev.length + 1)
        );
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [displayedRole, isDeleting, currentRoleIndex, profile.roles]);

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-grid-pattern"
    >
      {/* Soft atmospheric gradient glow blobs */}
      <div
        className={`absolute -top-40 -left-40 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none bg-gradient-to-tr ${accentConfig.gradient}`}
      />
      <div
        className={`absolute top-1/2 -right-40 w-96 h-96 rounded-full blur-3xl opacity-15 pointer-events-none bg-gradient-to-bl ${accentConfig.gradient}`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Text & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6 text-left">
            {/* Availability Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 shadow-xs">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 tracking-wide">
                {profile.availability}
              </span>
            </div>

            {/* Main Greeting & Name */}
            <div className="space-y-2">
              <p className="text-base sm:text-lg font-medium text-slate-500 dark:text-slate-400 tracking-wide">
                {profile.greeting}
              </p>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                {profile.name}
                <span className={accentConfig.text}>.</span>
              </h1>
              
              {/* Animated Typing Headline */}
              <div className="flex items-center text-xl sm:text-2xl lg:text-3xl font-bold min-h-[44px]">
                <span className="text-slate-700 dark:text-slate-300 mr-2">I am</span>
                <span
                  className={`bg-gradient-to-r ${accentConfig.gradient} text-gradient underline decoration-2 decoration-current`}
                >
                  {displayedRole}
                </span>
                <span className="inline-block w-0.5 h-7 ml-1 bg-current animate-pulse align-middle" />
              </div>
            </div>

            {/* Bio paragraph */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed font-normal">
              {profile.bio}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <a
                href="#contact"
                className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold text-white shadow-lg shadow-emerald-500/20 transition-all duration-200 hover:scale-105 ${accentConfig.primary} ${accentConfig.primaryHover}`}
              >
                <Send className="w-4 h-4" />
                <span>Hire Me Now</span>
              </a>

              <button
                onClick={onOpenCvModal}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700/80 transition-all duration-200 hover:scale-105"
              >
                <Download className="w-4 h-4" />
                <span>Download CV</span>
              </button>

              <a
                href="#portfolio"
                className="inline-flex items-center gap-1.5 px-4 py-3 rounded-full text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <span>View Projects</span>
                <ArrowDown className="w-4 h-4" />
              </a>
            </div>

            {/* Social Links & Fast Contact */}
            <div className="pt-4 flex items-center gap-3">
              <span className="text-xs uppercase font-bold tracking-widest text-slate-400 dark:text-slate-500 mr-1">
                Follow Me:
              </span>
              {profile.socials.github && (
                <a
                  href={profile.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all hover:scale-110 shadow-xs"
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
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all hover:scale-110 shadow-xs"
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
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all hover:scale-110 shadow-xs"
                  title="Twitter / X"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              )}
              {profile.socials.dribbble && (
                <a
                  href={profile.socials.dribbble}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all hover:scale-110 shadow-xs"
                  title="Dribbble"
                >
                  <Dribbble className="w-4 h-4" />
                </a>
              )}
              <a
                href={`mailto:${profile.email}`}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all hover:scale-110 shadow-xs"
                title="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Hero Portrait Showcase with interactive photo replacement */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            <div className="relative w-72 sm:w-84 md:w-96 aspect-[4/5] group">
              {/* Outer decorative glowing backdrop card */}
              <div
                className={`absolute inset-0 rounded-3xl bg-gradient-to-tr ${accentConfig.gradient} opacity-20 blur-2xl group-hover:opacity-30 transition-opacity duration-500`}
              />

              {/* Main Avatar Container with modern glass card styling */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-slate-200/80 dark:border-slate-700/80 bg-slate-100 dark:bg-slate-800 shadow-2xl transition-transform duration-500 group-hover:scale-[1.01]">
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback to stylized unsplash portrait if URL fails
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80';
                  }}
                />

                {/* Dark gradient vignette over bottom of image */}
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />


                {/* Name badge inside image bottom */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-xs font-semibold text-slate-300">Verified Professional</p>
                  <p className="text-lg font-bold flex items-center gap-1.5">
                    {profile.name}
                    <CheckCircle className="w-4 h-4 text-emerald-400 inline" />
                  </p>
                </div>
              </div>

              {/* Floating Stat Badge 1: Experience */}
              <div className="absolute -left-6 top-12 sm:top-16 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-slate-200/90 dark:border-slate-800 flex items-center gap-3 animate-in fade-in slide-in-from-left duration-700">
                <div
                  className={`w-10 h-10 rounded-xl ${accentConfig.bgSubtle} flex items-center justify-center ${accentConfig.text}`}
                >
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-base font-extrabold text-slate-900 dark:text-white leading-none">
                    {profile.yearsExperience}+ Years
                  </p>
                  <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-1">
                    Industry Experience
                  </p>
                </div>
              </div>

              {/* Floating Stat Badge 2: Completed Projects */}
              <div className="absolute -right-6 bottom-16 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-slate-200/90 dark:border-slate-800 flex items-center gap-3 animate-in fade-in slide-in-from-right duration-700">
                <div
                  className={`w-10 h-10 rounded-xl ${accentConfig.bgSubtle} flex items-center justify-center ${accentConfig.text}`}
                >
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-base font-extrabold text-slate-900 dark:text-white leading-none">
                    {profile.completedProjects}+ Projects
                  </p>
                  <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-1">
                    Delivered Successfully
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
