'use client';

import React, { useEffect } from 'react';
import ProblemSolvingPage from '@/components/problems/ProblemDetail';
import { useRouter, useParams } from 'next/navigation';
import { useChallenges } from '@/hooks/useChallenges';
import { useAuth } from '@/context/AuthContext';

import ProblemDetailSkeleton from '@/components/problems/ProblemDetailSkeleton';

function LearnProblemPage() {
    const router = useRouter();
    const params = useParams();
    const slug = params.slug as string;
    const problemId = params.problemId as string;

    const { getProblemById, isLoading, isAuthLoading, handleStatusChange, handleToggleStar, handleUpdateNotes } = useChallenges(slug);
    const { isAuthenticated: _isAuthenticated, login } = useAuth();

    const problem = getProblemById(problemId);

    useEffect(() => {
        if (!isLoading && !isAuthLoading && !problem) {
            router.push(`/learn/${slug}`);
        }
    }, [problemId, getProblemById, isLoading, isAuthLoading, router, problem, slug]);

    const handleBack = () => {
        router.push(`/learn/${slug}`);
    };

    const handleNavigate = (page: 'profile' | 'list' | '' | 'quiz') => {
        router.push(`/${page}`);
    };

    if (isLoading || isAuthLoading || !problem) {
        return (
            <div className="bg-background min-h-screen">

                <main className="container mx-auto px-4 md:px-6 lg:px-8 py-8 bg-background">
                    <ProblemDetailSkeleton />
                </main>
            </div>
        );
    }

    return (
        <div className="bg-background min-h-screen">

            <main className="container mx-auto px-4 md:px-6 lg:px-8 py-8 bg-background">
                <ProblemSolvingPage
                    problem={problem}
                    onBack={handleBack}
                    onStatusChange={handleStatusChange}
                    onToggleStar={handleToggleStar}
                    onUpdateNotes={handleUpdateNotes}
                    onNavigate={handleNavigate}
                    onLogin={login}
                    onLogout={() => { }}
                />
            </main>
        </div>
    );
}

export default LearnProblemPage;
