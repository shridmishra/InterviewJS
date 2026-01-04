'use client';

import React from 'react';
import { ChevronDown, Trophy, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface UnitHeaderProps {
    title: string;
    subtitle?: string;
    unitNumber: number;
    totalLessons: number;
    completedLessons: number;
    isExpanded?: boolean;
    onToggle?: () => void;
    color?: string;
    className?: string;
}

export function UnitHeader({
    title,
    subtitle,
    unitNumber,
    totalLessons,
    completedLessons,
    isExpanded = true,
    onToggle,
    className,
}: UnitHeaderProps) {
    const progress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
    const isCompleted = completedLessons === totalLessons && totalLessons > 0;

    // Color based on completion
    const bgColor = isCompleted
        ? 'bg-duo-gold'
        : progress > 0
            ? 'bg-duo-green'
            : 'bg-duo-blue';

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
                'relative w-full max-w-2xl mx-auto rounded-2xl overflow-hidden',
                bgColor,
                'shadow-lg',
                className
            )}
            style={{
                boxShadow: `0 4px 0 rgba(0, 0, 0, 0.2)`,
            }}
        >
            <button
                onClick={onToggle}
                className="w-full p-4 text-left text-white"
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-full font-bold">
                            {isCompleted ? (
                                <Trophy className="w-5 h-5" />
                            ) : (
                                unitNumber
                            )}
                        </div>
                        <div>
                            <h3 className="font-bold text-lg leading-tight">{title}</h3>
                            {subtitle && (
                                <p className="text-sm text-white/80">{subtitle}</p>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium bg-white/20 px-2 py-1 rounded-full">
                            {completedLessons}/{totalLessons}
                        </span>
                        <ChevronDown
                            className={cn(
                                'w-5 h-5 transition-transform',
                                isExpanded && 'rotate-180'
                            )}
                        />
                    </div>
                </div>

                {/* Progress bar */}
                <div className="mt-3 h-2 bg-white/20 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className="h-full bg-white rounded-full"
                    />
                </div>
            </button>

            {/* Completion sparkle */}
            {isCompleted && (
                <div className="absolute top-2 right-2">
                    <Sparkles className="w-5 h-5 text-white animate-duo-pulse" />
                </div>
            )}
        </motion.div>
    );
}

export default UnitHeader;
