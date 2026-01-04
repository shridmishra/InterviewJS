'use client';

import React from 'react';
import { X, ChevronRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Hearts } from '@/components/gamification/Hearts';
import { XpBadge } from '@/components/gamification/XpBadge';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface LessonWrapperProps {
    title: string;
    currentStep: number;
    totalSteps: number;
    hearts: number;
    maxHearts?: number;
    xp?: number;
    onClose: () => void;
    onNext: () => void;
    onSkip?: () => void;
    canProgress: boolean;
    isLastStep?: boolean;
    children: React.ReactNode;
    feedbackArea?: React.ReactNode;
    className?: string;
}

export function LessonWrapper({
    title,
    currentStep,
    totalSteps,
    hearts,
    maxHearts = 5,
    xp = 0,
    onClose,
    onNext,
    onSkip,
    canProgress,
    isLastStep = false,
    children,
    feedbackArea,
    className,
}: LessonWrapperProps) {
    const progress = ((currentStep) / totalSteps) * 100;

    return (
        <div className={cn('fixed inset-0 z-[100] bg-background flex flex-col', className)}>
            {/* Header with Progress */}
            <header className="px-4 py-3 flex items-center gap-4 border-b">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="rounded-full shrink-0 text-muted-foreground hover:text-foreground"
                >
                    <X className="h-5 w-5" />
                </Button>

                {/* Progress Bar */}
                <div className="flex-1 h-4 bg-muted rounded-full overflow-hidden relative">
                    <motion.div
                        className="h-full bg-duo-green rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                    />
                </div>

                {/* Hearts */}
                <Hearts current={hearts} max={maxHearts} size="sm" showCount={false} />

                {/* XP Counter */}
                {xp > 0 && (
                    <div className="flex items-center gap-1 text-xp font-bold text-sm">
                        <Zap className="w-4 h-4" />
                        {xp}
                    </div>
                )}
            </header>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto px-4 py-6 md:px-8">
                <div className="max-w-2xl mx-auto">
                    {children}
                </div>
            </main>

            {/* Feedback Area (encouragement, hints, etc.) */}
            {feedbackArea && (
                <div className="px-4 py-3 border-t bg-muted/50">
                    <div className="max-w-2xl mx-auto">
                        {feedbackArea}
                    </div>
                </div>
            )}

            {/* Footer with Actions */}
            <footer className="border-t p-4 bg-background">
                <div className="max-w-2xl mx-auto flex justify-between items-center gap-4">
                    {onSkip && (
                        <Button
                            variant="ghost"
                            onClick={onSkip}
                            className="text-muted-foreground"
                        >
                            Skip
                        </Button>
                    )}

                    <div className="flex-1" />

                    <Button
                        onClick={onNext}
                        disabled={!canProgress}
                        className={cn(
                            'px-8 h-12 rounded-xl font-bold text-base min-w-[140px]',
                            canProgress ? 'btn-duo btn-duo-green' : 'bg-muted text-muted-foreground'
                        )}
                    >
                        {isLastStep ? 'Finish' : 'Check'}
                        <ChevronRight className="w-5 h-5 ml-1" />
                    </Button>
                </div>
            </footer>
        </div>
    );
}

export default LessonWrapper;
