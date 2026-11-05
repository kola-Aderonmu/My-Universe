import React, { useEffect, useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';

export const CustomCursor: React.FC = () => {
  const { cursorEnabled, accentConfig } = usePortfolio();
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!cursorEnabled) return;

    // Check if device is touch-based
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.closest('button') ||
          target.closest('a') ||
          target.dataset.cursor === 'pointer' ||
          window.getComputedStyle(target).cursor === 'pointer')
      ) {
        setIsPointer(true);
      } else {
        setIsPointer(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorEnabled]);

  // Smooth trailing follower animation
  useEffect(() => {
    if (!cursorEnabled || !isVisible) return;
    let animationFrameId: number;

    const follow = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.2,
        y: prev.y + (position.y - prev.y) * 0.2,
      }));
      animationFrameId = requestAnimationFrame(follow);
    };

    animationFrameId = requestAnimationFrame(follow);
    return () => cancelAnimationFrame(animationFrameId);
  }, [position, cursorEnabled, isVisible]);

  if (!cursorEnabled || !isVisible) return null;

  return (
    <>
      {/* Center dot */}
      <div
        className="pointer-events-none fixed z-50 rounded-full transition-transform duration-75 ease-out"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${isPointer ? 0.6 : 1})`,
          width: '8px',
          height: '8px',
          backgroundColor: accentConfig.id === 'emerald' ? '#10b981' : 
                           accentConfig.id === 'blue' ? '#2563eb' :
                           accentConfig.id === 'violet' ? '#7c3aed' :
                           accentConfig.id === 'amber' ? '#f59e0b' :
                           accentConfig.id === 'rose' ? '#f43f5e' : '#06b6d4',
        }}
      />

      {/* Trailing circle */}
      <div
        className="pointer-events-none fixed z-50 rounded-full border border-current opacity-60 transition-all duration-150 ease-out"
        style={{
          left: `${trailingPos.x}px`,
          top: `${trailingPos.y}px`,
          transform: `translate(-50%, -50%) scale(${isPointer ? 1.8 : 1})`,
          width: '32px',
          height: '32px',
          borderColor: accentConfig.id === 'emerald' ? '#10b981' : 
                       accentConfig.id === 'blue' ? '#2563eb' :
                       accentConfig.id === 'violet' ? '#7c3aed' :
                       accentConfig.id === 'amber' ? '#f59e0b' :
                       accentConfig.id === 'rose' ? '#f43f5e' : '#06b6d4',
          backgroundColor: isPointer
            ? (accentConfig.id === 'emerald' ? 'rgba(16, 185, 129, 0.15)' : 
               accentConfig.id === 'blue' ? 'rgba(37, 99, 235, 0.15)' :
               accentConfig.id === 'violet' ? 'rgba(124, 58, 237, 0.15)' :
               accentConfig.id === 'amber' ? 'rgba(245, 158, 11, 0.15)' :
               accentConfig.id === 'rose' ? 'rgba(244, 63, 94, 0.15)' : 'rgba(6, 182, 212, 0.15)')
            : 'transparent',
        }}
      />
    </>
  );
};
