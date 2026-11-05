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

export const ACCENT_PALETTES: Record<AccentColor, AccentConfig> = {
  emerald: {
    id: 'emerald',
    name: 'Emerald Green',
    primary: 'bg-emerald-500',
    primaryHover: 'hover:bg-emerald-600',
    bgSubtle: 'bg-emerald-500/10',
    borderSubtle: 'border-emerald-500/30',
    ring: 'ring-emerald-500/50',
    text: 'text-emerald-500 dark:text-emerald-400',
    gradient: 'from-emerald-500 to-teal-400',
  },
  blue: {
    id: 'blue',
    name: 'Electric Blue',
    primary: 'bg-blue-600',
    primaryHover: 'hover:bg-blue-700',
    bgSubtle: 'bg-blue-500/10',
    borderSubtle: 'border-blue-500/30',
    ring: 'ring-blue-500/50',
    text: 'text-blue-600 dark:text-blue-400',
    gradient: 'from-blue-600 to-cyan-400',
  },
  violet: {
    id: 'violet',
    name: 'Vibrant Violet',
    primary: 'bg-violet-600',
    primaryHover: 'hover:bg-violet-700',
    bgSubtle: 'bg-violet-500/10',
    borderSubtle: 'border-violet-500/30',
    ring: 'ring-violet-500/50',
    text: 'text-violet-600 dark:text-violet-400',
    gradient: 'from-violet-600 to-fuchsia-400',
  },
  amber: {
    id: 'amber',
    name: 'Warm Amber',
    primary: 'bg-amber-500',
    primaryHover: 'hover:bg-amber-600',
    bgSubtle: 'bg-amber-500/10',
    borderSubtle: 'border-amber-500/30',
    ring: 'ring-amber-500/50',
    text: 'text-amber-500 dark:text-amber-400',
    gradient: 'from-amber-500 to-orange-400',
  },
  rose: {
    id: 'rose',
    name: 'Neon Rose',
    primary: 'bg-rose-500',
    primaryHover: 'hover:bg-rose-600',
    bgSubtle: 'bg-rose-500/10',
    borderSubtle: 'border-rose-500/30',
    ring: 'ring-rose-500/50',
    text: 'text-rose-500 dark:text-rose-400',
    gradient: 'from-rose-500 to-pink-400',
  },
  cyan: {
    id: 'cyan',
    name: 'Cyber Cyan',
    primary: 'bg-cyan-500',
    primaryHover: 'hover:bg-cyan-600',
    bgSubtle: 'bg-cyan-500/10',
    borderSubtle: 'border-cyan-500/30',
    ring: 'ring-cyan-500/50',
    text: 'text-cyan-500 dark:text-cyan-400',
    gradient: 'from-cyan-500 to-blue-400',
  },
};

import { generateDefaultResumePdf } from '../utils/generateResumePdf';
import dsccCoverImage from '../assets/images/dscc_barcode_scan_1793910714204.jpg';

export const INITIAL_PROFILE: ProfileData = {
  name: 'Gabriel Kola Aderonmu',
  greeting: "Hello, I'm",
  roles: [
    'Senior AI/ML & Full-Stack Systems Engineer',
    'Defense & Enterprise Software Architect',
    'React, TypeScript & Python Specialist',
    'Large Language Models (LLM) Developer',
  ],
  bio: 'I craft high-reliability AI/ML applications, defense-grade administrative platforms, and fluid digital experiences with modern code, robust architectures, and uncompromising security standards.',
  detailedBio:
    "With over 5 years of professional experience across modern web ecosystems and artificial intelligence, I bridge the gap between creative visual design and rock-solid software engineering. I specialize in building scalable web apps with React, TypeScript, Python, Node.js, and modern AI/ML pipelines. Having architected defense-grade platforms like the Secure Military Resume Builder and Armoury Management System, I obsess over security, performance, accessibility, clean architecture, and delightful user interactions.",
  email: 'gabkola94@gmail.com',
  phone: '+44 7911 123456',
  location: 'London, United Kingdom (Available Worldwide Remote)',
  avatarUrl:
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  resumeUrl: generateDefaultResumePdf(),
  availability: 'Available for high-impact AI/ML projects & engineering leadership roles',
  yearsExperience: 5,
  completedProjects: 48,
  happyClients: 35,
  satisfactionRate: 100,
  socials: {
    github: 'https://github.com/kola-Aderonmu',
    linkedin: 'https://linkedin.com/in/kola-aderonmu',
    twitter: 'https://twitter.com',
    dribbble: 'https://dribbble.com',
    youtube: 'https://youtube.com',
  },
};

