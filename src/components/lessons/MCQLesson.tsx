'use client';

import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export interface MCQOption {
    id: string;
    text: string;
    isCorrect: boolean;
}

interface MCQLessonProps {
    question: string;
    options: MCQOption[];
    explanation?: string;
    onAnswer: (isCorrect: boolean, optionId: string) => void;
    isAnswered: boolean;
    selectedOptionId?: string;
    className?: string;
}

export function MCQLesson({
    question,
    options,
    explanation,
    onAnswer,
    isAnswered,
    selectedOptionId,
    className,
}: MCQLessonProps) {
    const handleSelect = (option: MCQOption) => {
        if (isAnswered) return;
        onAnswer(option.isCorrect, option.id);
    };

    const correctOption = options.find(o => o.isCorrect);

    return (
        <div className={cn('space-y-6', className)}>
            {/* Question */}
            <div>
                <h2 className="text-xl md:text-2xl font-bold leading-relaxed text-foreground">
                    {question}
                </h2>
            </div>

            {/* Options */}
            <div className="space-y-3">
                {options.map((option, index) => {
                    const isSelected = selectedOptionId === option.id;
                    const showCorrect = isAnswered && option.isCorrect;
                    const showIncorrect = isAnswered && isSelected && !option.isCorrect;

                    return (
                        <motion.button
                            key={option.id}
                            onClick={() => handleSelect(option)}
                            disabled={isAnswered}
                            whileTap={!isAnswered ? { scale: 0.98 } : undefined}
                            className={cn(
                                'w-full text-left p-4 rounded-2xl border-2 transition-all duration-200',
                                'font-medium relative',
                                // Default state
                                !isAnswered && !isSelected && 'border-border bg-card hover:border-primary/50 text-foreground',
                                // Selected (before answer)
                                !isAnswered && isSelected && 'border-primary bg-primary/10 text-foreground',
                                // Correct answer
                                showCorrect && 'border-duo-green bg-duo-green/10 text-duo-green',
                                // Incorrect answer
                                showIncorrect && 'border-duo-red bg-duo-red/10 text-duo-red',
                                // Dimmed unselected after answer
                                isAnswered && !showCorrect && !showIncorrect && 'border-border bg-muted/50 text-muted-foreground opacity-60'
                            )}
                            style={{
                                boxShadow: !isAnswered && isSelected
                                    ? '0 4px 0 var(--color-primary)'
                                    : showCorrect
                                        ? '0 4px 0 var(--duo-green-dark)'
                                        : showIncorrect
                                            ? '0 2px 0 var(--duo-red)'
                                            : 'none',
                            }}
                        >
                            <div className="flex items-center justify-between gap-3">
                                {/* Option letter */}
                                <div className={cn(
                                    'w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shrink-0',
                                    !isAnswered && 'bg-muted text-muted-foreground',
                                    showCorrect && 'bg-duo-green text-white',
                                    showIncorrect && 'bg-duo-red text-white',
                                    isAnswered && !showCorrect && !showIncorrect && 'bg-muted/50 text-muted-foreground',
                                )}>
                                    {showCorrect ? <Check className="w-4 h-4" /> :
                                        showIncorrect ? <X className="w-4 h-4" /> :
                                            String.fromCharCode(65 + index)}
                                </div>

                                {/* Option text */}
                                <span className={cn(
                                    'flex-1',
                                    showIncorrect && 'line-through opacity-70'
                                )}>
                                    {option.text}
                                </span>
                            </div>
                        </motion.button>
                    );
                })}
            </div>

            {/* Explanation */}
            <AnimatePresence>
                {isAnswered && explanation && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        className="overflow-hidden"
                    >
                        <div className={cn(
                            'rounded-2xl p-4 border',
                            selectedOptionId === correctOption?.id
                                ? 'bg-duo-green/10 border-duo-green/30'
                                : 'bg-duo-orange/10 border-duo-orange/30'
                        )}>
                            <p className="font-bold mb-1">
                                {selectedOptionId === correctOption?.id ? '✨ Excellent!' : '📚 Here\'s what you should know:'}
                            </p>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {explanation}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default MCQLesson;
