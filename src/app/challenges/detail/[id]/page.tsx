'use client';

import React, { useEffect } from 'react';
import ProblemSolvingPage from '../../../../components/assignments/AssignmentDetail';
import Header from '../../../../components/common/Header';
import { useRouter, useParams } from 'next/navigation';
import { useChallenges } from '../../../../hooks/useChallenges';
import { useAuth } from '../../../../context/AuthContext';

function ChallengeDetailPage() {
  const router = useRouter();
  const params = useParams();
  const problemId = params.id as string;
  const { getProblemById, isLoading, isAuthLoading, handleStatusChange, handleToggleStar, handleUpdateNotes } = useChallenges();
  const { isAuthenticated: _isAuthenticated } = useAuth();

  const problem = getProblemById(problemId);

  useEffect(() => {
    if (!isLoading && !isAuthLoading && !problem) {
      router.push('/challenges/list');
    }
  }, [problemId, getProblemById, isLoading, isAuthLoading, router, problem]);

  const handleBack = () => {
    router.push('/challenges/list');
  };

  const handleNavigate = (page: 'profile' | 'list' | '' | 'quiz') => {
    router.push(`/${page}`);
  };

  if (isLoading || isAuthLoading || !problem) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        Loading Challenge Details...
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-black min-h-screen">
      <Header onNavigate={handleNavigate} />
      <main className="container mx-auto px-4 md:px-6 lg:px-8 py-8 dark:bg-black">
        <ProblemSolvingPage
          problem={problem}
          onBack={handleBack}
          onStatusChange={handleStatusChange}
          onToggleStar={handleToggleStar}
          onUpdateNotes={handleUpdateNotes}
          onNavigate={handleNavigate}
          onLogin={() => router.push('/api/auth/signin')}
          onLogout={() => {}}
        />
      </main>
    </div>
  );
}

export default ChallengeDetailPage;
