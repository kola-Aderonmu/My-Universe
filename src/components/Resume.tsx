import React, { useState } from 'react';
import {
  FileText,
  Briefcase,
  GraduationCap,
  Wrench,
  Calendar,
  MapPin,
  CheckCircle2,
  Award,
  Download,
  Printer,
  Maximize2,
  ExternalLink,
  ShieldCheck,
  Mail,
  Phone,
  Eye,
  RefreshCw,
  AlertCircle,
  FileCheck,
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { PDFCanvasViewer } from './PDFCanvasViewer';

export const Resume: React.FC = () => {
  const { profile, experience, education, skills, accentConfig } = usePortfolio();
  // Default to 'experience' tab on initial launch as requested
  const [activeTab, setActiveTab] = useState<'preview' | 'experience' | 'education' | 'skills'>('experience');
  const [skillCategory, setSkillCategory] = useState<string>('All');
  const [previewMode, setPreviewMode] = useState<'pdf' | 'curated'>('pdf');

  const categories = ['All', 'Frontend', 'Backend', 'Tools & DevOps', 'Design & Other'];

  const filteredSkills =
    skillCategory === 'All'
      ? skills
      : skills.filter((s) => s.category === skillCategory);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = () => {
    if (profile.resumeUrl) {
      const link = document.createElement('a');
      link.href = profile.resumeUrl;
      link.download = `${profile.name.replace(/\s+/g, '_')}_Resume.pdf`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.print();
    }
  };

  return (
    <section id="resume" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs mb-3">
            <span>Career & Qualifications</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            My <span className={accentConfig.text}>Resume</span>
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400">
            A comprehensive overview of my career experience, degrees, and technical arsenal.
          </p>

          {/* Tab Selector Buttons */}
          <div className="mt-8 inline-flex flex-wrap justify-center p-1.5 rounded-full bg-slate-100 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-inner gap-1">
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'preview'
                  ? `${accentConfig.primary} text-white shadow-md`
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Preview Resume</span>
            </button>

            <button
              onClick={() => setActiveTab('experience')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'experience'
                  ? `${accentConfig.primary} text-white shadow-md`
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Experience</span>
            </button>

            <button
              onClick={() => setActiveTab('education')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'education'
                  ? `${accentConfig.primary} text-white shadow-md`
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Education</span>
            </button>

            <button
              onClick={() => setActiveTab('skills')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'skills'
                  ? `${accentConfig.primary} text-white shadow-md`
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Wrench className="w-4 h-4" />
              <span>Skills & Tools</span>
            </button>
          </div>
        </div>

        {/* Tab 0: Preview Resume (Direct Full High-Resolution PDF Display) */}
        {activeTab === 'preview' && (
          <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
            {/* Top Resume Control Bar */}
            <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-800/80 border border-slate-200/90 dark:border-slate-700/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-2xl ${accentConfig.bgSubtle} ${accentConfig.text}`}>
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span>Curriculum Vitae Document</span>
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-extrabold uppercase tracking-wide border border-emerald-500/20">
                      Live Document Engine
                    </span>
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Official verified resume for client and employer evaluations.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
                <div className="flex rounded-xl p-0.5 bg-slate-100 dark:bg-slate-700/80 border border-slate-200 dark:border-slate-600 text-xs">
                  <button
                    onClick={() => setPreviewMode('pdf')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
                      previewMode === 'pdf'
                        ? `${accentConfig.primary} text-white shadow-xs`
                        : 'text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    <FileCheck className="w-3.5 h-3.5" />
                    <span>PDF Document</span>
                  </button>
                  <button
                    onClick={() => setPreviewMode('curated')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
                      previewMode === 'curated'
                        ? `${accentConfig.primary} text-white shadow-xs`
                        : 'text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    <span>Curated Summary</span>
                  </button>
                </div>

                <button
                  onClick={handlePrint}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-700/80 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Print</span>
                </button>

                <button
                  onClick={handleDownloadPdf}
                  className={`px-4 py-2 rounded-xl text-xs font-bold text-white shadow-md flex items-center gap-1.5 ${accentConfig.primary} ${accentConfig.primaryHover}`}
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>

            {/* Display Actual Uploaded PDF via Canvas Engine or Synchronized Summary */}
            {previewMode === 'pdf' ? (
              profile.resumeUrl ? (
                <PDFCanvasViewer
                  pdfUrl={profile.resumeUrl}
                  fileName={`${profile.name.replace(/\s+/g, '_')}_Resume.pdf`}
                  accentClass={accentConfig.primary}
                />
              ) : (
                <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-md space-y-4">
                  <FileText className="w-12 h-12 mx-auto text-slate-400" />
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    No Resume PDF Uploaded Yet
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                    You can upload your official PDF resume anytime via the discreet Admin key icon in the navigation bar.
                  </p>
                </div>
              )
            ) : (
              <div className="p-8 sm:p-14 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xl text-left space-y-10 text-slate-800 dark:text-slate-200">
                {/* Header */}
                <div className="border-b border-slate-200 dark:border-slate-800 pb-8 flex flex-col sm:flex-row justify-between sm:items-end gap-6">
                  <div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                      {profile.name}
                    </h1>
                    <p className={`text-base font-bold ${accentConfig.text} mt-1`}>
                      {profile.roles[0] || 'Senior Full-Stack Engineer'}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Security Vetted & Industry Certified Professional</span>
                    </p>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                    <p className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <span>{profile.email}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <span>{profile.phone}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{profile.location}</span>
                    </p>
                  </div>
                </div>

                {/* Professional Summary */}
                <div className="space-y-3">
                  <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                    Professional Executive Summary
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300 text-justify">
                    {profile.detailedBio}
                  </p>
                </div>

                {/* Core Competencies */}
                <div className="space-y-3">
                  <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                    <Wrench className="w-3.5 h-3.5" />
                    <span>Technical Arsenal & Competencies</span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60"
                      >
                        {skill.name} <span className="opacity-60">({skill.level}%)</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Work Experience */}
                <div className="space-y-6">
                  <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>Professional Experience & Deployments</span>
                  </h3>

                  <div className="space-y-6">
                    {experience.map((exp) => (
                      <div key={exp.id} className="p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-700/60 space-y-3">
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-1">
                          <div>
                            <h4 className="text-base font-bold text-slate-900 dark:text-white">
                              {exp.role} — <span className="font-semibold text-slate-600 dark:text-slate-400">{exp.company}</span>
                            </h4>
                          </div>
                          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-200/80 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                            {exp.period} | {exp.location}
                          </span>
                        </div>

                        <ul className="space-y-2">
                          {exp.description.map((bullet, bIdx) => (
                            <li
                              key={bIdx}
                              className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 flex items-start gap-2.5"
                            >
                              <CheckCircle2 className={`w-4 h-4 ${accentConfig.text} shrink-0 mt-0.5`} />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                          {exp.skills.map((s, sIdx) => (
                            <span
                              key={sIdx}
                              className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200/50 dark:border-slate-600/50"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Education */}
                <div className="space-y-4">
                  <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>Education, Degrees & Certifications</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {education.map((edu) => (
                      <div key={edu.id} className="p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-700/60">
                        <span className="text-[11px] font-bold text-slate-400">{edu.period}</span>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                          {edu.degree}
                        </h4>
                        <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
                          {edu.institution} • {edu.location}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                          {edu.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 1: Experience Timeline */}
        {activeTab === 'experience' && (
          <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
            {experience.map((item, idx) => (
              <div
                key={item.id}
                className="relative p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800/80 border border-slate-200/90 dark:border-slate-700/80 shadow-md hover:shadow-xl transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${accentConfig.bgSubtle} ${accentConfig.text} mb-2`}
                    >
                      {item.period}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                      {item.role}
                    </h3>
                    <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                      {item.company}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{item.location}</span>
                  </div>
                </div>

                <ul className="space-y-2.5 my-4">
                  {item.description.map((bullet, i) => (
                    <li
                      key={i}
                      className="text-sm text-slate-600 dark:text-slate-300 flex items-start gap-2.5"
                    >
                      <CheckCircle2
                        className={`w-4 h-4 ${accentConfig.text} shrink-0 mt-0.5`}
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 dark:border-slate-700/50">
                  {item.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Education Timeline */}
        {activeTab === 'education' && (
          <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
            {education.map((item) => (
              <div
                key={item.id}
                className="relative p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800/80 border border-slate-200/90 dark:border-slate-700/80 shadow-md hover:shadow-xl transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${accentConfig.bgSubtle} ${accentConfig.text} mb-2`}
                    >
                      {item.period}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                      {item.degree}
                    </h3>
                    <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                      {item.institution}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{item.location}</span>
                  </div>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed my-3">
                  {item.description}
                </p>

                {item.grade && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
                    <Award className="w-3.5 h-3.5" />
                    <span>Grade: {item.grade}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Skills & Tools with animated progress bars */}
        {activeTab === 'skills' && (
          <div className="max-w-5xl mx-auto animate-in fade-in duration-300">
            {/* Category Sub-Filters */}
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSkillCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                    skillCategory === cat
                      ? `${accentConfig.primary} text-white shadow-xs`
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredSkills.map((skill, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900 dark:text-white">
                        {skill.name}
                      </span>
                      <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider">
                        • {skill.category}
                      </span>
                    </div>
                    <span className={`text-xs font-extrabold ${accentConfig.text}`}>
                      {skill.level}%
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-700/80 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${accentConfig.gradient} transition-all duration-1000 ease-out`}
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
