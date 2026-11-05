# Gabriel Kola Aderonmu — Senior AI/ML & Full-Stack Systems Engineer

[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![PDF.js](https://img.shields.io/badge/PDF.js-Canvas_Viewer-E04E39?style=flat-square&logo=adobeacrobatreader&logoColor=white)](https://mozilla.github.io/pdf.js/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

An ultra-responsive personal portfolio and client showcase engineered by **Gabriel Kola Aderonmu**. Built with modern React 19, TypeScript, and Tailwind CSS v4, featuring high-performance animations, an in-browser canvas PDF resume viewer, interactive project deep-dives, and a discreet administrative content management console.

---

## 🌟 Key Highlights & Features

### 1. 🎬 Interactive Workstation Splash Screen
- **Playful Boot Animation**: Features an animated developer walking to the desk, sitting down, and pressing the physical power button to boot up the system.
- **Linux Kernel Streaming Logs**: Authentic scrolling Linux terminal boot pages with colored `[ OK ]` service statuses (mounting `/home/kola/portfolio`, initializing neural cores, and starting defense suites).
- **Audio Synthesizer**: Built-in Web Audio API synth sounds for keyboard clicks, power-on beep, and triumph chimes (with Audio ON/OFF control).
- **VIP Access Granted Finale**: Culminates in a glowing, bouncing emerald **`[ 🔓 ACCESS GRANTED ]`** stamp welcoming visitors into the portfolio. Includes a progress loading bar, a `"Skip Intro"` button, and a `"🎬 Replay Dramatic Intro"` button in the footer.

### 2. 📄 In-Browser Canvas PDF Resume Preview
- **Native Canvas Rendering**: Powered by `pdfjs-dist` to render uploaded PDF resumes directly onto Retina-ready HTML5 `<canvas>` elements, eliminating browser plugin blocking.
- **Full Document Controls**: Continuous multi-page scrolling, single-page pagination, zoom in/out, fit to width, 90° rotation, print, and direct download.
- **Smart Tab Routing**: Defaults to the **Experience** timeline on initial app load, with immediate access to **Preview Resume**, **Education**, and **Skills & Tools**.

### 3. 🛡️ Real Engineering Repositories & Deployments
Integrated directly with real GitHub repositories (`github.com/kola-Aderonmu`):
- **Digital Smart Complimentary Card (DSCC)**: Interactive barcode and QR scanning platform replacing physical business cards with real-time digital credentials.
- **Secure Military Resume Builder (MCT-RB)**: High-security defense-grade administrative credential management system with role-based validation.
- **Armoury Management System (AMS)**: Defense-grade asset and weapon inventory control with chain-of-custody tracking.
- **SMA — Smart Monitoring & Telemetry Analytics**: Centralized IoT sensor streaming and automated threshold alert triage.
- **AI & Machine Learning Core Suite**: PyTorch architectures, transformer fine-tuning, and Large Language Model research.
- **Enterprise Inventory Management System (IMS)**: Multi-warehouse stock tracking, SKU barcode generation, and supply chain replenishment.

### 4. 🔐 Discreet Admin Content Management Console (CMS)
- Hidden behind a subtle key icon in the navigation bar (`admin123`).
- Allows editing profile details, Typewriter roles, social links, project cards, and skills in real time.
- Direct PDF resume uploader that saves the file into local state and immediately updates the in-browser PDF preview.
- Custom security passcode settings with in-session authentication.

### 5. 🎨 Customization & Accessibility
- **Theme Modes**: Seamless Dark / Light mode switching with persistent local storage.
- **Dynamic Accent Colors**: 6 tailored palettes (*Emerald Green, Electric Blue, Vibrant Violet, Warm Amber, Neon Rose, Cyber Cyan*).
- **Custom Cursor**: Fluid follower cursor with magnetic interactive elements.

---

## 🛠️ Technology Stack

| Domain | Technologies |
|---|---|
| **Core Framework** | React 19, TypeScript (Strict Mode) |
| **Styling & Design** | Tailwind CSS v4, Lucide Icons, Custom CSS animations |
| **PDF Rendering Engine** | Mozilla `pdfjs-dist` (Canvas rendering pipeline) |
| **Audio Synthesis** | Web Audio API (Sine / Triangle / Square waveform oscillators) |
| **Bundler & Tooling** | Vite 8, ESBuild, TypeScript Compiler (`tsc`) |
| **State & Persistence** | React Context API, `localStorage` (projects, themes, profile), `sessionStorage` (admin auth) |

---

## 📁 Repository Structure

```text
├── src/
│   ├── assets/              # Locally bundled high-resolution project images
│   ├── components/          # Reusable UI & section components
│   │   ├── DramaticSplashScreen.tsx  # Workstation boot & Linux splash screen
│   │   ├── PDFCanvasViewer.tsx       # Mozilla PDF.js canvas viewer
│   │   ├── Resume.tsx                # Resume section (Experience, Preview, Education, Skills)
│   │   ├── Portfolio.tsx             # Interactive projects showcase with filter tabs
│   │   ├── ProfileEditorModal.tsx    # Discreet Admin CMS modal
│   │   ├── AdminLoginModal.tsx       # Discreet passcode gateway modal
│   │   ├── Header.tsx                # Navigation bar with hidden admin key
│   │   └── ...
│   ├── context/
│   │   └── PortfolioContext.tsx      # Global portfolio state & theme provider
│   ├── data/
│   │   └── initialPortfolioData.ts   # Baseline profile, GitHub projects, and initial CV
│   ├── types/
│   │   └── portfolio.ts              # TypeScript interfaces and contracts
│   ├── utils/
│   │   └── generateResumePdf.ts      # Standard PDF stream generator utility
│   ├── App.tsx                       # Root portfolio layout
│   └── main.tsx                      # Vite React DOM entry point
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🚀 Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- `npm` or `bun`

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/kola-Aderonmu/portfolio.git
   cd portfolio
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   The application will be running at `http://localhost:3000`.

4. **Compile & Lint:**
   ```bash
   # Run TypeScript type check
   npm run lint

   # Build production bundle
   npm run build
   ```

---

## 🔑 Administrative Access

To access the private Content Management Console:
1. Locate the small **Key icon** in the top-right corner of the navigation bar.
2. Enter the default master passcode: `admin123`.
3. From the management modal, you can:
   - Edit your bio, contact details, and typewriter roles.
   - Add, edit, or remove showcase projects and live GitHub links.
   - Upload an updated PDF resume file directly from your device.
   - Update your master passcode.

---

## 📬 Contact & Connect

- **Engineer**: Gabriel Kola Aderonmu
- **Email**: [gabkola94@gmail.com](mailto:gabkola94@gmail.com)
- **GitHub**: [github.com/kola-Aderonmu](https://github.com/kola-Aderonmu)
- **Location**: London, United Kingdom (Available Worldwide Remote)
