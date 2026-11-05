/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { CustomCursor } from './components/CustomCursor';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Resume } from './components/Resume';
import { Services } from './components/Services';
import { Portfolio } from './components/Portfolio';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { ProfileEditorModal } from './components/ProfileEditorModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { CvModal } from './components/CvModal';
import { DramaticSplashScreen } from './components/DramaticSplashScreen';

const PortfolioContent: React.FC = () => {
  const { setActiveSection, isAdminAuthenticated } = usePortfolio();
  const [showSplash, setShowSplash] = useState(true);
  const [profileEditorOpen, setProfileEditorOpen] = useState(false);
  const [adminLoginOpen, setAdminLoginOpen] = useState(false);
  const [cvModalOpen, setCvModalOpen] = useState(false);

  // Discreet gateway handler
  const handleOpenAdminGate = () => {
    if (isAdminAuthenticated) {
      setProfileEditorOpen(true);
    } else {
      setAdminLoginOpen(true);
    }
  };

  // Track sections on scroll to update active nav highlight
  useEffect(() => {
    const sectionIds = [
      'home',
      'about',
      'resume',
      'services',
      'portfolio',
      'testimonials',
      'contact',
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setActiveSection]);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-emerald-500 selection:text-white transition-colors duration-300 relative">
      {/* Dramatic Funny 6-8s Launch Splash Screen */}
      {showSplash && (
        <DramaticSplashScreen onComplete={() => setShowSplash(false)} />
      )}

      {/* Custom smooth follower cursor */}
      <CustomCursor />

      {/* Top Header with discreet key access */}
      <Header onOpenAdminGate={handleOpenAdminGate} />

      {/* Main Sections */}
      <main>
        <Hero
          onOpenCvModal={() => setCvModalOpen(true)}
          onOpenProfileEditor={() => setProfileEditorOpen(true)}
        />
        <About onOpenCvModal={() => setCvModalOpen(true)} />
        <Resume />
        <Services />
        <Portfolio />
        <Testimonials />
        <Contact />
      </main>

      {/* Footer */}
      <Footer onReplaySplash={() => setShowSplash(true)} />

      {/* Signature Floating Bottom Dock Navigation */}
      <BottomNav />

      {/* Circular Progress Scroll To Top */}
      <ScrollToTop />

      {/* Discreet Admin Login Verification Modal */}
      <AdminLoginModal
        isOpen={adminLoginOpen}
        onClose={() => setAdminLoginOpen(false)}
        onSuccess={() => setProfileEditorOpen(true)}
      />

      {/* Private Content Management & Profile Customizer */}
      <ProfileEditorModal
        isOpen={profileEditorOpen}
        onClose={() => setProfileEditorOpen(false)}
      />

      {/* CV / Resume Viewer Modal */}
      <CvModal
        isOpen={cvModalOpen}
        onClose={() => setCvModalOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <PortfolioProvider>
      <PortfolioContent />
    </PortfolioProvider>
  );
}
