import React, { useState } from 'react';
import { Trophy, Award, Flame, Users, Shield, ArrowUp, ChevronRight, Sparkles } from 'lucide-react';
import { getRankedLeaderboard } from '../data/leaderboard';
import { UserExecutiveProfile, LeaderboardEntry } from '../types';

interface LeaderboardProps {
  profile: UserExecutiveProfile;
  onEditProfile: () => void;
  onSelectTab: (tab: string) => void;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({
  profile,
  onEditProfile,
  onSelectTab,
}) => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('All Sectors');

  const fullList = getRankedLeaderboard(profile);

  const filteredList = selectedIndustry === 'All Sectors'
    ? fullList
    : fullList.filter((e) => e.industry === selectedIndustry || e.isCurrentUser);

  const userEntry = fullList.find((e) => e.isCurrentUser);
  const nextPeer = userEntry && userEntry.rank > 1 ? fullList[userEntry.rank - 2] : null;
  const pointsToOvertake = nextPeer && userEntry ? nextPeer.xp - userEntry.xp + 10 : 0;

  const industries = [
    'All Sectors',
    'Financial Services',
    'Healthcare & Life Sciences',
    'Retail & Consumer Goods',
    'Manufacturing & Industrial Tech',
    'Technology & Software',
    'Energy & Utilities',
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fadeIn">
      {/* Top Banner */}
      <div className="p-5 sm:p-6 bg-slate-900/80 border border-slate-800 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 mb-1">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Executive Cohort Leaderboard</span>
            <span className="text-slate-600">·</span>
            <span>Global CXO Council 2026</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-100">
            Peer Accreditation & Leadership Standings
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Friendly peer benchmarking across verified boardroom microlearning completions, dilemma mastery scores, and governance badges.
          </p>
        </div>

        {/* Sector Filter */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 whitespace-nowrap">Cohort:</span>
          <select
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-md px-3 py-1.5 focus:outline-none focus:border-amber-400 font-medium"
          >
            {industries.map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* User's Standing Spotlight Banner */}
      {userEntry && (
        <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-950/30 via-slate-900/90 to-slate-900 border border-amber-500/40 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex flex-col items-center justify-center text-amber-400 shrink-0 font-mono">
              <span className="text-[10px] uppercase text-amber-400/80">Rank</span>
              <span className="text-lg font-bold">#{userEntry.rank}</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-100 text-sm">
                  {userEntry.name || userEntry.nickname || 'Executive Lead'}
                </span>
                {userEntry.nickname && (
                  <span className="text-xs text-amber-300 font-mono font-medium">
                    ({userEntry.nickname})
                  </span>
                )}
                <span className="text-slate-500">·</span>
                <span className="text-xs text-slate-400">{userEntry.title}</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5">
                <span className="font-mono text-amber-400 font-semibold">{userEntry.xp} XP</span>
                <span>·</span>
                <span>{userEntry.badgeCount} Badges Unlocked</span>
                <span>·</span>
                <span>{userEntry.streakDays}-Day Sprint</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            {nextPeer ? (
              <div className="text-right text-xs">
                <span className="text-slate-400 block text-[11px]">To overtake Rank #{nextPeer.rank}:</span>
                <span className="font-mono text-amber-300 font-semibold">+{pointsToOvertake} XP needed</span>
              </div>
            ) : (
              <div className="text-right text-xs">
                <span className="text-amber-400 font-mono font-semibold block">★ Cohort Leader</span>
                <span className="text-slate-400 text-[11px]">Rank 1 Fellow</span>
              </div>
            )}
            <button
              onClick={onEditProfile}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded border border-slate-700 transition-colors whitespace-nowrap"
            >
              Edit Callsign / Name
            </button>
          </div>
        </div>
      )}

      {/* Leaderboard Table / Cards */}
      <div className="bg-[#0b0f17] border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="px-5 py-3 border-b border-slate-800/80 bg-slate-900/60 flex items-center justify-between text-xs text-slate-400 font-mono">
          <span>COHORT STANDINGS ({filteredList.length} EXECUTIVES)</span>
          <span>UPDATED REAL-TIME</span>
        </div>

        <div className="divide-y divide-slate-800/80">
          {filteredList.map((entry) => {
            const isSelf = entry.isCurrentUser;
            const rankBadge =
              entry.rank === 1
                ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                : entry.rank === 2
                ? 'bg-slate-300/10 text-slate-200 border-slate-400/30'
                : entry.rank === 3
                ? 'bg-amber-700/20 text-amber-500 border-amber-600/30'
                : 'bg-slate-900 text-slate-400 border-slate-800';

            return (
              <div
                key={entry.id}
                className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors ${
                  isSelf
                    ? 'bg-amber-500/5 ring-1 ring-amber-500/30'
                    : 'hover:bg-slate-900/40'
                }`}
              >
                {/* Left: Rank & Executive Info */}
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-8 h-8 rounded-lg border flex items-center justify-center font-mono font-bold text-xs shrink-0 ${rankBadge}`}
                  >
                    #{entry.rank}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-semibold ${isSelf ? 'text-amber-300' : 'text-slate-100'}`}>
                        {entry.name}
                      </span>
                      {entry.nickname && (
                        <span className="text-xs text-slate-400 font-mono">
                          @{entry.nickname}
                        </span>
                      )}
                      {isSelf && (
                        <span className="px-1.5 py-0.2 bg-amber-500/20 text-amber-300 text-[10px] font-mono rounded">
                          You
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                      <span>{entry.title}</span>
                      <span className="text-slate-600">·</span>
                      <span className="text-slate-500">{entry.company}</span>
                    </div>
                  </div>
                </div>

                {/* Right: Metrics & Badges */}
                <div className="flex items-center gap-4 sm:gap-6 text-xs justify-between sm:justify-end border-t sm:border-t-0 border-slate-800/60 pt-2 sm:pt-0">
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] text-slate-400 uppercase font-mono block">Posture</span>
                    <span className="text-slate-300 font-medium">{entry.archetype}</span>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-[10px] text-slate-400 uppercase font-mono block">Streak</span>
                    <div className="flex items-center gap-1 font-mono text-slate-300">
                      <Flame className="w-3.5 h-3.5 text-amber-400" />
                      <span>{entry.streakDays}d</span>
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-[10px] text-slate-400 uppercase font-mono block">Badges</span>
                    <div className="flex items-center gap-1 font-mono text-slate-300">
                      <Award className="w-3.5 h-3.5 text-amber-400" />
                      <span>{entry.badgeCount}</span>
                    </div>
                  </div>

                  <div className="text-right pl-2 sm:pl-4 border-l border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase font-mono block">Accreditation</span>
                    <span className="font-mono text-amber-400 font-bold text-sm">
                      {entry.xp} XP
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom call to action */}
      <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="text-slate-300">
          Want to elevate your standing? Complete daily microlearning sprints and master high-stakes boardroom dilemmas.
        </div>
        <button
          onClick={() => onSelectTab('modules')}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold rounded-md transition-all flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer shadow-sm"
        >
          <span>Continue Learning Path</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
