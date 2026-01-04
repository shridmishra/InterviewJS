'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Lock, Check, Star, Flame, Zap, Trophy, Target, Code2, Calendar, Crown } from 'lucide-react';

export interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: 'streak' | 'xp' | 'problems' | 'perfect' | 'beginner' | 'intermediate' | 'advanced' | 'dedication' | 'champion';
    progress: number;
    goal: number;
    isUnlocked: boolean;
    unlockedAt?: Date;
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

const iconMap = {
    streak: Flame,
    xp: Zap,
    problems: Code2,
    perfect: Star,
    beginner: Target,
    intermediate: Trophy,
    advanced: Crown,
    dedication: Calendar,
    champion: Trophy,
};

const rarityColors = {
    common: 'bg-muted border-muted-foreground/30',
    rare: 'bg-duo-blue/10 border-duo-blue',
    epic: 'bg-duo-purple/10 border-duo-purple',
    legendary: 'bg-duo-gold/10 border-duo-gold',
};

const rarityGlow = {
    common: '',
    rare: 'shadow-duo-blue/20',
    epic: 'shadow-duo-purple/20',
    legendary: 'shadow-duo-gold/30 animate-duo-pulse',
};

interface AchievementBadgeProps {
    achievement: Achievement;
    size?: 'sm' | 'md' | 'lg';
    showProgress?: boolean;
    onClick?: () => void;
}

export function AchievementBadge({
    achievement,
    size = 'md',
    showProgress = true,
    onClick,
}: AchievementBadgeProps) {
    const Icon = iconMap[achievement.icon];
    const progress = achievement.goal > 0 ? (achievement.progress / achievement.goal) * 100 : 0;

    const sizeClasses = {
        sm: 'w-14 h-14',
        md: 'w-20 h-20',
        lg: 'w-28 h-28',
    };

    const iconSizes = {
        sm: 'w-6 h-6',
        md: 'w-8 h-8',
        lg: 'w-12 h-12',
    };

    return (
        <motion.button
            onClick={onClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
                'relative rounded-full flex items-center justify-center border-2 transition-all',
                sizeClasses[size],
                achievement.isUnlocked
                    ? rarityColors[achievement.rarity]
                    : 'bg-muted/50 border-muted-foreground/20',
                achievement.isUnlocked && `shadow-lg ${rarityGlow[achievement.rarity]}`,
                !achievement.isUnlocked && 'opacity-50 grayscale',
            )}
        >
            {/* Progress ring */}
            {!achievement.isUnlocked && showProgress && (
                <svg
                    className="absolute inset-0 w-full h-full -rotate-90"
                    viewBox="0 0 100 100"
                >
                    <circle
                        cx="50"
                        cy="50"
                        r="46"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        className="text-muted-foreground/20"
                    />
                    <circle
                        cx="50"
                        cy="50"
                        r="46"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        className="text-duo-green"
                        strokeDasharray={`${2 * Math.PI * 46}`}
                        strokeDashoffset={`${2 * Math.PI * 46 * (1 - progress / 100)}`}
                        strokeLinecap="round"
                    />
                </svg>
            )}

            {/* Icon */}
            <div className={cn(
                'relative z-10',
                achievement.isUnlocked
                    ? achievement.rarity === 'legendary'
                        ? 'text-duo-gold'
                        : achievement.rarity === 'epic'
                            ? 'text-duo-purple'
                            : achievement.rarity === 'rare'
                                ? 'text-duo-blue'
                                : 'text-foreground'
                    : 'text-muted-foreground'
            )}>
                {achievement.isUnlocked ? (
                    <Icon className={iconSizes[size]} />
                ) : (
                    <Lock className={iconSizes[size]} />
                )}
            </div>

            {/* Unlocked checkmark */}
            {achievement.isUnlocked && (
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-duo-green rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                </div>
            )}
        </motion.button>
    );
}

interface AchievementCardProps {
    achievement: Achievement;
    onClick?: () => void;
}

export function AchievementCard({ achievement, onClick }: AchievementCardProps) {
    const Icon = iconMap[achievement.icon];
    const progress = achievement.goal > 0 ? (achievement.progress / achievement.goal) * 100 : 0;

    return (
        <motion.div
            onClick={onClick}
            whileHover={{ scale: 1.02 }}
            className={cn(
                'p-4 rounded-2xl border-2 cursor-pointer transition-all',
                achievement.isUnlocked
                    ? rarityColors[achievement.rarity]
                    : 'bg-muted/30 border-muted-foreground/20 opacity-70',
            )}
        >
            <div className="flex items-center gap-4">
                <AchievementBadge achievement={achievement} size="sm" showProgress={false} />
                <div className="flex-1 min-w-0">
                    <h3 className={cn(
                        'font-bold truncate',
                        !achievement.isUnlocked && 'text-muted-foreground'
                    )}>
                        {achievement.title}
                    </h3>
                    <p className="text-sm text-muted-foreground truncate">
                        {achievement.description}
                    </p>
                    {!achievement.isUnlocked && (
                        <div className="mt-2">
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-duo-green rounded-full transition-all"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                                {achievement.progress} / {achievement.goal}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

// Sample achievements data
export const ACHIEVEMENTS: Achievement[] = [
    {
        id: 'first-solve',
        title: 'First Steps',
        description: 'Solve your first problem',
        icon: 'beginner',
        progress: 1,
        goal: 1,
        isUnlocked: true,
        rarity: 'common',
    },
    {
        id: 'streak-7',
        title: 'Week Warrior',
        description: 'Maintain a 7-day streak',
        icon: 'streak',
        progress: 7,
        goal: 7,
        isUnlocked: true,
        rarity: 'rare',
    },
    {
        id: 'streak-30',
        title: 'Monthly Master',
        description: 'Maintain a 30-day streak',
        icon: 'streak',
        progress: 15,
        goal: 30,
        isUnlocked: false,
        rarity: 'epic',
    },
    {
        id: 'xp-1000',
        title: 'XP Hunter',
        description: 'Earn 1,000 XP',
        icon: 'xp',
        progress: 850,
        goal: 1000,
        isUnlocked: false,
        rarity: 'rare',
    },
    {
        id: 'perfect-10',
        title: 'Perfectionist',
        description: 'Get 10 perfect lesson scores',
        icon: 'perfect',
        progress: 4,
        goal: 10,
        isUnlocked: false,
        rarity: 'rare',
    },
    {
        id: 'problems-100',
        title: 'Code Centurion',
        description: 'Solve 100 problems',
        icon: 'problems',
        progress: 62,
        goal: 100,
        isUnlocked: false,
        rarity: 'epic',
    },
    {
        id: 'streak-365',
        title: 'Legendary Learner',
        description: 'Maintain a 365-day streak',
        icon: 'champion',
        progress: 15,
        goal: 365,
        isUnlocked: false,
        rarity: 'legendary',
    },
];

export default AchievementBadge;
