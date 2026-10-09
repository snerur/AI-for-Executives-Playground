import { MaturityAssessmentResult, MaturityDimensionScore, RoadmapPrioritizedStep } from '../types';

export interface AssessmentQuestion {
  id: string;
  pillar: 'Strategy & Capital' | 'Data & Architecture' | 'Organization & Talent' | 'Governance & Risk' | 'Execution Velocity';
  question: string;
  executiveContext: string;
  options: {
    text: string;
    score: number; // 1 to 5
    rationale: string;
  }[];
}

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  // Pillar 1: Strategy & Capital
  {
    id: 'mat-strat-1',
    pillar: 'Strategy & Capital',
    question: 'How is your enterprise AI strategy funded and prioritized at the executive leadership level?',
    executiveContext: 'Evaluates whether AI is treated as an opportunistic IT cost center or a top-level board growth imperative.',
    options: [
      {
        text: 'Ad-hoc departmental budgets; individual managers experiment with credit card subscriptions.',
        score: 1,
        rationale: 'Level 1: Fragmented, uncoordinated spending with zero top-down alignment.',
      },
      {
        text: 'A designated innovation budget for small proof-of-concept (POC) pilots, but no board-level mandate.',
        score: 2,
        rationale: 'Level 2: Exploratory phase; high risk of getting trapped in POC purgatory.',
      },
      {
        text: 'Centralized AI capital allocation managed by CIO/CTO with measurable expected ROI metrics.',
        score: 3,
        rationale: 'Level 3: Structured corporate investment with clear operational accountability.',
      },
      {
        text: 'CEO and Board-sponsored multi-year transformation program with dedicated P&L value targets.',
        score: 4,
        rationale: 'Level 4: Core strategic alignment where AI investments directly impact business unit margins.',
      },
      {
        text: 'AI is the core engine of our business model; capital is dynamically reallocated to autonomous workflows.',
        score: 5,
        rationale: 'Level 5: Frontier enterprise; algorithmic advantage drives competitive moat.',
      },
    ],
  },
  {
    id: 'mat-strat-2',
    pillar: 'Strategy & Capital',
    question: 'How do you evaluate and track Return on Investment (ROI) for GenAI initiatives?',
    executiveContext: 'Distinguishes vanity metrics (e.g. prompt counts) from hard economic outcomes (EBITDA margin expansion, cycle-time compression).',
    options: [
      {
        text: 'No formal ROI tracking; projects are judged by employee novelty and enthusiasm.',
        score: 1,
        rationale: 'Level 1: Absence of fiduciary discipline leads to unchecked software waste.',
      },
      {
        text: 'Track usage metrics such as active licenses and total tokens consumed.',
        score: 2,
        rationale: 'Level 2: Measures vanity activity rather than true economic return.',
      },
      {
        text: 'Measure hours saved and estimated theoretical productivity improvements per department.',
        score: 3,
        rationale: 'Level 3: Identifies labor leverage, but may not translate to bottom-line cash flow.',
      },
      {
        text: 'Track fully loaded Cost-per-Successful-Outcome (CPSO) and gross margin expansion against baselines.',
        score: 4,
        rationale: 'Level 4: Rigorous executive economics connecting unit costs to revenue realization.',
      },
      {
        text: 'Real-time telemetry measuring revenue uplift, autonomous throughput, and dynamic market share gains.',
        score: 5,
        rationale: 'Level 5: Continuous algorithmic P&L optimization.',
      },
    ],
  },

  // Pillar 2: Data & Architecture
  {
    id: 'mat-data-1',
    pillar: 'Data & Architecture',
    question: 'What is the current posture of your enterprise data architecture and proprietary IP assets?',
    executiveContext: 'Determines whether your data is clean and accessible enough to power RAG and multi-agent execution.',
    options: [
      {
        text: 'Data is trapped in siloed legacy on-premise databases, spreadsheets, and fragmented file shares.',
        score: 1,
        rationale: 'Level 1: High ingestion friction prevents meaningful enterprise-wide AI applications.',
      },
      {
        text: 'Cloud migration is in progress, but unstructured data (PDFs, call logs, contracts) is unindexed.',
        score: 2,
        rationale: 'Level 2: Cloud storage exists, but lack of semantic indexing prevents contextual retrieval.',
      },
      {
        text: 'Unified data lakehouse with standardized APIs and basic vector database embeddings for key documents.',
        score: 3,
        rationale: 'Level 3: Solid foundation for domain-specific RAG copilots.',
      },
      {
        text: 'Real-time streaming pipelines, semantic vector caching, and automated metadata cataloging across all units.',
        score: 4,
        rationale: 'Level 4: Advanced enterprise data fabric capable of high-throughput agentic reasoning.',
      },
      {
        text: 'Autonomous self-healing data pipelines with sovereign air-gapped clusters and closed-loop reinforcement learning.',
        score: 5,
        rationale: 'Level 5: World-class sovereign data moat impossible for competitors to duplicate.',
      },
    ],
  },
  {
    id: 'mat-data-2',
    pillar: 'Data & Architecture',
    question: 'How do you manage model selection and infrastructure vendor lock-in?',
    executiveContext: 'Assesses whether the enterprise is vulnerable to hyperscaler price hikes or technological obsolescence.',
    options: [
      {
        text: 'Single consumer portal subscription or single commercial vendor dependency with zero abstraction.',
        score: 1,
        rationale: 'Level 1: Total vendor lock-in and high vulnerability to price changes.',
      },
      {
        text: 'Direct hardcoded API integrations tied to one specific cloud provider foundation model.',
        score: 2,
        rationale: 'Level 2: Moderate lock-in; code changes required to adopt new models.',
      },
      {
        text: 'Standardized model gateway abstraction allowing manual switching between 2-3 leading LLM providers.',
        score: 3,
        rationale: 'Level 3: Pragmatic decoupling; maintains negotiating leverage with vendors.',
      },
      {
        text: 'Automated model cascading router that dynamically picks the most cost-effective model per task complexity.',
        score: 4,
        rationale: 'Level 4: Sophisticated routing saving 40-60% on inference OpEx.',
      },
      {
        text: 'Hybrid architecture combining sovereign private-cloud open weights for core IP with frontier APIs for edge reasoning.',
        score: 5,
        rationale: 'Level 5: Maximum resilience, cost optimization, and sovereign security.',
      },
    ],
  },

  // Pillar 3: Organization & Talent
  {
    id: 'mat-org-1',
    pillar: 'Organization & Talent',
    question: 'What is the level of AI fluency and cultural adoption across non-technical management?',
    executiveContext: 'Identifies whether middle management acts as an innovation catalyst or a defensive roadblock.',
    options: [
      {
        text: 'AI is viewed with skepticism or fear of replacement; zero formal training offered to staff.',
        score: 1,
        rationale: 'Level 1: High organizational resistance and defensive pushback.',
      },
      {
        text: 'Voluntary lunch-and-learn webinars attended mainly by early adopters; no structured upskilling.',
        score: 2,
        rationale: 'Level 2: Fragmented interest without systemic behavioral shift.',
      },
      {
        text: 'Mandatory role-based AI literacy programs for all managers; approved enterprise tool sandboxes.',
        score: 3,
        rationale: 'Level 3: Broad baseline competence established across the organization.',
      },
      {
        text: 'Executive and managerial performance reviews reward process automation and cycle-time reduction.',
        score: 4,
        rationale: 'Level 4: Incentives aligned with algorithmic transformation; high-agency culture.',
      },
      {
        text: 'Centaur/Cyborg workforce where every employee designs, monitors, and collaborates with autonomous AI agents.',
        score: 5,
        rationale: 'Level 5: Ubiquitous high-velocity organizational culture.',
      },
    ],
  },

  // Pillar 4: Governance & Risk
  {
    id: 'mat-gov-1',
    pillar: 'Governance & Risk',
    question: 'How does your firm oversee AI compliance, data privacy, and boardroom risk?',
    executiveContext: 'Critical for preventing regulatory fines (EU AI Act, SEC) and reputational brand disasters.',
    options: [
      {
        text: 'No formal governance; teams deploy tools without legal, compliance, or security review.',
        score: 1,
        rationale: 'Level 1: Critical fiduciary exposure and imminent compliance breach risk.',
      },
      {
        text: 'Legal simply prohibits or restricts AI tools outright to avoid having to regulate them.',
        score: 2,
        rationale: 'Level 2: Creates massive shadow AI as employees bypass blocks on personal devices.',
      },
      {
        text: 'Cross-functional AI review committee evaluates high-risk use cases on a case-by-case basis.',
        score: 3,
        rationale: 'Level 3: Sound defensive posture, though review queues can slow deployment velocity.',
      },
      {
        text: 'Central Enterprise Model Registry with automated bias red-teaming and continuous audit logging.',
        score: 4,
        rationale: 'Level 4: Proactive compliance architecture meeting EU AI Act and global standards.',
      },
      {
        text: 'Continuous automated guardrails, cryptographic prompt watermarking, and dynamic risk kill-switches.',
        score: 5,
        rationale: 'Level 5: Boardroom-level assurance with zero operational friction.',
      },
    ],
  },

  // Pillar 5: Execution Velocity
  {
    id: 'mat-exec-1',
    pillar: 'Execution Velocity',
    question: 'What is the average timeline from an approved AI concept to production deployment?',
    executiveContext: 'Assesses whether the organization can capitalize on fast-moving technological breakthroughs.',
    options: [
      {
        text: 'Greater than 12 months; concepts get delayed by governance committees and architectural reviews.',
        score: 1,
        rationale: 'Level 1: Slow velocity renders solutions obsolete before they reach end users.',
      },
      {
        text: '6 to 9 months; multiple manual handoffs between business units, IT, and external consultants.',
        score: 2,
        rationale: 'Level 2: Moderate enterprise cycle time; high cost per pilot.',
      },
      {
        text: '3 to 6 months; standardized sandbox environments enable predictable testing and roll-outs.',
        score: 3,
        rationale: 'Level 3: Solid operational tempo matching industry averages.',
      },
      {
        text: '4 to 8 weeks; modular microservices, pre-approved data pipes, and reusable agent templates.',
        score: 4,
        rationale: 'Level 4: Agile enterprise execution delivering rapid market advantage.',
      },
      {
        text: 'Under 14 days; continuous automated evaluation and self-serve deployment pipelines.',
        score: 5,
        rationale: 'Level 5: Frontier velocity with instant feedback loop iteration.',
      },
    ],
  },
];

