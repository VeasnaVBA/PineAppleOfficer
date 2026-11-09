import React from 'react';
import { 
  X, 
  Compass, 
  GraduationCap, 
  Users, 
  BookOpen, 
  Settings, 
  Plus, 
  Github
} from 'lucide-react';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onOpenQuickAdd: () => void;
  teacherCount: number;
  studentCount: number;
  classCount: number;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  currentTab,
  setCurrentTab,
  onOpenQuickAdd,
  teacherCount,
  studentCount,
  classCount
}) => {
  if (!isOpen) return null;

  const navItems = [
    { id: 'overview', label: 'Dashboard', badge: 'Live', icon: Compass },
    { id: 'teachers', label: 'Teacher Info', badge: `${teacherCount}`, icon: GraduationCap },
    { id: 'students', label: 'Student Info', badge: `${studentCount}`, icon: Users },
    { id: 'classes', label: 'Class Info', badge: `${classCount}`, icon: BookOpen },
    { id: 'settings', label: 'Settings', badge: 'Config', icon: Settings },
  ];

  const handleSelect = (id: string) => {
    setCurrentTab(id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex lg:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-4/5 max-w-xs bg-[#ded5be] border-r-2 border-ink h-full flex flex-col justify-between z-10 shadow-brutal-lg animate-fade-in">
        <div>
          {/* Header */}
          <div className="p-5 border-b border-ink flex items-center justify-between bg-[#111111] text-[#ded5be]">
            <div>
              <h2 className="font-serif text-xl font-bold tracking-[0.2em] uppercase">
                TETRAD
              </h2>
              <p className="text-[10px] font-mono tracking-widest text-[#b8ad94] uppercase">
                Academic Administration
              </p>
            </div>
            <button 
              onClick={onClose}
              className="p-1 hover:bg-white/10 text-[#ded5be]"
            >
              <X size={20} />
            </button>
          </div>

          {/* Action button */}
          <div className="p-4 border-b border-ink">
            <button
              onClick={() => {
                onClose();
                onOpenQuickAdd();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-ink text-[#ded5be] hover:bg-ink/85 text-xs font-mono uppercase tracking-widest border border-ink shadow-sm font-bold"
            >
              <Plus size={14} />
              <span>Enroll / Schedule</span>
            </button>
          </div>

          {/* Nav items */}
          <nav className="p-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 text-sm font-serif transition-colors text-left ${
                    isActive
                      ? 'bg-ink text-[#ded5be] font-bold'
                      : 'text-ink hover:bg-black/5 hover:underline'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </div>
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 border ${
                    isActive ? 'border-[#ded5be] bg-transparent text-[#ded5be]' : 'border-ink/40 text-ink/70'
                  }`}>
                    {item.badge}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-ink font-mono text-xs text-ink/80 space-y-3">
          <div className="flex items-center justify-between text-[10px]">
            <span className="flex items-center gap-1.5 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              Vercel Edge Active
            </span>
            <span>99.98%</span>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-ink/20 text-xs">
            <a
              href="https://github.com/VeasnaVBA/PineAppleOfficer"
              target="_blank"
              rel="noreferrer"
              className="hover:underline flex items-center gap-1.5"
            >
              <Github size={14} />
              <span>GitHub Repo</span>
            </a>
            <span className="text-[10px]">v2.4</span>
          </div>
        </div>
      </div>
    </div>
  );
};
