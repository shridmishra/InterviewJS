'use client';

import React from 'react';
import ProblemListPage from '../../../components/problems/ProblemList';
import Header from '../../../components/common/Header';
import { useRouter } from 'next/navigation';
import { useChallenges } from '../../../hooks/useChallenges';
import { Problem } from '../../../types';
import { useAuth } from '../../../context/AuthContext';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

import ProblemListSkeleton from '../../../components/problems/ProblemListSkeleton';

function PracticeJSPage() {
    const router = useRouter();
    const { problems, isLoading, isAuthLoading, handleToggleStar, handleUpdateNotes } = useChallenges('js');
    const { isAuthenticated: _isAuthenticated } = useAuth();

    const handleSelectProblem = (problem: Problem) => {
        router.push(`/practice/js/${problem.id}`);
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
                <div className="flex justify-end mt-8 mb-12 mr-10">
                    <Button
                        onClick={() => router.push('/practice/ts')}
                        className="gap-2 text-lg px-8 py-6 bg-foreground text-background hover:bg-foreground/90"
                        size="lg"
                    >
                        TypeScript <ChevronRight className="w-5 h-5" />
                    </Button>
                </div>
            </main>
        </div>
    );
}

export default PracticeJSPage;
