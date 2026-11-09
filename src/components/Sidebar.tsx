import React from 'react';
import { 
  Compass, 
  GraduationCap, 
  Users, 
  BookOpen, 
  Settings, 
  Github
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  setCurrentTab
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', badge: 'Blank', icon: Compass },
    { id: 'teachers', label: 'Teacher Info', badge: 'Blank', icon: GraduationCap },
    { id: 'students', label: 'Student Info', badge: 'Blank', icon: Users },
    { id: 'classes', label: 'Class Info', badge: 'Blank', icon: BookOpen },
    { id: 'settings', label: 'Settings', badge: 'Blank', icon: Settings }
  ];

  return (
    <aside className="flex w-36 xs:w-44 sm:w-56 xl:w-64 flex-shrink-0 flex-col justify-between border-r-2 border-ink bg-[#ded5be] select-none">
      {/* Navigation list starts cleanly from the top */}
      <nav className="p-2 sm:p-4 xl:p-5 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`w-full flex items-center justify-between px-2 sm:px-3 py-2.5 text-xs sm:text-sm font-serif transition-colors text-left group ${
                isActive 
                  ? 'font-bold text-ink underline decoration-2 underline-offset-4 bg-black/10 sm:bg-black/5' 
                  : 'text-ink/80 hover:text-ink hover:underline decoration-1 underline-offset-4'
              }`}
            >
              <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
                <Icon size={16} className="flex-shrink-0" />
                <span className="truncate tracking-tight sm:tracking-wide">{item.label}</span>
              </div>
              {item.badge && (
                <span className={`hidden sm:inline text-[9px] sm:text-[10px] font-mono tracking-wider px-1 sm:px-1.5 py-0.2 border flex-shrink-0 ${
                  isActive ? 'border-ink bg-ink text-[#ded5be] font-bold' : 'border-ink/40 text-ink/70'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer / Social links */}
      <div className="p-3 sm:p-4 xl:p-5 border-t-2 border-ink">
        <p className="hidden sm:block text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-ink/70 mb-2">
          Social Links
        </p>
        <div className="flex items-center justify-around sm:justify-start sm:space-x-3 text-ink">
          <a 
            href="https://facebook.com" 
            target="_blank" 
            rel="noreferrer" 
            className="hover:opacity-60 transition-opacity font-serif font-bold text-xs sm:text-sm"
            title="Facebook"
          >
            f
          </a>
          <a 
            href="https://twitter.com" 
            target="_blank" 
            rel="noreferrer" 
            className="hover:opacity-60 transition-opacity font-serif font-bold text-xs sm:text-sm"
            title="Twitter"
          >
            𝕏
          </a>
          <a 
            href="https://pinterest.com" 
            target="_blank" 
            rel="noreferrer" 
            className="hover:opacity-60 transition-opacity font-serif font-bold text-xs sm:text-sm"
            title="Pinterest"
          >
            p
          </a>
          <a 
            href="https://github.com/VeasnaVBA/PineAppleOfficer" 
            target="_blank" 
            rel="noreferrer" 
            className="hover:opacity-60 transition-opacity"
            title="GitHub Repository"
          >
            <Github size={13} />
          </a>
        </div>

        <div className="mt-2.5 pt-2 border-t border-ink/20 flex flex-col sm:flex-row sm:items-center sm:justify-between text-[9px] font-mono text-ink/70 gap-1">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
            <span className="truncate">Vercel Edge</span>
          </span>
          <span className="font-bold hidden sm:inline">99.98%</span>
        </div>
      </div>
    </aside>
  );
};
