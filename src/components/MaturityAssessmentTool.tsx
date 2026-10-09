import React, { useState } from 'react';
import { Target, CheckCircle2, ArrowRight, ArrowLeft, Download, Sparkles, AlertCircle, BarChart3, Clock, ShieldCheck, Cpu } from 'lucide-react';
import { ASSESSMENT_QUESTIONS, calculateMaturityAssessment } from '../data/maturityAssessment';
import { MaturityAssessmentResult, UserExecutiveProfile } from '../types';

interface MaturityAssessmentToolProps {
  profile: UserExecutiveProfile;
  onExportRoadmap: (result: MaturityAssessmentResult) => void;
  onAskMentorAboutRoadmap: (summary: string) => void;
}

export const MaturityAssessmentTool: React.FC<MaturityAssessmentToolProps> = ({
  profile,
  onExportRoadmap,
  onAskMentorAboutRoadmap,
}) => {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [assessmentResult, setAssessmentResult] = useState<MaturityAssessmentResult | null>(null);
  const [activeTab, setActiveTab] = useState<'diagnostic' | 'scorecard' | 'roadmap'>('diagnostic');

  const question = ASSESSMENT_QUESTIONS[currentQuestionIdx];
  const totalQuestions = ASSESSMENT_QUESTIONS.length;
  const progressPct = Math.round(((currentQuestionIdx + 1) / totalQuestions) * 100);

  const handleSelectAnswer = (questionId: string, score: number) => {
    const updatedAnswers = { ...answers, [questionId]: score };
    setAnswers(updatedAnswers);

    if (currentQuestionIdx < totalQuestions - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    } else {
      // Calculate assessment result
      const result = calculateMaturityAssessment(updatedAnswers);
      setAssessmentResult(result);
      setActiveTab('scorecard');
    }
  };

  const handleRetake = () => {
    setAnswers({});
    setCurrentQuestionIdx(0);
    setAssessmentResult(null);
    setActiveTab('diagnostic');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fadeIn">
      {/* Top Banner */}
      <div className="p-5 sm:p-6 bg-slate-900/80 border border-slate-800 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 mb-1">
            <Target className="w-4 h-4 text-amber-400" />
            <span>Enterprise Diagnostic Framework</span>
            <span className="text-slate-600">·</span>
            <span>5 Strategic Pillars</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-100">
            Enterprise AI Maturity & Actionable Roadmap
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Assess your firm’s AI posture across Strategy, Data Architecture, Talent, Governance, and Execution to generate a tailored 90-to-365 day board roadmap.
          </p>
        </div>

        {assessmentResult && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('scorecard')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'scorecard' ? 'bg-slate-800 text-amber-300 border border-slate-700' : 'text-slate-400 hover:text-white'
              }`}
            >
              Scorecard
            </button>
            <button
              onClick={() => setActiveTab('roadmap')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'roadmap' ? 'bg-slate-800 text-amber-300 border border-slate-700' : 'text-slate-400 hover:text-white'
              }`}
            >
              Roadmap
            </button>
            <button
              onClick={handleRetake}
              className="px-3 py-1.5 text-xs text-slate-400 hover:text-white bg-slate-800/60 rounded-md border border-slate-700/60"
            >
              Retake
            </button>
          </div>
        )}
      </div>

      {/* VIEW 1: DIAGNOSTIC QUESTIONNAIRE */}
      {(!assessmentResult || activeTab === 'diagnostic') && (
        <div className="bg-[#0b0f17] border border-slate-800 rounded-xl p-5 sm:p-8 space-y-6 shadow-xl">
          {/* Progress Header */}
          <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <span className="font-mono text-amber-400 font-semibold">
                Question {currentQuestionIdx + 1} of {totalQuestions}
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-300">{question.pillar}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-28 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-300"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <span className="font-mono text-[11px] text-slate-400">{progressPct}%</span>
            </div>
          </div>

          {/* Question Text */}
          <div className="space-y-2">
            <h3 className="text-lg sm:text-xl font-semibold text-slate-100 leading-snug">
              {question.question}
            </h3>
            <p className="text-xs text-slate-400 italic">
              Executive Context: {question.executiveContext}
            </p>
          </div>

          {/* Options */}
          <div className="space-y-3 pt-2">
            {question.options.map((opt, optIdx) => {
              const isSelected = answers[question.id] === opt.score;
              return (
                <div
                  key={optIdx}
                  onClick={() => handleSelectAnswer(question.id, opt.score)}
                  className={`p-4 rounded-lg border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-800/90 border-amber-500 text-slate-100 ring-1 ring-amber-500/30'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-mono shrink-0 mt-0.5 ${
                      isSelected ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}>
                      {opt.score}
                    </span>
                    <div>
                      <p className="text-sm font-medium leading-relaxed">{opt.text}</p>
                      <p className="text-xs text-slate-400 mt-1">{opt.rationale}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              disabled={currentQuestionIdx === 0}
              onClick={() => setCurrentQuestionIdx(currentQuestionIdx - 1)}
              className={`flex items-center gap-1.5 text-xs ${
                currentQuestionIdx === 0 ? 'text-slate-600 cursor-not-allowed' : 'text-slate-400 hover:text-white cursor-pointer'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous Question</span>
            </button>

            {answers[question.id] && currentQuestionIdx < totalQuestions - 1 && (
              <button
                onClick={() => setCurrentQuestionIdx(currentQuestionIdx + 1)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5"
              >
                <span>Skip to Next</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* VIEW 2: EXECUTIVE SCORECARD */}
      {assessmentResult && activeTab === 'scorecard' && (
        <div className="space-y-6">
          {/* Headline Level Card */}
          <div className="p-6 bg-gradient-to-br from-slate-900 via-slate-900/90 to-amber-950/20 border border-amber-500/30 rounded-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400">
                  Calculated Enterprise Maturity Rating
                </span>
                <h3 className="text-2xl font-bold font-serif text-slate-100 mt-1">
                  {assessmentResult.overallLevelName}
                </h3>
              </div>
              <div className="px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-lg text-center">
                <span className="text-[10px] text-slate-400 uppercase font-mono block">Overall Index</span>
                <span className="text-xl font-bold text-amber-400 font-mono">
                  Level {assessmentResult.overallLevel} / 5.0
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
              {assessmentResult.executiveSummary}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setActiveTab('roadmap')}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs rounded-md transition-all flex items-center gap-2 shadow-sm"
              >
                <span>View Actionable Roadmap</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onExportRoadmap(assessmentResult)}
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-md border border-slate-700 transition-colors flex items-center gap-2"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" />
                <span>Export Board Presentation Memo</span>
              </button>
              <button
                onClick={() => onAskMentorAboutRoadmap(assessmentResult.executiveSummary)}
                className="px-3.5 py-2 text-xs text-slate-300 hover:text-amber-300 flex items-center gap-1.5 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Consult AI Advisor on these findings</span>
              </button>
            </div>
          </div>

          {/* 5 Pillars Breakdown Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {assessmentResult.dimensionScores.map((dim, idx) => (
              <div
                key={idx}
                className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-200">{dim.pillar}</span>
                    <span className="font-mono text-xs font-bold text-amber-400">
                      {dim.score} / 5.0
                    </span>
                  </div>

                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-3">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-amber-300"
                      style={{ width: `${(dim.score / 5) * 100}%` }}
                    />
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed mb-3">
                    {dim.description}
                  </p>

                  {dim.criticalGaps.length > 0 && (
                    <div className="space-y-1 text-[11px] text-rose-300/90 mb-3">
                      <span className="font-semibold text-rose-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> Critical Gap:
                      </span>
                      <p>{dim.criticalGaps[0]}</p>
                    </div>
                  )}
                </div>

                <div className="p-2.5 bg-slate-950/80 rounded border border-slate-800/80 text-[11px] text-slate-300">
                  <span className="text-amber-400 font-semibold block mb-0.5">Priority Action:</span>
                  <span>{dim.priorityAction}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 3: ACTIONABLE 90 / 180 / 365 DAY ROADMAP WITH RELEVANT RESOURCES */}
      {assessmentResult && activeTab === 'roadmap' && (
        <div className="space-y-6">
          <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-semibold text-slate-100">
                Actionable Board-Ready Execution Roadmap & Resource Kits
              </h3>
              <p className="text-xs text-slate-400">
                Prioritized steps with executive blueprints, legal templates, architecture guides, and financial models.
              </p>
            </div>
            <button
              onClick={() => onExportRoadmap(assessmentResult)}
              className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs rounded-md transition-colors flex items-center gap-2 self-start sm:self-auto cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Executive Action Plan</span>
            </button>
          </div>

          {/* Prioritized Steps Cards with Complete Executive Resources */}
          <div className="space-y-4">
            {assessmentResult.prioritizedSteps && assessmentResult.prioritizedSteps.map((step) => {
              const phaseColor =
                step.phase === '90-Day Foundation'
                  ? 'text-amber-400 bg-amber-500/10 border-amber-500/30'
                  : step.phase === '180-Day Scaling'
                  ? 'text-sky-400 bg-sky-500/10 border-sky-500/30'
                  : 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';

              const priorityColor =
                step.priority === 'Critical P0'
                  ? 'text-rose-400 border-rose-500/30 bg-rose-500/10'
                  : step.priority === 'High P1'
                  ? 'text-amber-400 border-amber-500/30 bg-amber-500/10'
                  : 'text-sky-400 border-sky-500/30 bg-sky-500/10';

              return (
                <div
                  key={step.id}
                  className="p-5 bg-slate-900/80 border border-slate-800 rounded-xl space-y-4 hover:border-slate-700/80 transition-all shadow-sm"
                >
                  {/* Step Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                    <div className="flex items-center flex-wrap gap-2 text-xs">
                      <span className={`px-2 py-0.5 rounded font-mono text-[10px] border ${phaseColor}`}>
                        {step.phase}
                      </span>
                      <span className={`px-2 py-0.5 rounded font-mono text-[10px] border ${priorityColor}`}>
                        {step.priority}
                      </span>
                      <span className="text-slate-500">·</span>
                      <span className="text-slate-300 font-medium">{step.pillar}</span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h4 className="text-base font-semibold text-slate-100">
                      {step.title}
                    </h4>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      {step.description}
                    </p>
                    <div className="mt-2 p-2 bg-slate-950/60 rounded border border-slate-800/80 text-[11px] text-amber-300/90 flex items-start gap-1.5">
                      <span className="font-semibold text-amber-400 shrink-0">Fiduciary Rationale:</span>
                      <span>{step.fiduciaryRationale}</span>
                    </div>
                  </div>

                  {/* Executive Deliverables Checklist */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] uppercase font-mono text-slate-400 block">
                      Target Executive Deliverables:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      {step.deliverables.map((deliv, dIdx) => (
                        <div
                          key={dIdx}
                          className="p-2.5 bg-slate-950/40 border border-slate-800/80 rounded text-xs text-slate-300 flex items-start gap-2"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="text-[11px] leading-tight">{deliv}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Relevant Resources & Toolkits */}
                  <div className="pt-2 border-t border-slate-800/80 space-y-2">
                    <span className="text-[10px] uppercase font-mono text-amber-400 block flex items-center gap-1.5">
                      <span>Relevant Executive Resources & Implementation Toolkits:</span>
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                      {step.resources.map((res, rIdx) => (
                        <div
                          key={rIdx}
                          className="p-3 bg-slate-950/80 border border-slate-800 rounded-lg space-y-1.5 group hover:border-amber-500/40 transition-colors"
                        >
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-semibold text-slate-200 group-hover:text-amber-300 transition-colors">
                              {res.title}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 leading-relaxed">
                            {res.summary}
                          </p>
                          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-1">
                            <span className="text-amber-400/90">{res.type}</span>
                            <span className="text-slate-400">{res.actionableFormat}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
