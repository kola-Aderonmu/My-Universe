import React, { useState } from 'react';
import {
  Quote,
  Star,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Testimonials: React.FC = () => {
  const { testimonials, accentConfig } = usePortfolio();
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const current = testimonials[currentIndex] || testimonials[0];

  return (
    <section id="testimonials" className="py-24 sm:py-32 relative bg-slate-50/50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs mb-3">
            <span>Client Endorsements</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Client <span className={accentConfig.text}>Testimonials</span>
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400">
            Real feedback from engineering leaders, product managers, and founders I have worked with.
          </p>
        </div>

        {/* Testimonial Card Slider */}
        <div className="max-w-3xl mx-auto relative">
          <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-700/80 shadow-xl relative overflow-hidden transition-all duration-300">
            {/* Background Decorative Quote Mark */}
            <Quote
              className={`absolute -right-4 -bottom-6 w-36 h-36 ${accentConfig.text} opacity-5 dark:opacity-10 pointer-events-none`}
            />

            {/* Stars */}
            <div className="flex items-center gap-1 mb-6">
              {[...Array(current.rating)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-amber-400 text-amber-400"
                />
              ))}
            </div>

            {/* Comment */}
            <p className="text-base sm:text-xl text-slate-700 dark:text-slate-200 italic leading-relaxed mb-8">
              "{current.comment}"
            </p>

            {/* Client Profile Info */}
            <div className="flex items-center gap-4">
              <img
                src={current.avatar}
                alt={current.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-slate-200 dark:border-slate-700"
              />
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  {current.name}
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  {current.role} • <span className="font-semibold">{current.company}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Slider Navigation Buttons */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-2.5 rounded-full transition-all ${
                    currentIndex === i
                      ? `w-8 ${accentConfig.primary}`
                      : 'w-2.5 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prevSlide}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-xs"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-xs"
                aria-label="Next Testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
