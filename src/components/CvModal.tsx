import React from 'react';
import {
  X,
  Printer,
  Download,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  GraduationCap,
  Briefcase,
  Wrench,
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CvModal: React.FC<CvModalProps> = ({ isOpen, onClose }) => {
  const { profile, experience, education, skills, accentConfig } = usePortfolio();

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl text-left overflow-hidden">
        
        {/* Top Action Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/60 print:hidden">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm text-slate-800 dark:text-slate-200">
              Curriculum Vitae Preview
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className={`px-4 py-2 rounded-xl text-xs font-bold text-white shadow-sm flex items-center gap-1.5 ${accentConfig.primary} ${accentConfig.primaryHover}`}
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-12 print:p-0 space-y-8 text-slate-800 dark:text-slate-200 print:text-black">
          
          {/* Resume Header */}
          <div className="border-b border-slate-200 dark:border-slate-800 pb-6 flex flex-col sm:flex-row justify-between sm:items-end gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white print:text-black tracking-tight">
                {profile.name}
              </h1>
              <p className={`text-base font-bold ${accentConfig.text} mt-1`}>
                {profile.roles[0] || 'Senior Full-Stack Engineer'}
              </p>
            </div>

            <div className="space-y-1 text-xs text-slate-600 dark:text-slate-400 print:text-slate-700">
              <p className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" /> {profile.email}
              </p>
              <p className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" /> {profile.phone}
              </p>
              <p className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" /> {profile.location}
              </p>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">
              Professional Summary
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300 print:text-slate-800 text-justify">
              {profile.detailedBio}
            </p>
          </div>

          {/* Core Competencies */}
          <div>
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3 flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5" />
              <span>Skills & Competencies</span>
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 print:border print:border-slate-300 text-slate-700 dark:text-slate-300"
                >
                  {skill.name} ({skill.level}%)
                </span>
              ))}
            </div>
          </div>

          {/* Work Experience */}
          <div>
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Professional Experience</span>
            </h2>

            <div className="space-y-6">
              {experience.map((exp) => (
                <div key={exp.id} className="space-y-2">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white print:text-black">
                      {exp.role} — <span className="font-semibold text-slate-600 dark:text-slate-400">{exp.company}</span>
                    </h3>
                    <span className="text-xs text-slate-500 font-medium">
                      {exp.period} | {exp.location}
                    </span>
                  </div>

                  <ul className="space-y-1.5 pl-1">
                    {exp.description.map((bullet, bIdx) => (
                      <li
                        key={bIdx}
                        className="text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1 text-[11px] text-slate-500">
                    <span className="font-medium">Tech:</span> {exp.skills.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Education & Credentials</span>
            </h2>

            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white print:text-black">
                      {edu.degree}
                    </h3>
                    <span className="text-xs text-slate-500">{edu.period}</span>
                  </div>
                  <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
                    {edu.institution} — {edu.location}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {edu.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
