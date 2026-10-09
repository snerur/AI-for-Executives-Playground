import React, { useState } from 'react';
import { X, User, Building, Briefcase } from 'lucide-react';
import { UserExecutiveProfile } from '../types';

interface EditProfileModalProps {
  profile: UserExecutiveProfile;
  onClose: () => void;
  onSave: (updated: Partial<UserExecutiveProfile>) => void;
  onResetProgress?: () => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  profile,
  onClose,
  onSave,
  onResetProgress,
}) => {
  const [name, setName] = useState(profile.name || '');
  const [nickname, setNickname] = useState(profile.nickname || '');
  const [title, setTitle] = useState(profile.title || 'Chief Technology Officer');
  const [company, setCompany] = useState(profile.company || 'Enterprise Global');
  const [industry, setIndustry] = useState(profile.industry || 'Financial Services');

  const industries = [
    'Financial Services',
    'Healthcare & Life Sciences',
    'Manufacturing & Industrial Tech',
    'Retail & Consumer Goods',
    'Technology & Software',
    'Energy & Utilities',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name: name.trim(),
      nickname: nickname.trim() || 'Executive Lead',
      title: title.trim(),
      company: company.trim(),
      industry,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-md bg-[#0d131f] border border-slate-700/80 rounded-xl shadow-2xl overflow-hidden animate-fadeIn">
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/80">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-semibold text-slate-100">
              Executive Profile & Callsign Configuration
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-slate-300 font-medium">Full Name (Optional)</label>
              <span className="text-[10px] text-slate-400">Can remain private</span>
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Sridhar Nerur, David Sterling"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-400 placeholder:text-slate-600"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-slate-300 font-medium">Boardroom Callsign / Nickname</label>
              <span className="text-[10px] text-amber-400 font-mono">Displayed on Leaderboard</span>
            </div>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="e.g. CXO_Vanguard, Alpha_CTO, Sridhar"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-400 placeholder:text-slate-600"
              required
            />
            <p className="text-[10px] text-slate-400">
              Choose any name or pseudonym to represent your organization in the peer cohort rankings.
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="text-slate-300 font-medium">Corporate Executive Role</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Chief Technology & Digital Officer, EVP, Board Director"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-400"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-slate-300 font-medium">Company Name</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g. Global Holdings, Apex Health, TechCorp"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-400"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-slate-300 font-medium">Industry Sector</label>
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-400"
            >
              {industries.map((ind) => (
                <option key={ind} value={ind}>
                  {ind}
                </option>
              ))}
            </select>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
            {onResetProgress ? (
              <button
                type="button"
                onClick={() => {
                  onResetProgress();
                  onClose();
                }}
                className="text-rose-400 hover:text-rose-300 text-[11px] underline cursor-pointer"
                title="Reset all completed modules, badges, and XP to 0"
              >
                Reset Learning Progress (0/6)
              </button>
            ) : <div />}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 text-slate-400 hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold rounded cursor-pointer"
              >
                Save Executive Profile
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