export const INITIAL_EXPERIENCE: ExperienceItem[] = [
  {
    id: 'exp-1',
    period: '2022 — Present',
    role: 'Lead AI/ML & Full-Stack Systems Engineer',
    company: 'Defense & Enterprise Systems Initiatives',
    location: 'Remote / London, UK',
    description: [
      'Architected and deployed high-security, defense-grade platforms including the Secure Military Resume Builder (MCT-RB) and Armoury Management System (AMS).',
      'Engineered fine-tuned Large Language Model pipelines, semantic retrieval (RAG), and offline-first data verification systems with sub-second latency.',
      'Enforced defense-in-depth security paradigms, cryptographic field integrity, and zero-trust role-based authorization for administrative consoles.',
      'Supervised engineering sprints across modern React 19, TypeScript, Python microservices, and Dockerized infrastructure.',
    ],
    skills: ['React', 'TypeScript', 'Python', 'PyTorch', 'Node.js', 'PostgreSQL', 'Docker', 'LLMs'],
  },
  {
    id: 'exp-2',
    period: '2020 — 2022',
    role: 'Senior Machine Learning & Full-Stack Developer',
    company: 'Intelligent Software Solutions & Labs',
    location: 'London, UK',
    description: [
      'Designed and launched the DSCC-App (Defense Smart Credential Card), replacing traditional physical credentials with fast QR & barcode scanning.',
      'Developed SMA (Smart Monitoring & Sentiment Analysis) platform for automated behavioral and telemetry signal processing.',
      'Constructed reproducible machine learning notebooks and transformer training experiments in the AI_ML_Projects repository.',
      'Improved query execution speed by 48% across multi-tenant relational databases through strategic indexing and connection pooling.',
    ],
    skills: ['Python', 'Transformers', 'FastAPI', 'React', 'Tailwind CSS', 'Redis', 'AWS'],
  },
  {
    id: 'exp-3',
    period: '2018 — 2020',
    role: 'Full-Stack Software Engineer',
    company: 'NextGen Systems & Inventory Lab',
    location: 'London, UK',
    description: [
      'Built core modules for the IMS (Inventory Management System), automating stock tracking, audit compliance, and automated replenishment alerts.',
      'Implemented responsive web portals with pixel-perfect fidelity, high accessibility standards (WCAG AA), and modular component architecture.',
      'Created automated CI/CD testing suites achieving 94% test coverage across core backend business services.',
    ],
    skills: ['JavaScript', 'Node.js', 'Express', 'React', 'MongoDB', 'REST APIs', 'Git'],
  },
];

export const INITIAL_EDUCATION: EducationItem[] = [
  {
    id: 'edu-1',
    period: '2015 — 2019',
    degree: 'B.Sc. in Computer Science & Software Engineering',
    institution: 'University of London',
    location: 'London, UK',
    description:
      'Graduated with First Class Honours (1st). Specialized in Distributed Systems, Intelligent Computing, Algorithms, and Software Security.',
    grade: 'First Class Honours (1st)',
  },
  {
    id: 'edu-2',
    period: '2020 — 2022',
    degree: 'Advanced AI/ML & Cloud Systems Architecture',
    institution: 'Professional Specialization & Deep Learning Certifications',
    location: 'Professional Credential',
    description:
      'Completed rigorous training in Transformer Architectures, Large Language Models, Cloud Security, and Scalable Microservices.',
  },
];

