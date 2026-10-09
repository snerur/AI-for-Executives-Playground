import React, { useState } from 'react';
import { X, CheckCircle2, AlertTriangle, ArrowRight, BookOpen, Scale, Award, Bookmark, BookmarkCheck, Check, Sparkles } from 'lucide-react';
import { LearningModule, BoardroomDilemmaOption, UserExecutiveProfile } from '../types';

interface BoardroomDilemmaModalProps {
  module: LearningModule;
  onClose: () => void;
  profile: UserExecutiveProfile;
  onCompleteModule: (moduleId: string, earnedXp: number, badgeId?: string) => void;
  onToggleOfflineSummary: (moduleId: string) => void;
  onAskMentorAboutTopic: (topic: string) => void;
}

export const BoardroomDilemmaModal: React.FC<BoardroomDilemmaModalProps> = ({
  module,
  onClose,
  profile,
  onCompleteModule,
  onToggleOfflineSummary,
  onAskMentorAboutTopic,
}) => {
  const [activeStep, setActiveStep] = useState<'brief' | 'dilemma' | 'quiz'>('brief');
  const [selectedOption, setSelectedOption] = useState<BoardroomDilemmaOption | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [earnedXpTotal, setEarnedXpTotal] = useState<number>(0);

  const isSavedOffline = profile.offlineSummaryIds.includes(module.id);
  const isAlreadyCompleted = profile.completedModuleIds.includes(module.id);

  const handleSelectOption = (opt: BoardroomDilemmaOption) => {
    setSelectedOption(opt);
  };

  const handleSelectQuizAnswer = (qIdx: number, optIdx: number) => {
    if (quizSubmitted) return;
    setQuizAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleCompleteAll = () => {
    let score = 0;
    module.quiz.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correctIndex) {
        score += 1;
      }
    });

    const dilemmaXp = selectedOption?.xpReward || 100;
    const quizXp = score * 30;
    const totalXp = dilemmaXp + quizXp;
    setEarnedXpTotal(totalXp);
    setQuizSubmitted(true);

    // Map module to relevant badge unlock
    const badgeMapping: Record<string, string> = {
      'genai-economics': 'badge-fiduciary',
      'agentic-systems': 'badge-agentic',
      'data-moats': 'badge-sovereign',
      'boardroom-governance': 'badge-compliance',
      'build-vs-buy': 'badge-matrix',
      'talent-culture': 'badge-culture',
    };

    onCompleteModule(module.id, totalXp, badgeMapping[module.id]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#0d131f] border border-slate-700/80 rounded-xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Top Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-mono">
              <span>{module.category}</span>
              <span className="text-slate-600">·</span>
              <span>{module.readTimeMinutes} min executive session</span>
              <span className="text-slate-600">·</span>
              <span>+{module.xpValue} XP Available</span>
            </div>
            <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mt-0.5">
              {module.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Navigation Bar */}
        <div className="flex items-center border-b border-slate-800 bg-[#090d16] px-5 py-2.5 gap-2 text-xs overflow-x-auto">
          <button
            onClick={() => setActiveStep('brief')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
              activeStep === 'brief'
                ? 'bg-slate-800 text-amber-400 border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>01. Executive Briefing</span>
          </button>

          <button
            onClick={() => setActiveStep('dilemma')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
              activeStep === 'dilemma'
                ? 'bg-slate-800 text-amber-400 border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>02. Boardroom Dilemma Simulator</span>
            {selectedOption && <Check className="w-3.5 h-3.5 text-emerald-400" />}
          </button>

          <button
            onClick={() => setActiveStep('quiz')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
              activeStep === 'quiz'
                ? 'bg-slate-800 text-amber-400 border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>03. Precision Check</span>
            {quizSubmitted && <Check className="w-3.5 h-3.5 text-emerald-400" />}
          </button>

          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={() => onToggleOfflineSummary(module.id)}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded transition-colors ${
                isSavedOffline
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-slate-200 bg-slate-800/80 border border-slate-700/60'
              }`}
              title="Save executive summary for offline access in Executive Briefcase"
            >
              {isSavedOffline ? (
                <>
                  <BookmarkCheck className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Saved in Briefcase</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Save to Briefcase</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-slate-300 text-sm leading-relaxed">
          {/* STEP 1: EXECUTIVE BRIEFING */}
          {activeStep === 'brief' && (
            <div className="space-y-6">
              {/* Core Thesis & Imperative */}
              <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-lg">
                <div className="text-xs font-mono uppercase tracking-wider text-amber-400 mb-1">
                  Core Thesis for Leadership
                </div>
                <p className="text-slate-200 font-medium text-base leading-snug">
                  {module.executiveBrief.coreThesis}
                </p>
                <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-start gap-2 text-xs text-slate-400">
                  <span className="font-semibold text-slate-300 shrink-0">Strategic Imperative:</span>
                  <span>{module.executiveBrief.strategicImperative}</span>
                </div>
              </div>

              {/* Mental Models Grid */}
              <div>
                <h3 className="text-xs uppercase tracking-wider text-slate-400 font-mono mb-3">
                  Essential Executive Mental Models
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {module.executiveBrief.keyMentalModels.map((model, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-slate-900/50 border border-slate-800/80 rounded-lg space-y-1.5"
                    >
                      <div className="text-xs font-semibold text-slate-100 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        <span>{model.title}</span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {model.explanation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Boardroom Talking Points */}
              <div className="p-4 bg-slate-900/40 border border-slate-800 rounded-lg">
                <h3 className="text-xs uppercase tracking-wider text-amber-400 font-mono mb-2.5">
                  Talking Points for Your Next Board Meeting
                </h3>
                <ul className="space-y-2 text-xs text-slate-300">
                  {module.executiveBrief.boardTalkingPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-400 font-mono">0{idx + 1}.</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick Action footer */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <button
                  onClick={() => onAskMentorAboutTopic(module.title)}
                  className="w-full sm:w-auto text-xs text-slate-400 hover:text-amber-300 flex items-center gap-1.5 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Ask Strategic AI Mentor about this topic</span>
                </button>
                <button
                  onClick={() => setActiveStep('dilemma')}
                  className="w-full sm:w-auto px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs rounded-md transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>Proceed to Boardroom Dilemma</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: BOARDROOM DILEMMA SIMULATOR */}
          {activeStep === 'dilemma' && (
            <div className="space-y-6">
              <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-lg space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400">
                  <Scale className="w-4 h-4" />
                  <span>High-Stakes Decision Simulation</span>
                </div>
                <h3 className="text-base font-semibold text-slate-100">
                  {module.dilemma.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {module.dilemma.context}
                </p>
                <div className="pt-2 text-xs font-medium text-amber-300/90 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Stakes: {module.dilemma.stakes}</span>
                </div>
              </div>

              {/* Options */}
              <div className="space-y-3">
                <div className="text-xs uppercase tracking-wider text-slate-400 font-mono">
                  Select Your Executive Decision:
                </div>
                {module.dilemma.options.map((opt, idx) => {
                  const isSelected = selectedOption?.id === opt.id;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => handleSelectOption(opt)}
                      className={`p-4 rounded-lg border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-slate-800/90 border-amber-500/80 shadow-md ring-1 ring-amber-500/40'
                          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-mono shrink-0 mt-0.5 ${
                            isSelected ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400 border border-slate-700'
                          }`}>
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <div>
                            <p className="text-sm font-medium text-slate-100">
                              {opt.text}
                            </p>
                            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                              {opt.tradeoffAnalysis}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* When selected, reveal impact metrics and verdict analysis */}
                      {isSelected && (
                        <div className="mt-4 pt-4 border-t border-slate-700/80 space-y-3 animate-fadeIn">
                          {/* Metrics bar */}
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                            <div className="p-2 bg-slate-900 rounded border border-slate-800">
                              <span className="text-[10px] text-slate-400 uppercase font-mono block">ROI Impact</span>
                              <span className="font-semibold text-emerald-400 font-mono text-sm">{opt.impactMetrics.roiImpact}</span>
                            </div>
                            <div className="p-2 bg-slate-900 rounded border border-slate-800">
                              <span className="text-[10px] text-slate-400 uppercase font-mono block">Risk Exposure</span>
                              <span className={`font-semibold font-mono text-sm ${
                                opt.impactMetrics.riskExposure === 'Low' ? 'text-emerald-400' :
                                opt.impactMetrics.riskExposure === 'Moderate' ? 'text-yellow-400' : 'text-rose-400'
                              }`}>{opt.impactMetrics.riskExposure}</span>
                            </div>
                            <div className="p-2 bg-slate-900 rounded border border-slate-800">
                              <span className="text-[10px] text-slate-400 uppercase font-mono block">Time to Value</span>
                              <span className="font-semibold text-slate-200 font-mono text-sm">{opt.impactMetrics.timeToValue}</span>
                            </div>
                            <div className="p-2 bg-slate-900 rounded border border-slate-800">
                              <span className="text-[10px] text-slate-400 uppercase font-mono block">Board Trust</span>
                              <span className={`font-semibold font-mono text-sm ${
                                opt.impactMetrics.boardConfidence.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'
                              }`}>{opt.impactMetrics.boardConfidence}</span>
                            </div>
                          </div>

                          {/* Verdict */}
                          <div className={`p-3 rounded border text-xs leading-relaxed ${
                            opt.executiveVerdict === 'Optimal'
                              ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                              : opt.executiveVerdict === 'Viable with Risk'
                              ? 'bg-yellow-950/30 border-yellow-500/40 text-yellow-200'
                              : 'bg-rose-950/30 border-rose-500/40 text-rose-200'
                          }`}>
                            <div className="font-semibold mb-1 flex items-center gap-1.5">
                              <span>Verdict: {opt.executiveVerdict}</span>
                              <span className="text-slate-400">·</span>
                              <span className="font-mono text-[11px]">+{opt.xpReward} XP</span>
                            </div>
                            <p>{opt.rationale}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Dilemma bottom navigation */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => setActiveStep('brief')}
                  className="text-xs text-slate-400 hover:text-slate-200"
                >
                  Back to Briefing
                </button>
                <button
                  disabled={!selectedOption}
                  onClick={() => setActiveStep('quiz')}
                  className={`px-4 py-2 font-semibold text-xs rounded-md transition-all flex items-center gap-2 ${
                    selectedOption
                      ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 cursor-pointer shadow-sm'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <span>Advance to Precision Check</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PRECISION CHECK (QUIZ) */}
          {activeStep === 'quiz' && (
            <div className="space-y-6">
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-slate-100">
                    Executive Precision Check (3 Scenarios)
                  </h3>
                  <p className="text-xs text-slate-400">
                    Solidify critical board-level judgment principles and claim your accreditation XP.
                  </p>
                </div>
                <div className="text-xs font-mono text-amber-400 font-semibold">
                  +90 XP Available
                </div>
              </div>

              {/* Questions */}
              <div className="space-y-6">
                {module.quiz.map((q, qIdx) => {
                  const userAnswer = quizAnswers[qIdx];
                  const hasAnswered = userAnswer !== undefined;
                  const isCorrect = hasAnswered && userAnswer === q.correctIndex;

                  return (
                    <div
                      key={q.id}
                      className="p-4 bg-slate-900/60 border border-slate-800 rounded-lg space-y-3"
                    >
                      <div className="text-xs font-semibold text-slate-200 flex items-start gap-2">
                        <span className="font-mono text-amber-400">Q{qIdx + 1}.</span>
                        <span>{q.question}</span>
                      </div>

                      <div className="space-y-2">
                        {q.options.map((optText, optIdx) => {
                          const isOptionSelected = userAnswer === optIdx;
                          let btnStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';

                          if (quizSubmitted) {
                            if (optIdx === q.correctIndex) {
                              btnStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-200';
                            } else if (isOptionSelected) {
                              btnStyle = 'bg-rose-950/40 border-rose-500 text-rose-200';
                            }
                          } else if (isOptionSelected) {
                            btnStyle = 'bg-slate-800 border-amber-500 text-amber-200';
                          }

                          return (
                            <button
                              key={optIdx}
                              disabled={quizSubmitted}
                              onClick={() => handleSelectQuizAnswer(qIdx, optIdx)}
                              className={`w-full text-left p-2.5 rounded-md border text-xs transition-colors flex items-start gap-2.5 ${btnStyle}`}
                            >
                              <span className="font-mono opacity-60">
                                {String.fromCharCode(65 + optIdx)}.
                              </span>
                              <span>{optText}</span>
                            </button>
                          );
                        })}
                      </div>

                      {quizSubmitted && (
                        <div className={`p-2.5 rounded border text-xs ${
                          isCorrect ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-300'
                        }`}>
                          <div className="font-semibold mb-0.5">
                            {isCorrect ? '✓ Verified Executive Precision' : 'Analysis & Key Takeaway:'}
                          </div>
                          <p>{q.explanation}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Completion Banner or Submit Button */}
              {!quizSubmitted ? (
                <div className="flex items-center justify-between pt-3">
                  <button
                    onClick={() => setActiveStep('dilemma')}
                    className="text-xs text-slate-400 hover:text-slate-200"
                  >
                    Back to Dilemma
                  </button>
                  <button
                    disabled={Object.keys(quizAnswers).length < module.quiz.length}
                    onClick={handleCompleteAll}
                    className={`px-5 py-2 font-semibold text-xs rounded-md transition-all flex items-center gap-2 ${
                      Object.keys(quizAnswers).length === module.quiz.length
                        ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-sm cursor-pointer'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    <span>Submit & Claim Accreditation XP</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="p-4 bg-emerald-950/30 border border-emerald-500/40 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-3 animate-fadeIn">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-emerald-200">
                        Session Complete! +{earnedXpTotal} XP Awarded
                      </h4>
                      <p className="text-xs text-emerald-300/80">
                        Your leadership profile and mastery ranking have been updated.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs rounded-md transition-colors"
                  >
                    Done
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
