import { ExecutiveBadge } from '../types';

export interface LeadershipArchetypeInfo {
  id: string;
  name: string;
  subtitle: string;
  coreStrength: string;
  blindspotToWatch: string;
  boardroomStyle: string;
  recommendedFocus: string;
}

export const LEADERSHIP_ARCHETYPES: Record<string, LeadershipArchetypeInfo> = {
  orchestrator: {
    id: 'orchestrator',
    name: 'The Strategic Orchestrator',
    subtitle: 'Enterprise Systems, Capital Velocity & Cross-Unit Alignment',
    coreStrength: 'Exceptional at connecting technical AI breakthroughs to board-level EBITDA expansion and organizing cross-functional steering councils.',
    blindspotToWatch: 'Risk of over-planning governance frameworks before putting live agentic prototypes into frontline employee hands.',
    boardroomStyle: 'Presents clear trade-off matrices, CapEx vs OpEx models, and quantitative milestone roadmaps.',
    recommendedFocus: 'Accelerate your pilot-to-production pipeline by empowering decentralized business unit teams with pre-approved API sandboxes.',
  },
  vanguard: {
    id: 'vanguard',
    name: 'The Calculated Vanguard',
    subtitle: 'Competitive Advantage, Frontier Innovation & Bold Market Moves',
    coreStrength: 'Unrelenting focus on leapfrogging industry rivals through early adoption of agentic swarms and proprietary domain architectures.',
    blindspotToWatch: 'Can outpace corporate compliance protocols, occasionally creating friction with General Counsel and CISO.',
    boardroomStyle: 'Visionary, data-grounded, emphasizing the cost of inaction and market share loss to competitors.',
    recommendedFocus: 'Pair with your Chief Risk Officer early to design automated algorithmic guardrails rather than viewing governance as an impediment.',
  },
  scaler: {
    id: 'scaler',
    name: 'The Pragmatic Scaler',
    subtitle: 'Unit Economics, Workflow Redesign & Cultural Fluency',
    coreStrength: 'Laser-focused on bottom-line unit economics, Cost-per-Successful-Outcome (CPSO), and eliminating middle-management friction.',
    blindspotToWatch: 'May dismiss high-potential frontier capabilities too early if immediate 90-day payback is not mathematically obvious.',
    boardroomStyle: 'Pragmatic, metrics-obsessed, champions frontline employee enablement and measurable cycle-time compression.',
    recommendedFocus: 'Carve out a dedicated 10% innovation reserve for experimental multi-agent architectures that may yield non-linear returns.',
  },
  sentinel: {
    id: 'sentinel',
    name: 'The Governance Sentinel',
    subtitle: 'Fiduciary Duty, EU AI Act Compliance & Sovereign Data Moats',
    coreStrength: 'Ironclad protection of enterprise intellectual property, regulatory compliance, algorithm auditability, and shareholder trust.',
    blindspotToWatch: 'Can inadvertently create "pilot paralysis" if approval requirements become overly onerous.',
    boardroomStyle: 'Authoritative on regulatory risk, risk mitigation matrices, and long-term shareholder brand protection.',
    recommendedFocus: 'Transition from manual committee sign-offs to automated, programmatic model registries and CI/CD bias testing pipelines.',
  },
};

export const ALL_BADGES: ExecutiveBadge[] = [
  {
    id: 'badge-fiduciary',
    name: 'Fiduciary Steward',
    description: 'Mastered GenAI unit economics and defended shareholder capital against runaway inference OpEx.',
    icon: 'ShieldCheck',
    category: 'Capital',
  },
  {
    id: 'badge-agentic',
    name: 'Agentic Pioneer',
    description: 'Architected autonomous multi-agent workflows with human-in-the-loop exception gates.',
    icon: 'Cpu',
    category: 'Architecture',
  },
  {
    id: 'badge-sovereign',
    name: 'Sovereign Data Moat',
    description: 'Negotiated zero-retention vendor terms and defended proprietary enterprise IP against commoditization.',
    icon: 'Lock',
    category: 'Strategy',
  },
  {
    id: 'badge-compliance',
    name: 'Boardroom Governance Fellow',
    description: 'Designed EU AI Act compliant model registries and bias mitigation frameworks.',
    icon: 'Award',
    category: 'Governance',
  },
  {
    id: 'badge-matrix',
    name: 'Capital Allocator',
    description: 'Expertly resolved the Build vs Buy vs Fine-tune dilemma with maximum capital velocity.',
    icon: 'TrendingUp',
    category: 'Capital',
  },
  {
    id: 'badge-culture',
    name: 'Culture Catalyst',
    description: 'Eliminated shadow AI through sanctioned enterprise sandboxes and high-agency reskilling.',
    icon: 'Users',
    category: 'Strategy',
  },
];
