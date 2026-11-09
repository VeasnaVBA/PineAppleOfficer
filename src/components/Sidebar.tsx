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
    { id: 'teachers', label: 'Teacher Info', badge: `${teacherCount}`, icon: GraduationCap },
    { id: 'students', label: 'Student Info', badge: `${studentCount}`, icon: Users },
    { id: 'classes', label: 'Class Info', badge: `${classCount}`, icon: BookOpen },
    { id: 'settings', label: 'Settings', badge: 'Config', icon: Settings }
  ];

  return (
    <aside className="hidden lg:flex w-56 xl:w-64 flex-shrink-0 flex-col justify-between border-r-2 border-ink bg-[#ded5be]">
      {/* Brand Header */}
      <div>
        <div className="p-6 xl:p-8 border-b-2 border-ink">
          <div className="flex items-center justify-between">
            <h1 className="font-serif text-2xl xl:text-3xl font-bold tracking-[0.2em] text-ink uppercase">
              TETRAD
            </h1>
            <span className="text-[10px] tracking-widest uppercase font-mono px-1.5 py-0.5 border border-ink bg-[#ede5cf] font-bold">
              v2.4
            </span>
          </div>
          <p className="text-[11px] font-mono tracking-wider text-ink/70 mt-1 uppercase">
            Academic Operations
          </p>
        </div>

        {/* Action Button */}
        <div className="p-4 border-b border-ink">
          <button
            onClick={onOpenQuickAdd}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-ink text-[#ded5be] hover:bg-ink/85 transition-all text-xs font-mono uppercase tracking-widest border border-ink shadow-sm font-bold"
          >
            <Plus size={14} />
            <span>Quick Action</span>
          </button>
        </div>

        {/* Navigation list */}
        <nav className="p-4 xl:p-6 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 text-sm font-serif transition-colors text-left group ${
                  isActive 
                    ? 'font-bold text-ink underline decoration-2 underline-offset-4 bg-black/5' 
                    : 'text-ink/80 hover:text-ink hover:underline decoration-1 underline-offset-4'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon size={16} />
                  <span className="tracking-wide">{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] font-mono tracking-wider px-1.5 py-0.2 border ${
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
            href="https://github.com/VeasnaVBA/PineAppleOfficer" 
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
          <span className="font-bold">99.98%</span>
        </div>
      </div>
    </aside>
  );
};
