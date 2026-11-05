import React, { useState } from 'react';
import {
  X,
  Lock,
  Unlock,
  KeyRound,
  ShieldAlert,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { loginAdmin, accentConfig, adminPasscodeHint } = usePortfolio();
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(false);
  const [showHint, setShowHint] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) return;

    const success = loginAdmin(passcode.trim());
    if (success) {
      setPasscode('');
      setError(false);
      onClose();
      onSuccess();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 text-center overflow-hidden">
        
        {/* Subtle decorative glow */}
        <div
          className={`absolute -top-12 -right-12 w-32 h-32 rounded-full blur-2xl opacity-20 pointer-events-none bg-gradient-to-tr ${accentConfig.gradient}`}
        />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Discreet Gateway Icon */}
        <div
          className={`w-14 h-14 mx-auto rounded-2xl ${accentConfig.bgSubtle} ${accentConfig.text} flex items-center justify-center mb-4 shadow-inner`}
        >
          <Lock className="w-6 h-6" />
        </div>

        {/* Discreet Title (not shouting 'Admin') */}
        <h3 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          System Verification
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-6">
          Enter authorization key to unlock console management.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <KeyRound className="w-4 h-4" />
            </div>
            <input
              type="password"
              autoFocus
              value={passcode}
              onChange={(e) => {
                setPasscode(e.target.value);
                if (error) setError(false);
              }}
              placeholder="Enter authorization key..."
              className={`w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none transition-all ${
                error
                  ? 'border-rose-500 ring-2 ring-rose-500/20 animate-shake'
                  : 'border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-emerald-500'
              }`}
            />
          </div>

          {error && (
            <div className="flex items-center justify-center gap-1.5 text-xs text-rose-500 font-semibold animate-in fade-in">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Invalid authorization key</span>
            </div>
          )}

          <button
            type="submit"
            className={`w-full py-3 px-4 rounded-2xl text-xs font-bold text-white shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] ${accentConfig.primary} ${accentConfig.primaryHover}`}
          >
            <span>Authenticate</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Private Hint for the owner */}
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
          {showHint ? (
            <span className="font-mono text-emerald-500">
              Default passcode: <strong>{adminPasscodeHint}</strong>
            </span>
          ) : (
            <button
              onClick={() => setShowHint(true)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 underline transition-colors"
            >
              Need hint?
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
