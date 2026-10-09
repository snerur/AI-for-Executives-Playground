import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json());

// Initialize Gemini SDK with recommended telemetry header
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// AI-Powered Mentor Route for Real-Time Strategic Executive Q&A
app.post('/api/mentor', async (req, res) => {
  const { message, history = [], executiveRole = 'Chief Executive / Board Member', companyContext = '' } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required' });
  }

  const systemInstruction = `You are the Senior Executive AI Advisor & Boardroom Strategic Partner for C-suite leaders and Board Directors ("Aura CXO Advisor").
Your persona: Former Senior Partner at a premier strategy firm (McKinsey / BCG) and Fellow at Stanford HAI.
You communicate with supreme clarity, precision, and executive sophistication:
- You speak the language of capital allocation, fiduciary risk, enterprise architecture, operating margins, talent transition, and competitive moats.
- You do NOT offer generic textbook definitions. You provide sharp executive trade-off analyses, real-world precedent from global enterprises, and immediate boardroom talking points.
- Structure responses logically with clear sections:
  1. Executive Summary & Core Verdict
  2. Strategic Trade-offs & Capital Implications (CAPEX vs OPEX, TCO, Risk)
  3. Boardroom Action Plan & Governance Safeguards
- Tailor your perspective to the executive's role: ${executiveRole}. Company context: ${companyContext || 'Global Enterprise ($1B+ Revenue)'}.
- Keep tone poised, authoritative yet collaborative, insightful, and actionable. Avoid buzzwords without substance.`;

  try {
    if (ai) {
      // Build contents array with conversation history if present
      const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

      for (const item of history.slice(-6)) {
        if (item.sender === 'user') {
          contents.push({ role: 'user', parts: [{ text: item.text }] });
        } else if (item.sender === 'mentor') {
          contents.push({ role: 'model', parts: [{ text: item.text }] });
        }
      }

      contents.push({ role: 'user', parts: [{ text: message }] });

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction,
          temperature: 0.65,
        },
      });

      const replyText = response.text || 'I have evaluated your strategic prompt. Let us review the primary capital and governance vectors.';
      return res.json({ reply: replyText });
    } else {
      // High-caliber strategic simulation fallback when GEMINI_API_KEY is not configured
      const strategicReply = generateExecutiveSimulationFallback(message, executiveRole);
      return res.json({ reply: strategicReply, isSimulated: true });
    }
  } catch (error: any) {
    console.error('Gemini API Mentor Error:', error);
    // Graceful fallback to maintain executive uninterrupted flow
    const fallback = generateExecutiveSimulationFallback(message, executiveRole);
    return res.json({ reply: fallback, error: error?.message, isSimulated: true });
  }
});

function generateExecutiveSimulationFallback(query: string, role: string): string {
  const lower = query.toLowerCase();
  if (lower.includes('budget') || lower.includes('cost') || lower.includes('roi') || lower.includes('capex')) {
    return `### 1. Executive Verdict on AI Capital Allocation
For a global enterprise operating under standard fiduciary scrutiny, GenAI investments should be split into **70% core workflow optimization (measurable 6-9 month payback)**, **20% platform infrastructure & data moat modernization**, and **10% frontier innovation bets**.

### 2. Strategic Trade-offs & TCO Realities
* **Model Inference OpEx**: The hidden iceberg is not initial fine-tuning, but token consumption at scale. Unmonitored agentic loops can escalate operational expenditure by 300% without strict token budgets and caching layers.
* **Build vs. Buy Unit Economics**: Commercial frontier APIs offer speed-to-market; however, if your proprietary IP or high-frequency workflows exceed 50M tokens/month, self-hosting a quantized sovereign open-weight model (e.g., Llama 3 70B on private cluster) drops unit cost by 62%.

### 3. Immediate Boardroom Action Steps
1. Mandate a "Value Realization Audit" for all pilots at the 90-day mark; terminate any POC lacking a path to gross margin improvement.
2. Require dual approval (CFO + CDO) for generative deployments touching PII or regulated customer balance sheets.`;
  }

  if (lower.includes('governance') || lower.includes('risk') || lower.includes('legal') || lower.includes('eu ai')) {
    return `### 1. Boardroom Governance Posture
AI governance cannot be relegated to compliance afterthoughts; it is a primary fiduciary liability. Under current enterprise frameworks and the EU AI Act, high-risk systems require explicit human-in-the-loop audit logs and deterministic risk ceilings.

### 2. Critical Exposure Vectors
* **Autonomous Agent Runaway**: Agents granted API access to corporate databases or ERP systems must operate with least-privilege tokens and strict spend/write gates.
* **Copyright & Data Contamination**: Ensure enterprise vendor contracts include complete indemnification clauses guaranteeing zero data retention for foundational model training.

### 3. Immediate Boardroom Safeguards
1. Institute a cross-functional **AI Ethics & Assurance Council** (General Counsel, CISO, Head of AI, Business Unit Lead) meeting bi-weekly.
2. Maintain a live **Enterprise Model Registry** cataloging all proprietary prompt chains, third-party APIs, and shadow AI usage.`;
  }

  return `### 1. Strategic Framing & Executive Perspective
Addressing your inquiry from the lens of a **${role}**: The distinction between enterprises capturing transformative enterprise value and those caught in "POC purgatory" comes down to workflow redesign rather than marginal model selection.

### 2. Core Strategic Pillars
* **Data Moats over Model Weights**: Foundation models are rapidly commoditizing. The enduring proprietary advantage lies exclusively in your domain-specific clean data pipes, feedback telemetry, and integrated operational processes.
* **Agentic Orchestration**: The next wave shifts from conversational chat interfaces to multi-agent task executors that autonomously bridge disparate legacy enterprise systems (SAP, Salesforce, internal data warehouses).

### 3. Next 30-Day Executive Directive
1. Identify the top three revenue-generating workflows in your core business unit and stress-test an end-to-end agentic prototype.
2. Establish transparent baseline KPIs (cycle time reduction, defect rate, gross margin expansion) to present at the next executive committee review.`;
}

// Development Vite Middlewares vs Production Static Serving
async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Vanguard AI Executive Platform running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
