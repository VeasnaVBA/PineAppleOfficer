import React, { useState } from 'react';
import { 
  Bell, 
  Github, 
  ChevronDown
} from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const getPageTitle = (tab: string) => {
    switch (tab) {
      case 'dashboard': return 'Dashboard';
      case 'teachers': return 'Teacher Info';
      case 'students': return 'Student Info';
      case 'classes': return 'Class Info';
      case 'settings': return 'Settings';
      default: return 'Dashboard';
    }
  };

  return (
    <header 
      className="sticky top-0 z-40 border-b-2 border-ink select-none"
      style={{ backgroundColor: 'var(--app-bg, #ded5be)' }}
    >
      <div className="flex items-center justify-between px-3 sm:px-6 py-2.5 sm:py-3">
        {/* Left: Brand / Title */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div 
            onClick={() => setCurrentTab('dashboard')}
            className="flex items-center gap-2 cursor-pointer select-none"
          >
            <span className="font-serif text-sm sm:text-lg lg:text-xl font-black tracking-[0.12em] sm:tracking-[0.18em] uppercase">
              PINEAPPLE OFFICER
            </span>
            <span className="text-[9px] font-mono tracking-widest px-1.5 py-0.2 border border-ink bg-[#ede5cf] font-bold hidden sm:inline">
              PORTAL
            </span>
          </div>

          {/* Current Page Badge */}
          <div className="flex items-center gap-1.5 sm:gap-2 pl-2 sm:pl-4 border-l border-ink/30 text-xs font-mono">
            <span className="opacity-60">/</span>
            <span className="font-serif font-bold text-xs sm:text-sm">
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
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono border border-ink bg-[#ede5cf] hover:bg-white/50 transition-colors"
            title="GitHub Repository"
          >
            <Github size={12} />
            <span className="hidden lg:inline">VeasnaVBA/PineAppleOfficer</span>
          </a>

          <div className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1 text-[10px] font-mono border border-ink bg-[#ede5cf]">
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
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-600 border border-ink rounded-full"></span>
            </button>

            {showNotifications && (
              <div 
                className="absolute right-0 mt-2 w-72 sm:w-80 border-2 border-ink shadow-brutal p-3 z-50 animate-fade-in font-mono text-xs"
                style={{ backgroundColor: 'var(--app-surface, #ede5cf)' }}
              >
                <div className="flex items-center justify-between pb-2 border-b border-ink">
                  <span className="font-serif font-bold text-sm uppercase">System Status</span>
                  <span className="text-[10px] text-emerald-800 font-bold">All Operational</span>
                </div>
                <div className="py-3 text-center text-xs opacity-75">
                  <p>Pineapple Officer portal initialized.</p>
                  <p className="text-[10px] opacity-60 mt-1">Ready for custom modules.</p>
                </div>
                <div className="pt-2 border-t border-ink text-center">
                  <button 
                    onClick={() => setShowNotifications(false)}
                    className="text-[10px] uppercase font-bold underline"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>

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
                P
              </div>
              <ChevronDown size={12} className="hidden sm:block opacity-70" />
            </button>

            {showUserMenu && (
              <div 
                className="absolute right-0 mt-2 w-52 border-2 border-ink shadow-brutal p-3 z-50 animate-fade-in font-mono text-xs"
                style={{ backgroundColor: 'var(--app-surface, #ede5cf)' }}
              >
                <div className="pb-2 border-b border-ink">
                  <p className="font-serif font-bold text-sm">Pineapple Officer</p>
                  <p className="text-[10px] opacity-70 truncate">officer@pineapple-officer.local</p>
                </div>
                <div className="py-2 space-y-1">
                  <button
                    onClick={() => {
                      setCurrentTab('dashboard');
                      setShowUserMenu(false);
                    }}
                    className="w-full text-left py-1 hover:underline"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => {
                      setCurrentTab('teachers');
                      setShowUserMenu(false);
                    }}
                    className="w-full text-left py-1 hover:underline"
                  >
                    Teacher Info
                  </button>
                  <button
                    onClick={() => {
                      setCurrentTab('students');
                      setShowUserMenu(false);
                    }}
                    className="w-full text-left py-1 hover:underline"
                  >
                    Student Info
                  </button>
                  <button
                    onClick={() => {
                      setCurrentTab('classes');
                      setShowUserMenu(false);
                    }}
                    className="w-full text-left py-1 hover:underline"
                  >
                    Class Info
                  </button>
                  <button
                    onClick={() => {
                      setCurrentTab('settings');
                      setShowUserMenu(false);
                    }}
                    className="w-full text-left py-1 hover:underline"
                  >
                    Settings
                  </button>
                </div>
                <div className="pt-2 border-t border-ink flex justify-between items-center text-[10px]">
                  <a 
                    href="https://github.com/VeasnaVBA/PineAppleOfficer" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="underline flex items-center gap-1"
                  >
                    <Github size={11} />
                    GitHub
                  </a>
                  <span className="text-emerald-800 font-bold">Production</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
