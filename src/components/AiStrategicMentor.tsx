import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Copy, Check, Bookmark, RefreshCw, Bot, User, Building, ShieldAlert, Award } from 'lucide-react';
import { ChatMessage, UserExecutiveProfile } from '../types';

interface AiStrategicMentorProps {
  profile: UserExecutiveProfile;
  initialTopic?: string;
  onSaveBriefcaseNote: (title: string, content: string) => void;
}

export const AiStrategicMentor: React.FC<AiStrategicMentorProps> = ({
  profile,
  initialTopic,
  onSaveBriefcaseNote,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'mentor',
      text: `Good day, ${profile.name}. I am your Senior Executive AI Strategic Advisor ("Aura CXO Advisor"). 

I specialize in the strategic intersections of **capital allocation**, **boardroom fiduciary risk**, **agentic architecture**, and **enterprise transformation**. 

How can we advance your firm's strategic AI agenda today?`,
      timestamp: 'Just now',
      suggestedFollowUps: [
        'Stress-test our proposed $14M GenAI enterprise budget',
        'Draft a 1-page Board Memo on autonomous agent liability',
        'Evaluate Build vs Buy: Self-hosting Llama 3 vs Google Vertex AI',
        'How should we structure our cross-functional AI Steering Committee?',
      ],
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [executiveRole, setExecutiveRole] = useState(profile.title || 'Chief Technology Officer');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [savedNoteId, setSavedNoteId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Handle initialTopic if passed from learning module or case study
  useEffect(() => {
    if (initialTopic) {
      handleSendMessage(`I want a strategic executive consultation regarding: "${initialTopic}". What are the critical trade-offs and fiduciary actions for our enterprise?`);
    }
  }, [initialTopic]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/mentor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages,
          executiveRole,
          companyContext: `${profile.company} (${profile.industry})`,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      const mentorMessage: ChatMessage = {
        id: `mentor-${Date.now()}`,
        sender: 'mentor',
        text: data.reply || 'I have completed the strategic appraisal for your executive review.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSimulated: data.isSimulated,
        suggestedFollowUps: [
          'What are the immediate 90-day execution milestones?',
          'How should we present this trade-off to the Audit Committee?',
          'What is the estimated impact on enterprise operating margins?',
        ],
      };

      setMessages((prev) => [...prev, mentorMessage]);
    } catch (err) {
      console.error('Mentor chat error:', err);
      // Resilient fallback message
      const errorMessage: ChatMessage = {
        id: `mentor-fallback-${Date.now()}`,
        sender: 'mentor',
        text: `### Strategic Assessment: ${text}\n\n* **Fiduciary Perspective:** Focus on establishing deterministic risk ceilings before scaling agentic autonomy across legacy ERP and CRM platforms.\n* **Capital Allocation:** Require a mandatory 90-day value realization audit to avoid pilot stagnation.\n* **Board Recommendation:** Prepare a concise one-page memo articulating the cost-per-successful-outcome (CPSO) and proprietary data moat protections.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSimulated: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSaveToBriefcase = (id: string, text: string) => {
    onSaveBriefcaseNote(`Strategic Advisory Memo (${new Date().toLocaleDateString()})`, text);
    setSavedNoteId(id);
    setTimeout(() => setSavedNoteId(null), 2500);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fadeIn">
      {/* Top Strategic Persona Bar */}
      <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-slate-100">
                Aura AI Strategic Executive Advisor
              </h2>
              <span className="text-[10px] uppercase font-mono text-amber-400/90 font-medium">
                Gemini 3.8 Powered
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Real-time strategic consultation for C-Suite executives, Board Directors, and SVPs.
            </p>
          </div>
        </div>

        {/* Executive Role Switcher */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 whitespace-nowrap">Advising Lens:</span>
          <select
            value={executiveRole}
            onChange={(e) => setExecutiveRole(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-md px-2.5 py-1.5 focus:outline-none focus:border-amber-400"
          >
            <option value="Chief Executive Officer">Chief Executive Officer (CEO)</option>
            <option value="Chief Technology / Digital Officer">Chief Technology & Digital Officer (CTO/CDO)</option>
            <option value="Chief Financial Officer">Chief Financial Officer (CFO)</option>
            <option value="General Counsel & Head of Risk">General Counsel & Chief Risk Officer (CLO/CRO)</option>
            <option value="Board Technology Director">Board Audit / Technology Director</option>
          </select>
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="bg-[#0b0f17] border border-slate-800 rounded-xl flex flex-col h-[600px] overflow-hidden shadow-xl">
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-5">
          {messages.map((msg) => {
            const isMentor = msg.sender === 'mentor';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isMentor ? 'justify-start' : 'justify-end'}`}
              >
                {isMentor && (
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-2xl rounded-xl p-4 text-xs sm:text-sm leading-relaxed ${
                    isMentor
                      ? 'bg-slate-900/90 border border-slate-800 text-slate-200 shadow-sm'
                      : 'bg-amber-500 text-slate-950 font-medium'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3 mb-1.5 opacity-60 text-[10px] font-mono">
                    <span>{isMentor ? 'Aura Executive Partner' : profile.name}</span>
                    <span>{msg.timestamp}</span>
                  </div>

                  {/* Message formatted content */}
                  <div className="whitespace-pre-wrap space-y-2">
                    {msg.text}
                  </div>

                  {/* Mentor Actions (Copy, Save to Briefcase) */}
                  {isMentor && (
                    <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCopy(msg.id, msg.text)}
                          className="px-2 py-1 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded transition-colors flex items-center gap-1"
                          title="Copy executive advice to clipboard"
                        >
                          {copiedId === msg.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-400 text-[11px]">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span className="text-[11px]">Copy Memo</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => handleSaveToBriefcase(msg.id, msg.text)}
                          className="px-2 py-1 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded transition-colors flex items-center gap-1"
                          title="Save this memo into your Executive Briefcase for offline viewing"
                        >
                          {savedNoteId === msg.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-400 text-[11px]">Saved in Briefcase</span>
                            </>
                          ) : (
                            <>
                              <Bookmark className="w-3.5 h-3.5 text-amber-400" />
                              <span className="text-[11px]">Save to Briefcase</span>
                            </>
                          )}
                        </button>
                      </div>

                      {msg.isSimulated && (
                        <span className="text-[10px] text-slate-400 font-mono">
                          Executive Model Strategy
                        </span>
                      )}
                    </div>
                  )}

                  {/* Suggested Follow-Ups */}
                  {isMentor && msg.suggestedFollowUps && msg.suggestedFollowUps.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-slate-800/60 space-y-1.5">
                      <span className="text-[10px] uppercase font-mono text-slate-400 block">
                        Suggested Boardroom Inquiries:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.suggestedFollowUps.map((prompt, pIdx) => (
                          <button
                            key={pIdx}
                            onClick={() => handleSendMessage(prompt)}
                            className="text-left px-2.5 py-1 text-[11px] rounded bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-amber-300 border border-slate-700/60 transition-colors"
                          >
                            {prompt}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {!isMentor && (
                  <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0 mt-0.5 font-bold font-serif text-xs">
                    {profile.name.charAt(0)}
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 justify-start items-center text-xs text-amber-400 font-mono">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
              </div>
              <span className="animate-pulse">
                Evaluating executive trade-offs and capital implications...
              </span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-slate-900 border-t border-slate-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Consult Aura as a ${executiveRole}... (e.g. "Challenge our $10M GenAI POC budget")`}
              className="flex-1 bg-slate-950 border border-slate-800 focus:border-amber-400 rounded-lg px-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-colors"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className={`p-2.5 rounded-lg transition-all flex items-center justify-center ${
                inputText.trim() && !isLoading
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 cursor-pointer shadow-md'
                  : 'bg-slate-800 text-slate-600 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
