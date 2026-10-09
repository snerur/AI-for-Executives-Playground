import React, { useState } from 'react';
import { ShieldCheck, Award, Zap, AlertCircle, Compass, CheckCircle2, Lock, Flame, Sparkles } from 'lucide-react';
import { LEADERSHIP_ARCHETYPES, ALL_BADGES } from '../data/leadershipArchetypes';
import { UserExecutiveProfile } from '../types';

interface LeadershipInsightsProps {
  profile: UserExecutiveProfile;
  onUpdateArchetype: (archetypeKey: string) => void;
  onAskMentorAboutArchetype: (archetypeName: string) => void;
}

export const LeadershipInsights: React.FC<LeadershipInsightsProps> = ({
  profile,
  onUpdateArchetype,
  onAskMentorAboutArchetype,
}) => {
  const currentArchetypeKey = profile.leadershipArchetype || 'orchestrator';
  const archetype = LEADERSHIP_ARCHETYPES[currentArchetypeKey] || LEADERSHIP_ARCHETYPES.orchestrator;

  const [isDiagnosticOpen, setIsDiagnosticOpen] = useState(false);
  const [diagnosticStep, setDiagnosticStep] = useState(0);
  const [selectedChoices, setSelectedChoices] = useState<string[]>([]);

  const diagnosticQuestions = [
    {
      q: 'When your executive committee evaluates a frontier AI proposal, your primary instinctive question is:',
      options: [
        { text: 'How does this align with our 3-year enterprise architecture and board P&L targets?', archetype: 'orchestrator' },
        { text: 'Will this grant us a decisive, unassailable speed advantage over our primary competitors?', archetype: 'vanguard' },
        { text: 'What is the exact Cost-per-Successful-Outcome (CPSO) and 90-day payback timeline?', archetype: 'scaler' },
        { text: 'What are the regulatory liabilities, data privacy risks, and worst-case scenario audit trails?', archetype: 'sentinel' },
      ],
    },
    {
      q: 'In terms of autonomous multi-agent systems, your corporate tolerance for autonomy is:',
      options: [
        { text: 'Calibrated: Pre-approved API sandboxes with clear executive committee oversight.', archetype: 'orchestrator' },
        { text: 'Aggressive: Give agents tool access and iterate rapidly on live workflow telemetry.', archetype: 'vanguard' },
        { text: 'Pragmatic: Automate mundane internal workflows first; delay external client exposure.', archetype: 'scaler' },
        { text: 'Strict: Mandatory cryptographic human-in-the-loop gates on every transaction.', archetype: 'sentinel' },
      ],
    },
    {
      q: 'How do you view foundational model providers (OpenAI, Google, Anthropic)?',
      options: [
        { text: 'Strategic platform partners requiring standardized abstraction to avoid vendor lock-in.', archetype: 'orchestrator' },
        { text: 'Fast engines to propel our novel products ahead of industry incumbents.', archetype: 'vanguard' },
        { text: 'Commodity utilities to be aggressively cascaded and cost-optimized per token.', archetype: 'scaler' },
        { text: 'Potential counterparty risks requiring strict zero-retention IP indemnification.', archetype: 'sentinel' },
      ],
    },
  ];

  const handleDiagnosticChoice = (arch: string) => {
    const nextChoices = [...selectedChoices, arch];
    setSelectedChoices(nextChoices);

    if (diagnosticStep < diagnosticQuestions.length - 1) {
      setDiagnosticStep(diagnosticStep + 1);
    } else {
      // Tally winner
      const counts: Record<string, number> = {};
      nextChoices.forEach((c) => {
        counts[c] = (counts[c] || 0) + 1;
      });
      let topArch = 'orchestrator';
      let maxCount = 0;
      Object.entries(counts).forEach(([k, v]) => {
        if (v > maxCount) {
          maxCount = v;
          topArch = k;
        }
      });
      onUpdateArchetype(topArch);
      setIsDiagnosticOpen(false);
      setDiagnosticStep(0);
      setSelectedChoices([]);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-fadeIn">
      {/* Leadership Archetype Card */}
      <div className="p-6 bg-gradient-to-br from-slate-900 via-slate-900/90 to-amber-950/20 border border-amber-500/30 rounded-xl space-y-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 mb-1">
              <Compass className="w-4 h-4 text-amber-400" />
              <span>Personalized Leadership Posture</span>
            </div>
            <h2 className="text-2xl font-bold font-serif text-slate-100">
              {archetype.name}
            </h2>
            <p className="text-xs text-amber-300/80 font-mono mt-0.5">
              {archetype.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsDiagnosticOpen(true)}
              className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-md border border-slate-700 transition-colors"
            >
              Re-calibrate Posture
            </button>
            <button
              onClick={() => onAskMentorAboutArchetype(archetype.name)}
              className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Advisory Brief</span>
            </button>
          </div>
        </div>

        {/* Diagnostic Modal if open */}
        {isDiagnosticOpen && (
          <div className="p-5 bg-slate-950/90 border border-amber-500/40 rounded-lg space-y-4 animate-fadeIn">
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span className="font-mono text-amber-400">
                Diagnostic Step {diagnosticStep + 1} of {diagnosticQuestions.length}
              </span>
              <button
                onClick={() => setIsDiagnosticOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                Cancel
              </button>
            </div>
            <p className="text-sm font-semibold text-slate-100">
              {diagnosticQuestions[diagnosticStep].q}
            </p>
            <div className="space-y-2">
              {diagnosticQuestions[diagnosticStep].options.map((opt, oIdx) => (
                <button
                  key={oIdx}
                  onClick={() => handleDiagnosticChoice(opt.archetype)}
                  className="w-full text-left p-3 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-amber-400/60 text-xs text-slate-200 transition-all cursor-pointer"
                >
                  {opt.text}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Archetype Breakdown Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-slate-950/60 border border-slate-800/80 rounded-lg space-y-1.5">
            <span className="text-[10px] uppercase font-mono text-emerald-400 font-semibold block flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Core Executive Strength
            </span>
            <p className="text-slate-200 leading-relaxed">{archetype.coreStrength}</p>
          </div>

          <div className="p-4 bg-slate-950/60 border border-slate-800/80 rounded-lg space-y-1.5">
            <span className="text-[10px] uppercase font-mono text-rose-400 font-semibold block flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> Fiduciary Blindspot to Watch
            </span>
            <p className="text-slate-200 leading-relaxed">{archetype.blindspotToWatch}</p>
          </div>

          <div className="p-4 bg-slate-950/60 border border-slate-800/80 rounded-lg space-y-1.5">
            <span className="text-[10px] uppercase font-mono text-amber-400 font-semibold block">
              Boardroom Communication Style
            </span>
            <p className="text-slate-200 leading-relaxed">{archetype.boardroomStyle}</p>
          </div>

          <div className="p-4 bg-slate-950/60 border border-slate-800/80 rounded-lg space-y-1.5">
            <span className="text-[10px] uppercase font-mono text-sky-400 font-semibold block">
              Recommended 90-Day Strategic Directive
            </span>
            <p className="text-slate-200 leading-relaxed">{archetype.recommendedFocus}</p>
          </div>
        </div>
      </div>

      {/* Executive Badges & Accreditations */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-slate-100 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Executive Accreditations & Badges</span>
            </h3>
            <p className="text-xs text-slate-400">
              Awarded upon solving boardroom dilemmas, defending unit economics, and mastering governance.
            </p>
          </div>
          <span className="text-xs font-mono text-amber-400 font-semibold">
            {profile.unlockedBadgeIds.length} of {ALL_BADGES.length} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ALL_BADGES.map((badge) => {
            const isUnlocked = profile.unlockedBadgeIds.includes(badge.id);
            return (
              <div
                key={badge.id}
                className={`p-4 rounded-xl border transition-all flex items-start gap-3.5 ${
                  isUnlocked
                    ? 'bg-slate-900/80 border-amber-500/40 shadow-sm'
                    : 'bg-slate-950/40 border-slate-800/60 opacity-60'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border ${
                    isUnlocked
                      ? 'bg-amber-500/10 border-amber-500/40 text-amber-400'
                      : 'bg-slate-900 border-slate-800 text-slate-600'
                  }`}
                >
                  {isUnlocked ? <Award className="w-5 h-5" /> : <Lock className="w-4 h-4" />}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-slate-100">
                      {badge.name}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">· {badge.category}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {badge.description}
                  </p>
                  <span className="text-[10px] font-mono block pt-0.5">
                    {isUnlocked ? (
                      <span className="text-emerald-400">✓ Accredited</span>
                    ) : (
                      <span className="text-slate-400">Pending Board Dilemma</span>
                    )}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