export const INITIAL_SKILLS: SkillItem[] = [
  // Frontend
  { name: 'React / Next.js', level: 95, category: 'Frontend' },
  { name: 'TypeScript / JavaScript (ES6+)', level: 92, category: 'Frontend' },
  { name: 'Tailwind CSS & Modern CSS3', level: 96, category: 'Frontend' },
  { name: 'HTML5 & Semantic Web', level: 98, category: 'Frontend' },
  { name: 'Motion / Smooth Animations', level: 88, category: 'Frontend' },
  { name: 'State Management (Redux, Zustand)', level: 90, category: 'Frontend' },

  // Backend
  { name: 'Node.js & Express', level: 88, category: 'Backend' },
  { name: 'REST APIs & GraphQL', level: 90, category: 'Backend' },
  { name: 'PostgreSQL / SQL Databases', level: 84, category: 'Backend' },
  { name: 'MongoDB / NoSQL', level: 82, category: 'Backend' },
  { name: 'Authentication & JWT Security', level: 86, category: 'Backend' },

  // Tools & DevOps
  { name: 'Git, GitHub & Version Control', level: 94, category: 'Tools & DevOps' },
  { name: 'Vite / Webpack / Tooling', level: 90, category: 'Tools & DevOps' },
  { name: 'Docker & Containerization', level: 78, category: 'Tools & DevOps' },
  { name: 'CI/CD Pipelines & Cloud Deployments', level: 80, category: 'Tools & DevOps' },

  // Design
  { name: 'Figma to Pixel-Perfect Code', level: 95, category: 'Design & Other' },
  { name: 'UI/UX Design Systems', level: 88, category: 'Design & Other' },
  { name: 'Responsive Mobile-First Layouts', level: 98, category: 'Design & Other' },
  { name: 'Web Accessibility (WCAG AA)', level: 89, category: 'Design & Other' },
];

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'serv-1',
    title: 'Web Application Development',
    shortDesc:
      'Custom high-performance web applications built from scratch with React, TypeScript, and modern scalable frameworks.',
    icon: 'Code2',
    fullDesc:
      'From single-page web applications to complex multi-tenant dashboards, I build production-grade web applications with modern architecture, lightning-fast rendering, zero layout shift, and intuitive state flows.',
    deliverables: [
      'Custom React/Next.js frontend code',
      'Fully responsive layouts for all viewports',
      'Clean modular component architecture',
      'Optimized load time & Core Web Vitals',
      'Comprehensive code documentation',
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Next.js'],
  },
  {
    id: 'serv-2',
    title: 'UI/UX Design & Prototyping',
    shortDesc:
      'Translating complex user journeys into clean, visually striking, and intuitive digital interfaces with micro-interactions.',
    icon: 'Layout',
    fullDesc:
      'Design should feel effortless. I design and build modern user interfaces featuring thoughtful spacing, balanced typographic hierarchy, dark/light themes, and tactile feedback that delights users and drives conversion.',
    deliverables: [
      'Interactive design prototypes',
      'Design token system (Colors, Spacing, Typography)',
      'Dark and Light theme designs',
      'Accessibility audit & contrast compliance',
      'Mobile-first responsive mockups',
    ],
    technologies: ['Figma', 'Tailwind CSS', 'Design Systems', 'Micro-interactions'],
  },
  {
    id: 'serv-3',
    title: 'Full-Stack Architecture & APIs',
    shortDesc:
      'Robust backend systems, secure RESTful and GraphQL APIs, database modeling, and server-side integrations.',
    icon: 'Server',
    fullDesc:
      'Building the engines that power digital applications. I develop structured, secure backend services, clean database schemas, authentication flows, and real-time data synchronization with enterprise-grade resilience.',
    deliverables: [
      'REST & GraphQL endpoint design',
      'Database schema setup & migrations',
      'JWT/OAuth authentication & RBAC roles',
      'EmailJS & third-party API webhooks',
      'Automated testing & error handling',
    ],
    technologies: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'REST APIs'],
  },
  {
    id: 'serv-4',
    title: 'Speed & Core Web Vitals Optimization',
    shortDesc:
      'Auditing and accelerating slow sites to achieve 95+ PageSpeed scores, instant loading, and higher search rankings.',
    icon: 'Zap',
    fullDesc:
      'Every millisecond counts for user retention. I analyze network waterfalls, optimize heavy image/font assets, minimize JavaScript bundle footprints, and eliminate render-blocking bottlenecks.',
    deliverables: [
      'Lighthouse audit & diagnosis report',
      'Asset compression & lazy-loading strategy',
      'Code splitting and dead code elimination',
      'Caching configuration & CDN setup',
      '90+ score guarantee across mobile & desktop',
    ],
    technologies: ['Chrome DevTools', 'Webpack/Vite Bundle Analyzer', 'Lighthouse', 'SEO'],
  },
  {
    id: 'serv-5',
    title: 'Mobile-First Responsive Engineering',
    shortDesc:
      'Seamless multi-device experiences tailored for touch interactions, gesture handling, and variable screen sizes.',
    icon: 'Smartphone',
    fullDesc:
      'Ensuring your site behaves flawlessly whether viewed on a 4-inch smartphone, an iPad in portrait mode, or an ultra-wide 4K monitor, with specialized mobile navigation and thumb-friendly controls.',
    deliverables: [
      'Fluid responsive grid & flex layouts',
      'Off-canvas mobile menus & bottom navs',
      'Touch gesture & swipe support',
      'PWA readiness & offline caching',
      'Cross-browser testing (iOS Safari, Chrome, Firefox)',
    ],
    technologies: ['CSS Grid', 'Flexbox', 'Tailwind CSS', 'PWA'],
  },
  {
    id: 'serv-6',
    title: 'Website Redesign & Modernization',
    shortDesc:
      'Revamping outdated legacy websites into sleek, modern, conversion-focused digital flagships with custom animations.',
    icon: 'Sparkles',
    fullDesc:
      'Give your digital presence a modern edge. I rebuild older websites with fresh contemporary styling, fluid animations, dynamic dark/light themes, and intuitive navigation that captures client trust.',
    deliverables: [
      'Complete code & visual overhaul',
      'Data & content migration without downtime',
      'Modern animation & transition effects',
      'Interactive contact forms with instant notifications',
      'SEO-friendly semantic HTML structure',
    ],
    technologies: ['Motion', 'Modern JavaScript', 'CSS Animations', 'EmailJS'],
  },
];

