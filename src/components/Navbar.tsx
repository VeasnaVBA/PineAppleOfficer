import React, { useState } from 'react';
import { 
  Bell, 
  Github, 
  ChevronDown
} from 'lucide-react';
import { Language, translations } from '../translations';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  lang: Language;
  onToggleLanguage: (newLang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  lang,
  onToggleLanguage
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const t = translations[lang];

  return (
    <header 
      className="sticky top-0 z-40 border-b-2 border-ink select-none text-ink transition-colors"
      style={{ backgroundColor: 'var(--app-bg, #ded5be)' }}
    >
      <div className="flex items-center justify-between px-3 sm:px-6 py-2.5 sm:py-3">
        {/* Left: Brand / Title */}
        <div 
          onClick={() => setCurrentTab('dashboard')}
          className="flex items-center cursor-pointer select-none"
        >
          <span className="font-serif text-sm sm:text-lg lg:text-xl font-black tracking-[0.12em] sm:tracking-[0.18em] uppercase">
            {t.brand}
          </span>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Switcher Button (EN / ខ្មែរ) */}
          <div 
            className="flex items-center border-2 border-ink text-[10px] sm:text-xs font-mono transition-colors"
            style={{ backgroundColor: 'var(--app-surface, #ede5cf)' }}
          >
            <button
              onClick={() => onToggleLanguage('en')}
              className={`px-2 py-1 font-bold transition-colors ${
                lang === 'en' 
                  ? 'bg-ink' 
                  : 'hover:bg-black/10'
              }`}
              style={lang === 'en' ? { backgroundColor: 'var(--app-border)', color: 'var(--app-bg)' } : undefined}
              title="English"
            >
              EN
            </button>
            <button
              onClick={() => onToggleLanguage('km')}
              className={`px-2 py-1 font-bold transition-colors border-l border-ink ${
                lang === 'km' 
                  ? 'bg-ink' 
                  : 'hover:bg-black/10'
              }`}
              style={lang === 'km' ? { backgroundColor: 'var(--app-border)', color: 'var(--app-bg)' } : undefined}
              title="ភាសាខ្មែរ"
            >
              ខ្មែរ
            </button>
          </div>

          {/* Live Edge Status Pill */}
          <a
            href="https://github.com/VeasnaVBA/PineAppleOfficer"
            target="_blank"
            rel="noreferrer"
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono border border-ink hover:opacity-80 transition-colors"
            style={{ backgroundColor: 'var(--app-surface, #ede5cf)' }}
            title="GitHub Repository"
          >
            <Github size={12} />
            <span className="hidden lg:inline">VeasnaVBA/PineAppleOfficer</span>
          </a>

          <div 
            className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1 text-[10px] font-mono border border-ink transition-colors"
            style={{ backgroundColor: 'var(--app-surface, #ede5cf)' }}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            <span className="font-bold">{t.live}</span>
          </div>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowUserMenu(false);
              }}
              className="relative p-1.5 border border-ink hover:bg-black/10 transition-colors"
              style={{ backgroundColor: 'var(--app-surface, #ede5cf)' }}
              title="Notifications"
            >
              <Bell size={15} />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-600 border border-ink rounded-full"></span>
            </button>

            {showNotifications && (
              <div 
                className="absolute right-0 mt-2 w-72 sm:w-80 border-2 border-ink shadow-brutal p-3 z-50 animate-fade-in font-mono text-xs text-ink"
                style={{ backgroundColor: 'var(--app-surface, #ede5cf)' }}
              >
                <div className="flex items-center justify-between pb-2 border-b border-ink">
                  <span className="font-serif font-bold text-sm uppercase">{t.systemStatus}</span>
                  <span className="text-[10px] text-emerald-800 font-bold">{t.allOperational}</span>
                </div>
                <div className="py-3 text-center text-xs opacity-75">
                  <p>{t.readyNotice}</p>
                </div>
                <div className="pt-2 border-t border-ink text-center">
                  <button 
                    onClick={() => setShowNotifications(false)}
                    className="text-[10px] uppercase font-bold underline"
                  >
                    {t.close}
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
              className="flex items-center gap-1 p-1 sm:p-1.5 border border-ink hover:bg-black/10 transition-colors"
              style={{ backgroundColor: 'var(--app-surface, #ede5cf)' }}
            >
              <div 
                className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-serif font-bold"
                style={{ backgroundColor: 'var(--app-border)', color: 'var(--app-bg)' }}
              >
                P
              </div>
              <ChevronDown size={12} className="hidden sm:block opacity-70" />
            </button>

            {showUserMenu && (
              <div 
                className="absolute right-0 mt-2 w-52 border-2 border-ink shadow-brutal p-3 z-50 animate-fade-in font-mono text-xs text-ink"
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
                    {t.nav.dashboard}
                  </button>
                  <button
                    onClick={() => {
                      setCurrentTab('teachers');
                      setShowUserMenu(false);
                    }}
                    className="w-full text-left py-1 hover:underline"
                  >
                    {t.nav.teachers}
                  </button>
                  <button
                    onClick={() => {
                      setCurrentTab('students');
                      setShowUserMenu(false);
                    }}
                    className="w-full text-left py-1 hover:underline"
                  >
                    {t.nav.students}
                  </button>
                  <button
                    onClick={() => {
                      setCurrentTab('classes');
                      setShowUserMenu(false);
                    }}
                    className="w-full text-left py-1 hover:underline"
                  >
                    {t.nav.classes}
                  </button>
                  <button
                    onClick={() => {
                      setCurrentTab('settings');
                      setShowUserMenu(false);
                    }}
                    className="w-full text-left py-1 hover:underline"
                  >
                    {t.nav.settings}
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
                  <span className="text-emerald-800 font-bold">{t.production}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
