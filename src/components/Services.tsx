import React, { useState } from 'react';
import {
  Code2,
  Layout,
  Server,
  Zap,
  Smartphone,
  Sparkles,
  ArrowRight,
  X,
  CheckCircle2,
  Cpu,
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { ServiceItem } from '../types/portfolio';

export const Services: React.FC = () => {
  const { services, accentConfig } = usePortfolio();
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  // Icon mapper
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2':
        return Code2;
      case 'Layout':
        return Layout;
      case 'Server':
        return Server;
      case 'Zap':
        return Zap;
      case 'Smartphone':
        return Smartphone;
      case 'Sparkles':
        return Sparkles;
      default:
        return Cpu;
    }
  };

  return (
    <section id="services" className="py-24 sm:py-32 relative bg-slate-50/50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs mb-3">
            <span>What I Offer</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            My <span className={accentConfig.text}>Services</span>
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400">
            End-to-end design and software development solutions tailored to your product goals.
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service) => {
            const Icon = getIcon(service.icon);
            return (
              <div
                key={service.id}
                className="group p-8 rounded-3xl bg-white dark:bg-slate-800/80 border border-slate-200/90 dark:border-slate-700/80 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div
                    className={`w-14 h-14 rounded-2xl ${accentConfig.bgSubtle} ${accentConfig.text} flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                  >
                    <Icon className="w-7 h-7" />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                    {service.title}
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {service.shortDesc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-700/60">
                  <button
                    onClick={() => setSelectedService(service)}
                    className={`inline-flex items-center gap-2 text-xs font-bold ${accentConfig.text} group-hover:underline`}
                  >
                    <span>Read Details</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal: Service Details */}
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl text-left">
              {/* Close Button */}
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div
                className={`w-12 h-12 rounded-2xl ${accentConfig.bgSubtle} ${accentConfig.text} flex items-center justify-center mb-4`}
              >
                {React.createElement(getIcon(selectedService.icon), { className: 'w-6 h-6' })}
              </div>

              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                {selectedService.title}
              </h3>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                {selectedService.fullDesc}
              </p>

              {/* Deliverables */}
              <div className="mb-6">
                <h4 className="text-xs uppercase font-extrabold tracking-wider text-slate-400 dark:text-slate-500 mb-3">
                  Key Deliverables
                </h4>
                <ul className="space-y-2">
                  {selectedService.deliverables.map((item, i) => (
                    <li
                      key={i}
                      className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2.5"
                    >
                      <CheckCircle2
                        className={`w-4 h-4 ${accentConfig.text} shrink-0 mt-0.5`}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div className="mb-6">
                <h4 className="text-xs uppercase font-extrabold tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedService.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
                <button
                  onClick={() => setSelectedService(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  Close
                </button>
                <a
                  href="#contact"
                  onClick={() => setSelectedService(null)}
                  className={`px-5 py-2 rounded-xl text-xs font-bold text-white shadow-md ${accentConfig.primary} ${accentConfig.primaryHover}`}
                >
                  Request This Service
                </a>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
