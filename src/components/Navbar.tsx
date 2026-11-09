import React, { useState } from 'react';
import { 
  Bell, 
  Plus, 
  Github, 
  ChevronDown
} from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onOpenQuickAdd: () => void;
  teacherCount: number;
  studentCount: number;
  classCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  onOpenQuickAdd,
  teacherCount,
  studentCount,
  classCount
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const notifications = [
    { id: 1, title: 'Term I Enrollment', desc: 'New student Beatrice Chen registered in Honors', time: '10m ago' },
    { id: 2, title: 'Schedule Updated', desc: 'MATH-201 room relocated to Science Wing Rm 112', time: '1h ago' },
    { id: 3, title: 'Faculty Notice', desc: 'Dr. Arthur Sterling approved for tenured status', time: '3h ago' }
  ];

  const getPageTitle = (tab: string) => {
    switch (tab) {
      case 'overview': return 'Academic Dashboard';
      case 'teachers': return 'Teacher Info';
      case 'students': return 'Student Info';
      case 'classes': return 'Class Info';
      case 'settings': return 'System Settings';
      default: return 'Academic Dashboard';
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#ded5be] border-b-2 border-ink">
      <div className="flex items-center justify-between px-3 sm:px-6 py-2.5 sm:py-3">
        {/* Left: Brand / Title */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div 
            onClick={() => setCurrentTab('overview')}
            className="flex items-center gap-2 cursor-pointer select-none"
          >
            <span className="font-serif text-lg sm:text-2xl font-black tracking-[0.18em] sm:tracking-[0.22em] text-ink uppercase">
              TETRAD
            </span>
            <span className="text-[9px] font-mono tracking-widest px-1.5 py-0.2 border border-ink bg-[#ede5cf] font-bold hidden sm:inline">
              ACADEMICS
            </span>
          </div>

          {/* Current Page Badge */}
          <div className="flex items-center gap-1.5 sm:gap-2 pl-2 sm:pl-4 border-l border-ink/30 text-xs font-mono">
            <span className="text-ink/60">/</span>
            <span className="font-serif font-bold text-ink underline decoration-1 underline-offset-2 text-xs sm:text-sm">
              {getPageTitle(currentTab)}
            </span>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Live Edge Status Pill */}
          <a
            href="https://github.com/VeasnaVBA/PineAppleOfficer"
            target="_blank"
            rel="noreferrer"
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono border border-ink bg-[#ede5cf] hover:bg-white/50 text-ink transition-colors"
            title="GitHub Repository"
          >
            <Github size={12} />
            <span className="hidden lg:inline">VeasnaVBA/PineAppleOfficer</span>
          </a>

          <div className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1 text-[10px] font-mono border border-ink bg-[#ede5cf] text-ink">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            <span className="font-bold">Live</span>
          </div>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowUserMenu(false);
              }}
              className="relative p-1.5 border border-ink bg-[#ede5cf] hover:bg-black/10 transition-colors"
              title="Notifications"
            >
              <Bell size={15} />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-600 border border-ink rounded-full"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-[#ded5be] border-2 border-ink shadow-brutal p-3 z-50 animate-fade-in font-mono text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-ink">
                  <span className="font-serif font-bold text-sm text-ink uppercase">Academic Bulletins</span>
                  <span className="text-[10px] text-ink/70">3 New</span>
                </div>
                <div className="divide-y divide-ink/20 py-2 space-y-2">
                  {notifications.map(n => (
                    <div key={n.id} className="pt-2 hover:bg-black/5 p-1 transition-colors">
                      <p className="font-serif font-bold text-xs text-ink">{n.title}</p>
                      <p className="text-[11px] text-ink/80 leading-snug">{n.desc}</p>
                      <span className="text-[9px] text-ink/60">{n.time}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-2 border-t border-ink text-center">
                  <button 
                    onClick={() => setShowNotifications(false)}
                    className="text-[10px] uppercase font-bold text-ink underline"
                  >
                    Close Bulletins
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick Action */}
          <button
            onClick={onOpenQuickAdd}
            className="hidden xs:flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 bg-ink text-[#ded5be] hover:bg-ink/85 border border-ink text-[11px] font-mono uppercase tracking-wider font-bold transition-all shadow-sm"
          >
            <Plus size={13} />
            <span className="hidden sm:inline">Add Record</span>
          </button>

          {/* User Profile Menu */}
          <div className="relative">
            <button
              onClick={() => {
                setShowUserMenu(!showUserMenu);
                setShowNotifications(false);
              }}
              className="flex items-center gap-1 p-1 sm:p-1.5 border border-ink bg-[#ede5cf] hover:bg-black/10 transition-colors"
            >
              <div className="w-5 h-5 rounded-full bg-ink text-[#ded5be] flex items-center justify-center text-[10px] font-serif font-bold">
                V
              </div>
              <ChevronDown size={12} className="hidden sm:block text-ink/70" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-52 bg-[#ded5be] border-2 border-ink shadow-brutal p-3 z-50 animate-fade-in font-mono text-xs">
                <div className="pb-2 border-b border-ink">
                  <p className="font-serif font-bold text-sm text-ink">Dean Veasna</p>
                  <p className="text-[10px] text-ink/70 truncate">veasna@tetrad-admin.local</p>
                </div>
                <div className="py-2 space-y-1">
                  <button
                    onClick={() => {
                      setCurrentTab('teachers');
                      setShowUserMenu(false);
                    }}
                    className="w-full text-left py-1 hover:underline text-ink"
                  >
                    Teacher Info ({teacherCount})
                  </button>
                  <button
                    onClick={() => {
                      setCurrentTab('students');
                      setShowUserMenu(false);
                    }}
                    className="w-full text-left py-1 hover:underline text-ink"
                  >
                    Student Info ({studentCount})
                  </button>
                  <button
                    onClick={() => {
                      setCurrentTab('classes');
                      setShowUserMenu(false);
                    }}
                    className="w-full text-left py-1 hover:underline text-ink"
                  >
                    Class Info ({classCount})
                  </button>
                  <button
                    onClick={() => {
                      setCurrentTab('settings');
                      setShowUserMenu(false);
                    }}
                    className="w-full text-left py-1 hover:underline text-ink"
                  >
                    Academic Settings
                  </button>
                </div>
                <div className="pt-2 border-t border-ink flex justify-between items-center text-[10px]">
                  <a 
                    href="https://github.com/VeasnaVBA/PineAppleOfficer" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="underline text-ink flex items-center gap-1"
                  >
                    <Github size={11} />
                    GitHub
                  </a>
                  <span className="text-emerald-800 font-bold">Term 2026</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
