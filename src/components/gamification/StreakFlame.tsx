'use client';

import React, { useState } from 'react';
import { Flame, Snowflake } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';

interface StreakFlameProps {
    count: number;
    hasFreezeActive?: boolean;
    freezesAvailable?: number;
    size?: 'sm' | 'md' | 'lg';
    showTooltip?: boolean;
    className?: string;
}

export function StreakFlame({
    count,
    hasFreezeActive = false,
    freezesAvailable = 0,
    size = 'md',
    showTooltip = true,
    className,
}: StreakFlameProps) {
    const sizeClasses = {
        sm: 'w-5 h-5',
        md: 'w-7 h-7',
        lg: 'w-10 h-10',
    };

    const textSizes = {
        sm: 'text-sm',
        md: 'text-lg',
        lg: 'text-2xl',
    };

    const FlameContent = (
        <div className={cn('flex items-center gap-1', className)}>
            <div className="relative">
                <Flame
                    className={cn(
                        sizeClasses[size],
                        'text-streak fill-streak transition-all',
                        count > 0 && 'animate-streak-flame'
                    )}
                />
                {hasFreezeActive && (
                    <Snowflake className="absolute -top-1 -right-1 w-3 h-3 text-duo-blue fill-duo-blue" />
                )}
            </div>
            <span
                className={cn(
                    'font-bold text-streak tabular-nums',
                    textSizes[size]
                )}
            >
                {count}
            </span>
        </div>
    );

    if (!showTooltip) {
        return FlameContent;
    }

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <button className="cursor-pointer hover:scale-105 transition-transform">
                        {FlameContent}
                    </button>
                </TooltipTrigger>
                <TooltipContent className="p-3">
                    <div className="space-y-2">
                        <p className="font-bold text-lg">{count} day streak! 🔥</p>
                        {hasFreezeActive && (
                            <p className="text-sm text-duo-blue flex items-center gap-1">
                                <Snowflake className="w-4 h-4" />
                                Streak freeze active
                            </p>
                        )}
                        {freezesAvailable > 0 && !hasFreezeActive && (
                            <p className="text-sm text-muted-foreground">
                                {freezesAvailable} streak freeze{freezesAvailable > 1 ? 's' : ''} available
                            </p>
                        )}
                        <p className="text-xs text-muted-foreground">
                            Practice daily to keep your streak!
                        </p>
                    </div>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}

// Streak calendar for profile page
interface StreakCalendarProps {
    streakDays: Date[];
    currentStreak: number;
    longestStreak: number;
}

export function StreakCalendar({
    streakDays,
    currentStreak,
    longestStreak,
}: StreakCalendarProps) {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());

    // Generate last 7 weeks
    const weeks = Array.from({ length: 7 }, (_, weekIndex) => {
        return Array.from({ length: 7 }, (_, dayIndex) => {
            const date = new Date(startOfWeek);
            date.setDate(startOfWeek.getDate() - (6 - weekIndex) * 7 + dayIndex);
            return date;
        });
    });

    const isStreakDay = (date: Date) => {
        return streakDays.some(
            (d) => d.toDateString() === date.toDateString()
        );
    };

    const isToday = (date: Date) => {
        return date.toDateString() === today.toDateString();
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Flame className="w-6 h-6 text-streak fill-streak animate-streak-flame" />
                    <span className="font-bold text-xl">{currentStreak}</span>
                    <span className="text-muted-foreground">day streak</span>
                </div>
                <div className="text-sm text-muted-foreground">
                    Longest: <span className="font-bold text-foreground">{longestStreak}</span> days
                </div>
            </div>

            <div className="flex gap-1">
                {weeks.map((week, weekIndex) => (
                    <div key={weekIndex} className="flex flex-col gap-1">
                        {week.map((date, dayIndex) => (
                            <div
                                key={dayIndex}
                                className={cn(
                                    'w-4 h-4 rounded-sm transition-colors',
                                    isStreakDay(date)
                                        ? 'bg-streak'
                                        : 'bg-muted',
                                    isToday(date) && 'ring-2 ring-foreground ring-offset-1'
                                )}
                                title={date.toLocaleDateString()}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default StreakFlame;
