import React, { useState } from 'react';
import { Github, Globe, Terminal, RefreshCw, Key, ShieldCheck, Check, Server } from 'lucide-react';

interface SettingsViewProps {
  onShowToast: (title: string, message: string) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ onShowToast }) => {
  const [siteTitle, setSiteTitle] = useState('TETRAD');
  const [subtitle, setSubtitle] = useState('Editorial & Media Administration System');
  const [repoUrl, setRepoUrl] = useState('https://github.com/username/tetrad-admin');
  const [vercelProject, setVercelProject] = useState('tetrad-curate.vercel.app');
  const [edgeRegion, setEdgeRegion] = useState('iad1 (Global Edge Anycast)');

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    onShowToast('CONFIGURATION SAVED', 'Archival settings & edge configurations updated successfully.');
  };

  const handlePurgeCache = () => {
    onShowToast('CACHE PURGED', 'Vercel Edge CDN cache flushed across 34 global points of presence.');
  };

  return (
    <div className="p-6 lg:p-8 space-y-8 animate-fade-in max-w-4xl">
      {/* Header */}
      <div className="pb-4 border-b border-ink">
        <h2 className="font-serif text-2xl lg:text-3xl font-bold uppercase tracking-tight text-ink">
          SYSTEM CONFIGURATION & CLOUD HOSTING
        </h2>
        <p className="font-mono text-xs text-ink/70 mt-1 uppercase tracking-wider">
          GitHub Version Control • Vercel Edge Hosting • Curatorial Branding
        </p>
      </div>

      {/* Deployment Status Block */}
      <div className="border-2 border-ink p-6 bg-[#ede5cf] shadow-brutal space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-ink/30">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse"></span>
            <span className="font-mono font-bold text-sm text-ink uppercase">Vercel Deployment Status</span>
          </div>
          <span className="px-2 py-0.5 bg-ink text-[#ded5be] text-[10px] font-mono uppercase tracking-widest font-bold">
            Production Ready
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
          <div>
            <span className="text-ink/70 block text-[10px] uppercase">Framework</span>
            <span className="font-bold text-ink">Vite + React (SPA Mode)</span>
          </div>
          <div>
            <span className="text-ink/70 block text-[10px] uppercase">Routing Configuration</span>
            <span className="font-bold text-ink">vercel.json SPA Rewrites</span>
          </div>
          <div>
            <span className="text-ink/70 block text-[10px] uppercase">Edge Performance</span>
            <span className="font-bold text-emerald-800">Sub-30ms Global Latency</span>
          </div>
        </div>

        <div className="pt-2 flex flex-wrap gap-2">
          <button
            onClick={handlePurgeCache}
            className="px-3 py-1.5 border border-ink bg-[#ded5be] text-xs font-mono uppercase tracking-wider hover:bg-white/40 flex items-center gap-1.5"
          >
            <RefreshCw size={12} />
            <span>Flush Edge Cache</span>
          </button>
        </div>
      </div>

      {/* Form settings */}
      <form onSubmit={handleSaveConfig} className="border-2 border-ink p-6 bg-[#ded5be] shadow-brutal space-y-5">
        <h3 className="font-serif text-lg font-bold text-ink border-b border-ink/20 pb-2">
          Curatorial Identity & Branding
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-widest text-ink/80 mb-1">
              Masthead Title
            </label>
            <input
              type="text"
              value={siteTitle}
              onChange={(e) => setSiteTitle(e.target.value)}
              className="w-full px-3 py-2 bg-transparent border border-ink text-ink font-serif text-base focus:bg-white/40 outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase tracking-widest text-ink/80 mb-1">
              Subtitle / Edition Note
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full px-3 py-2 bg-transparent border border-ink text-ink text-xs font-mono focus:bg-white/40 outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-widest text-ink/80 mb-1">
              GitHub Repository
            </label>
            <div className="flex items-center border border-ink bg-transparent">
              <span className="px-3 text-ink/60"><Github size={14} /></span>
              <input
                type="text"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                className="w-full py-2 bg-transparent text-ink text-xs font-mono outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase tracking-widest text-ink/80 mb-1">
              Vercel Project Domain
            </label>
            <div className="flex items-center border border-ink bg-transparent">
              <span className="px-3 text-ink/60"><Globe size={14} /></span>
              <input
                type="text"
                value={vercelProject}
                onChange={(e) => setVercelProject(e.target.value)}
                className="w-full py-2 bg-transparent text-ink text-xs font-mono outline-none"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-ink/20 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-ink text-[#ded5be] text-xs font-mono uppercase tracking-widest font-bold hover:bg-ink/85 flex items-center gap-1.5 shadow-sm"
          >
            <Check size={14} />
            <span>Save Settings</span>
          </button>
        </div>
      </form>

      {/* GitHub & Vercel Push Instructions Box */}
      <div className="border-2 border-ink p-6 bg-[#ded5be] shadow-brutal space-y-4">
        <h3 className="font-serif text-lg font-bold text-ink border-b border-ink/20 pb-2 flex items-center gap-2">
          <Terminal size={16} />
          <span>GitHub & Vercel Deployment Instructions</span>
        </h3>

        <div className="font-mono text-xs text-ink/90 space-y-3">
          <p className="font-serif italic text-sm">
            To synchronize with your own GitHub remote and trigger automated Vercel CI/CD:
          </p>

          <div className="bg-[#111111] text-[#ded5be] p-4 border border-ink space-y-2 text-[11px]">
            <p className="text-[#8e8571] font-bold"># Step 1: Connect to your GitHub repository</p>
            <p className="text-emerald-400">git remote add origin https://github.com/&lt;your-username&gt;/&lt;repo-name&gt;.git</p>
            <p className="text-emerald-400">git branch -M main</p>
            <p className="text-emerald-400">git push -u origin main</p>
            
            <p className="text-[#8e8571] font-bold pt-2"># Step 2: Deploy to Vercel (Instant CLI or Dashboard import)</p>
            <p className="text-emerald-400">npx vercel deploy --prod</p>
          </div>
        </div>
      </div>
    </div>
  );
};
