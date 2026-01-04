'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface FillInCodeLessonProps {
    instruction: string;
    codeTemplate: string; // Use ___BLANK___ as placeholder
    blanks: { id: string; correctAnswer: string; options?: string[] }[];
    onComplete: (isCorrect: boolean) => void;
    className?: string;
}

interface BlankState {
    [blankId: string]: string;
}

export function FillInCodeLesson({
    instruction,
    codeTemplate,
    blanks,
    onComplete,
    className,
}: FillInCodeLessonProps) {
    const [filledBlanks, setFilledBlanks] = useState<BlankState>({});
    const [isChecked, setIsChecked] = useState(false);
    const [draggedOption, setDraggedOption] = useState<string | null>(null);

    // Get all options from blanks
    const allOptions = blanks.flatMap(b => b.options || [b.correctAnswer]);
    const usedOptions = Object.values(filledBlanks);
    const availableOptions = allOptions.filter(opt => !usedOptions.includes(opt));

    const handleDrop = (blankId: string, option: string) => {
        setFilledBlanks(prev => ({ ...prev, [blankId]: option }));
        setDraggedOption(null);
    };

    const handleRemove = (blankId: string) => {
        if (isChecked) return;
        setFilledBlanks(prev => {
            const next = { ...prev };
            delete next[blankId];
            return next;
        });
    };

    const handleCheck = () => {
        setIsChecked(true);
        const allCorrect = blanks.every(
            blank => filledBlanks[blank.id] === blank.correctAnswer
        );
        onComplete(allCorrect);
    };

    const canCheck = blanks.every(blank => filledBlanks[blank.id]);

    // Parse the code template and replace blanks with interactive elements
    const renderCode = () => {
        const parts = codeTemplate.split(/(___BLANK_\d+___)/g);
        let blankIndex = 0;

        return parts.map((part, index) => {
            if (part.startsWith('___BLANK_')) {
                const blank = blanks[blankIndex];
                blankIndex++;
                if (!blank) return null;

                const value = filledBlanks[blank.id];
                const isCorrect = isChecked && value === blank.correctAnswer;
                const isIncorrect = isChecked && value && value !== blank.correctAnswer;

                return (
                    <motion.span
                        key={blank.id}
                        onClick={() => handleRemove(blank.id)}
                        onDragOver={(e) => { e.preventDefault(); }}
                        onDrop={(e) => {
                            e.preventDefault();
                            if (draggedOption) handleDrop(blank.id, draggedOption);
                        }}
                        className={cn(
                            'inline-block min-w-[80px] mx-1 px-2 py-1 rounded-lg border-2 border-dashed',
                            'text-center font-bold cursor-pointer transition-all',
                            !value && 'bg-muted/50 border-muted-foreground/30 text-muted-foreground',
                            value && !isChecked && 'bg-primary/20 border-primary text-foreground',
                            isCorrect && 'bg-duo-green/20 border-duo-green text-duo-green',
                            isIncorrect && 'bg-duo-red/20 border-duo-red text-duo-red line-through'
                        )}
                        whileHover={!isChecked && value ? { scale: 0.95 } : undefined}
                    >
                        {value || '???'}
                    </motion.span>
                );
            }
            return <span key={index}>{part}</span>;
        });
    };

    return (
        <div className={cn('space-y-6', className)}>
            {/* Instruction */}
            <div>
                <h3 className="font-bold text-lg mb-2">Fill in the blanks</h3>
                <p className="text-muted-foreground">{instruction}</p>
            </div>

            {/* Code with blanks */}
            <div className="bg-[#1e1e1e] rounded-xl p-4 overflow-x-auto">
                <pre className="font-mono text-sm text-gray-100 leading-relaxed whitespace-pre-wrap">
                    {renderCode()}
                </pre>
            </div>

            {/* Draggable options */}
            {!isChecked && (
                <div className="flex flex-wrap gap-2">
                    {availableOptions.map((option, index) => (
                        <motion.button
                            key={`${option}-${index}`}
                            draggable
                            onDragStart={() => setDraggedOption(option)}
                            onDragEnd={() => setDraggedOption(null)}
                            onClick={() => {
                                // Find first empty blank
                                const emptyBlank = blanks.find(b => !filledBlanks[b.id]);
                                if (emptyBlank) handleDrop(emptyBlank.id, option);
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={cn(
                                'px-4 py-2 rounded-xl border-2 border-border bg-card font-mono text-sm',
                                'cursor-grab active:cursor-grabbing hover:border-primary/50 transition-colors',
                                draggedOption === option && 'opacity-50'
                            )}
                        >
                            {option}
                        </motion.button>
                    ))}
                </div>
            )}

            {/* Results */}
            {isChecked && (
                <div className={cn(
                    'rounded-xl p-4 border',
                    blanks.every(b => filledBlanks[b.id] === b.correctAnswer)
                        ? 'bg-duo-green/10 border-duo-green'
                        : 'bg-duo-orange/10 border-duo-orange'
                )}>
                    <p className="font-bold">
                        {blanks.every(b => filledBlanks[b.id] === b.correctAnswer)
                            ? '✨ Perfect! All blanks filled correctly!'
                            : '📚 Here are the correct answers:'}
                    </p>
                    {!blanks.every(b => filledBlanks[b.id] === b.correctAnswer) && (
                        <ul className="mt-2 text-sm space-y-1">
                            {blanks.map(blank => (
                                <li key={blank.id} className="font-mono">
                                    <span className="text-muted-foreground">Blank:</span>{' '}
                                    <span className="text-duo-green font-bold">{blank.correctAnswer}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
}

export default FillInCodeLesson;
