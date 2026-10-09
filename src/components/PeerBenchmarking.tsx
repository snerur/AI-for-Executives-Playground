import React, { useState } from 'react';
import { BarChart3, Users, TrendingUp, ShieldCheck, Clock, Layers, Sparkles, Sliders } from 'lucide-react';
import { INDUSTRY_BENCHMARKS } from '../data/benchmarks';
import { UserExecutiveProfile } from '../types';

interface PeerBenchmarkingProps {
  profile: UserExecutiveProfile;
  onAskMentorAboutBenchmark: (industry: string) => void;
}

export const PeerBenchmarking: React.FC<PeerBenchmarkingProps> = ({
  profile,
  onAskMentorAboutBenchmark,
}) => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>(profile.industry || 'Financial Services');
  const [userAiBudget, setUserAiBudget] = useState<number>(12);
  const [userMonthsToProd, setUserMonthsToProd] = useState<number>(6.5);

  const benchmark = INDUSTRY_BENCHMARKS[selectedIndustry] || INDUSTRY_BENCHMARKS['Financial Services'];

  // Calculate user percentile relative to peers
  const budgetDelta = userAiBudget - benchmark.aiBudgetPctIT;
  let percentile = 50 + Math.round(budgetDelta * 4);
  percentile = Math.max(10, Math.min(99, percentile));

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fadeIn">
      {/* Header */}
      <div className="p-5 sm:p-6 bg-slate-900/80 border border-slate-800 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 mb-1">
            <Users className="w-4 h-4 text-amber-400" />
            <span>Peer-to-Peer Cohort Intelligence</span>
            <span className="text-slate-600">·</span>
            <span>N = 650+ Global Enterprises ($500M+ Revenue)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-100">
            Executive Industry AI Benchmarking
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Compare your enterprise AI capital allocation, deployment cycle times, and model strategies directly against anonymized industry peers.
          </p>
        </div>

        {/* Industry Selector */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 whitespace-nowrap">Cohort:</span>
          <select
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-md px-3 py-1.5 focus:outline-none focus:border-amber-400 font-medium"
          >
            {Object.keys(INDUSTRY_BENCHMARKS).map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Cohort Comparison Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Budget */}
        <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2">
          <span className="text-[10px] text-slate-400 uppercase font-mono block">
            AI Budget as % of IT
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-serif text-slate-100">
              {benchmark.aiBudgetPctIT}%
            </span>
            <span className="text-xs text-amber-400 font-mono">Cohort Avg</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Top decile firms allocate &gt; 22% of total IT capex/opex to generative capabilities.
          </p>
        </div>

        {/* Metric 2: Deployment Velocity */}
        <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2">
          <span className="text-[10px] text-slate-400 uppercase font-mono block">
            Time to Production
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-serif text-slate-100">
              {benchmark.avgMonthsToProduction}
            </span>
            <span className="text-xs text-sky-400 font-mono">Months</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Average duration from approved proof-of-concept to production deployment.
          </p>
        </div>

        {/* Metric 3: Headcount Allocation */}
        <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2">
          <span className="text-[10px] text-slate-400 uppercase font-mono block">
            GenAI Headcount Share
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-serif text-slate-100">
              {benchmark.genAiHeadcountPct}%
            </span>
            <span className="text-xs text-emerald-400 font-mono">of Tech Staff</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Full-time engineers, MLOps, and prompt architects dedicated to AI initiatives.
          </p>
        </div>

        {/* Metric 4: Governance Maturity */}
        <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2">
          <span className="text-[10px] text-slate-400 uppercase font-mono block">
            Governance Score
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-serif text-slate-100">
              {benchmark.governanceMaturityScore}
            </span>
            <span className="text-xs text-amber-400 font-mono">/ 100 Index</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Readiness for regulatory compliance (EU AI Act, SEC, and data sovereignty).
          </p>
        </div>
      </div>

      {/* Interactive "Where Your Enterprise Stands" Benchmark Simulator */}
      <div className="p-5 sm:p-6 bg-gradient-to-br from-slate-900 via-slate-900/80 to-amber-950/20 border border-slate-800 rounded-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 mb-0.5">
              <Sliders className="w-3.5 h-3.5 text-amber-400" />
              <span>Interactive Benchmarking Positioner</span>
            </div>
            <h3 className="text-base font-semibold text-slate-100">
              Simulate Your Firm’s Position vs. {selectedIndustry} Cohort
            </h3>
          </div>

          <div className="px-3.5 py-1.5 bg-slate-800/80 border border-slate-700/80 rounded-md text-xs font-mono">
            <span>Calculated Rank: </span>
            <span className="text-amber-400 font-bold">{percentile}th Percentile</span>
            <span className="text-slate-400 ml-1">
              ({percentile >= 75 ? 'Top Quartile' : percentile >= 50 ? 'Median Cohort' : 'Trailing Peers'})
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Slider 1: AI Budget */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-medium">Your AI Budget as % of IT:</span>
              <span className="font-mono text-amber-400 font-bold">{userAiBudget}%</span>
            </div>
            <input
              type="range"
              min="2"
              max="35"
              step="0.5"
              value={userAiBudget}
              onChange={(e) => setUserAiBudget(parseFloat(e.target.value))}
              className="w-full accent-amber-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>Conservative (2%)</span>
              <span className="text-slate-300">Cohort Median: {benchmark.aiBudgetPctIT}%</span>
              <span>Aggressive (35%)</span>
            </div>
          </div>

          {/* Slider 2: Months to Production */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-medium">Your Avg Time to Production (Months):</span>
              <span className="font-mono text-sky-400 font-bold">{userMonthsToProd} Months</span>
            </div>
            <input
              type="range"
              min="2"
              max="18"
              step="0.5"
              value={userMonthsToProd}
              onChange={(e) => setUserMonthsToProd(parseFloat(e.target.value))}
              className="w-full accent-sky-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>Rapid (2 Mos)</span>
              <span className="text-slate-300">Cohort Median: {benchmark.avgMonthsToProduction} Mos</span>
              <span>Deliberate (18 Mos)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Model Strategy Distribution & Key Priorities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Model Strategy Mix */}
        <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-400" />
              <span>Model Architecture Split in {selectedIndustry}</span>
            </h4>
          </div>

          <div className="space-y-3 pt-1">
            {/* Commercial APIs */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">Commercial Frontier APIs (Google, OpenAI, Anthropic)</span>
                <span className="font-mono text-amber-400 font-medium">{benchmark.modelStrategy.commercialApi}%</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-400 rounded-full"
                  style={{ width: `${benchmark.modelStrategy.commercialApi}%` }}
                />
              </div>
            </div>

            {/* Open Weight Private */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">Private Cloud Open-Weight (Llama 3, Mistral)</span>
                <span className="font-mono text-sky-400 font-medium">{benchmark.modelStrategy.openWeightPrivate}%</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-sky-400 rounded-full"
                  style={{ width: `${benchmark.modelStrategy.openWeightPrivate}%` }}
                />
              </div>
            </div>

            {/* Bespoke Training */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">Bespoke Custom Foundation Pre-training</span>
                <span className="font-mono text-emerald-400 font-medium">{benchmark.modelStrategy.customBespoke}%</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-400 rounded-full"
                  style={{ width: `${benchmark.modelStrategy.customBespoke}%` }}
                />
              </div>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 italic pt-1">
            Industry consensus shows high-margin enterprises gravitate toward hybrid architectures: Commercial APIs for general reasoning + Private open weights for proprietary PII data.
          </p>
        </div>

        {/* Strategic Priorities */}
        <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl space-y-4 flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-semibold text-slate-100 flex items-center gap-2 mb-3">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Current Boardroom Priorities for {selectedIndustry}</span>
            </h4>
            <div className="space-y-2">
              {benchmark.keyPriorities.map((pri, idx) => (
                <div
                  key={idx}
                  className="p-2.5 bg-slate-950/60 border border-slate-800/80 rounded-lg text-xs text-slate-300 flex items-start gap-2"
                >
                  <span className="font-mono text-amber-400 shrink-0">0{idx + 1}.</span>
                  <span>{pri}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800/80">
            <button
              onClick={() => onAskMentorAboutBenchmark(selectedIndustry)}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-medium rounded-md transition-colors flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Consult AI Advisor on {selectedIndustry} Benchmarks</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
