import React from 'react';
import { LayoutGrid } from 'lucide-react';

interface BlankPageTemplateProps {
  title: string;
  breadcrumb: string;
  subtitle: string;
  onShowToast: (title: string, message: string) => void;
}

export const BlankPageTemplate: React.FC<BlankPageTemplateProps> = ({
  title,
  breadcrumb,
  subtitle
}) => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 animate-fade-in">
      {/* Top Breadcrumb & Page Masthead */}
      <div className="pb-4 border-b-2 border-ink">
        <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono text-ink/70 uppercase">
          <span>PINEAPPLE OFFICER</span>
          <span>/</span>
          <span className="font-bold text-ink">{breadcrumb}</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold uppercase tracking-tight text-ink mt-1">
          {title}
        </h2>
        <p className="font-mono text-xs text-ink/70 tracking-wider">
          {subtitle}
        </p>
      </div>

      {/* Main Empty Canvas Area */}
      <div className="border-2 border-dashed border-ink/40 bg-[#ded5be] p-8 sm:p-16 flex flex-col items-center justify-center text-center space-y-4 min-h-[420px]">
        <div className="w-14 h-14 border-2 border-ink bg-[#ede5cf] flex items-center justify-center text-ink shadow-brutal">
          <LayoutGrid size={24} />
        </div>

        <div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-ink">
            {title} Canvas
          </h3>
          <p className="font-serif text-sm text-ink/75 max-w-md mx-auto mt-1 leading-relaxed">
            This page is empty and ready for your custom {title.toLowerCase()} components, tables, charts, or forms.
          </p>
        </div>

        <div className="pt-2">
          <div className="px-3 py-1.5 border border-ink bg-[#ede5cf] text-[11px] font-mono text-ink/80 uppercase tracking-wider">
            Workspace: Ready for implementation
          </div>
        </div>
      </div>
    </div>
  );
};
