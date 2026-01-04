'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Trophy, ChevronUp, ChevronDown, Minus, Crown, Medal, Award, Zap } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export type League = 'bronze' | 'silver' | 'gold' | 'sapphire' | 'ruby' | 'emerald' | 'amethyst' | 'pearl' | 'obsidian' | 'diamond';

export interface LeaderboardUser {
    id: string;
    name: string;
    avatar?: string;
    xp: number;
    rank: number;
    previousRank?: number;
    isCurrentUser?: boolean;
}

const leagueColors: Record<League, { bg: string; text: string; icon: string }> = {
    bronze: { bg: 'bg-amber-700/20', text: 'text-amber-600', icon: '🥉' },
    silver: { bg: 'bg-gray-400/20', text: 'text-gray-400', icon: '🥈' },
    gold: { bg: 'bg-yellow-500/20', text: 'text-yellow-500', icon: '🥇' },
    sapphire: { bg: 'bg-blue-500/20', text: 'text-blue-500', icon: '💎' },
    ruby: { bg: 'bg-red-500/20', text: 'text-red-500', icon: '❤️‍🔥' },
    emerald: { bg: 'bg-emerald-500/20', text: 'text-emerald-500', icon: '💚' },
    amethyst: { bg: 'bg-purple-500/20', text: 'text-purple-500', icon: '💜' },
    pearl: { bg: 'bg-pink-200/20', text: 'text-pink-300', icon: '🦪' },
    obsidian: { bg: 'bg-slate-800/50', text: 'text-slate-300', icon: '🖤' },
    diamond: { bg: 'bg-cyan-400/20', text: 'text-cyan-400', icon: '💠' },
};

interface LeaderboardProps {
    users: LeaderboardUser[];
    currentLeague: League;
    daysRemaining: number;
    promotionZone?: number;
    demotionZone?: number;
    className?: string;
}

export function Leaderboard({
    users,
    currentLeague,
    daysRemaining,
    promotionZone = 3,
    demotionZone = 3,
    className,
}: LeaderboardProps) {
    const leagueStyle = leagueColors[currentLeague];
    const sortedUsers = [...users].sort((a, b) => a.rank - b.rank);

    const getRankIcon = (rank: number) => {
        if (rank === 1) return <Crown className="w-5 h-5 text-duo-gold fill-duo-gold" />;
        if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
        if (rank === 3) return <Award className="w-5 h-5 text-amber-600" />;
        return <span className="w-5 text-center font-bold text-muted-foreground">{rank}</span>;
    };

    const getRankChange = (user: LeaderboardUser) => {
        if (!user.previousRank) return null;
        const change = user.previousRank - user.rank;
        if (change > 0) return { type: 'up', value: change };
        if (change < 0) return { type: 'down', value: Math.abs(change) };
        return { type: 'same', value: 0 };
    };

    const getZone = (rank: number) => {
        if (rank <= promotionZone) return 'promotion';
        if (rank > users.length - demotionZone) return 'demotion';
        return 'neutral';
    };

    return (
        <div className={cn('space-y-4', className)}>
            {/* League header */}
            <div className={cn(
                'rounded-2xl p-4 text-center',
                leagueStyle.bg,
            )}>
                <div className="text-4xl mb-2">{leagueStyle.icon}</div>
                <h2 className={cn('text-xl font-bold capitalize', leagueStyle.text)}>
                    {currentLeague} League
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                    {daysRemaining} day{daysRemaining !== 1 ? 's' : ''} remaining
                </p>
            </div>

            {/* Zone indicators */}
            <div className="flex justify-between text-xs text-muted-foreground px-2">
                <div className="flex items-center gap-1 text-duo-green">
                    <ChevronUp className="w-4 h-4" />
                    Top {promotionZone} promote
                </div>
                <div className="flex items-center gap-1 text-duo-red">
                    <ChevronDown className="w-4 h-4" />
                    Bottom {demotionZone} demote
                </div>
            </div>

            {/* Rankings */}
            <div className="space-y-2">
                {sortedUsers.map((user, index) => {
                    const rankChange = getRankChange(user);
                    const zone = getZone(user.rank);

                    return (
                        <motion.div
                            key={user.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className={cn(
                                'flex items-center gap-3 p-3 rounded-xl border-2 transition-all',
                                user.isCurrentUser && 'bg-primary/10 border-primary',
                                !user.isCurrentUser && 'bg-card border-transparent',
                                zone === 'promotion' && !user.isCurrentUser && 'border-l-4 border-l-duo-green',
                                zone === 'demotion' && !user.isCurrentUser && 'border-l-4 border-l-duo-red',
                            )}
                        >
                            {/* Rank */}
                            <div className="w-8 flex justify-center">
                                {getRankIcon(user.rank)}
                            </div>

                            {/* Avatar */}
                            <Avatar className="w-10 h-10">
                                <AvatarFallback className={cn(
                                    'font-bold',
                                    user.isCurrentUser ? 'bg-primary text-primary-foreground' : 'bg-muted'
                                )}>
                                    {user.name.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>

                            {/* Name */}
                            <div className="flex-1 min-w-0">
                                <p className={cn(
                                    'font-medium truncate',
                                    user.isCurrentUser && 'font-bold'
                                )}>
                                    {user.name}
                                    {user.isCurrentUser && <span className="text-primary ml-1">(You)</span>}
                                </p>
                            </div>

                            {/* Rank change */}
                            {rankChange && (
                                <div className="flex items-center">
                                    {rankChange.type === 'up' && (
                                        <span className="flex items-center text-duo-green text-sm">
                                            <ChevronUp className="w-4 h-4" />
                                            {rankChange.value}
                                        </span>
                                    )}
                                    {rankChange.type === 'down' && (
                                        <span className="flex items-center text-duo-red text-sm">
                                            <ChevronDown className="w-4 h-4" />
                                            {rankChange.value}
                                        </span>
                                    )}
                                    {rankChange.type === 'same' && (
                                        <Minus className="w-4 h-4 text-muted-foreground" />
                                    )}
                                </div>
                            )}

                            {/* XP */}
                            <div className="flex items-center gap-1 text-xp font-bold">
                                <Zap className="w-4 h-4" />
                                <span>{user.xp}</span>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}

// Sample leaderboard data
export const SAMPLE_LEADERBOARD: LeaderboardUser[] = [
    { id: '1', name: 'CodeMaster', xp: 1250, rank: 1, previousRank: 2 },
    { id: '2', name: 'DevNinja', xp: 1180, rank: 2, previousRank: 1 },
    { id: '3', name: 'ByteWizard', xp: 1050, rank: 3, previousRank: 3 },
    { id: '4', name: 'You', xp: 980, rank: 4, previousRank: 6, isCurrentUser: true },
    { id: '5', name: 'ScriptKid', xp: 920, rank: 5, previousRank: 4 },
    { id: '6', name: 'WebDev101', xp: 850, rank: 6, previousRank: 5 },
    { id: '7', name: 'ReactRookie', xp: 720, rank: 7, previousRank: 8 },
    { id: '8', name: 'JSLearner', xp: 680, rank: 8, previousRank: 7 },
    { id: '9', name: 'CSSCrafter', xp: 540, rank: 9, previousRank: 9 },
    { id: '10', name: 'HTMLHero', xp: 420, rank: 10, previousRank: 10 },
];

export default Leaderboard;
