import React, { useEffect } from 'react';
import { X, CheckCircle2, AlertCircle } from 'lucide-react';

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
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-[#111111] text-[#ded5be] border-2 border-ink shadow-brutal p-4 animate-fade-in">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <h5 className="font-mono text-xs font-bold uppercase tracking-widest text-[#ded5be]">
              {title}
            </h5>
          </div>
          <p className="font-serif text-xs text-[#ded5be]/85 mt-1 leading-snug">
            {message}
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-[#ded5be]/60 hover:text-[#ded5be] p-0.5 transition-colors"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
};
