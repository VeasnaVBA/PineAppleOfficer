import React, { useState } from 'react';
import { Plus, LayoutGrid, Terminal, Layers, FileCode, CheckCircle2 } from 'lucide-react';

interface EmptyPageViewProps {
  onShowToast: (title: string, message: string) => void;
}

export const EmptyPageView: React.FC<EmptyPageViewProps> = ({ onShowToast }) => {
  const [widgets, setWidgets] = useState<string[]>([]);

  const handleAddWidget = (name: string) => {
    setWidgets(prev => [...prev, name]);
    onShowToast('WIDGET ADDED', `${name} placed onto the canvas.`);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 animate-fade-in">
      {/* Top Breadcrumb & Page Masthead */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b-2 border-ink gap-3">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-mono text-ink/70 uppercase">
            <span>TETRAD OS</span>
            <span>/</span>
            <span>WORKSPACE</span>
            <span>/</span>
            <span className="font-bold text-ink underline">BLANK CANVAS</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold uppercase tracking-tight text-ink mt-1">
            EMPTY DASHBOARD CANVAS
          </h2>
          <p className="font-mono text-xs text-ink/70 tracking-wider">
            Curatorial grid template • No imagery loaded • Ready for your components
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleAddWidget('Data Metric Module')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-ink text-[#ded5be] hover:bg-ink/85 border border-ink text-xs font-mono uppercase tracking-wider font-bold transition-all shadow-sm"
          >
            <Plus size={13} />
            <span>Add Block</span>
          </button>
          <button
            onClick={() => {
              setWidgets([]);
              onShowToast('CANVAS RESET', 'Workspace cleared to blank state.');
            }}
            className="px-3 py-1.5 border border-ink text-xs font-mono uppercase tracking-wider hover:bg-black/5"
          >
            Clear
          </button>
        </div>
      </div>

      {/* 3 Clean Metric Indicator Blocks (Typographic, Zero Images) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 border-2 border-ink bg-[#ded5be] shadow-sm">
          <p className="text-[10px] font-mono uppercase tracking-widest text-ink/70">
            System Workspace
          </p>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-ink mt-1">
            Empty Slate
          </h3>
          <p className="text-[11px] font-mono text-ink/70 mt-1">
            Status: Initialized & Ready
          </p>
        </div>

        <div className="p-4 border-2 border-ink bg-[#ded5be] shadow-sm">
          <p className="text-[10px] font-mono uppercase tracking-widest text-ink/70">
            Grid Architecture
          </p>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-ink mt-1">
            12-Col Hairline
          </h3>
          <p className="text-[11px] font-mono text-emerald-800 font-bold mt-1">
            Parchment #ded5be Active
          </p>
        </div>

        <div className="p-4 border-2 border-ink bg-[#ded5be] shadow-sm">
          <p className="text-[10px] font-mono uppercase tracking-widest text-ink/70">
            Active Widgets
          </p>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-ink mt-1">
            {widgets.length} Loaded
          </h3>
          <p className="text-[11px] font-mono text-ink/70 mt-1">
            Zero External Assets
          </p>
        </div>
      </div>

      {/* Main Empty Canvas Area */}
      <div className="border-2 border-dashed border-ink/40 bg-[#ded5be] p-8 sm:p-14 flex flex-col items-center justify-center text-center space-y-4 min-h-[360px]">
        <div className="w-12 h-12 border-2 border-ink bg-[#ede5cf] flex items-center justify-center text-ink shadow-brutal">
          <LayoutGrid size={22} />
        </div>

        <div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-ink">
            Empty Page Workspace
          </h3>
          <p className="font-serif text-sm text-ink/75 max-w-md mx-auto mt-1 leading-relaxed">
            This is your clean, unpopulated layout. Build your custom widgets, data forms, charts, or tables directly inside this view.
          </p>
        </div>

        {/* Quick Action Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs font-mono">
          <button
            onClick={() => handleAddWidget('Analytics Graph')}
            className="px-3 py-1.5 border border-ink bg-[#ede5cf] hover:bg-ink hover:text-[#ded5be] transition-colors uppercase tracking-wider text-[11px]"
          >
            + Metric Tile
          </button>
          <button
            onClick={() => handleAddWidget('Data Ledger Table')}
            className="px-3 py-1.5 border border-ink bg-[#ede5cf] hover:bg-ink hover:text-[#ded5be] transition-colors uppercase tracking-wider text-[11px]"
          >
            + Data Table
          </button>
          <button
            onClick={() => handleAddWidget('Text Dispatch Area')}
            className="px-3 py-1.5 border border-ink bg-[#ede5cf] hover:bg-ink hover:text-[#ded5be] transition-colors uppercase tracking-wider text-[11px]"
          >
            + Editorial Form
          </button>
        </div>

        {/* Dynamically added widgets */}
        {widgets.length > 0 && (
          <div className="w-full max-w-xl text-left border border-ink bg-[#ede5cf] p-4 mt-4 font-mono text-xs divide-y divide-ink/20">
            <p className="font-bold text-ink uppercase pb-2">Active Components On Page:</p>
            {widgets.map((w, idx) => (
              <div key={idx} className="py-2 flex items-center justify-between">
                <span>{idx + 1}. {w}</span>
                <span className="text-[10px] text-emerald-800 font-bold">READY</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Code snippet guidance */}
      <div className="border-2 border-ink bg-[#111111] text-[#ded5be] p-4 font-mono text-xs space-y-1">
        <div className="flex items-center gap-2 text-emerald-400 font-bold pb-1 border-b border-[#333]">
          <Terminal size={14} />
          <span>BLANK PAGE COMPONENT STRUCTURE</span>
        </div>
        <p className="text-[#8e8571] pt-1">
          // Add your custom elements inside <code>EmptyPageView.tsx</code> or import your own React components.
        </p>
        <p className="text-[#ded5be]/90">
          Theme Background: #ded5be | Hairline Ink Borders: #111111 | Typography: Bodoni / Inter
        </p>
      </div>
    </div>
  );
};
