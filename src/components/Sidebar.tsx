import React from 'react';
import { 
  Compass, 
  GraduationCap, 
  Users, 
  BookOpen, 
  Settings, 
  Plus,
  Github
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onOpenQuickAdd: () => void;
  teacherCount: number;
  studentCount: number;
  classCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  setCurrentTab,
  onOpenQuickAdd,
  teacherCount,
  studentCount,
  classCount
}) => {
  const navItems = [
    { id: 'overview', label: 'Dashboard', badge: 'Live', icon: Compass },
    { id: 'teachers', label: 'Teachers', badge: `${teacherCount}`, icon: GraduationCap },
    { id: 'students', label: 'Students', badge: `${studentCount}`, icon: Users },
    { id: 'classes', label: 'Classes', badge: `${classCount}`, icon: BookOpen },
    { id: 'settings', label: 'Settings', badge: 'Config', icon: Settings }
  ];

  return (
    <aside className="flex w-36 xs:w-44 sm:w-56 xl:w-64 flex-shrink-0 flex-col justify-between border-r-2 border-ink bg-[#ded5be] select-none">
      {/* Brand Header */}
      <div>
        <div className="p-3 sm:p-5 xl:p-8 border-b-2 border-ink">
          <div className="flex items-center justify-between">
            <h1 className="font-serif text-lg sm:text-2xl xl:text-3xl font-bold tracking-[0.15em] sm:tracking-[0.2em] text-ink uppercase">
              TETRAD
            </h1>
            <span className="hidden sm:inline text-[9px] tracking-widest uppercase font-mono px-1.5 py-0.5 border border-ink bg-[#ede5cf] font-bold">
              v2.4
            </span>
          </div>
          <p className="text-[9px] sm:text-[11px] font-mono tracking-wider text-ink/70 mt-1 uppercase truncate">
            Academics
          </p>
        </div>

        {/* Action Button */}
        <div className="p-2.5 sm:p-4 border-b border-ink">
          <button
            onClick={onOpenQuickAdd}
            className="w-full flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-2.5 px-2 sm:px-4 bg-ink text-[#ded5be] hover:bg-ink/85 transition-all text-[10px] sm:text-xs font-mono uppercase tracking-wider border border-ink shadow-sm font-bold"
          >
            <Plus size={13} />
            <span className="truncate">Add Record</span>
          </button>
        </div>

        {/* Navigation list */}
        <nav className="p-2 sm:p-4 xl:p-6 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`w-full flex items-center justify-between px-2 sm:px-3 py-2 sm:py-2.5 text-xs sm:text-sm font-serif transition-colors text-left group ${
                  isActive 
                    ? 'font-bold text-ink underline decoration-2 underline-offset-4 bg-black/10 sm:bg-black/5' 
                    : 'text-ink/80 hover:text-ink hover:underline decoration-1 underline-offset-4'
                }`}
              >
                <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
                  <Icon size={15} className="flex-shrink-0" />
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
      </div>

      {/* Footer / Social links */}
      <div className="p-3 sm:p-5 xl:p-6 border-t border-ink">
        <p className="hidden sm:block text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-ink/70 mb-2 sm:mb-3">
          Share us On Social Media
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

        <div className="mt-3 pt-2 border-t border-ink/20 flex flex-col sm:flex-row sm:items-center sm:justify-between text-[9px] font-mono text-ink/70 gap-1">
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
