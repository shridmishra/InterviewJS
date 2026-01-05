'use client';

import React from 'react';
import ProblemListPage from '../../../components/problems/ProblemList';
import Header from '../../../components/common/Header';
import { useRouter, useParams } from 'next/navigation';
import { useChallenges } from '../../../hooks/useChallenges';
import { Problem } from '../../../types';
import { useAuth } from '../../../context/AuthContext';

import ProblemListSkeleton from '../../../components/problems/ProblemListSkeleton';

// Playlist URLs for each topic
const PLAYLIST_URLS: Record<string, string> = {
    'html': 'https://www.youtube.com/playlist?list=PLu71SKxNbfoDBNF5s-WH6aLbthSEIMhMI',
    'js': 'https://www.youtube.com/watch?v=Hr5iLG7sUa0&list=PLu71SKxNbfoBuX3f4EOACle2y-tRC5Q37',
    'css': 'https://www.youtube.com/watch?v=ESnrn1kAD4E&list=PLu71SKxNbfoDBNF5s-WH6aLbthSEIMhMI',
    'ts': 'https://www.youtube.com/watch?v=30LWjhZzg50',
    'react': 'https://www.youtube.com/watch?v=vz1RlUyrc3w&list=PLu71SKxNbfoDqgPchmvIsL4hTnJIrtige',
    'nextjs': 'https://www.youtube.com/watch?v=AR6eQCi_Me4&list=PLu71SKxNbfoDWGIwaEwhTUR40AbH8qsTo',
    'nodejs': 'https://www.youtube.com/playlist?list=PLu71SKxNbfoBGh_8p_NS-ZAh6v7HhYqHW',
    'express': 'https://www.youtube.com/playlist?list=PLu71SKxNbfoBGh_8p_NS-ZAh6v7HhYqHW',
    'mongo': 'https://www.youtube.com/playlist?list=PLu71SKxNbfoBGh_8p_NS-ZAh6v7HhYqHW',
    'postgres': 'https://www.youtube.com/watch?v=cnzka7kF5Zk',
    'prisma': 'https://www.youtube.com/watch?v=-_nz4q_Cyr4',
};

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
                    playlistUrl={PLAYLIST_URLS[slug]}
                />
                {/* Optional: Navigation to next topic */}
            </main>
        </div>
    );
}

export default PracticeTopicPage;
