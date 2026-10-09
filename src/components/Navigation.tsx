import React from 'react';
import { BookOpen, MessageSquareText, Target, BarChart3, FileSpreadsheet, ShieldCheck, Trophy } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onSelectTab }) => {
  const navItems = [
    { id: 'modules', label: 'Microlearning & Dilemmas', icon: BookOpen },
    { id: 'leaderboard', label: 'Cohort Leaderboard', icon: Trophy },
    { id: 'maturity', label: 'Maturity Diagnostic & Roadmaps', icon: Target },
    { id: 'mentor', label: 'Strategic AI Mentor', icon: MessageSquareText },
    { id: 'benchmarks', label: 'Peer Benchmarking', icon: BarChart3 },
    { id: 'cases', label: 'Case Study Library', icon: FileSpreadsheet },
    { id: 'insights', label: 'Leadership Insights & Badges', icon: ShieldCheck },
  ];

  return (
    <nav className="hidden md:block bg-[#0b0f17] border-b border-slate-800/80 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center gap-1 overflow-x-auto py-2 scrollbar-none">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-md transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-slate-800 text-amber-300 border border-slate-700/80 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
