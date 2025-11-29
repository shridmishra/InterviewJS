'use client';

import React from 'react';
import ProblemListPage from '../../../components/problems/ProblemList';
import Header from '../../../components/common/Header';
import { useRouter, useParams } from 'next/navigation';
import { useChallenges } from '../../../hooks/useChallenges';
import { Problem } from '../../../types';
import { useAuth } from '../../../context/AuthContext';

import ProblemListSkeleton from '../../../components/problems/ProblemListSkeleton';

function PracticeTopicPage() {
    const router = useRouter();
    const params = useParams();
    const slug = params.slug as string;

    // Map slug to filter type if needed, or update useChallenges to accept generic slug
    // For now, we'll pass the slug directly and update useChallenges to handle it
    const { problems, isLoading, isAuthLoading, handleToggleStar, handleUpdateNotes } = useChallenges(slug);
    const { isAuthenticated: _isAuthenticated } = useAuth();

    const handleSelectProblem = (problem: Problem) => {
        router.push(`/practice/${slug}/${problem.id}`);
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
                {/* Optional: Navigation to next topic */}
            </main>
        </div>
    );
}

export default PracticeTopicPage;
