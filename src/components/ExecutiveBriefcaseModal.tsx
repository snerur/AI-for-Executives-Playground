import React, { useState } from 'react';
import { X, Briefcase, BookOpen, FileSpreadsheet, Sparkles, Trash2, Copy, Check, Download, ExternalLink } from 'lucide-react';
import { UserExecutiveProfile, LearningModule, CaseStudy } from '../types';
import { LEARNING_MODULES } from '../data/learningModules';
import { CASE_STUDIES } from '../data/caseStudies';

interface ExecutiveBriefcaseModalProps {
  profile: UserExecutiveProfile;
  onClose: () => void;
  onRemoveSummary: (id: string) => void;
  onRemoveCase: (id: string) => void;
  onOpenModule: (m: LearningModule) => void;
}

export const ExecutiveBriefcaseModal: React.FC<ExecutiveBriefcaseModalProps> = ({
  profile,
  onClose,
  onRemoveSummary,
  onRemoveCase,
  onOpenModule,
}) => {
  const [activeSection, setActiveSection] = useState<'summaries' | 'cases'>('summaries');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const savedModules = LEARNING_MODULES.filter((m) =>
    profile.offlineSummaryIds.includes(m.id)
  );
  const savedCases = CASE_STUDIES.filter((c) =>
    profile.offlineCaseStudyIds.includes(c.id)
  );

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#0d131f] border border-slate-700/80 rounded-xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-slate-100">
                  Executive Briefcase & Offline Dossier
                </h2>
                <span className="text-[10px] uppercase font-mono text-emerald-400 font-medium">
                  Offline Ready
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Encrypted local cache for reading during flights, off-sites, and executive committee sessions.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section Navigation */}
        <div className="flex items-center border-b border-slate-800 bg-[#090d16] px-6 py-2 gap-2 text-xs">
          <button
            onClick={() => setActiveSection('summaries')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded font-medium transition-colors cursor-pointer ${
              activeSection === 'summaries'
                ? 'bg-slate-800 text-amber-400 border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Saved Module Summaries ({savedModules.length})</span>
          </button>

          <button
            onClick={() => setActiveSection('cases')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded font-medium transition-colors cursor-pointer ${
              activeSection === 'cases'
                ? 'bg-slate-800 text-amber-400 border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Case Study Playbooks ({savedCases.length})</span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-slate-300 text-xs leading-relaxed">
          {/* SECTION: MODULE SUMMARIES */}
          {activeSection === 'summaries' && (
            <div className="space-y-4">
              {savedModules.length === 0 ? (
                <div className="p-8 text-center text-slate-400 space-y-2">
                  <p>No module summaries saved yet.</p>
                  <p className="text-[11px] text-slate-400">
                    Click the bookmark icon in any microlearning module to store it in your offline briefcase.
                  </p>
                </div>
              ) : (
                savedModules.map((m) => (
                  <div
                    key={m.id}
                    className="p-4 bg-slate-900/60 border border-slate-800 rounded-lg space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 text-[10px] font-mono text-amber-400">
                          <span>{m.category}</span>
                          <span className="text-slate-600">·</span>
                          <span>{m.readTimeMinutes} Min Read</span>
                        </div>
                        <h3 className="text-sm font-semibold text-slate-100 mt-0.5">
                          {m.title}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            onClose();
                            onOpenModule(m);
                          }}
                          className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-[11px] flex items-center gap-1"
                        >
                          <span>Open</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => onRemoveSummary(m.id)}
                          className="p-1 text-slate-400 hover:text-rose-400 transition-colors"
                          title="Remove from offline briefcase"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <p className="text-slate-300 font-medium">{m.executiveBrief.coreThesis}</p>

                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] uppercase font-mono text-slate-400 block">
                        Boardroom Talking Points:
                      </span>
                      <ul className="space-y-1 text-slate-300 text-[11px]">
                        {m.executiveBrief.boardTalkingPoints.map((pt, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-amber-400 font-mono">·</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* SECTION: CASE STUDIES */}
          {activeSection === 'cases' && (
            <div className="space-y-4">
              {savedCases.length === 0 ? (
                <div className="p-8 text-center text-slate-400 space-y-2">
                  <p>No case studies saved to briefcase yet.</p>
                  <p className="text-[11px] text-slate-400">
                    Bookmark real-world case studies in the Case Library to read without internet connection.
                  </p>
                </div>
              ) : (
                savedCases.map((cs) => (
                  <div
                    key={cs.id}
                    className="p-4 bg-slate-900/60 border border-slate-800 rounded-lg space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 text-[10px] font-mono text-amber-400">
                          <span>{cs.company}</span>
                          <span className="text-slate-600">·</span>
                          <span>{cs.industry}</span>
                        </div>
                        <h3 className="text-sm font-semibold text-slate-100 mt-0.5">
                          {cs.title}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCopyText(cs.id, `${cs.title}\n${cs.headlineMetric}\n${cs.challenge}\n\nLessons:\n${cs.boardroomLessons.join('\n')}`)}
                          className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-[11px] flex items-center gap-1"
                        >
                          {copiedId === cs.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy Brief</span>
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => onRemoveCase(cs.id)}
                          className="p-1 text-slate-400 hover:text-rose-400 transition-colors"
                          title="Remove from offline briefcase"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 p-2 bg-slate-950/80 rounded border border-slate-800 text-[11px]">
                      <div>
                        <span className="text-slate-400 block text-[10px]">Headline Metric:</span>
                        <span className="font-semibold text-emerald-400 font-mono">{cs.headlineMetric}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Payback Period:</span>
                        <span className="font-semibold text-amber-400 font-mono">{cs.roiTimeline}</span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-mono text-slate-400 block">
                        Boardroom Lessons:
                      </span>
                      <ul className="space-y-1 text-slate-300 text-[11px]">
                        {cs.boardroomLessons.map((lesson, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-amber-400 font-mono">0{idx + 1}.</span>
                            <span>{lesson}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-900/80 flex items-center justify-between text-xs text-slate-400">
          <span>All materials stored locally in device cache.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded font-medium transition-colors"
          >
            Close Briefcase
          </button>
        </div>
      </div>
    </div>
  );
};
