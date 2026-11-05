export type AccentColor = 'emerald' | 'blue' | 'violet' | 'amber' | 'rose' | 'cyan';

export interface AccentConfig {
  id: AccentColor;
  name: string;
  primary: string;
  primaryHover: string;
  bgSubtle: string;
  borderSubtle: string;
  ring: string;
  text: string;
  gradient: string;
}

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  dribbble?: string;
  youtube?: string;
}

export interface ProfileData {
  name: string;
  greeting: string;
  roles: string[];
  bio: string;
  detailedBio: string;
  email: string;
  phone: string;
  location: string;
  avatarUrl: string;
  availability: string;
  yearsExperience: number;
  completedProjects: number;
  happyClients: number;
  satisfactionRate: number;
  socials: SocialLinks;
  resumeUrl?: string;
}

export interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  company: string;
  location: string;
  description: string[];
  skills: string[];
}

export interface EducationItem {
  id: string;
  period: string;
  degree: string;
  institution: string;
  location: string;
  description: string;
  grade?: string;
}

export interface SkillItem {
  name: string;
  level: number; // 0 to 100
  category: 'Frontend' | 'Backend' | 'Tools & DevOps' | 'Design & Other';
  icon?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  icon: string;
  fullDesc: string;
  deliverables: string[];
  technologies: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'ai-ml' | 'web' | 'mobile' | 'fullstack' | 'design';
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  features: string[];
  featured?: boolean;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  comment: string;
}
