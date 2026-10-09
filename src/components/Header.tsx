import React from 'react';
import { Flame, Briefcase, Award, Shield, User, Sparkles } from 'lucide-react';
import { UserExecutiveProfile } from '../types';
import { calculateExecutiveRank } from '../utils/storage';

interface HeaderProps {
  profile: UserExecutiveProfile;
  onOpenBriefcase: () => void;
  onEditProfile: () => void;
  onSelectTab: (tab: string) => void;
  activeTab: string;
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  onOpenBriefcase,
  onEditProfile,
  onSelectTab,
  activeTab,
}) => {
  const rankInfo = calculateExecutiveRank(profile.xp);
  const totalOfflineItems = profile.offlineCaseStudyIds.length + profile.offlineSummaryIds.length;

  return (
    <header className="sticky top-0 z-40 bg-[#090d16]/90 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Left: Brand & Executive Identity */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500/20 via-slate-800 to-slate-900 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold tracking-wider shadow-inner">
              <span className="font-serif text-lg">V</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-base tracking-wide font-semibold text-slate-100">
                  VANGUARD AI
                </span>
                <span className="text-[10px] uppercase tracking-widest text-amber-400/90 font-mono font-medium">
                  CXO Suite
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <button
                  onClick={onEditProfile}
                  className="hover:text-slate-200 transition-colors text-left flex items-center gap-1 group cursor-pointer"
                  title="Click to edit executive name or callsign"
                >
                  <span className="font-medium text-slate-300 group-hover:text-amber-300">
                    {profile.name || profile.nickname || 'Set Callsign / Name'}
                  </span>
                  {profile.name && profile.nickname && (
                    <span className="text-[11px] text-amber-400/90 font-mono hidden sm:inline">
                      ({profile.nickname})
                    </span>
                  )}
                  <span className="text-slate-500">·</span>
                  <span className="text-slate-400 hidden sm:inline">{profile.title}</span>
                  <span className="text-[10px] text-amber-400 font-mono underline ml-1 sm:hidden">
                    Edit
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Quick Briefcase trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenBriefcase}
              className="px-2.5 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 border border-slate-700/80 rounded-md transition-colors flex items-center gap-1.5"
            >
              <Briefcase className="w-3.5 h-3.5 text-amber-400" />
              <span>{totalOfflineItems}</span>
            </button>
          </div>
        </div>

        {/* Center / Right: Executive Gamification Metrics */}
        <div className="flex items-center flex-wrap gap-3 sm:gap-6 justify-between md:justify-end text-xs">
          {/* Executive Rank & XP Level */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-slate-800/90 border border-slate-700/60 flex items-center justify-center text-amber-400">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-slate-200">{rankInfo.rank}</span>
                <span className="text-slate-500">·</span>
                <span className="font-mono text-amber-400 font-semibold">{profile.xp} XP</span>
              </div>
              {rankInfo.nextRank ? (
                <div className="flex items-center gap-2 mt-0.5">
                  <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-500"
                      style={{ width: `${rankInfo.progressPct}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {rankInfo.progressPct}% to next tier
                  </span>
                </div>
              ) : (
                <span className="text-[10px] text-amber-400/90 font-mono">Peak Board Fellow</span>
              )}
            </div>
          </div>

          {/* Active Leadership Streak */}
          <div className="flex items-center gap-2 border-l border-slate-800/90 pl-3 sm:pl-5">
            <div className="w-7 h-7 rounded-md bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <div className="font-medium text-slate-200">{profile.streakDays}-Day Sprint</div>
              <div className="text-[10px] text-slate-400">Active Leadership Streak</div>
            </div>
          </div>

          {/* Executive Briefcase (Desktop) */}
          <div className="hidden md:flex items-center gap-2 border-l border-slate-800/90 pl-5">
            <button
              onClick={onOpenBriefcase}
              className="px-3 py-1.5 text-xs font-medium text-slate-200 hover:text-white bg-slate-800/90 hover:bg-slate-700 border border-slate-700/80 rounded-md transition-all flex items-center gap-2 group shadow-sm"
              title="Access saved offline summaries and case studies"
            >
              <Briefcase className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
              <span>Executive Briefcase</span>
              <span className="px-1.5 py-0.2 bg-amber-500/20 text-amber-300 text-[10px] font-mono rounded">
                {totalOfflineItems}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
