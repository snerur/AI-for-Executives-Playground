import { UserExecutiveProfile } from '../types';

const PROFILE_KEY = 'vanguard_exec_profile_v2';

export const DEFAULT_PROFILE: UserExecutiveProfile = {
  name: '',
  nickname: 'CXO Vanguard',
  title: 'Chief Technology & Digital Officer',
  company: 'Global Enterprise',
  industry: 'Financial Services',
  xp: 0,
  streakDays: 1,
  completedModuleIds: [],
  bookmarkedCaseStudyIds: [],
  offlineCaseStudyIds: [],
  offlineSummaryIds: [],
  unlockedBadgeIds: [],
  leadershipArchetype: 'orchestrator',
  lastActiveDate: new Date().toISOString(),
};

export function loadProfile(): UserExecutiveProfile {
  try {
    // Check v2 first
    const rawV2 = localStorage.getItem(PROFILE_KEY);
    if (rawV2) {
      const parsed = JSON.parse(rawV2);
      return { ...DEFAULT_PROFILE, ...parsed };
    }

    // Check v1 if exists and migrate cleanly
    const rawV1 = localStorage.getItem('vanguard_exec_profile_v1');
    if (rawV1) {
      const parsed = JSON.parse(rawV1);
      // If it only has the initial seeded mock data ('genai-economics' with 380 XP)
      if (
        parsed.completedModuleIds?.length === 1 &&
        parsed.completedModuleIds[0] === 'genai-economics' &&
        parsed.xp === 380
      ) {
        // Reset to clean 0/6 state
        parsed.completedModuleIds = [];
        parsed.xp = 0;
        parsed.unlockedBadgeIds = [];
        parsed.offlineSummaryIds = [];
        parsed.streakDays = 1;
      }
      if (parsed.name === 'Elena Rostova') {
        parsed.name = '';
        if (!parsed.nickname) parsed.nickname = 'CXO Vanguard';
      }
      const migrated = { ...DEFAULT_PROFILE, ...parsed };
      localStorage.setItem(PROFILE_KEY, JSON.stringify(migrated));
      return migrated;
    }
  } catch (e) {
    console.error('Error loading executive profile from storage:', e);
  }
  return DEFAULT_PROFILE;
}

export function saveProfile(profile: UserExecutiveProfile): void {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.error('Error saving executive profile to storage:', e);
  }
}

export function calculateExecutiveRank(xp: number): {
  rank: string;
  nextRank: string | null;
  currentLevelXp: number;
  nextLevelXp: number;
  progressPct: number;
} {
  if (xp >= 1000) {
    return {
      rank: 'Board Technology Fellow',
      nextRank: null,
      currentLevelXp: 1000,
      nextLevelXp: 1000,
      progressPct: 100,
    };
  }
  if (xp >= 650) {
    return {
      rank: 'EVP & Chief AI Strategist',
      nextRank: 'Board Technology Fellow',
      currentLevelXp: 650,
      nextLevelXp: 1000,
      progressPct: Math.round(((xp - 650) / 350) * 100),
    };
  }
  if (xp >= 400) {
    return {
      rank: 'SVP Enterprise Systems',
      nextRank: 'EVP & Chief AI Strategist',
      currentLevelXp: 400,
      nextLevelXp: 650,
      progressPct: Math.round(((xp - 400) / 250) * 100),
    };
  }
  if (xp >= 200) {
    return {
      rank: 'VP of Strategic Innovation',
      nextRank: 'SVP Enterprise Systems',
      currentLevelXp: 200,
      nextLevelXp: 400,
      progressPct: Math.round(((xp - 200) / 200) * 100),
    };
  }
  return {
    rank: 'Senior Director',
    nextRank: 'VP of Strategic Innovation',
    currentLevelXp: 0,
    nextLevelXp: 200,
    progressPct: Math.round((xp / 200) * 100),
  };
}
