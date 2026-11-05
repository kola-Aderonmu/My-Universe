import React, { useState, useRef } from 'react';
import {
  X,
  Upload,
  RotateCcw,
  Check,
  User,
  FolderGit2,
  Wrench,
  Lock,
  LogOut,
  Trash2,
  Plus,
  KeyRound,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Briefcase,
  FileText,
  FileUp,
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { ProjectItem, SkillItem } from '../types/portfolio';

interface ProfileEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileEditorModal: React.FC<ProfileEditorModalProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    profile,
    updateProfile,
    projects,
    addProject,
    deleteProject,
    skills,
    addSkill,
    deleteSkill,
    resetToDefaults,
    accentConfig,
    logoutAdmin,
    updateAdminPasscode,
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState<'profile' | 'projects' | 'skills' | 'security'>('profile');
  const [formData, setFormData] = useState({ ...profile });
  const [rolesText, setRolesText] = useState(profile.roles.join(', '));
  const [savedSuccess, setSavedSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cvFileInputRef = useRef<HTMLInputElement>(null);
  const [cvFileName, setCvFileName] = useState<string>('');

  // Security pass update state
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [passMessage, setPassMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // New Project Form state
  const [showAddProject, setShowAddProject] = useState(false);
  const [newProject, setNewProject] = useState<Partial<ProjectItem>>({
    title: '',
    category: 'web',
    description: '',
    longDescription: '',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
    tags: ['React', 'TypeScript', 'Tailwind CSS'],
    liveUrl: '',
    githubUrl: '',
    features: ['Modern responsive design', 'Fast loading & SEO ready'],
  });
  const [tagsInput, setTagsInput] = useState('React, TypeScript, Tailwind CSS');
  const [featuresInput, setFeaturesInput] = useState('Modern responsive design, Fast loading & SEO ready');

  // New Skill Form state
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState(90);
  const [newSkillCategory, setNewSkillCategory] = useState<'Frontend' | 'Backend' | 'Tools & DevOps' | 'Design & Other'>('Frontend');

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setFormData((prev) => ({ ...prev, avatarUrl: reader.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCvFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setFormData((prev) => ({ ...prev, resumeUrl: reader.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const splitRoles = rolesText
      .split(',')
      .map((r) => r.trim())
      .filter((r) => r.length > 0);

    const updated = {
      ...formData,
      roles: splitRoles.length > 0 ? splitRoles : ['Full-Stack Developer'],
      yearsExperience: Number(formData.yearsExperience) || 0,
      completedProjects: Number(formData.completedProjects) || 0,
      happyClients: Number(formData.happyClients) || 0,
      satisfactionRate: Number(formData.satisfactionRate) || 100,
    };

    updateProfile(updated);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
    }, 2000);
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title || !newProject.description) return;

    const project: ProjectItem = {
      id: `proj-${Date.now()}`,
      title: newProject.title || 'New Project',
      category: (newProject.category as any) || 'web',
      description: newProject.description || '',
      longDescription: newProject.longDescription || newProject.description || '',
      image: newProject.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
      tags: tagsInput.split(',').map((t) => t.trim()).filter(Boolean),
      features: featuresInput.split(',').map((f) => f.trim()).filter(Boolean),
      liveUrl: newProject.liveUrl || '',
      githubUrl: newProject.githubUrl || '',
    };

    addProject(project);
    setShowAddProject(false);
    setNewProject({
      title: '',
      category: 'web',
      description: '',
      longDescription: '',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
    });
  };

  const handleCreateSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    const skill: SkillItem = {
      name: newSkillName.trim(),
      level: Number(newSkillLevel),
      category: newSkillCategory,
    };

    addSkill(skill);
    setNewSkillName('');
    setNewSkillLevel(90);
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    const success = updateAdminPasscode(currentPass, newPass);
    if (success) {
      setPassMessage({ type: 'success', text: 'Authorization key updated successfully!' });
      setCurrentPass('');
      setNewPass('');
      setTimeout(() => setPassMessage(null), 3500);
    } else {
      setPassMessage({
        type: 'error',
        text: 'Incorrect current key or new key is too short (min 4 characters).',
      });
      setTimeout(() => setPassMessage(null), 3500);
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    onClose();
  };

  const sampleAvatars = [
    {
      label: 'Casual Tech',
      url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    },
    {
      label: 'Executive Male',
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    },
    {
      label: 'Creative Pro',
      url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    },
    {
      label: 'Minimal Studio',
      url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl text-left overflow-hidden">
        
        {/* Top Header */}
        <div className="p-4 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/70 dark:bg-slate-900/80">
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-xl ${accentConfig.bgSubtle} ${accentConfig.text}`}>
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Content Management Console</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-extrabold uppercase tracking-wider">
                  Private
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Manage all portfolio content, project showcases, skills, and security keys.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleLogout}
              title="Lock Session / Exit Console"
              className="px-3 py-1.5 rounded-xl text-xs font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors flex items-center gap-1.5 border border-rose-200/50 dark:border-rose-900/40"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Lock Session</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 pt-3 border-b border-slate-100 dark:border-slate-800 flex gap-2 overflow-x-auto bg-slate-50/30 dark:bg-slate-900/30">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'profile'
                ? `border-emerald-500 text-emerald-500`
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Profile & Bio</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'projects'
                ? `border-emerald-500 text-emerald-500`
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white'
            }`}
          >
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Projects ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('skills')}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'skills'
                ? `border-emerald-500 text-emerald-500`
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>Skills ({skills.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'security'
                ? `border-emerald-500 text-emerald-500`
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Security & Passcode</span>
          </button>
        </div>

        {/* Tab 1: Profile & Bio */}
        {activeTab === 'profile' && (
          <form onSubmit={handleSaveProfile} className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* Avatar & Photo Upload Section */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-4">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Profile Photo / Portrait
              </label>

              <div className="flex flex-col sm:flex-row items-center gap-5">
                <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-slate-300 dark:border-slate-600 shrink-0 shadow-md">
                  <img
                    src={formData.avatarUrl}
                    alt="Avatar Preview"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 space-y-3 w-full">
                  <div className="flex flex-wrap items-center gap-2">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className={`px-4 py-2 rounded-xl text-xs font-bold text-white shadow-sm flex items-center gap-1.5 ${accentConfig.primary} ${accentConfig.primaryHover}`}
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Photo From Device</span>
                    </button>
                    <span className="text-xs text-slate-500 dark:text-slate-400">or enter image URL below:</span>
                  </div>

                  <input
                    type="text"
                    value={formData.avatarUrl}
                    onChange={(e) => setFormData({ ...formData, avatarUrl: e.target.value })}
                    placeholder="https://example.com/my-photo.jpg"
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />

                  {/* Presets */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[11px] text-slate-400">Presets:</span>
                    {sampleAvatars.map((sample, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setFormData({ ...formData, avatarUrl: sample.url })}
                        className="text-[10px] px-2 py-1 rounded-md bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:border-slate-400"
                      >
                        {sample.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Resume / CV PDF Document Upload Section */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Curriculum Vitae (CV / Resume PDF)
                  </label>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Upload your official PDF resume. It will be displayed live in the "Preview Resume" tab and will be available for one-click download.
                  </p>
                </div>
                {formData.resumeUrl && (
                  <span className="text-[10px] px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 font-extrabold uppercase tracking-wide flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    <span>PDF Attached</span>
                  </span>
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
                <input
                  type="file"
                  ref={cvFileInputRef}
                  onChange={handleCvUpload}
                  accept=".pdf,application/pdf"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => cvFileInputRef.current?.click()}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold text-white shadow-sm flex items-center gap-2 ${accentConfig.primary} ${accentConfig.primaryHover}`}
                >
                  <FileUp className="w-4 h-4" />
                  <span>Upload PDF File From Device</span>
                </button>

                {formData.resumeUrl && (
                  <button
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, resumeUrl: '' }));
                      setCvFileName('');
                    }}
                    className="px-3 py-2 rounded-xl text-xs font-semibold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-200/50 dark:border-rose-900/40 transition-colors flex items-center gap-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove Uploaded PDF</span>
                  </button>
                )}
              </div>

              {cvFileName && (
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Selected file: {cvFileName}</span>
                </p>
              )}

              <div className="pt-1">
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                  Or enter direct public PDF URL:
                </label>
                <input
                  type="text"
                  value={formData.resumeUrl || ''}
                  onChange={(e) => setFormData({ ...formData, resumeUrl: e.target.value })}
                  placeholder="https://example.com/Gabriel_Kola_Resume.pdf"
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Greeting Phrase
                </label>
                <input
                  type="text"
                  value={formData.greeting}
                  onChange={(e) => setFormData({ ...formData, greeting: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Typewriter Roles */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Typewriter Roles (comma separated)
              </label>
              <input
                type="text"
                value={rolesText}
                onChange={(e) => setRolesText(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Phone / WhatsApp
                </label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Bio Narrative */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Hero Short Bio
              </label>
              <textarea
                rows={2}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Detailed About Story
              </label>
              <textarea
                rows={4}
                value={formData.detailedBio}
                onChange={(e) => setFormData({ ...formData, detailedBio: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Numbers */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                  Years Experience
                </label>
                <input
                  type="number"
                  value={formData.yearsExperience}
                  onChange={(e) =>
                    setFormData({ ...formData, yearsExperience: parseInt(e.target.value) || 0 })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                  Completed Projects
                </label>
                <input
                  type="number"
                  value={formData.completedProjects}
                  onChange={(e) =>
                    setFormData({ ...formData, completedProjects: parseInt(e.target.value) || 0 })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                  Satisfied Clients
                </label>
                <input
                  type="number"
                  value={formData.happyClients}
                  onChange={(e) =>
                    setFormData({ ...formData, happyClients: parseInt(e.target.value) || 0 })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                  Satisfaction %
                </label>
                <input
                  type="number"
                  value={formData.satisfactionRate}
                  onChange={(e) =>
                    setFormData({ ...formData, satisfactionRate: parseInt(e.target.value) || 100 })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white"
                />
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Social Profiles
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="GitHub URL"
                  value={formData.socials.github || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      socials: { ...formData.socials, github: e.target.value },
                    })
                  }
                  className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                />
                <input
                  type="text"
                  placeholder="LinkedIn URL"
                  value={formData.socials.linkedin || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      socials: { ...formData.socials, linkedin: e.target.value },
                    })
                  }
                  className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                />
                <input
                  type="text"
                  placeholder="Twitter / X URL"
                  value={formData.socials.twitter || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      socials: { ...formData.socials, twitter: e.target.value },
                    })
                  }
                  className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                />
                <input
                  type="text"
                  placeholder="Dribbble URL"
                  value={formData.socials.dribbble || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      socials: { ...formData.socials, dribbble: e.target.value },
                    })
                  }
                  className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                />
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                type="submit"
                className={`px-6 py-2.5 rounded-xl text-xs font-bold text-white shadow-md flex items-center gap-1.5 ${accentConfig.primary} ${accentConfig.primaryHover}`}
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Saved Successfully!</span>
                  </>
                ) : (
                  <span>Save Profile Updates</span>
                )}
              </button>
            </div>
          </form>
        )}

        {/* Tab 2: Projects Management */}
        {activeTab === 'projects' && (
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  Active Projects ({projects.length})
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Add custom client projects or update existing showcase works.
                </p>
              </div>

              <button
                onClick={() => setShowAddProject(!showAddProject)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold text-white flex items-center gap-1.5 shadow-sm ${accentConfig.primary}`}
              >
                <Plus className="w-4 h-4" />
                <span>{showAddProject ? 'Cancel' : 'Add New Project'}</span>
              </button>
            </div>

            {/* Add Project Form */}
            {showAddProject && (
              <form
                onSubmit={handleCreateProject}
                className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-4 animate-in fade-in"
              >
                <h5 className="text-sm font-bold text-slate-900 dark:text-white">
                  Create New Showcase Project
                </h5>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold mb-1">Project Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. NextGen SaaS Dashboard"
                      value={newProject.title}
                      onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">Category</label>
                    <select
                      value={newProject.category}
                      onChange={(e) => setNewProject({ ...newProject, category: e.target.value as any })}
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border text-xs"
                    >
                      <option value="ai-ml">AI & Machine Learning</option>
                      <option value="fullstack">Full-Stack</option>
                      <option value="web">Web Application</option>
                      <option value="mobile">Mobile & UI</option>
                      <option value="design">Design System</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Short Description *</label>
                  <input
                    type="text"
                    required
                    placeholder="Brief 1-2 sentence pitch..."
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Project Screenshot Image URL</label>
                  <input
                    type="text"
                    value={newProject.image}
                    onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border text-xs"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold mb-1">Live Demo URL</label>
                    <input
                      type="text"
                      placeholder="https://..."
                      value={newProject.liveUrl}
                      onChange={(e) => setNewProject({ ...newProject, liveUrl: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">GitHub Repo URL</label>
                    <input
                      type="text"
                      placeholder="https://github.com/..."
                      value={newProject.githubUrl}
                      onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Tags (comma separated)</label>
                  <input
                    type="text"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border text-xs"
                  />
                </div>

                <button
                  type="submit"
                  className={`px-5 py-2 rounded-xl text-xs font-bold text-white shadow-sm ${accentConfig.primary}`}
                >
                  Publish Project to Portfolio
                </button>
              </form>
            )}

            {/* Current Projects List */}
            <div className="space-y-3">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="w-14 h-10 object-cover rounded-lg shrink-0 border"
                    />
                    <div>
                      <h5 className="text-sm font-bold text-slate-900 dark:text-white">
                        {proj.title}
                      </h5>
                      <span className="text-[11px] text-slate-500 font-medium">
                        {proj.category.toUpperCase()} • {proj.tags.slice(0, 3).join(', ')}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-lg text-slate-400 hover:text-slate-800 dark:hover:text-white"
                        title="Open Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete project "${proj.title}"?`)) {
                          deleteProject(proj.id);
                        }
                      }}
                      className="p-2 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                      title="Delete Project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Skills Management */}
        {activeTab === 'skills' && (
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Technical Skills & Tools ({skills.length})
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Add your technical competencies and proficiency levels.
              </p>
            </div>

            {/* Add Skill Form */}
            <form
              onSubmit={handleCreateSkill}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-wrap items-end gap-3"
            >
              <div className="flex-1 min-w-[180px]">
                <label className="block text-xs font-semibold mb-1">Skill Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Next.js, Python, AWS"
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border text-xs"
                />
              </div>

              <div className="w-28">
                <label className="block text-xs font-semibold mb-1">Proficiency %</label>
                <input
                  type="number"
                  min={10}
                  max={100}
                  value={newSkillLevel}
                  onChange={(e) => setNewSkillLevel(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border text-xs"
                />
              </div>

              <div className="w-44">
                <label className="block text-xs font-semibold mb-1">Category</label>
                <select
                  value={newSkillCategory}
                  onChange={(e) => setNewSkillCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border text-xs"
                >
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Tools & DevOps">Tools & DevOps</option>
                  <option value="Design & Other">Design & Other</option>
                </select>
              </div>

              <button
                type="submit"
                className={`px-4 py-2 rounded-xl text-xs font-bold text-white shadow-sm flex items-center gap-1.5 ${accentConfig.primary}`}
              >
                <Plus className="w-4 h-4" />
                <span>Add Skill</span>
              </button>
            </form>

            {/* Skills List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {skills.map((skill, sIdx) => (
                <div
                  key={sIdx}
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 flex items-center justify-between"
                >
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">
                      {skill.name}
                    </p>
                    <span className="text-[10px] text-slate-500 font-medium">
                      {skill.category} • {skill.level}%
                    </span>
                  </div>

                  <button
                    onClick={() => deleteSkill(skill.name)}
                    className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                    title="Delete Skill"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Security & Master Passcode */}
        {activeTab === 'security' && (
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Console Security & Master Authorization Key
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Change your secret key so clients and visitors cannot access your editor portal.
              </p>
            </div>

            <form
              onSubmit={handleUpdatePassword}
              className="max-w-md p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-4"
            >
              {passMessage && (
                <div
                  className={`p-3 rounded-xl text-xs font-semibold ${
                    passMessage.type === 'success'
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                      : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                  }`}
                >
                  {passMessage.text}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">
                  Current Authorization Key *
                </label>
                <input
                  type="password"
                  required
                  value={currentPass}
                  onChange={(e) => setCurrentPass(e.target.value)}
                  placeholder="Enter current passcode (default: admin123)"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">
                  New Secret Passcode *
                </label>
                <input
                  type="password"
                  required
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  placeholder="Enter your new private passcode..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border text-xs"
                />
              </div>

              <button
                type="submit"
                className={`w-full py-2.5 rounded-xl text-xs font-bold text-white shadow-md ${accentConfig.primary} ${accentConfig.primaryHover}`}
              >
                Update Secret Key
              </button>
            </form>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Reset all portfolio customizations back to default values?')) {
                    resetToDefaults();
                    onClose();
                  }
                }}
                className="flex items-center gap-1.5 text-xs font-semibold text-rose-500 hover:underline"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Entire Portfolio to Factory Defaults</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
