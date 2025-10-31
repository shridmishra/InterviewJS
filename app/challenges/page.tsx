'use client';

import React, { useState } from 'react';
import ProblemListPage from '../components/AssignmentList';
import ProblemSolvingPage from '../components/AssignmentDetail';
import { problemsData as assignments } from '../data/assignments';
import Header from '../components/Header';
import { useRouter } from 'next/navigation';
import { Problem, ProblemStatus } from '../types';

const ChallengesPage = () => {
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null);
  const router = useRouter();
  const problems: Problem[] = assignments.map(p => ({ ...p, status: ProblemStatus.Unsolved, isStarred: false, notes: '' }));

  const handleSelectAssignment = (assignment: any) => {
    setSelectedAssignment(assignment);
  };

  const handleBack = () => {
    setSelectedAssignment(null);
  };

  const handleNavigate = (page: 'profile' | 'list' | 'hero' | 'quiz') => {
    router.push(`/${page}`);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <Header onNavigate={handleNavigate} />
      <main className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
        {selectedAssignment ? (
          <ProblemSolvingPage
            problem={selectedAssignment}
            onBack={handleBack}
            onStatusChange={() => {}}
            onToggleStar={() => {}}
            onUpdateNotes={() => {}}
            onNavigate={handleNavigate}
            onLogin={() => {}}
            onLogout={() => {}}
          />
        ) : (
          <ProblemListPage
            problems={problems}
            onSelectProblem={handleSelectAssignment}
            onToggleStar={() => {}}
            onUpdateNotes={() => {}}
            onNavigate={handleNavigate}
            onLogout={() => {}}
            onLogin={() => {}}
          />
        )}
      </main>
    </div>
  );
};

export default ChallengesPage;
