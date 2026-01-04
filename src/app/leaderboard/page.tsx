'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Leaderboard, LeaderboardUser } from '@/components/leaderboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/button';
import { Trophy, ChevronLeft, Info } from 'lucide-react';
import { Hearts } from '@/components/gamification/Hearts';
import { StreakFlame } from '@/components/gamification/StreakFlame';
import { XpBadge } from '@/components/gamification/XpBadge';
import { useAuth } from '@/context/AuthContext';

export default function LeaderboardPage() {
    const router = useRouter();
    const { user, isAuthenticated } = useAuth();
    const [leaderboardData, setLeaderboardData] = React.useState<LeaderboardUser[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);

    const handleNavigate = (page: 'profile' | 'list' | '' | 'quiz') => {
        router.push(`/${page}`);
    };

    React.useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const res = await fetch('/api/leaderboard');
                if (res.ok) {
                    const data = await res.json();
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const mappedData: LeaderboardUser[] = data.map((u: any, index: number) => ({
                        id: u._id || index.toString(),
                        name: u.username,
                        avatar: u.image,
                        xp: u.xp || 0,
                        rank: index + 1,
                        isCurrentUser: user?.email === u.email // Fallback check
                    }));
                    setLeaderboardData(mappedData);
                }
            } catch (error) {
                console.error('Failed to fetch leaderboard:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (isAuthenticated) {
            fetchLeaderboard();
        }
    }, [isAuthenticated, user]);

    // Calculate user stats for the top bar
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const userWithStats = user as any;

    const userStats = {
        hearts: 5, // TODO: Fetch dynamic hearts if needed, defaulting to 5 for now as per schema default
        streak: userWithStats?.streak || 0,
        xp: userWithStats?.xp || 0
    };

    return (
        <div className="min-h-screen bg-background">


            <main className="container mx-auto px-4 py-6 max-w-2xl">
                {/* Back button */}
                <Button
                    variant="ghost"
                    onClick={() => router.back()}
                    className="mb-4 -ml-2"
                >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Back
                </Button>

                {/* Page header */}
                <div className="text-center mb-6">
                    <Trophy className="w-12 h-12 mx-auto mb-2 text-duo-gold" />
                    <h1 className="text-3xl font-bold">Leaderboard</h1>
                    <p className="text-muted-foreground">Compete weekly to earn your place</p>
                </div>

                {/* Stats bar */}
                <Card className="mb-6">
                    <CardContent className="p-4 flex items-center justify-around">
                        <Hearts current={userStats.hearts} max={5} size="sm" />
                        <StreakFlame count={userStats.streak} size="md" />
                        <XpBadge amount={userStats.xp} size="md" />
                    </CardContent>
                </Card>

                {/* Info card */}
                <Card className="mb-6 bg-duo-blue/10 border-duo-blue/30">
                    <CardContent className="p-4 flex items-start gap-3">
                        <Info className="w-5 h-5 text-duo-blue shrink-0 mt-0.5" />
                        <div className="text-sm">
                            <p className="font-medium text-duo-blue">How it works</p>
                            <p className="text-muted-foreground">
                                Earn XP by completing lessons. Top 3 promote to the next league.
                                Bottom 3 get demoted. Compete weekly!
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Leaderboard */}
                {isLoading ? (
                    <div className="text-center py-10">Loading leaderboard...</div>
                ) : (
                    <Leaderboard
                        users={leaderboardData.length > 0 ? leaderboardData : []}
                        currentLeague="gold" // TODO: Make dynamic later
                        daysRemaining={4}
                        promotionZone={3}
                        demotionZone={3}
                    />
                )}
            </main>
        </div>
    );
}
