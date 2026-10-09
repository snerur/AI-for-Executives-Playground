import { LeaderboardEntry, UserExecutiveProfile } from '../types';

export const BASE_LEADERBOARD_ENTRIES: LeaderboardEntry[] = [
  {
    rank: 1,
    id: 'lead-1',
    name: 'Marcus Vance',
    nickname: 'Alpha_Architect',
    title: 'EVP Enterprise Technology',
    company: 'Sovereign Capital Partners',
    industry: 'Financial Services',
    xp: 1240,
    badgeCount: 6,
    streakDays: 16,
    archetype: 'The Strategic Orchestrator',
  },
  {
    rank: 2,
    id: 'lead-2',
    name: 'Dr. Hiroshi Tanaka',
    nickname: 'BioFrontier_Lead',
    title: 'SVP Global Therapeutics & AI',
    company: 'AstraNova Biopharma',
    industry: 'Healthcare & Life Sciences',
    xp: 990,
    badgeCount: 5,
    streakDays: 12,
    archetype: 'The Calculated Vanguard',
  },
  {
    rank: 3,
    id: 'lead-3',
    name: 'Claire Dupont',
    nickname: 'RetailMatrix_CXO',
    title: 'Chief Digital & Supply Officer',
    company: 'Carrefour-Vantage Retail',
    industry: 'Retail & Consumer Goods',
    xp: 880,
    badgeCount: 5,
    streakDays: 9,
    archetype: 'The Pragmatic Scaler',
  },
  {
    rank: 4,
    id: 'lead-4',
    name: 'Vikram Malhotra',
    nickname: 'GovernanceSentinel',
    title: 'Chief Risk & Information Officer',
    company: 'Apex Global Financial',
    industry: 'Financial Services',
    xp: 750,
    badgeCount: 4,
    streakDays: 8,
    archetype: 'The Governance Sentinel',
  },
  {
    rank: 5,
    id: 'lead-5',
    name: 'Sarah Lindqvist',
    nickname: 'NordicRobotics_VP',
    title: 'Group VP Industrial Automation',
    company: 'Nordic Digital Twin AG',
    industry: 'Manufacturing & Industrial Tech',
    xp: 670,
    badgeCount: 4,
    streakDays: 7,
    archetype: 'The Strategic Orchestrator',
  },
  {
    rank: 6,
    id: 'lead-6',
    name: 'Julian Montgomery',
    nickname: 'GridIntelligence',
    title: 'Head of AI Infrastructure',
    company: 'Helios Grid Energy',
    industry: 'Energy & Utilities',
    xp: 590,
    badgeCount: 3,
    streakDays: 5,
    archetype: 'The Pragmatic Scaler',
  },
  {
    rank: 7,
    id: 'lead-7',
    name: 'Amara Okafor',
    nickname: 'Sovereign_Dev',
    title: 'VP Engineering & AI Platforms',
    company: 'Zenith Cloud Platforms',
    industry: 'Technology & Software',
    xp: 520,
    badgeCount: 3,
    streakDays: 4,
    archetype: 'The Calculated Vanguard',
  },
  {
    rank: 8,
    id: 'lead-8',
    name: 'Gabriel Morales',
    nickname: 'FiduciaryAlpha',
    title: 'Managing Director & Lead Counsel',
    company: 'Meridian Global Advisory',
    industry: 'Financial Services',
    xp: 440,
    badgeCount: 2,
    streakDays: 3,
    archetype: 'The Governance Sentinel',
  },
];

export function getRankedLeaderboard(userProfile: UserExecutiveProfile): LeaderboardEntry[] {
  const userDisplayName = userProfile.nickname || userProfile.name || 'Your Executive Profile';

  const userEntry: LeaderboardEntry = {
    rank: 0,
    id: 'current-user',
    name: userProfile.name || userDisplayName,
    nickname: userProfile.nickname || 'Executive Lead',
    title: userProfile.title,
    company: userProfile.company,
    industry: userProfile.industry,
    xp: userProfile.xp,
    badgeCount: userProfile.unlockedBadgeIds.length,
    streakDays: userProfile.streakDays,
    archetype: userProfile.leadershipArchetype
      ? `The ${userProfile.leadershipArchetype.charAt(0).toUpperCase() + userProfile.leadershipArchetype.slice(1)}`
      : 'The Strategic Orchestrator',
    isCurrentUser: true,
  };

  const combined = [...BASE_LEADERBOARD_ENTRIES, userEntry];

  // Sort descending by XP
  combined.sort((a, b) => b.xp - a.xp);

  // Assign ranks
  return combined.map((entry, idx) => ({
    ...entry,
    rank: idx + 1,
  }));
}
