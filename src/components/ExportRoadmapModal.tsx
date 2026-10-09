import React, { useState } from 'react';
import { X, Copy, Check, Printer, Download, Sparkles } from 'lucide-react';
import { MaturityAssessmentResult, UserExecutiveProfile } from '../types';

interface ExportRoadmapModalProps {
  result: MaturityAssessmentResult;
  profile: UserExecutiveProfile;
  onClose: () => void;
}

export const ExportRoadmapModal: React.FC<ExportRoadmapModalProps> = ({
  result,
  profile,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  const authorDisplay = profile.name
    ? `${profile.name} (${profile.nickname || 'Executive Lead'})`
    : (profile.nickname || 'Executive Lead');

  const prioritizedSection = result.prioritizedSteps && result.prioritizedSteps.length > 0
    ? `\n============================================================
4. PRIORITIZED STEPS & IMPLEMENTATION RESOURCE TOOLKITS
============================================================
${result.prioritizedSteps.map((s, idx) => `[STEP ${idx + 1}: ${s.phase.toUpperCase()} - ${s.priority}]
* Title: ${s.title}
* Pillar: ${s.pillar}
* Fiduciary Rationale: ${s.fiduciaryRationale}
* Key Deliverables:
${s.deliverables.map((d) => `  - ${d}`).join('\n')}
* Implementation Resources:
${s.resources.map((r) => `  - [${r.type}] ${r.title} (${r.actionableFormat}): ${r.summary}`).join('\n')}`).join('\n\n')}\n`
    : '';

  const formattedMemoText = `BOARD OF DIRECTORS EXECUTIVE MEMORANDUM
CONFIDENTIAL & PROPRIETARY
SUBJECT: Enterprise AI Maturity Diagnostic & Strategic Action Roadmap
AUTHOR: ${authorDisplay}, ${profile.title}
COMPANY: ${profile.company} (${profile.industry})
DATE: ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}

============================================================
1. EXECUTIVE SUMMARY & MATURITY LEVEL
============================================================
Calculated Enterprise Level: ${result.overallLevelName} (Score: ${result.overallLevel}/5.0)

${result.executiveSummary}

============================================================
2. 5-PILLAR DIAGNOSTIC SCORECARD
============================================================
${result.dimensionScores.map((d) => `* ${d.pillar}: ${d.score}/5.0
  Description: ${d.description}
  Priority Action: ${d.priorityAction}`).join('\n\n')}

============================================================
3. ACTIONABLE 90 / 180 / 365 DAY EXECUTION TIMELINE
============================================================
PHASE 1 (DAYS 1 - 90: FOUNDATION & GOVERNANCE LOCKDOWN):
${result.roadmap.day90.map((i, idx) => `  [ ] 0${idx + 1}. ${i}`).join('\n')}

PHASE 2 (DAYS 91 - 180: SCALING & OPEX OPTIMIZATION):
${result.roadmap.day180.map((i, idx) => `  [ ] 0${idx + 1}. ${i}`).join('\n')}

PHASE 3 (DAYS 181 - 365: AUTONOMOUS MOAT & ENTERPRISE VALUE):
${result.roadmap.day365.map((i, idx) => `  [ ] 0${idx + 1}. ${i}`).join('\n')}
${prioritizedSection}
============================================================
5. BOARD RESOLUTION & IMMEDIATE NEXT STEPS
============================================================
1. Formally charter the cross-functional AI Steering Council.
2. Establish strict unit economics (CPSO) and zero-data-retention vendor protocols.
3. Review progress at the upcoming Q2 Audit & Risk Committee meeting.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedMemoText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#0d131f] border border-slate-700/80 rounded-xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/80">
          <div>
            <h3 className="text-base font-semibold text-slate-100">
              Board of Directors Executive Memorandum
            </h3>
            <p className="text-xs text-slate-400">
              Generated strategic roadmap ready for executive committee and board distribution.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Formatted Memo Preview */}
        <div className="p-6 overflow-y-auto bg-slate-950 font-mono text-xs text-slate-300 leading-relaxed space-y-4 select-text">
          <pre className="whitespace-pre-wrap font-mono text-[11px] sm:text-xs text-slate-200">
            {formattedMemoText}
          </pre>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-900/80 flex items-center justify-between gap-3">
          <button
            onClick={handlePrint}
            className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded border border-slate-700 flex items-center gap-1.5 transition-colors"
          >
            <Printer className="w-3.5 h-3.5 text-amber-400" />
            <span>Print Memo</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs rounded transition-colors flex items-center gap-1.5"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-slate-950" />
                  <span>Copied to Clipboard</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Board Memorandum</span>
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
