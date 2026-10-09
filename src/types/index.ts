export type ExecutiveRank = 
  | 'Senior Director'
  | 'VP of Strategic Innovation'
  | 'SVP Enterprise Systems'
  | 'EVP & Chief AI Strategist'
  | 'Board Technology Fellow';

export interface ExecutiveBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'Strategy' | 'Governance' | 'Architecture' | 'Capital';
  unlockedAt?: string;
}

export interface UserExecutiveProfile {
  name: string;
  nickname?: string;
  title: string;
  company: string;
  industry: string;
  xp: number;
  streakDays: number;
  completedModuleIds: string[];
  bookmarkedCaseStudyIds: string[];
  offlineCaseStudyIds: string[];
  offlineSummaryIds: string[];
  unlockedBadgeIds: string[];
  leadershipArchetype?: string;
  lastActiveDate: string;
}

export interface BoardroomDilemmaOption {
  id: string;
  text: string;
  tradeoffAnalysis: string;
  impactMetrics: {
    roiImpact: string; // e.g. "+18%"
    riskExposure: 'Low' | 'Moderate' | 'High' | 'Critical';
    timeToValue: string; // e.g. "4 Months"
    boardConfidence: string; // e.g. "+20%", "-15%"
  };
  executiveVerdict: 'Optimal' | 'Viable with Risk' | 'Sub-optimal';
  rationale: string;
  xpReward: number;
}

export interface BoardroomDilemma {
  id: string;
  title: string;
  context: string;
  stakes: string;
  options: BoardroomDilemmaOption[];
}

export interface PrecisionQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LearningModule {
  id: string;
  title: string;
  subtitle: string;
  category: 'Economics & ROI' | 'Agentic Systems' | 'Governance & Legal' | 'Talent & Org' | 'Architecture & Moats' | 'Build vs Buy';
  readTimeMinutes: number;
  xpValue: number;
  executiveBrief: {
    coreThesis: string;
    strategicImperative: string;
    keyMentalModels: { title: string; explanation: string }[];
    boardTalkingPoints: string[];
  };
  dilemma: BoardroomDilemma;
  quiz: PrecisionQuestion[];
}

export interface CaseStudy {
  id: string;
  company: string;
  title: string;
  industry: string;
  headlineMetric: string;
  secondaryMetric: string;
  challenge: string;
  executiveSolution: string;
  technicalArchitecture: string;
  roiTimeline: string;
  pitfallsAvoided: string[];
  boardroomLessons: string[];
  isDownloadedOffline?: boolean;
}

export interface IndustryBenchmark {
  industry: string;
  aiBudgetPctIT: number; // e.g. 14%
  avgMonthsToProduction: number; // e.g. 7.5
  genAiHeadcountPct: number; // e.g. 8.2%
  modelStrategy: {
    commercialApi: number;
    openWeightPrivate: number;
    customBespoke: number;
  };
  roiRealizationTimelineMonths: number;
  governanceMaturityScore: number; // out of 100
  keyPriorities: string[];
}

export interface MaturityDimensionScore {
  pillar: 'Strategy & Capital' | 'Data & Architecture' | 'Organization & Talent' | 'Governance & Risk' | 'Execution Velocity';
  score: number; // 1 to 5
  description: string;
  strengths: string[];
  criticalGaps: string[];
  priorityAction: string;
}

export interface RoadmapResource {
  title: string;
  type: 'Executive Blueprint' | 'Governance Checklist' | 'Audit Toolkit' | 'Architecture Guide' | 'Financial Model';
  summary: string;
  actionableFormat: string; // e.g. "Board Memo Template (PDF/DOCX)", "Python Router Spec"
}

export interface RoadmapPrioritizedStep {
  id: string;
  phase: '90-Day Foundation' | '180-Day Scaling' | '365-Day Frontier';
  priority: 'Critical P0' | 'High P1' | 'Strategic P2';
  pillar: 'Strategy & Capital' | 'Data & Architecture' | 'Organization & Talent' | 'Governance & Risk' | 'Execution Velocity';
  title: string;
  description: string;
  fiduciaryRationale: string;
  deliverables: string[];
  resources: RoadmapResource[];
}

export interface MaturityAssessmentResult {
  overallLevel: number; // 1 to 5
  overallLevelName: string;
  executiveSummary: string;
  dimensionScores: MaturityDimensionScore[];
  roadmap: {
    day90: string[];
    day180: string[];
    day365: string[];
  };
  prioritizedSteps: RoadmapPrioritizedStep[];
}

export interface LeaderboardEntry {
  rank: number;
  id: string;
  name: string;
  nickname?: string;
  title: string;
  company: string;
  industry: string;
  xp: number;
  badgeCount: number;
  streakDays: number;
  archetype: string;
  isCurrentUser?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'mentor';
  text: string;
  timestamp: string;
  suggestedFollowUps?: string[];
  isSimulated?: boolean;
}
