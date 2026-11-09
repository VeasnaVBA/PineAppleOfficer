import React from 'react';
import { LayoutGrid } from 'lucide-react';
import { Language, translations } from '../translations';

interface BlankPageTemplateProps {
  title: string;
  breadcrumb?: string;
  subtitle?: string;
  lang: Language;
}

export const BlankPageTemplate: React.FC<BlankPageTemplateProps> = ({
  title,
  lang
}) => {
  const t = translations[lang];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 animate-fade-in text-ink">
      {/* Page Masthead */}
      <div className="pb-4 border-b-2 border-ink">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold uppercase tracking-tight">
          {title}
        </h2>
      </div>

      {/* Main Empty Canvas Area - Dynamic Theme Colors */}
      <div 
        className="border-2 border-dashed border-ink/40 p-8 sm:p-16 flex flex-col items-center justify-center text-center space-y-4 min-h-[420px] transition-colors"
        style={{ backgroundColor: 'var(--app-surface, #ede5cf)' }}
      >
        <div 
          className="w-14 h-14 border-2 border-ink flex items-center justify-center shadow-brutal transition-colors"
          style={{ backgroundColor: 'var(--app-bg, #ded5be)' }}
        >
          <LayoutGrid size={24} className="text-ink" />
        </div>

        <div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold">
            {title} {t.canvas.canvasSuffix}
          </h3>
          <p className="font-serif text-sm opacity-80 max-w-md mx-auto mt-1 leading-relaxed">
            {t.canvas.desc(title)}
          </p>
        </div>

        <div className="pt-2">
          <div 
            className="px-3.5 py-1.5 border-2 border-ink text-[11px] font-mono opacity-90 uppercase tracking-wider shadow-sm transition-colors"
            style={{ backgroundColor: 'var(--app-bg, #ded5be)' }}
          >
            {t.canvas.readyBadge}
          </div>
        </div>
      </div>
    </div>
  );
};
