import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ToastProps {
  title: string;
  message: string;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ title, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div 
      className="fixed bottom-6 right-6 z-50 max-w-sm w-full border-2 border-ink shadow-brutal p-4 animate-fade-in transition-all"
      style={{ 
        backgroundColor: 'var(--app-border, #121212)', 
        color: 'var(--app-bg, #ded5be)',
        borderColor: 'var(--app-border, #121212)'
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <h5 className="font-mono text-xs font-bold uppercase tracking-widest opacity-90">
              {title}
            </h5>
          </div>
          <p className="font-serif text-xs opacity-85 mt-1 leading-snug">
            {message}
          </p>
        </div>
        <button
          onClick={onClose}
          className="opacity-70 hover:opacity-100 p-0.5 transition-opacity"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
};
