import React from 'react';
import { Compass, GraduationCap, Users, BookOpen, Menu } from 'lucide-react';

interface BottomMobileNavProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onToggleMobileDrawer: () => void;
}

export const BottomMobileNav: React.FC<BottomMobileNavProps> = ({
  currentTab,
  setCurrentTab,
  onToggleMobileDrawer
}) => {
  const items = [
    { id: 'overview', label: 'Overview', icon: Compass },
    { id: 'teachers', label: 'Teachers', icon: GraduationCap },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'classes', label: 'Classes', icon: BookOpen },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#ded5be] border-t-2 border-ink grid grid-cols-5 divide-x divide-ink font-mono text-[10px]">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = currentTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setCurrentTab(item.id)}
            className={`py-2.5 flex flex-col items-center justify-center gap-1 transition-colors ${
              isActive 
                ? 'bg-ink text-[#ded5be] font-bold' 
                : 'text-ink hover:bg-black/5'
            }`}
          >
            <Icon size={16} />
            <span className="uppercase tracking-wider">{item.label}</span>
          </button>
        );
      })}

      <button
        onClick={onToggleMobileDrawer}
        className="py-2.5 flex flex-col items-center justify-center gap-1 text-ink hover:bg-black/5"
      >
        <Menu size={16} />
        <span className="uppercase tracking-wider">Menu</span>
      </button>
    </div>
  );
};