export function calculateMaturityAssessment(answers: Record<string, number>): MaturityAssessmentResult {
  const pillarScores: Record<string, { total: number; count: number }> = {
    'Strategy & Capital': { total: 0, count: 0 },
    'Data & Architecture': { total: 0, count: 0 },
    'Organization & Talent': { total: 0, count: 0 },
    'Governance & Risk': { total: 0, count: 0 },
    'Execution Velocity': { total: 0, count: 0 },
  };

  for (const q of ASSESSMENT_QUESTIONS) {
    const score = answers[q.id] || 2;
    pillarScores[q.pillar].total += score;
    pillarScores[q.pillar].count += 1;
  }

  const dimensionScores: MaturityDimensionScore[] = Object.entries(pillarScores).map(([pillar, data]) => {
    const avg = Math.round((data.total / (data.count || 1)) * 10) / 10;
    let description = '';
    const strengths: string[] = [];
    const criticalGaps: string[] = [];
    let priorityAction = '';

    if (avg >= 4.0) {
      description = 'Frontier Leader: Exceptional institutional maturity and competitive advantage.';
      strengths.push('High-agency alignment', 'Clear unit economics', 'Automated governance');
      priorityAction = 'Scale autonomous agent swarms and commercialize proprietary internal AI tools.';
    } else if (avg >= 3.0) {
      description = 'Systematic Scaler: Well-structured processes, transitioning from pilots to core value.';
      strengths.push('Centralized governance', 'Active pilot portfolio', 'Executive awareness');
      criticalGaps.push('Inference OpEx scaling friction', 'Need for faster cross-unit deployment');
      priorityAction = 'Implement model routing planes and formalize cost-per-outcome accounting.';
    } else if (avg >= 2.0) {
      description = 'Exploratory Adopter: Active grassroots interest, but siloed and vulnerable to stagnation.';
      strengths.push('Early adopter momentum', 'Proof-of-concept familiarity');
      criticalGaps.push('Shadow AI leakage risk', 'Lack of board-level KPI mandate', 'Data silos');
      priorityAction = 'Establish a cross-functional AI Steering Council and deploy a compliant enterprise sandbox.';
    } else {
      description = 'AI Novice / Nascent: Ad-hoc experimentation with high fiduciary risk.';
      criticalGaps.push('Complete absence of governance', 'Untracked capital expenditure', 'Vulnerability to rival disruption');
      priorityAction = 'Conduct immediate enterprise data audit and establish baseline AI acceptable-use policy.';
    }

    return {
      pillar: pillar as any,
      score: avg,
      description,
      strengths,
      criticalGaps,
      priorityAction,
    };
  });

  const overallAvg = dimensionScores.reduce((acc, d) => acc + d.score, 0) / dimensionScores.length;
  const roundedLevel = Math.max(1, Math.min(5, Math.round(overallAvg)));

  const levelNames: Record<number, string> = {
    1: 'Stage 1: Nascent Explorer',
    2: 'Stage 2: Tactical Adopter',
    3: 'Stage 3: Systematic Scaler',
    4: 'Stage 4: Strategic Orchestrator',
    5: 'Stage 5: Autonomous Frontier Enterprise',
  };

  const levelSummaries: Record<number, string> = {
    1: 'Your enterprise is in the foundational stage. Immediate priority is halting shadow AI risks, setting clear acceptable-use policies, and identifying 2 high-leverage workflows with verifiable payback.',
    2: 'Your organization possesses active interest but suffers from pilot fragmentation. Focus on breaking data silos, implementing model abstraction to prevent vendor lock-in, and establishing formal ROI measurement.',
    3: 'Your firm operates with sound discipline. Transition now from departmental copilots to multi-agent workflow execution, implement intelligent model cascading to slash inference OpEx, and automate governance audit trails.',
    4: 'Your enterprise is outperforming 85% of industry peers. Double down on proprietary data moats, capture expert human feedback to fine-tune specialized models, and scale autonomous cross-system orchestration.',
    5: 'Frontier leadership status. Your core competitive advantage is algorithmically defended. Focus on sovereign model infrastructure, zero-friction edge execution, and exploring new AI-native business lines.',
  };

  // Generate dynamic 90/180/365-day roadmap based on scores
  const roadmap = {
    day90: [
      'Charter the cross-functional AI Steering Committee (CIO, CFO, General Counsel, CISO).',
      'Deploy an enterprise-secured, single-sign-on AI workspace to eliminate shadow AI vulnerabilities.',
      'Audit the top 5 operational workflows across core business units for immediate agentic automation suitability.',
      'Establish strict vendor zero-data-retention clauses across all commercial LLM contracts.',
    ],
    day180: [
      'Implement an intelligent model cascading router to cut recurring API inference expenses by 50%+.',
      'Launch production pilot of your first domain-specific RAG system backed by curated enterprise vector stores.',
      'Mandate role-based AI enablement training for 100% of people managers with cycle-time reduction targets.',
      'Conduct an end-to-end algorithmic bias and EU AI Act readiness audit on all customer-facing systems.',
    ],
    day365: [
      'Deploy autonomous multi-agent task orchestrators across ERP and CRM systems with deterministic human-in-the-loop gates.',
      'Establish an internal proprietary feedback data loop capturing human expert corrections to train proprietary domain models.',
      'Deliver verified 15-25% gross margin expansion on targeted transformed business units to the Board of Directors.',
      'Evaluate sovereign private-cloud hosting for core proprietary intellectual property to guarantee absolute data sovereignty.',
    ],
  };

  // Generate dynamic prioritized steps with executive resources based on maturity level
  const prioritizedSteps: RoadmapPrioritizedStep[] = [
    {
      id: 'step-charter',
      phase: '90-Day Foundation',
      priority: 'Critical P0',
      pillar: 'Strategy & Capital',
      title: 'Charter the C-Suite AI Steering Committee & Fiduciary Bounds',
      description: 'Establish a unified governance body comprising the CEO, CFO, CIO/CTO, and General Counsel to prioritize AI use cases, approve capital allocations exceeding $250k, and enforce hard ROI hurdle rates.',
      fiduciaryRationale: 'Prevents fragmented shadow budgeting across business units and establishes audit committee accountability.',
      deliverables: [
        'Formal committee charter with voting rights and risk escalation procedures',
        'Tiered project approval thresholds based on financial materiality and regulatory exposure',
        'Mandatory 90-day value realization review schedule for all active pilots',
      ],
      resources: [
        {
          title: 'C-Suite AI Steering Committee Charter & Governance Bylaws',
          type: 'Executive Blueprint',
          summary: 'Complete executive charter template defining membership, quorum requirements, veto authorities, and risk escalation triggers.',
          actionableFormat: 'Board Governance Template (DOCX / PDF)',
        },
        {
          title: 'GenAI Capital Allocation & Hurdle Rate Model',
          type: 'Financial Model',
          summary: 'Financial workbook for stress-testing pilot ROI, token amortization, and cost-per-successful-outcome (CPSO).',
          actionableFormat: 'Executive Financial Model (XLSX)',
        },
      ],
    },
    {
      id: 'step-shadow-ai',
      phase: '90-Day Foundation',
      priority: 'Critical P0',
      pillar: 'Governance & Risk',
      title: 'Deploy Enterprise-Sanctioned Workspace & Eradicate Shadow AI',
      description: 'Implement a secure, single-sign-on enterprise generative AI workspace with contractual zero-data-retention guarantees to provide employees with approved productivity tooling.',
      fiduciaryRationale: 'Eliminates confidential data leakage to consumer AI accounts and insulates the firm against SEC and trade-secret litigation.',
      deliverables: [
        'Single-sign-on (SSO) authenticated portal rolled out to top 5 knowledge worker divisions',
        'Commercial vendor agreements audited for explicit zero-retention and non-training terms',
        'Mandatory 20-minute safe prompting and data classification executive briefing',
      ],
      resources: [
        {
          title: 'Enterprise AI Vendor Zero-Retention Addendum & Negotiation Guide',
          type: 'Governance Checklist',
          summary: 'Standard legal contract rider ensuring enterprise prompt data and outputs are strictly prohibited from foundational model retraining.',
          actionableFormat: 'Legal Rider & Term Sheet (PDF / DOCX)',
        },
        {
          title: 'Corporate AI Acceptable-Use Policy & Data Classification Matrix',
          type: 'Audit Toolkit',
          summary: 'Clear tiering guide for employees defining public, internal, confidential, and restricted data handling in generative tools.',
          actionableFormat: 'Policy Brief & Employee One-Pager',
        },
      ],
    },
    {
      id: 'step-data-fabric',
      phase: '90-Day Foundation',
      priority: 'High P1',
      pillar: 'Data & Architecture',
      title: 'Audit Proprietary Data Assets & Establish Secure Vector Pipeline',
      description: 'Identify the top 3 high-value unstructured data repositories (e.g. service contracts, claims history, engineering manuals) and build secure embedding pipelines for contextual retrieval.',
      fiduciaryRationale: 'Establishes the proprietary data moat that differentiates your firm from competitors relying on generic public models.',
      deliverables: [
        'Enterprise data asset catalog indexing high-gravity operational stores',
        'Sanitized vector embedding pipeline with role-based document access controls',
        'Metadata indexing standard ensuring full provenance of all retrieved facts',
      ],
      resources: [
        {
          title: 'Enterprise RAG Architecture & Vector Store Selection Blueprint',
          type: 'Architecture Guide',
          summary: 'Comparative guide evaluating Pinecone, Qdrant, pgvector, and cloud-native solutions for hybrid semantic and keyword search.',
          actionableFormat: 'Technical Architecture Guide (PDF)',
        },
        {
          title: 'Data Hygiene & PII Redaction Pipeline Specification',
          type: 'Audit Toolkit',
          summary: 'Automated data scrubbing workflow for stripping social security numbers, banking details, and healthcare data prior to embedding.',
          actionableFormat: 'Technical Pipeline Spec & Checklist',
        },
      ],
    },
    {
      id: 'step-model-router',
      phase: '180-Day Scaling',
      priority: 'Critical P0',
      pillar: 'Data & Architecture',
      title: 'Implement Model Cascading Router & Semantic Query Caching',
      description: 'Deploy an intelligent routing layer that funnels routine queries to cost-effective small models (SLMs) while reserving frontier models strictly for high-ambiguity reasoning, backed by semantic caching.',
      fiduciaryRationale: 'Reduces annualized inference operational expenditure (OpEx) by 50-65% while maintaining sub-second latency.',
      deliverables: [
        'Production model routing proxy supporting Google Vertex, Anthropic, and open-weight models',
        'Semantic cache layer storing frequent enterprise Q&A pairs with 95%+ similarity threshold',
        'Real-time token cost and latency telemetry dashboard for IT and finance operations',
      ],
      resources: [
        {
          title: 'Inference Cost Optimization & Model Cascading Reference Architecture',
          type: 'Architecture Guide',
          summary: 'Production-ready architecture for routing user queries based on perplexity and complexity scores.',
          actionableFormat: 'Engineering Reference Blueprint (PDF)',
        },
        {
          title: 'Token OpEx Forecasting & Dynamic Budgeting Template',
          type: 'Financial Model',
          summary: 'Dynamic model calculating cost trajectory across 1k, 10k, and 100k active enterprise users.',
          actionableFormat: 'Financial Forecast Model (XLSX)',
        },
      ],
    },
    {
      id: 'step-talent-enablement',
      phase: '180-Day Scaling',
      priority: 'High P1',
      pillar: 'Organization & Talent',
      title: 'Scale Role-Based Enablement & Managerial Automation Incentives',
      description: 'Transition from passive awareness training to hands-on workflow re-engineering sprints. Align managerial quarterly bonuses with cycle-time reduction and autonomous throughput.',
      fiduciaryRationale: 'Overcomes middle-management resistance and builds high-agency organizational momentum.',
      deliverables: [
        'Departmental workflow redesign clinics for Finance, Legal, HR, and Operations leads',
        'Managerial KPI framework incorporating verified cycle-time compression',
        'Internal Innovation Showcase recognizing high-impact employee automations',
      ],
      resources: [
        {
          title: 'The AI Centaur Workforce Playbook: Designing Human-AI Division of Labor',
          type: 'Executive Blueprint',
          summary: 'Executive framework for identifying tasks best suited for full automation vs. collaborative human-in-the-loop oversight.',
          actionableFormat: 'Strategic Implementation Guide (PDF)',
        },
        {
          title: 'Managerial Performance Review & AI Incentive Alignment Kit',
          type: 'Governance Checklist',
          summary: 'Sample evaluation criteria, OKR templates, and compensation incentive formulas for digital transformation.',
          actionableFormat: 'HR & Executive Compensation Template',
        },
      ],
    },
    {
      id: 'step-eu-ai-compliance',
      phase: '180-Day Scaling',
      priority: 'High P1',
      pillar: 'Governance & Risk',
      title: 'Institutionalize Continuous Algorithmic Red-Teaming & EU AI Act Readiness',
      description: 'Establish a living Enterprise Model Registry tracking prompt versions, bias metrics, and human override logs for all high-risk automated decision systems.',
      fiduciaryRationale: 'Insulates the Board from non-compliance fines up to €35M / 7% global turnover and safeguards brand reputation.',
      deliverables: [
        'Central Enterprise Model Registry cataloging 100% of internal models and vendor integrations',
        'Automated red-teaming protocols testing jailbreaks, data leakage, and discriminatory bias',
        'Audit-ready technical documentation dossiers satisfying EU AI Act Chapter 2 requirements',
      ],
      resources: [
        {
          title: 'EU AI Act High-Risk System Technical Documentation Dossier',
          type: 'Audit Toolkit',
          summary: 'Comprehensive compliance workbook covering risk management, data governance, record-keeping, and human oversight.',
          actionableFormat: 'Regulatory Compliance Binder (DOCX / PDF)',
        },
        {
          title: 'Adversarial Red-Teaming & Prompt Injection Testing Suite',
          type: 'Audit Toolkit',
          summary: 'Standardized test battery for evaluating model resistance to adversarial attacks, extraction, and hallucination.',
          actionableFormat: 'Security Audit Checklist & Testing Matrix',
        },
      ],
    },
    {
      id: 'step-agentic-swarms',
      phase: '365-Day Frontier',
      priority: 'Strategic P2',
      pillar: 'Execution Velocity',
      title: 'Deploy Multi-Agent Task Orchestrators with Deterministic Gates',
      description: 'Advance from passive conversational copilots to autonomous multi-agent task executors bridging ERP, CRM, and supply chain systems with cryptographic human sign-offs on irreversible actions.',
      fiduciaryRationale: 'Drives non-linear EBITDA expansion by compressing multi-day operational workflows into minutes.',
      deliverables: [
        'Autonomous multi-agent procurement and inventory reconciliation swarm in production',
        'Cryptographic dual-authorization signature gates for financial transactions > $50,000',
        'Continuous agent reflection and verification monitors preventing cascading errors',
      ],
      resources: [
        {
          title: 'Multi-Agent Enterprise Orchestration & Reversible Action Architecture',
          type: 'Architecture Guide',
          summary: 'Architecture pattern separating reversible read/draft states from irreversible write/execute states in core systems.',
          actionableFormat: 'Systems Design Blueprint (PDF)',
        },
        {
          title: 'Autonomous Systems Exception Handling & Kill-Switch Runbook',
          type: 'Governance Checklist',
          summary: 'Incident response protocol and automated circuit breakers for runaway agentic task loops.',
          actionableFormat: 'Operational Incident Runbook',
        },
      ],
    },
    {
      id: 'step-sovereign-moat',
      phase: '365-Day Frontier',
      priority: 'Strategic P2',
      pillar: 'Strategy & Capital',
      title: 'Establish Sovereign Model Hosting for Core Intellectual Property',
      description: 'Evaluate deploying quantized, open-weight models (e.g. Llama 3 70B) in private air-gapped clusters for sensitive proprietary operations, combining sovereign data defense with zero external API fees.',
      fiduciaryRationale: 'Protects critical competitive advantages from cloud counterparty risks and locks in long-term cost sovereignty.',
      deliverables: [
        'TCO analysis comparing hyperscaler API scaling vs. private cloud edge GPU appliances',
        'Pilot deployment of private sovereign cluster for highest-sensitivity IP workflows',
        'Feedback data engine continuously fine-tuning open weights on proprietary human corrections',
      ],
      resources: [
        {
          title: 'Sovereign AI Infrastructure: Private Cloud vs. Hyperscaler TCO Analysis',
          type: 'Financial Model',
          summary: 'Detailed financial modeling evaluating private GPU clusters vs. cloud APIs across 1M to 500M monthly tokens.',
          actionableFormat: 'Executive TCO Spreadsheet (XLSX)',
        },
        {
          title: 'Proprietary Fine-Tuning & Reinforcement Learning from Human Feedback (RLHF) Playbook',
          type: 'Architecture Guide',
          summary: 'Methodology for collecting employee expert corrections to systematically train defensible enterprise models.',
          actionableFormat: 'MLOps Strategy Guide (PDF)',
        },
      ],
    },
  ];

  return {
    overallLevel: roundedLevel,
    overallLevelName: levelNames[roundedLevel],
    executiveSummary: levelSummaries[roundedLevel],
    dimensionScores,
    roadmap,
    prioritizedSteps,
  };
}
