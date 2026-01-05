'use client';

import React from 'react';
import ProblemListPage from '../../../components/problems/ProblemList';
import Header from '../../../components/common/Header';
import { useRouter } from 'next/navigation';
import { useChallenges } from '../../../hooks/useChallenges';
import { Problem } from '../../../types';
import { useAuth } from '../../../context/AuthContext';

import ProblemListSkeleton from '../../../components/problems/ProblemListSkeleton';

function PracticeTSPage() {
    const router = useRouter();
    const { problems, isLoading, isAuthLoading, handleToggleStar, handleUpdateNotes } = useChallenges('ts');
    const { isAuthenticated: _isAuthenticated } = useAuth();

    const handleSelectProblem = (problem: Problem) => {
        router.push(`/practice/ts/${problem.id}`);
    };

    const handleNavigate = (page: 'profile' | 'list' | '' | 'quiz') => {
        router.push(`/${page}`);
    };

    if (isLoading || isAuthLoading) {
        return (
            <div className="bg-background min-h-screen">
                <Header onNavigate={handleNavigate} />
                <main className="container mx-auto px-4 md:px-6 lg:px-8 py-8 bg-background">
                    <ProblemListSkeleton />
                </main>
            </div>
        );
    }

    return (
        <div className="bg-background min-h-screen">
            <Header onNavigate={handleNavigate} />
            <main className="container mx-auto px-0 md:px-6 lg:px-8 py-8 bg-background">
                <ProblemListPage
                    problems={problems}
                    onSelectProblem={handleSelectProblem}
                    onToggleStar={handleToggleStar}
                    onUpdateNotes={handleUpdateNotes}
                    onNavigate={handleNavigate}
                    onLogout={() => { }}
                    onLogin={() => router.push('/api/auth/signin')}
                />
            </main>
        </div>
    );
}

export default PracticeTSPage;
