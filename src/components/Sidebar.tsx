import React from 'react';
import { 
  Compass, 
  BookOpen, 
  Image as ImageIcon, 
  BarChart3, 
  Users, 
  Settings, 
  PenSquare,
  Sparkles,
  ExternalLink,
  Github,
  Globe
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onOpenNewModal: () => void;
  articleCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  setCurrentTab,
  onOpenNewModal,
  articleCount
}) => {
  const navItems = [
    { id: 'overview', label: 'Home', badge: 'Live' },
    { id: 'articles', label: 'Articles', badge: `${articleCount}` },
    { id: 'cms', label: 'Editorial CMS', badge: 'Admin' },
    { id: 'analytics', label: 'Analytics', badge: '+14%' },
    { id: 'subscribers', label: 'Subscribers', badge: 'CRM' },
    { id: 'gallery', label: 'Gallery', badge: 'Media' },
    { id: 'settings', label: 'Settings', badge: 'Vercel' }
  ];

  return (
    <aside className="w-full md:w-56 lg:w-64 flex-shrink-0 flex flex-col justify-between border-b md:border-b-0 md:border-r border-ink bg-[#ded5be]">
      {/* Brand Header */}
      <div>
        <div className="p-6 md:p-8 border-b border-ink">
          <div className="flex items-center justify-between">
            <h1 className="font-serif text-2xl lg:text-3xl font-bold tracking-[0.2em] text-ink uppercase">
              TETRAD
            </h1>
            <span className="text-[10px] tracking-widest uppercase font-mono px-1.5 py-0.5 border border-ink bg-[#ede5cf]">
              v2.4
            </span>
          </div>
          <p className="text-[11px] font-mono tracking-wider text-ink/70 mt-1 uppercase">
            Curatorial Dashboard
          </p>
        </div>

        {/* Action Button */}
        <div className="p-4 border-b border-ink">
          <button
            onClick={onOpenNewModal}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-ink text-[#ded5be] hover:bg-ink/85 transition-all text-xs font-mono uppercase tracking-widest border border-ink shadow-sm"
          >
            <PenSquare size={14} />
            <span>New Dispatch</span>
          </button>
        </div>

        {/* Navigation list */}
        <nav className="p-4 md:p-6 space-y-1">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm font-serif transition-colors text-left group ${
                  isActive 
                    ? 'font-bold text-ink underline decoration-2 underline-offset-4 bg-black/5' 
                    : 'text-ink/80 hover:text-ink hover:underline decoration-1 underline-offset-4'
                }`}
              >
                <span className="tracking-wide">{item.label}</span>
                {item.badge && (
                  <span className={`text-[10px] font-mono tracking-wider px-1.5 py-0.2 border ${
                    isActive ? 'border-ink bg-ink text-[#ded5be]' : 'border-ink/40 text-ink/70'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer / Social links */}
      <div className="p-6 border-t border-ink">
        <p className="text-[10px] font-mono uppercase tracking-widest text-ink/70 mb-3">
          Share us On Following Social Media
        </p>
        <div className="flex items-center space-x-4 text-ink">
          <a 
            href="https://facebook.com" 
            target="_blank" 
            rel="noreferrer" 
            className="hover:opacity-60 transition-opacity font-serif font-bold text-sm"
            title="Facebook"
          >
            f
          </a>
          <a 
            href="https://twitter.com" 
            target="_blank" 
            rel="noreferrer" 
            className="hover:opacity-60 transition-opacity font-serif font-bold text-sm"
            title="Twitter"
          >
            𝕏
          </a>
          <a 
            href="https://pinterest.com" 
            target="_blank" 
            rel="noreferrer" 
            className="hover:opacity-60 transition-opacity font-serif font-bold text-sm"
            title="Pinterest"
          >
            p
          </a>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noreferrer" 
            className="hover:opacity-60 transition-opacity"
            title="GitHub Repository"
          >
            <Github size={15} />
          </a>
        </div>

        <div className="mt-4 pt-3 border-t border-ink/20 flex items-center justify-between text-[10px] font-mono text-ink/70">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
            Vercel Edge Ready
          </span>
          <span>99.98%</span>
        </div>
      </div>
    </aside>
  );
};
