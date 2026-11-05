import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ProfileData,
  ExperienceItem,
  EducationItem,
  SkillItem,
  ServiceItem,
  ProjectItem,
  TestimonialItem,
  AccentColor,
  AccentConfig,
} from '../types/portfolio';
import {
  ACCENT_PALETTES,
  INITIAL_PROFILE,
  INITIAL_EXPERIENCE,
  INITIAL_EDUCATION,
  INITIAL_SKILLS,
  INITIAL_SERVICES,
  INITIAL_PROJECTS,
  INITIAL_TESTIMONIALS,
} from '../data/initialPortfolioData';

interface PortfolioContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  accent: AccentColor;
  setAccent: (accent: AccentColor) => void;
  accentConfig: AccentConfig;
  cursorEnabled: boolean;
  setCursorEnabled: (enabled: boolean) => void;
  profile: ProfileData;
  updateProfile: (profile: Partial<ProfileData>) => void;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillItem[];
  addSkill: (skill: SkillItem) => void;
  deleteSkill: (name: string) => void;
  services: ServiceItem[];
  projects: ProjectItem[];
  addProject: (project: ProjectItem) => void;
  updateProject: (id: string, updated: Partial<ProjectItem>) => void;
  deleteProject: (id: string) => void;
  testimonials: TestimonialItem[];
  resetToDefaults: () => void;
  activeSection: string;
  setActiveSection: (id: string) => void;
  
  // Discreet Admin Authentication
  isAdminAuthenticated: boolean;
  loginAdmin: (passcode: string) => boolean;
  logoutAdmin: () => void;
  updateAdminPasscode: (oldPass: string, newPass: string) => boolean;
  adminPasscodeHint: string;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('portfolio_theme');
    if (saved) return saved === 'dark';
    return true;
  });

  // Accent color state
  const [accent, setAccentState] = useState<AccentColor>(() => {
    const saved = localStorage.getItem('portfolio_accent') as AccentColor;
    return saved && ACCENT_PALETTES[saved] ? saved : 'emerald';
  });

  // Cursor state
  const [cursorEnabled, setCursorEnabledState] = useState<boolean>(() => {
    const saved = localStorage.getItem('portfolio_cursor');
    return saved !== null ? saved === 'true' : true;
  });

  // Profile data
  const [profile, setProfileState] = useState<ProfileData>(() => {
    const saved = localStorage.getItem('portfolio_profile');
    if (saved) {
      try {
        return { ...INITIAL_PROFILE, ...JSON.parse(saved) };
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_PROFILE;
  });

  // Projects state
  const [projects, setProjects] = useState<ProjectItem[]>(() => {
    const saved = localStorage.getItem('portfolio_projects_v5');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    // Migrate from v4 if exists and update DSCC project
    const oldSaved = localStorage.getItem('portfolio_projects_v4');
    if (oldSaved) {
      try {
        const parsed: ProjectItem[] = JSON.parse(oldSaved);
        const freshDscc = INITIAL_PROJECTS.find((p) => p.id === 'proj-dscc-app');
        const updated = parsed.map((p) => (p.id === 'proj-dscc-app' && freshDscc ? freshDscc : p));
        localStorage.setItem('portfolio_projects_v5', JSON.stringify(updated));
        return updated;
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_PROJECTS;
  });

  // Skills state
  const [skills, setSkills] = useState<SkillItem[]>(() => {
    const saved = localStorage.getItem('portfolio_skills');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_SKILLS;
  });

  // Admin authentication state (in-session lock)
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('portfolio_admin_auth') === 'true';
  });

  // Stored master passcode (defaults to 'admin123' if not customized)
  const [adminPasscode, setAdminPasscode] = useState<string>(() => {
    return localStorage.getItem('portfolio_admin_passcode') || 'admin123';
  });

  // Active section for bottom nav & scroll spy
  const [activeSection, setActiveSection] = useState<string>('home');

  // Sync dark class on html root
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('portfolio_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('portfolio_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const setAccent = (newAccent: AccentColor) => {
    setAccentState(newAccent);
    localStorage.setItem('portfolio_accent', newAccent);
  };

  const setCursorEnabled = (enabled: boolean) => {
    setCursorEnabledState(enabled);
    localStorage.setItem('portfolio_cursor', String(enabled));
  };

  const updateProfile = (updated: Partial<ProfileData>) => {
    setProfileState((prev) => {
      const next = { ...prev, ...updated };
      localStorage.setItem('portfolio_profile', JSON.stringify(next));
      return next;
    });
  };

  const addProject = (project: ProjectItem) => {
    setProjects((prev) => {
      const next = [project, ...prev];
      localStorage.setItem('portfolio_projects_v5', JSON.stringify(next));
      return next;
    });
  };

  const updateProject = (id: string, updated: Partial<ProjectItem>) => {
    setProjects((prev) => {
      const next = prev.map((p) => (p.id === id ? { ...p, ...updated } : p));
      localStorage.setItem('portfolio_projects_v5', JSON.stringify(next));
      return next;
    });
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => {
      const next = prev.filter((p) => p.id !== id);
      localStorage.setItem('portfolio_projects_v5', JSON.stringify(next));
      return next;
    });
  };

  const addSkill = (newSkill: SkillItem) => {
    setSkills((prev) => {
      const next = [...prev, newSkill];
      localStorage.setItem('portfolio_skills', JSON.stringify(next));
      return next;
    });
  };

  const deleteSkill = (skillName: string) => {
    setSkills((prev) => {
      const next = prev.filter((s) => s.name !== skillName);
      localStorage.setItem('portfolio_skills', JSON.stringify(next));
      return next;
    });
  };

  const loginAdmin = (passcode: string): boolean => {
    if (passcode.trim() === adminPasscode) {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem('portfolio_admin_auth', 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem('portfolio_admin_auth');
  };

  const updateAdminPasscode = (oldPass: string, newPass: string): boolean => {
    if (oldPass.trim() === adminPasscode && newPass.trim().length >= 4) {
      setAdminPasscode(newPass.trim());
      localStorage.setItem('portfolio_admin_passcode', newPass.trim());
      return true;
    }
    return false;
  };

  const resetToDefaults = () => {
    localStorage.removeItem('portfolio_profile');
    localStorage.removeItem('portfolio_projects');
    localStorage.removeItem('portfolio_projects_v2');
    localStorage.removeItem('portfolio_projects_v3');
    localStorage.removeItem('portfolio_projects_v4');
    localStorage.removeItem('portfolio_projects_v5');
    localStorage.removeItem('portfolio_skills');
    localStorage.removeItem('portfolio_accent');
    localStorage.removeItem('portfolio_theme');
    localStorage.removeItem('portfolio_admin_passcode');
    sessionStorage.removeItem('portfolio_admin_auth');
    setProfileState(INITIAL_PROFILE);
    setProjects(INITIAL_PROJECTS);
    setSkills(INITIAL_SKILLS);
    setAccentState('emerald');
    setIsDarkMode(true);
    setAdminPasscode('admin123');
    setIsAdminAuthenticated(false);
  };

  const accentConfig = ACCENT_PALETTES[accent] || ACCENT_PALETTES.emerald;

  return (
    <PortfolioContext.Provider
      value={{
        isDarkMode,
        toggleTheme,
        accent,
        setAccent,
        accentConfig,
        cursorEnabled,
        setCursorEnabled,
        profile,
        updateProfile,
        experience: INITIAL_EXPERIENCE,
        education: INITIAL_EDUCATION,
        skills,
        addSkill,
        deleteSkill,
        services: INITIAL_SERVICES,
        projects,
        addProject,
        updateProject,
        deleteProject,
        testimonials: INITIAL_TESTIMONIALS,
        resetToDefaults,
        activeSection,
        setActiveSection,
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
        updateAdminPasscode,
        adminPasscodeHint: adminPasscode === 'admin123' ? 'admin123' : 'custom',
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