export const INITIAL_PROJECTS: ProjectItem[] = [
  {
    id: 'proj-military-resume-builder',
    title: 'Secure Military Resume Builder (MCT-RB)',
    category: 'fullstack',
    description:
      'High-security military career transition and resume generation platform with role-based access, automated civilian skills translation, and tamper-proof PDF export.',
    longDescription:
      'An enterprise-grade, defense-ready resume building and career transition system (MCT-RB). Designed to translate specialized military occupational specialties (MOS), combat leadership experience, and tactical qualifications into industry-standard civilian executive resumes. Engineered with end-to-end data encryption, military-spec clearance protocols, custom template generators, and verifiable audit trails.',
    image:
      'https://images.unsplash.com/photo-1766497299982-0504b3da3517?auto=format&fit=crop&w=1000&q=80',
    tags: ['Python', 'Django / React', 'PostgreSQL', 'Security', 'PDF Generation', 'Cryptography'],
    liveUrl: 'https://github.com/kola-Aderonmu/Secure-Military-Resume-Builder-MCT-RB-',
    githubUrl: 'https://github.com/kola-Aderonmu/Secure-Military-Resume-Builder-MCT-RB-',
    features: [
      'Automated military occupational specialty (MOS) to civilian skill taxonomy mapper',
      'Zero-trust security model with encrypted profile persistence and RBAC permissions',
      'Dynamic multi-layout resume generator with automated ATS keyword optimization',
      'Military clearance compliance & tamper-proof cryptographic export signature',
    ],
    featured: true,
  },
  {
    id: 'proj-hands-on-llms',
    title: 'Hands-On Large Language Models (LLM) Lab',
    category: 'ai-ml',
    description:
      'Advanced LLM research and engineering suite featuring prompt tuning, RAG vector pipelines, PEFT/LoRA fine-tuning, and local agent orchestration.',
    longDescription:
      'A comprehensive hands-on engineering lab for modern Large Language Models and Generative AI systems. Implements Retrieval-Augmented Generation (RAG) using LangChain, LlamaIndex, and vector databases (ChromaDB, Pinecone). Includes fine-tuning pipelines using Parameter-Efficient Fine-Tuning (PEFT/LoRA), quantization (QLoRA), model evaluation frameworks, and local multi-agent workflows with Ollama and HuggingFace.',
    image:
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1000&q=80',
    tags: ['Python', 'PyTorch', 'HuggingFace', 'LangChain', 'RAG / Vector DB', 'LoRA / PEFT'],
    liveUrl: 'https://github.com/kola-Aderonmu/Hands-On-Large-Language-Models',
    githubUrl: 'https://github.com/kola-Aderonmu/Hands-On-Large-Language-Models',
    features: [
      'Retrieval-Augmented Generation (RAG) with hybrid dense & sparse vector search',
      'Parameter-Efficient Fine-Tuning (PEFT/LoRA) on custom domain instruction datasets',
      'Context window compression, tokenization analysis, and hallucination reduction',
      'Local multi-agent tool execution and autonomous reasoning loops',
    ],
    featured: true,
  },
  {
    id: 'proj-armoury-mgmt',
    title: 'Digital Armoury Management System (AMS)',
    category: 'fullstack',
    description:
      'Defense-grade physical asset tracking, ordnance cataloging, serial authentication, and biometric custody logging system for security facilities.',
    longDescription:
      'A mission-critical custody and inventory management software system designed for regulated arms rooms and secure logistics depots. Features real-time weapon check-in/check-out lifecycle tracking, personnel qualification verification before issuance, serialized RFID/barcode scanning integrations, scheduled maintenance alerts, and immutable compliance audit logs.',
    image:
      'https://images.unsplash.com/photo-1789848197008-d425e8cdc2c2?auto=format&fit=crop&w=1000&q=80',
    tags: ['Python', 'Django / FastAPI', 'PostgreSQL', 'Audit Logging', 'Barcode / RFID', 'Security'],
    liveUrl: 'https://github.com/kola-Aderonmu/Armoury-Management-System',
    githubUrl: 'https://github.com/kola-Aderonmu/Armoury-Management-System',
    features: [
      'Strict double-sign custody authentication protocol for arms issuance and retrieval',
      'Automated serial number scanning, batch ordnance tracking, and inspection logs',
      'Scheduled maintenance cycles with automatic lockout for uninspected equipment',
      'Cryptographically signed chain-of-custody reports for institutional audits',
    ],
    featured: true,
  },
  {
    id: 'proj-ims-platform',
    title: 'Enterprise Inventory Management System (IMS)',
    category: 'fullstack',
    description:
      'Scalable multi-warehouse inventory control platform with real-time stock replenishment, purchase order workflows, and supply chain telemetry.',
    longDescription:
      'A robust enterprise inventory and warehouse operations suite. Handles complex multi-location stock movements, supplier procurement lifecycles, automated threshold-based reordering alerts, barcode SKU assignment, and predictive restocking analytics. Designed with responsive dashboards, instant search, and exportable financial reports.',
    image:
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80',
    tags: ['Python', 'Django', 'React / TypeScript', 'PostgreSQL', 'REST API', 'Redis'],
    liveUrl: 'https://github.com/kola-Aderonmu/IMS',
    githubUrl: 'https://github.com/kola-Aderonmu/IMS',
    features: [
      'Real-time multi-location warehouse inventory balance synchronization',
      'Automated reorder point calculation based on historical burn rates',
      'Purchase order creation, invoice reconciliation, and vendor rating metrics',
      'RESTful API backend supporting high-volume barcode and mobile scanner requests',
    ],
    featured: true,
  },
  {
    id: 'proj-sma-system',
    title: 'SMA — Smart Monitoring & Analytics Platform',
    category: 'fullstack',
    description:
      'Centralized asset performance, IoT sensor ingestion, real-time alert triage, and operational metrics visualization suite.',
    longDescription:
      'A comprehensive monitoring and operational analytics application (SMA). Ingests high-frequency telemetry data, evaluates system health conditions against dynamic anomaly thresholds, and surfaces critical alerts through an interactive, low-latency control center dashboard with time-series charts and multi-device push notifications.',
    image:
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1000&q=80',
    tags: ['Python', 'TypeScript', 'WebSockets', 'Time-Series DB', 'Analytics', 'Tailwind'],
    liveUrl: 'https://github.com/kola-Aderonmu/SMA',
    githubUrl: 'https://github.com/kola-Aderonmu/SMA',
    features: [
      'Live streaming WebSocket telemetry charts with sub-second update cycles',
      'Dynamic threshold trigger engine with multi-tier severity alert dispatch',
      'Historical performance analytics with customizable metric aggregation',
      'Granular role-based operator dashboards for command centers',
    ],
  },
  {
    id: 'proj-dscc-app',
    title: 'Digital Smart Complimentary Card (DSCC)',
    category: 'web',
    description:
      'Digital smart business card and contact exchange application enabling instantaneous contact sharing via interactive barcode and QR scanning.',
    longDescription:
      'The Digital Smart Complimentary Card (DSCC) application replaces traditional paper business cards with dynamic, digital credentials. Users can instantly share contact information, portfolio links, and professional credentials by having others scan their unique interactive barcode and QR code. Features fast camera-based scanning, offline card caching, instant vCard export, and cryptographic profile verification.',
    image: dsccCoverImage,
    tags: ['React', 'TypeScript', 'Barcode / QR Scanner', 'Mobile Web', 'Tailwind CSS', 'PWA'],
    liveUrl: 'https://github.com/kola-Aderonmu/DSCC-App',
    githubUrl: 'https://github.com/kola-Aderonmu/DSCC-App',
    features: [
      'Instantaneous phone barcode and QR code scanning for digital card exchange',
      'One-tap vCard and phone contact book export without third-party apps',
      'Offline-capable card storage and digital credentials presentation',
      'Secure cryptographic verification of professional credentials and social links',
    ],
  },
  {
    id: 'proj-ai-ml-hub',
    title: 'AI & Machine Learning Core Suite',
    category: 'ai-ml',
    description:
      'A comprehensive suite of deep learning and machine learning models covering computer vision, NLP sentiment pipelines, predictive analytics, and algorithmic modeling.',
    longDescription:
      'A flagship repository aggregating end-to-end Machine Learning and Artificial Intelligence projects. Features supervised and unsupervised learning algorithms, deep neural network training pipelines, exploratory data analysis (EDA) notebooks, data preprocessing modules, and model performance evaluation metrics (F1-score, ROC-AUC, RMSE).',
    image:
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1000&q=80',
    tags: ['Python', 'PyTorch', 'TensorFlow', 'Scikit-Learn', 'Pandas', 'NumPy'],
    liveUrl: 'https://github.com/kola-Aderonmu/AI_ML_Projects',
    githubUrl: 'https://github.com/kola-Aderonmu/AI_ML_Projects',
    features: [
      'Comprehensive computer vision & image classification architectures',
      'Natural Language Processing (NLP) text classification and sentiment analysis',
      'Automated feature engineering, normalization, and outlier detection routines',
      'Hyperparameter tuning and cross-validation performance benchmarking',
    ],
  },
  {
    id: 'proj-cv-detection',
    title: 'Real-Time Computer Vision & Object Detection',
    category: 'ai-ml',
    description:
      'High-speed visual recognition and multi-object tracking system leveraging convolutional neural networks and OpenCV with webcam feed inference.',
    longDescription:
      'An advanced computer vision implementation designed for rapid spatial object detection and boundary segmentation. Utilizes state-of-the-art CNN architectures to detect target objects across live video streams and image batches, featuring frame-by-frame confidence scoring and dynamic bounding box generation.',
    image:
      'https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&w=1000&q=80',
    tags: ['Python', 'OpenCV', 'PyTorch', 'YOLO / CNN', 'Computer Vision'],
    liveUrl: 'https://github.com/kola-Aderonmu/AI_ML_Projects',
    githubUrl: 'https://github.com/kola-Aderonmu/AI_ML_Projects',
    features: [
      'Sub-50ms inference latency on standard GPU/CPU hardware configurations',
      'Custom dataset annotation, augmentation, and transfer learning pipeline',
      'Live bounding-box tracking with intersection-over-union (IoU) optimization',
      'Exportable detection logs and structured JSON telemetry output',
    ],
  },
  {
    id: 'proj-django-backend',
    title: 'Django & Python Enterprise Web Platform',
    category: 'fullstack',
    description:
      'Production-grade Django web application with clean URL routing (Django 4.x), relational database ORM, secure authentication, and RESTful API endpoints.',
    longDescription:
      'A robust full-stack web application architected with Python and modern Django 4.x. Implements MVC design patterns, PostgreSQL database migrations, modular app routing, user permission matrices, and a RESTful API layer for frontend consumption.',
    image:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80',
    tags: ['Python', 'Django', 'PostgreSQL', 'Django REST Framework', 'Tailwind'],
    liveUrl: 'https://github.com/kola-Aderonmu?tab=repositories',
    githubUrl: 'https://github.com/kola-Aderonmu?tab=repositories',
    features: [
      'Engineered with modern Django 4.x path routing and middleware architecture',
      'Relational PostgreSQL database schema design with optimized ORM indexing',
      'Role-based access control (RBAC), user session handling, and CSRF protection',
      'Automated unit testing suite and Docker containerization',
    ],
  },
];

