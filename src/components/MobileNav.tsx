import React from 'react';
import { BookOpen, MessageSquareText, Target, BarChart3, FileSpreadsheet, ShieldCheck, Trophy } from 'lucide-react';

interface MobileNavProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ activeTab, onSelectTab }) => {
  const items = [
    { id: 'modules', label: 'Learn', icon: BookOpen },
    { id: 'leaderboard', label: 'Rank', icon: Trophy },
    { id: 'maturity', label: 'Maturity', icon: Target },
    { id: 'mentor', label: 'AI Mentor', icon: MessageSquareText },
    { id: 'benchmarks', label: 'Peers', icon: BarChart3 },
    { id: 'cases', label: 'Cases', icon: FileSpreadsheet },
    { id: 'insights', label: 'Profile', icon: ShieldCheck },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#090d16]/95 backdrop-blur-lg border-t border-slate-800/90 px-2 py-1.5 flex items-center justify-around safe-area-bottom">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onSelectTab(item.id)}
            className={`flex flex-col items-center justify-center py-1 px-2 rounded transition-colors text-[10px] font-medium ${
              isActive ? 'text-amber-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Icon className={`w-4 h-4 mb-0.5 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
            <span className="truncate max-w-[54px]">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
