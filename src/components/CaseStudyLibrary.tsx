import React, { useState } from 'react';
import { FileSpreadsheet, Bookmark, BookmarkCheck, ArrowRight, CheckCircle2, AlertTriangle, Sparkles, Download, Layers } from 'lucide-react';
import { CASE_STUDIES } from '../data/caseStudies';
import { CaseStudy, UserExecutiveProfile } from '../types';

interface CaseStudyLibraryProps {
  profile: UserExecutiveProfile;
  onToggleOfflineCaseStudy: (caseId: string) => void;
  onAskMentorAboutCase: (company: string, title: string) => void;
  onExportCaseStudy: (cs: CaseStudy) => void;
}

export const CaseStudyLibrary: React.FC<CaseStudyLibraryProps> = ({
  profile,
  onToggleOfflineCaseStudy,
  onAskMentorAboutCase,
  onExportCaseStudy,
}) => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('All');
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);

  const industries = ['All', 'Financial Services', 'Healthcare & Life Sciences', 'Retail & Consumer Goods', 'Manufacturing & Industrial'];

  const filteredCases = selectedIndustry === 'All'
    ? CASE_STUDIES
    : CASE_STUDIES.filter((c) => c.industry.includes(selectedIndustry));

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fadeIn">
      {/* Header */}
      <div className="p-5 sm:p-6 bg-slate-900/80 border border-slate-800 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 mb-1">
            <FileSpreadsheet className="w-4 h-4 text-amber-400" />
            <span>Executive Case Study Library</span>
            <span className="text-slate-600">·</span>
            <span>Offline-Enabled Briefcase</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-100">
            Enterprise AI Transformation Playbooks
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            In-depth strategic analyses of enterprise implementations that delivered nine-figure business value, avoided common pitfalls, and survived board scrutiny.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto p-1 bg-slate-900/80 rounded-lg border border-slate-800/80 text-xs">
          {industries.map((ind) => (
            <button
              key={ind}
              onClick={() => setSelectedIndustry(ind)}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors whitespace-nowrap cursor-pointer ${
                selectedIndustry === ind
                  ? 'bg-slate-800 text-amber-300 shadow-sm border border-slate-700/60'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {ind}
            </button>
          ))}
        </div>
      </div>

      {/* Case Study Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredCases.map((cs) => {
          const isSaved = profile.offlineCaseStudyIds.includes(cs.id);
          return (
            <div
              key={cs.id}
              className="p-5 sm:p-6 bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800 hover:border-slate-700/80 rounded-xl transition-all flex flex-col justify-between space-y-4 group"
            >
              <div>
                {/* Header metadata */}
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-200">{cs.company}</span>
                    <span className="text-slate-600">·</span>
                    <span className="font-mono text-amber-400/90 text-[11px]">{cs.industry}</span>
                  </div>

                  <button
                    onClick={() => onToggleOfflineCaseStudy(cs.id)}
                    className="p-1 text-slate-400 hover:text-amber-400 transition-colors"
                    title={isSaved ? 'Saved in Executive Briefcase (Offline Ready)' : 'Save to Executive Briefcase for offline reading'}
                  >
                    {isSaved ? (
                      <BookmarkCheck className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <h3 className="text-base font-semibold text-slate-100 group-hover:text-amber-300 transition-colors leading-snug">
                  {cs.title}
                </h3>

                {/* Impact Metrics Banner */}
                <div className="mt-3 p-3 bg-slate-950/80 rounded-lg border border-slate-800/80 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-mono block">Primary Impact</span>
                    <span className="font-bold text-emerald-400 font-mono text-sm leading-tight block mt-0.5">
                      {cs.headlineMetric}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-mono block">Velocity Metric</span>
                    <span className="font-medium text-slate-200 font-mono text-xs leading-tight block mt-0.5">
                      {cs.secondaryMetric}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-400 mt-3 line-clamp-3 leading-relaxed">
                  {cs.challenge}
                </p>
              </div>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={() => onAskMentorAboutCase(cs.company, cs.title)}
                  className="text-xs text-slate-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Discuss Case</span>
                </button>

                <button
                  onClick={() => setSelectedCase(cs)}
                  className="px-3 py-1.5 text-xs font-semibold rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700/80 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Review Playbook</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* DETAILED CASE STUDY MODAL */}
      {selectedCase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-[#0d131f] border border-slate-700 rounded-xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
            {/* Top Bar */}
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/80">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
                  <span>{selectedCase.company}</span>
                  <span className="text-slate-600">·</span>
                  <span>{selectedCase.industry}</span>
                  <span className="text-slate-600">·</span>
                  <span>ROI: {selectedCase.roiTimeline}</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-100 mt-0.5">
                  {selectedCase.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedCase(null)}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-300 leading-relaxed">
              {/* Highlight Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">Headline Value</span>
                  <span className="font-bold text-emerald-400 font-mono text-sm">{selectedCase.headlineMetric}</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">Velocity Impact</span>
                  <span className="font-semibold text-slate-200 font-mono text-xs">{selectedCase.secondaryMetric}</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 col-span-2 sm:col-span-1">
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">Payback Timeline</span>
                  <span className="font-semibold text-amber-400 font-mono text-xs">{selectedCase.roiTimeline}</span>
                </div>
              </div>

              {/* Challenge & Solution */}
              <div className="space-y-4">
                <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-lg space-y-1.5">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    The Enterprise Challenge
                  </h4>
                  <p className="text-slate-200">{selectedCase.challenge}</p>
                </div>

                <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-lg space-y-1.5">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400">
                    Executive Strategy & Solution
                  </h4>
                  <p className="text-slate-200">{selectedCase.executiveSolution}</p>
                </div>

                <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-lg space-y-1.5">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-sky-400">
                    Technical & Governance Architecture
                  </h4>
                  <p className="text-slate-200">{selectedCase.technicalArchitecture}</p>
                </div>
              </div>

              {/* Pitfalls Avoided */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                  <span>Critical Pitfalls Avoided by Leadership</span>
                </h4>
                <div className="space-y-1.5">
                  {selectedCase.pitfallsAvoided.map((pitfall, idx) => (
                    <div key={idx} className="p-2.5 bg-slate-950/60 border border-slate-800/80 rounded text-slate-300 flex items-start gap-2">
                      <span className="text-amber-400 font-mono">✕</span>
                      <span>{pitfall}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Boardroom Lessons */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Core Boardroom & C-Suite Takeaways</span>
                </h4>
                <div className="space-y-1.5">
                  {selectedCase.boardroomLessons.map((lesson, idx) => (
                    <div key={idx} className="p-2.5 bg-emerald-950/20 border border-emerald-500/30 rounded text-emerald-200 flex items-start gap-2">
                      <span className="text-emerald-400 font-mono">0{idx + 1}.</span>
                      <span>{lesson}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 border-t border-slate-800 flex items-center justify-between bg-slate-900/80">
              <button
                onClick={() => onToggleOfflineCaseStudy(selectedCase.id)}
                className="text-xs text-slate-300 hover:text-white flex items-center gap-1.5"
              >
                {profile.offlineCaseStudyIds.includes(selectedCase.id) ? (
                  <>
                    <BookmarkCheck className="w-4 h-4 text-emerald-400" />
                    <span>Saved in Briefcase</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="w-4 h-4 text-slate-400" />
                    <span>Save to Briefcase</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onExportCaseStudy(selectedCase)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded border border-slate-700 flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5 text-amber-400" />
                  <span>Export One-Pager</span>
                </button>
                <button
                  onClick={() => setSelectedCase(null)}
                  className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs rounded"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