export const INITIAL_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-1',
    name: 'Sarah Jenkins',
    role: 'VP of Product',
    company: 'Vanguard Media Group',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    comment:
      'Gabriel is an exceptional developer who combines technical mastery with an extraordinary eye for design. He rebuilt our flagship application on time, exceeding our speed targets and making our customers rave about the new interface!',
  },
  {
    id: 'test-2',
    name: 'Marcus Sterling',
    role: 'Founder & CEO',
    company: 'HyperScale Ventures',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    comment:
      'Working with Gabriel was a breeze. From the first architectural discussion to the final production deployment, his communication was crystal clear, code was pristine, and turnaround was remarkably fast.',
  },
  {
    id: 'test-3',
    name: 'Elena Rostova',
    role: 'Creative Director',
    company: 'Studio Luminary',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    comment:
      'Finding an engineer who truly respects design details, fluid animations, and responsiveness down to individual pixels is rare. Gabriel transformed our Figma visions into breathtaking reality with zero compromise.',
  },
  {
    id: 'test-4',
    name: 'David O’Connor',
    role: 'Engineering Lead',
    company: 'FinTrack Global',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    comment:
      'Gabriel delivered a flawless full-stack dashboard under tight deadlines. His clean modular code made it effortless for the rest of our engineering team to maintain and extend. Highly recommended!',
  },
];
