/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { MobileNav } from './components/MobileNav';
import { LearningTrack } from './components/LearningTrack';
import { BoardroomDilemmaModal } from './components/BoardroomDilemmaModal';
import { AiStrategicMentor } from './components/AiStrategicMentor';
import { MaturityAssessmentTool } from './components/MaturityAssessmentTool';
import { PeerBenchmarking } from './components/PeerBenchmarking';
import { CaseStudyLibrary } from './components/CaseStudyLibrary';
import { LeadershipInsights } from './components/LeadershipInsights';
import { Leaderboard } from './components/Leaderboard';
import { ExecutiveBriefcaseModal } from './components/ExecutiveBriefcaseModal';
import { ExportRoadmapModal } from './components/ExportRoadmapModal';
import { EditProfileModal } from './components/EditProfileModal';
import { loadProfile, saveProfile } from './utils/storage';
import { LearningModule, CaseStudy, MaturityAssessmentResult, UserExecutiveProfile } from './types';

export default function App() {
  const [profile, setProfile] = useState<UserExecutiveProfile>(() => loadProfile());
  const [activeTab, setActiveTab] = useState<string>('modules');
  const [selectedModule, setSelectedModule] = useState<LearningModule | null>(null);
  const [isBriefcaseOpen, setIsBriefcaseOpen] = useState<boolean>(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState<boolean>(false);
  const [exportedRoadmapResult, setExportedRoadmapResult] = useState<MaturityAssessmentResult | null>(null);
  const [mentorInitialTopic, setMentorInitialTopic] = useState<string>('');

  // Save profile to localStorage whenever it changes
  useEffect(() => {
    saveProfile(profile);
  }, [profile]);

  // Handle module completion (gamification XP, badges, streaks)
  const handleCompleteModule = (moduleId: string, earnedXp: number, badgeId?: string) => {
    setProfile((prev) => {
      const isNewCompletion = !prev.completedModuleIds.includes(moduleId);
      const updatedCompleted = isNewCompletion
        ? [...prev.completedModuleIds, moduleId]
        : prev.completedModuleIds;

      const updatedBadges = [...prev.unlockedBadgeIds];
      if (badgeId && !updatedBadges.includes(badgeId)) {
        updatedBadges.push(badgeId);
      }

      return {
        ...prev,
        xp: prev.xp + earnedXp,
        completedModuleIds: updatedCompleted,
        unlockedBadgeIds: updatedBadges,
      };
    });
  };

  // Reset all module progress to 0 for a clean start
  const handleResetProgress = () => {
    setProfile((prev) => ({
      ...prev,
      xp: 0,
      streakDays: 1,
      completedModuleIds: [],
      unlockedBadgeIds: [],
      offlineSummaryIds: [],
    }));
  };

  // Toggle offline saving for module summaries
  const handleToggleOfflineSummary = (moduleId: string) => {
    setProfile((prev) => {
      const exists = prev.offlineSummaryIds.includes(moduleId);
      const updated = exists
        ? prev.offlineSummaryIds.filter((id) => id !== moduleId)
        : [...prev.offlineSummaryIds, moduleId];
      return { ...prev, offlineSummaryIds: updated };
    });
  };

  // Toggle offline saving for case studies
  const handleToggleOfflineCaseStudy = (caseId: string) => {
    setProfile((prev) => {
      const exists = prev.offlineCaseStudyIds.includes(caseId);
      const updated = exists
        ? prev.offlineCaseStudyIds.filter((id) => id !== caseId)
        : [...prev.offlineCaseStudyIds, caseId];
      return { ...prev, offlineCaseStudyIds: updated };
    });
  };

  // Save strategic note from AI mentor to Briefcase
  const handleSaveBriefcaseNote = (title: string, content: string) => {
    // Stores in offline summaries
    const dummyId = `note-${Date.now()}`;
    setProfile((prev) => ({
      ...prev,
      offlineSummaryIds: [...prev.offlineSummaryIds, dummyId],
    }));
  };

  // Consult mentor about a specific topic from learning modules or case studies
  const handleConsultMentorTopic = (topic: string) => {
    if (selectedModule) setSelectedModule(null);
    setMentorInitialTopic(topic);
    setActiveTab('mentor');
  };

  return (
    <div className="min-h-screen bg-[#070a10] text-slate-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200 pb-20 md:pb-12">
      {/* Executive Command Header */}
      <Header
        profile={profile}
        onOpenBriefcase={() => setIsBriefcaseOpen(true)}
        onEditProfile={() => setIsEditProfileOpen(true)}
        onSelectTab={setActiveTab}
        activeTab={activeTab}
      />

      {/* Desktop Navigation */}
      <Navigation activeTab={activeTab} onSelectTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'modules' && (
          <LearningTrack
            profile={profile}
            onOpenModule={(m) => setSelectedModule(m)}
            onToggleOfflineSummary={handleToggleOfflineSummary}
            onNavigateToLeaderboard={() => setActiveTab('leaderboard')}
          />
        )}

        {activeTab === 'leaderboard' && (
          <Leaderboard
            profile={profile}
            onEditProfile={() => setIsEditProfileOpen(true)}
            onSelectTab={setActiveTab}
          />
        )}

        {activeTab === 'mentor' && (
          <AiStrategicMentor
            profile={profile}
            initialTopic={mentorInitialTopic}
            onSaveBriefcaseNote={handleSaveBriefcaseNote}
          />
        )}

        {activeTab === 'maturity' && (
          <MaturityAssessmentTool
            profile={profile}
            onExportRoadmap={(result) => setExportedRoadmapResult(result)}
            onAskMentorAboutRoadmap={(summary) =>
              handleConsultMentorTopic(`Enterprise Maturity Diagnostic: ${summary}`)
            }
          />
        )}

        {activeTab === 'benchmarks' && (
          <PeerBenchmarking
            profile={profile}
            onAskMentorAboutBenchmark={(ind) =>
              handleConsultMentorTopic(`Industry Benchmark analysis for ${ind}`)
            }
          />
        )}

        {activeTab === 'cases' && (
          <CaseStudyLibrary
            profile={profile}
            onToggleOfflineCaseStudy={handleToggleOfflineCaseStudy}
            onAskMentorAboutCase={(company, title) =>
              handleConsultMentorTopic(`Case Study analysis: ${company} - ${title}`)
            }
            onExportCaseStudy={(cs) => {
              // Quick export via memorandum format
              const dummyResult: MaturityAssessmentResult = {
                overallLevel: 4,
                overallLevelName: `${cs.company} Transformation Playbook`,
                executiveSummary: `${cs.headlineMetric} - ${cs.challenge}\n\nSolution: ${cs.executiveSolution}`,
                dimensionScores: [],
                roadmap: {
                  day90: [cs.pitfallsAvoided[0] || ''],
                  day180: [cs.pitfallsAvoided[1] || ''],
                  day365: [cs.boardroomLessons[0] || ''],
                },
                prioritizedSteps: [],
              };
              setExportedRoadmapResult(dummyResult);
            }}
          />
        )}

        {activeTab === 'insights' && (
          <LeadershipInsights
            profile={profile}
            onUpdateArchetype={(arch) =>
              setProfile((prev) => ({ ...prev, leadershipArchetype: arch }))
            }
            onAskMentorAboutArchetype={(archName) =>
              handleConsultMentorTopic(`Strategic advice tailored to leadership style: ${archName}`)
            }
          />
        )}
      </main>

      {/* Mobile Navigation Bar */}
      <MobileNav activeTab={activeTab} onSelectTab={setActiveTab} />

      {/* Boardroom Dilemma & Microlearning Modal */}
      {selectedModule && (
        <BoardroomDilemmaModal
          module={selectedModule}
          onClose={() => setSelectedModule(null)}
          profile={profile}
          onCompleteModule={handleCompleteModule}
          onToggleOfflineSummary={handleToggleOfflineSummary}
          onAskMentorAboutTopic={(topic) => handleConsultMentorTopic(topic)}
        />
      )}

      {/* Executive Briefcase Modal */}
      {isBriefcaseOpen && (
        <ExecutiveBriefcaseModal
          profile={profile}
          onClose={() => setIsBriefcaseOpen(false)}
          onRemoveSummary={(id) => handleToggleOfflineSummary(id)}
          onRemoveCase={(id) => handleToggleOfflineCaseStudy(id)}
          onOpenModule={(m) => {
            setIsBriefcaseOpen(false);
            setSelectedModule(m);
          }}
        />
      )}

      {/* Export Roadmap / Board Presentation Modal */}
      {exportedRoadmapResult && (
        <ExportRoadmapModal
          result={exportedRoadmapResult}
          profile={profile}
          onClose={() => setExportedRoadmapResult(null)}
        />
      )}

      {/* Edit Profile Modal */}
      {isEditProfileOpen && (
        <EditProfileModal
          profile={profile}
          onClose={() => setIsEditProfileOpen(false)}
          onSave={(updated) => setProfile((prev) => ({ ...prev, ...updated }))}
          onResetProgress={handleResetProgress}
        />
      )}
    </div>
  );
}
