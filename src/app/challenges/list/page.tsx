'use client';

import React from 'react';
import ProblemListPage from '../../../components/assignments/AssignmentList';
import Header from '../../../components/common/Header';
import { useRouter } from 'next/navigation';
import { useChallenges } from '../../../hooks/useChallenges';
import { Problem } from '../../../types';
import { useAuth } from '../../../context/AuthContext';

function ChallengesListPage() {
  const router = useRouter();
  const { problems, isLoading, isAuthLoading, handleToggleStar, handleUpdateNotes } = useChallenges();
  const { isAuthenticated: _isAuthenticated } = useAuth();

  const handleSelectAssignment = (problem: Problem) => {
    router.push(`/challenges/detail/${problem.id}`);
  };

  const handleNavigate = (page: 'profile' | 'list' | '' | 'quiz') => {
    router.push(`/${page}`);
  };

  if (isLoading || isAuthLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        Loading Challenges...
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <Header onNavigate={handleNavigate} />
      <main className="container mx-auto px-4 md:px-6 lg:px-8 py-8 dark:bg-black">
        <ProblemListPage
          problems={problems}
          onSelectProblem={handleSelectAssignment}
          onToggleStar={handleToggleStar}
          onUpdateNotes={handleUpdateNotes}
          onNavigate={handleNavigate}
          onLogout={() => {}}
          onLogin={() => router.push('/api/auth/signin')}
        />
      </main>
    </div>
  );
}

export default ChallengesListPage;
