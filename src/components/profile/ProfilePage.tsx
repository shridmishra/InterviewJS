
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/Progress";
import ContributionGraph from '../progress/ContributionGraph';
import DifficultyProgressBar from '../progress/DifficultyProgressBar';
import {
    CalendarDays,
    Flame,
    Target,
    History,
    CheckCircle2,
    Activity,
    Medal,
    Code2,
    BookOpen,
    ChevronDown,
    ChevronUp
} from 'lucide-react';
import { Button } from "@/components/ui/button";

interface TopicStat {
    name: string;
    total: number;
    solved: number;
    slug: string;
}

interface PracticeHistoryItem {
    problemId: string;
    title: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    topic: string;
    solvedAt: Date;
    isCorrect: boolean;
}

interface ProfileData {
    solvedCount: number;
    totalCount: number;
    easySolved: number;
    mediumSolved: number;
    hardSolved: number;
    contributions: { [date: string]: number };
    streak: number;
    highestStreak: number;
    joinDate: string;
    practiceHistory: PracticeHistoryItem[];
    topicStats: TopicStat[];
}

const formatDateToRelativeTime = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 604800;
    if (interval > 1) return Math.floor(interval) + " weeks ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
};

const ProfilePage: React.FC = () => {
    const auth = useAuth();
    const [profileData, setProfileData] = useState<ProfileData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isTopicsExpanded, setIsTopicsExpanded] = useState(false);
    const [isHistoryExpanded, setIsHistoryExpanded] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            if (!auth.isAuthenticated) return;
            setIsLoading(true);
            try {
                const res = await fetch('/api/user/profile');
                if (res.ok) {
                    const data = await res.json();
                    setProfileData(data);
                }
            } catch (_error) {
                console.error(_error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, [auth.isAuthenticated]);

    if (!auth.isAuthenticated || !auth.user) {
        return <div className="min-h-screen bg-background" />;
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="h-12 w-12 bg-muted rounded-full mb-4"></div>
                    <div className="h-4 w-32 bg-muted rounded"></div>
                </div>
            </div>
        );
    }

    if (!profileData) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <p className="text-muted-foreground">Could not load profile data.</p>
            </div>
        );
    }

    const { solvedCount, totalCount, easySolved, mediumSolved, hardSolved, contributions, streak, highestStreak, joinDate, practiceHistory, topicStats } = profileData;
    const totalSubmissions = Object.values(contributions).reduce((a, b) => a + b, 0);

    return (
        <div className="min-h-screen bg-background text-foreground space-y-8 pb-10">
            <div className="max-w-6xl mx-auto space-y-8">

                {/* Header Section */}
                <Card className="overflow-hidden py-0 my-6 border-none shadow-md rounded-none md:rounded-xl">
                    <div className="h-32 bg-gradient-to-r from-primary/10 via-primary/5 to-background relative">
                        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
                    </div>
                    <CardContent className="relative pt-0 px-6 pb-6">
                        <div className="flex flex-col md:flex-row items-start md:items-end -mt-12 gap-6">
                            <Avatar className="w-32 h-32 border-4 border-background shadow-xl">
                                <AvatarFallback className="text-4xl font-bold bg-yellow-300 text-primary-foreground">
                                    {auth.user.name ? auth.user.name.charAt(0).toUpperCase() : 'U'}
                                </AvatarFallback>
                            </Avatar>

                            <div className="flex-1 space-y-2 mb-2">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div>
                                        <h1 className="text-3xl font-bold tracking-tight">{auth.user.name}</h1>
                                        <p className="text-muted-foreground">{auth.user.email}</p>
                                    </div>

                                </div>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <CalendarDays className="w-4 h-4" />
                                        <span>Joined {new Date(joinDate).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Main Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card>
                        <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-4">
                            <div className="p-3 bg-primary/10 rounded-full">
                                <Target className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold mb-4">{solvedCount} <span className="text-sm text-muted-foreground font-normal">/ {totalCount}</span></div>
                                <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Problems Solved</div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-4">
                            <div className="p-3 bg-orange-500/10 rounded-full">
                                <Flame className="w-6 h-6 text-orange-500" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold mb-4">{streak}</div>
                                <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Day Streak</div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-4">
                            <div className="p-3 bg-blue-500/10 rounded-full">
                                <Activity className="w-6 h-6 text-blue-500" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold mb-4">{totalSubmissions}</div>
                                <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Total Submissions</div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-4">
                            <div className="p-3 bg-yellow-500/10 rounded-full">
                                <Medal className="w-6 h-6 text-yellow-500" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold mb-4">{highestStreak}</div>
                                <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Best Streak</div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Topic Progress Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BookOpen className="w-5 h-5" />
                                Topic Progress
                            </CardTitle>
                            <CardDescription>
                                Your mastery across different technical topics
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {(isTopicsExpanded ? topicStats : topicStats.slice(0, 5)).map((topic) => (
                                <div key={topic.slug} className="space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2 font-medium">
                                            <Code2 className="w-4 h-4 text-muted-foreground" />
                                            {topic.name}
                                        </div>
                                        <span className="text-muted-foreground">
                                            {topic.solved} / {topic.total}
                                        </span>
                                    </div>
                                    <Progress value={(topic.solved / topic.total) * 100} className="h-2" />
                                </div>
                            ))}
                            {topicStats.length > 5 && (
                                <Button
                                    variant="ghost"
                                    className="w-full mt-4"
                                    onClick={() => setIsTopicsExpanded(!isTopicsExpanded)}
                                >
                                    {isTopicsExpanded ? (
                                        <>
                                            See Less <ChevronUp className="ml-2 h-4 w-4" />
                                        </>
                                    ) : (
                                        <>
                                            See More <ChevronDown className="ml-2 h-4 w-4" />
                                        </>
                                    )}
                                </Button>
                            )}
                        </CardContent>
                    </Card>

                    {/* Recent History */}
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <History className="w-5 h-5" />
                                Recent Solves
                            </CardTitle>
                            <CardDescription>
                                Your latest solved problems
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {practiceHistory && practiceHistory.length > 0 ? (
                                <div className="space-y-3">
                                    {(isHistoryExpanded ? practiceHistory : practiceHistory.slice(0, 5)).map((item, index) => (
                                        <div key={index} className="p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                                            <div className="flex items-start gap-3">
                                                <div className="mt-1 text-green-500">
                                                    <CheckCircle2 className="w-4 h-4" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-medium line-clamp-1 text-sm">{item.title}</p>
                                                    <div className="flex items-center gap-2 mt-1.5 text-xs text-muted-foreground flex-wrap">
                                                        <Badge variant="outline" className="text-[10px] h-5 px-1.5 bg-primary/10">
                                                            {item.topic}
                                                        </Badge>
                                                        <Badge
                                                            variant={item.difficulty === 'Easy' ? 'secondary' : item.difficulty === 'Medium' ? 'default' : 'destructive'}
                                                            className="text-[10px] h-5 px-1.5"
                                                        >
                                                            {item.difficulty}
                                                        </Badge>
                                                        <span>•</span>
                                                        <span>{formatDateToRelativeTime(new Date(item.solvedAt).toISOString())}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {practiceHistory.length > 5 && (
                                        <Button
                                            variant="ghost"
                                            className="w-full mt-2"
                                            onClick={() => setIsHistoryExpanded(!isHistoryExpanded)}
                                        >
                                            {isHistoryExpanded ? (
                                                <>
                                                    See Less <ChevronUp className="ml-2 h-4 w-4" />
                                                </>
                                            ) : (
                                                <>
                                                    See More <ChevronDown className="ml-2 h-4 w-4" />
                                                </>
                                            )}
                                        </Button>
                                    )}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center p-8 text-muted-foreground">
                                    <History className="w-12 h-12 mb-4 opacity-20" />
                                    <p className="text-sm">No problems solved yet.</p>
                                    <p className="text-xs mt-2">Start practicing to see your progress!</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contribution Graph */}
                    <Card className="lg:col-span-2 flex flex-col">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Activity className="w-5 h-5" />
                                Activity Map
                            </CardTitle>
                            <CardDescription>
                                {totalSubmissions} submissions in the last year
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 flex items-center justify-center pb-8">
                            <ContributionGraph contributions={contributions} />
                        </CardContent>
                    </Card>

                    {/* Difficulty Breakdown */}
                    <Card className="h-full lg:col-span-1">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Target className="w-5 h-5" />
                                Difficulty Breakdown
                            </CardTitle>
                            <CardDescription>
                                Progress by difficulty level
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex justify-center py-4">
                                <DifficultyProgressBar easy={easySolved} medium={mediumSolved} hard={hardSolved} />
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="flex items-center gap-2 text-muted-foreground">
                                        <div className="w-2 h-2 rounded-full bg-green-500"></div> Easy
                                    </span>
                                    <span className="font-medium">{easySolved}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="flex items-center gap-2 text-muted-foreground">
                                        <div className="w-2 h-2 rounded-full bg-yellow-500"></div> Medium
                                    </span>
                                    <span className="font-medium">{mediumSolved}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="flex items-center gap-2 text-muted-foreground">
                                        <div className="w-2 h-2 rounded-full bg-red-500"></div> Hard
                                    </span>
                                    <span className="font-medium">{hardSolved}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
