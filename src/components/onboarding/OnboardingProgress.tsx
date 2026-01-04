'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface OnboardingProgressProps {
    currentStep: number;
    totalSteps: number;
    className?: string;
}

export function OnboardingProgress({ currentStep, totalSteps, className }: OnboardingProgressProps) {
    return (
        <div className={cn('flex items-center justify-center gap-2', className)}>
            {Array.from({ length: totalSteps }).map((_, index) => (
                <div key={index} className="flex items-center">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className={cn(
                            'w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all',
                            index < currentStep && 'bg-duo-green text-white',
                            index === currentStep && 'bg-duo-green text-white ring-4 ring-duo-green/30',
                            index > currentStep && 'bg-muted text-muted-foreground'
                        )}
                    >
                        {index < currentStep ? (
                            <Check className="w-5 h-5" />
                        ) : (
                            index + 1
                        )}
                    </motion.div>
                    {index < totalSteps - 1 && (
                        <div className={cn(
                            'w-8 h-1 mx-1 rounded-full transition-all',
                            index < currentStep ? 'bg-duo-green' : 'bg-muted'
                        )} />
                    )}
                </div>
            ))}
        </div>
    );
}

export default OnboardingProgress;
