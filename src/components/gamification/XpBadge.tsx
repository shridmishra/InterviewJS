'use client';

import React, { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface XpBadgeProps {
    amount: number;
    showAnimation?: boolean;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export function XpBadge({
    amount,
    showAnimation = false,
    size = 'md',
    className,
}: XpBadgeProps) {
    const sizeClasses = {
        sm: 'text-xs px-2 py-0.5',
        md: 'text-sm px-3 py-1',
        lg: 'text-base px-4 py-1.5',
    };

    const iconSizes = {
        sm: 'w-3 h-3',
        md: 'w-4 h-4',
        lg: 'w-5 h-5',
    };

    return (
        <div
            className={cn(
                'inline-flex items-center gap-1 font-bold rounded-full',
                'bg-xp text-white',
                sizeClasses[size],
                showAnimation && 'animate-duo-pop',
                className
            )}
        >
            <Zap className={cn(iconSizes[size], 'fill-current')} />
            <span className="tabular-nums">{amount}</span>
            <span className="font-medium">XP</span>
        </div>
    );
}

interface XpGainProps {
    amount: number;
    onComplete?: () => void;
}

export function XpGain({ amount, onComplete }: XpGainProps) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onComplete?.();
        }, 800);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-50">
            <div className="animate-xp-float">
                <XpBadge amount={amount} size="lg" />
            </div>
        </div>
    );
}

interface XpCounterProps {
    current: number;
    total?: number;
    level?: number;
    showLevel?: boolean;
    className?: string;
}

export function XpCounter({
    current,
    total = 100,
    level = 1,
    showLevel = true,
    className,
}: XpCounterProps) {
    const [displayValue, setDisplayValue] = useState(current);
    const progress = (current / total) * 100;

    useEffect(() => {
        // Animate the counter
        const start = displayValue;
        const end = current;
        const duration = 500;
        const startTime = Date.now();

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
            setDisplayValue(Math.round(start + (end - start) * eased));

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [current]);

    return (
        <div className={cn('flex items-center gap-3', className)}>
            {showLevel && (
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-duo-blue text-white font-bold text-sm">
                    {level}
                </div>
            )}
            <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-muted-foreground">
                        Level {level}
                    </span>
                    <span className="text-sm font-bold text-xp tabular-nums">
                        {displayValue} / {total} XP
                    </span>
                </div>
                <div className="progress-duo">
                    <div
                        className="progress-duo-fill animate-progress-fill"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        </div>
    );
}

export default XpBadge;
