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
    { id: 'dashboard', label: 'Dashboard', icon: Compass },
    { id: 'teachers', label: 'Teacher Info', icon: GraduationCap },
    { id: 'students', label: 'Student Info', icon: Users },
    { id: 'classes', label: 'Class Info', icon: BookOpen },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <aside className="flex w-36 xs:w-44 sm:w-56 xl:w-64 flex-shrink-0 flex-col justify-between border-r-2 border-ink bg-[#ded5be] select-none">
      {/* Navigation list (No badges, No underlines) */}
      <nav className="p-2 sm:p-3 xl:p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`w-full flex items-center px-2.5 sm:px-3.5 py-2.5 text-xs sm:text-sm font-serif transition-colors text-left ${
                isActive 
                  ? 'font-bold text-ink bg-black/10 border-l-4 border-ink' 
                  : 'text-ink/80 hover:text-ink hover:bg-black/5'
              }`}
            >
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <Icon size={16} className="flex-shrink-0" />
                <span className="truncate tracking-tight sm:tracking-wide">{item.label}</span>
              </div>
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
