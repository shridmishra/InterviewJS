'use client';

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { LearningPath, Unit } from '@/components/learningPath';
import { Hearts, XpCounter, StreakFlame } from '@/components/gamification';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/button';
import {
    Target,
    Trophy,
    Users,
    Flame,
    ChevronRight,
    Zap,
    BookOpen,
} from 'lucide-react';
import { useChallenges } from '@/hooks/useChallenges';
import { ProblemStatus } from '@/types';

// Sample data - this would come from your backend in production
function generateUnitsFromProblems(problems: any[], slug: string): Unit[] {
    // Group problems by category
    const categories = Array.from(new Set(problems.map((p: any) => p.category)));

    // If no categories found (e.g. empty problems or missing category field), 
    // we might want to fallback or handle it. 
    // For now, let's assume if there are problems, there are categories.
    if (categories.length === 0 && problems.length > 0) {
        // Fallback for problems without category
        return [{
            id: 'unit-0',
            title: 'General',
            subtitle: `${problems.length} lessons`,
            lessons: problems.map((p: any, i: number) => ({
                id: p.id,
                title: p.title,
                state: p.status === ProblemStatus.Solved ? 'completed' : (i === 0 ? 'available' : 'locked'),
                type: 'lesson',
                progress: p.status === ProblemStatus.Attempted ? 50 : 0
            }))
        }];
    }

    return categories.map((category, index) => {
        const categoryProblems = problems.filter((p: any) => p.category === category);

        return {
            id: `unit-${index}`,
            title: category as string,
            subtitle: `${categoryProblems.length} lessons`,
            lessons: categoryProblems.map((p: any, lessonIndex: number) => {
                let state: 'locked' | 'available' | 'current' | 'completed' = 'locked';

                if (p.status === ProblemStatus.Solved) {
                    state = 'completed';
                } else if (p.status === ProblemStatus.Attempted) {
                    state = 'current';
                } else if (lessonIndex === 0 || categoryProblems[lessonIndex - 1]?.status === ProblemStatus.Solved) {
                    state = 'available';
                }

                return {
                    id: p.id,
                    title: p.title,
                    state,
                    type: lessonIndex === categoryProblems.length - 1 ? 'boss' as const : 'lesson' as const,
                    progress: p.status === ProblemStatus.Attempted ? 50 : 0,
                };
            }),
        };
    });
}

// Daily Quests Component
function DailyQuests() {
    const quests = [
        { id: 1, title: 'Complete 1 lesson', progress: 0, goal: 1, xp: 10 },
        { id: 2, title: 'Earn 50 XP', progress: 25, goal: 50, xp: 15 },
        { id: 3, title: 'Get 3 perfect scores', progress: 1, goal: 3, xp: 20 },
    ];

    return (
        <Card>
            <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                    <Target className="w-5 h-5 text-duo-blue" />
                    Daily Quests
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                {quests.map((quest) => (
                    <div key={quest.id} className="space-y-1.5">
                        <div className="flex items-center justify-between text-sm">
                            <span>{quest.title}</span>
                            <span className="text-xp font-bold flex items-center gap-1">
                                <Zap className="w-3 h-3" />
                                +{quest.xp}
                            </span>
                        </div>
                        <div className="progress-duo h-2">
                            <div
                                className="progress-duo-fill"
                                style={{ width: `${(quest.progress / quest.goal) * 100}%` }}
                            />
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}

// Leaderboard Preview Component
function LeaderboardPreview() {
    const leaders = [
        { rank: 1, name: 'Alex', xp: 1250 },
        { rank: 2, name: 'Sam', xp: 1100 },
        { rank: 3, name: 'Jordan', xp: 980 },
    ];

    return (
        <Card>
            <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                    <Trophy className="w-5 h-5 text-duo-gold" />
                    Weekly Leaderboard
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                {leaders.map((leader) => (
                    <div
                        key={leader.rank}
                        className="flex items-center justify-between py-2 px-3 rounded-lg bg-muted/50"
                    >
                        <div className="flex items-center gap-3">
                            <span className="font-bold text-sm w-6">{leader.rank}</span>
                            <div className="w-8 h-8 rounded-full bg-duo-blue flex items-center justify-center text-white font-bold text-sm">
                                {leader.name.charAt(0)}
                            </div>
                            <span className="font-medium">{leader.name}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{leader.xp} XP</span>
                    </div>
                ))}
                <Button variant="ghost" className="w-full mt-2 text-duo-blue">
                    View All <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
            </CardContent>
        </Card>
    );
}

export default function LearnTopicPage() {
    const router = useRouter();
    const params = useParams();
    const slug = params.slug as string;

    // We can assume slug is valid or handle 404 if problems are empty?
    const { problems, isLoading } = useChallenges(slug);

    // Generate units from problems
    const units = React.useMemo(() => generateUnitsFromProblems(problems, slug), [problems, slug]);

    const handleLessonClick = (lessonId: string, unitId: string) => {
        router.push(`/learn/${slug}/${lessonId}`);
    };

    const handleNavigate = (page: 'profile' | 'list' | '' | 'quiz') => {
        router.push(`/${page}`);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">


            <main className="container mx-auto px-4 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Sidebar - Stats, Quests, Leaderboard */}
                    <aside className="hidden lg:block lg:col-span-4 space-y-6">
                        <Card>
                            <CardContent className="p-4 space-y-4">
                                <div className="flex items-center justify-between">
                                    <Hearts current={5} max={5} size="md" />
                                    <StreakFlame count={7} size="md" />
                                </div>
                                <XpCounter current={250} total={500} level={3} />
                            </CardContent>
                        </Card>

                        <DailyQuests />
                        <LeaderboardPreview />
                    </aside>

                    {/* Main Content - Learning Path */}
                    <div className="lg:col-span-8">
                        {/* Mobile Stats Bar */}
                        <div className="lg:hidden mb-6">
                            <Card>
                                <CardContent className="p-4 flex items-center justify-between">
                                    <Hearts current={5} max={5} size="sm" />
                                    <StreakFlame count={7} size="sm" />
                                    <div className="flex items-center gap-1">
                                        <Zap className="w-4 h-4 text-xp" />
                                        <span className="font-bold text-sm">250</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="mb-6 text-center">
                            <h1 className="text-2xl font-bold capitalize">{slug === 'js' ? 'JavaScript' : slug === 'ts' ? 'TypeScript' : slug} Path</h1>
                        </div>

                        <LearningPath
                            units={units}
                            onLessonClick={handleLessonClick}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}
