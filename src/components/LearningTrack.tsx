import React, { useState } from 'react';
import { Play, CheckCircle2, Bookmark, BookmarkCheck, Flame, ArrowRight, ShieldCheck, Cpu, DollarSign, Users, Scale, Layers } from 'lucide-react';
import { LearningModule, UserExecutiveProfile } from '../types';
import { LEARNING_MODULES } from '../data/learningModules';

interface LearningTrackProps {
  profile: UserExecutiveProfile;
  onOpenModule: (module: LearningModule) => void;
  onToggleOfflineSummary: (moduleId: string) => void;
  onNavigateToLeaderboard?: () => void;
}

export const LearningTrack: React.FC<LearningTrackProps> = ({
  profile,
  onOpenModule,
  onToggleOfflineSummary,
  onNavigateToLeaderboard,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'path'>('grid');

  const categories = [
    'All',
    'Economics & ROI',
    'Agentic Systems',
    'Governance & Legal',
    'Architecture & Moats',
    'Build vs Buy',
    'Talent & Org',
  ];

  const filteredModules = selectedCategory === 'All'
    ? LEARNING_MODULES
    : LEARNING_MODULES.filter((m) => m.category === selectedCategory);

  const completedCount = LEARNING_MODULES.filter((m) =>
    profile.completedModuleIds.includes(m.id)
  ).length;

  const completionPct = Math.round((completedCount / LEARNING_MODULES.length) * 100);

  // Daily Sprint spotlight: find first uncompleted module or the first one
  const dailySprintModule = LEARNING_MODULES.find((m) => !profile.completedModuleIds.includes(m.id)) || LEARNING_MODULES[0];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Executive Welcome & Daily Leadership Sprint */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Daily Sprint Card */}
        <div className="lg:col-span-2 p-5 sm:p-6 bg-gradient-to-br from-slate-900 via-slate-900/90 to-amber-950/20 border border-slate-800 rounded-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col justify-between h-full space-y-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 mb-1.5">
                <Flame className="w-4 h-4 text-amber-400" />
                <span>Today's 3-Minute Leadership Sprint</span>
                <span className="text-slate-600">·</span>
                <span>Active Streak: {profile.streakDays} Days</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-100 tracking-tight">
                {dailySprintModule.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
                {dailySprintModule.subtitle}
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-800/80">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span>{dailySprintModule.readTimeMinutes} min briefing & dilemma</span>
                <span className="text-slate-600">·</span>
                <span className="font-mono text-amber-400 font-medium">+{dailySprintModule.xpValue} XP</span>
              </div>
              <button
                onClick={() => onOpenModule(dailySprintModule)}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs rounded-md transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <span>Launch Sprint Session</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Progress & Executive Mastery Card */}
        <div className="p-5 sm:p-6 bg-slate-900/60 border border-slate-800 rounded-xl flex flex-col justify-between space-y-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
              Curriculum Mastery
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold font-serif text-slate-100">
                {completedCount}
              </span>
              <span className="text-xs text-slate-400">
                of {LEARNING_MODULES.length} modules completed ({completionPct}%)
              </span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full mt-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-700"
                style={{ width: `${completionPct}%` }}
              />
            </div>
          </div>

          <div className="space-y-2 text-xs text-slate-400 pt-2 border-t border-slate-800/80">
            <div className="flex justify-between items-center">
              <span>Next Milestone:</span>
              <span className="font-medium text-slate-200">
                {completedCount >= 4 ? 'Board Fellow Accreditation' : 'SVP Enterprise Systems'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>Badges Earned:</span>
              <span className="font-mono text-amber-400 font-semibold">
                {profile.unlockedBadgeIds.length} of 6 Unlocked
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Curriculum Filter Tabs & View Switcher */}
      <div className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h3 className="text-base font-semibold text-slate-100">
              Executive Microlearning Curriculum
            </h3>
            <p className="text-xs text-slate-400">
              Concise, boardroom-tested frameworks and dilemma simulations designed for senior executives.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
            <div className="p-0.5 bg-slate-900 border border-slate-800 rounded-lg flex items-center text-xs">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-slate-800 text-amber-300 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Grid View
              </button>
              <button
                onClick={() => setViewMode('path')}
                className={`px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
                  viewMode === 'path'
                    ? 'bg-slate-800 text-amber-300 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Learning Path
              </button>
            </div>

            {onNavigateToLeaderboard && (
              <button
                onClick={onNavigateToLeaderboard}
                className="px-3 py-1.5 bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-amber-300 border border-slate-800 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Cohort Leaderboard</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
              </button>
            )}
          </div>
        </div>

        {viewMode === 'grid' && (
          <>
            {/* Interactive filter buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto p-1 bg-slate-900/80 rounded-lg border border-slate-800/80 text-xs">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-md font-medium transition-colors whitespace-nowrap cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-slate-800 text-amber-300 shadow-sm border border-slate-700/60'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Modules Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredModules.map((mod) => {
                const isCompleted = profile.completedModuleIds.includes(mod.id);
                const isSaved = profile.offlineSummaryIds.includes(mod.id);

                return (
                  <div
                    key={mod.id}
                    className="p-5 bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800 hover:border-slate-700/80 rounded-xl transition-all flex flex-col justify-between space-y-4 group relative"
                  >
                    <div>
                      {/* Clean unboxed metadata with subtle typographic separators */}
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-[11px] text-amber-400/90">{mod.category}</span>
                          <span className="text-slate-600">·</span>
                          <span>{mod.readTimeMinutes} min</span>
                          <span className="text-slate-600">·</span>
                          <span className="font-mono text-slate-400">+{mod.xpValue} XP</span>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleOfflineSummary(mod.id);
                          }}
                          className="text-slate-400 hover:text-amber-400 transition-colors p-1"
                          title={isSaved ? 'Saved in Executive Briefcase' : 'Save for offline access'}
                        >
                          {isSaved ? (
                            <BookmarkCheck className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <Bookmark className="w-4 h-4" />
                          )}
                        </button>
                      </div>

                      <h4 className="text-base font-semibold text-slate-100 group-hover:text-amber-300 transition-colors">
                        {mod.title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                        {mod.subtitle}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs">
                        {isCompleted ? (
                          <span className="flex items-center gap-1 text-emerald-400 font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Completed</span>
                          </span>
                        ) : (
                          <span className="text-slate-400">Available</span>
                        )}
                      </div>

                      <button
                        onClick={() => onOpenModule(mod)}
                        className="px-3 py-1.5 text-xs font-semibold rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700/80 transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>{isCompleted ? 'Review Brief' : 'Enter Session'}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Sequential Executive Learning Path View */}
        {viewMode === 'path' && (
          <div className="space-y-4">
            <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl flex items-center justify-between text-xs text-slate-300">
              <span>Follow the curated sequential progression from Capital Allocation to Autonomous Operations.</span>
              <span className="font-mono text-amber-400 font-semibold">{completedCount} of 6 Milestones Cleared</span>
            </div>

            <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-800">
              {LEARNING_MODULES.map((mod, idx) => {
                const isCompleted = profile.completedModuleIds.includes(mod.id);
                const isCurrent = !isCompleted && (idx === 0 || profile.completedModuleIds.includes(LEARNING_MODULES[idx - 1].id));

                return (
                  <div key={mod.id} className="relative group">
                    {/* Node Dot */}
                    <div
                      className={`absolute -left-6 sm:-left-8 top-4 w-6 h-6 rounded-full border-2 flex items-center justify-center text-[10px] font-mono font-bold transition-all ${
                        isCompleted
                          ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                          : isCurrent
                          ? 'bg-amber-500 border-amber-300 text-slate-950 ring-4 ring-amber-500/20'
                          : 'bg-slate-900 border-slate-700 text-slate-400'
                      }`}
                    >
                      {isCompleted ? '✓' : idx + 1}
                    </div>

                    {/* Step Card */}
                    <div
                      className={`p-5 rounded-xl border transition-all ${
                        isCurrent
                          ? 'bg-slate-900/90 border-amber-500/50 shadow-md ring-1 ring-amber-500/20'
                          : isCompleted
                          ? 'bg-slate-900/60 border-slate-800/90'
                          : 'bg-slate-950/40 border-slate-800/60 opacity-80'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                            <span className="font-mono text-amber-400">Milestone {idx + 1}</span>
                            <span className="text-slate-600">·</span>
                            <span>{mod.category}</span>
                            <span className="text-slate-600">·</span>
                            <span className="font-mono text-amber-400">+{mod.xpValue} XP</span>
                          </div>
                          <h4 className="text-base font-semibold text-slate-100">
                            {mod.title}
                          </h4>
                          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
                            {mod.subtitle}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-auto">
                          <button
                            onClick={() => onOpenModule(mod)}
                            className={`px-4 py-2 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                              isCurrent
                                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-sm'
                                : isCompleted
                                ? 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                                : 'bg-slate-800/60 hover:bg-slate-700 text-slate-300'
                            }`}
                          >
                            <span>{isCompleted ? 'Review Milestone' : 'Enter Dilemma Session'}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
