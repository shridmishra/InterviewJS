'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Bug, Check, X, Lightbulb, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DebugCodeLessonProps {
    buggyCode: string;
    correctCode: string;
    bugLine: number;
    explanation: string;
    hint?: string;
    onComplete: (correct: boolean) => void;
}

export function DebugCodeLesson({
    buggyCode,
    correctCode,
    bugLine,
    explanation,
    hint,
    onComplete,
}: DebugCodeLessonProps) {
    const [selectedLine, setSelectedLine] = useState<number | null>(null);
    const [showHint, setShowHint] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    const lines = buggyCode.split('\n');

    const handleCheck = () => {
        const correct = selectedLine === bugLine;
        setIsCorrect(correct);
        setIsChecked(true);

        setTimeout(() => {
            onComplete(correct);
        }, 2000);
    };

    return (
        <div className="space-y-6">
            {/* Instructions */}
            <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-duo-red/10 rounded-full text-duo-red">
                    <Bug className="w-5 h-5" />
                    <span className="font-bold">Find the bug!</span>
                </div>
                <p className="text-muted-foreground">
                    Click on the line that contains the error
                </p>
            </div>

            {/* Code Block */}
            <div className="bg-[#1e1e1e] rounded-2xl overflow-hidden border border-border/50">
                <div className="p-2 border-b border-border/50 flex items-center gap-2">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <span className="text-xs text-muted-foreground ml-2">buggy.js</span>
                </div>

                <div className="p-4 font-mono text-sm">
                    {lines.map((line, index) => {
                        const lineNum = index + 1;
                        const isSelected = selectedLine === lineNum;
                        const showResult = isChecked && isSelected;

                        return (
                            <motion.div
                                key={index}
                                onClick={() => !isChecked && setSelectedLine(lineNum)}
                                whileHover={!isChecked ? { backgroundColor: 'rgba(255,255,255,0.05)' } : {}}
                                className={cn(
                                    'flex items-center gap-3 px-2 py-1 rounded cursor-pointer transition-all',
                                    isSelected && !isChecked && 'bg-duo-blue/20 border-l-4 border-duo-blue',
                                    showResult && isCorrect && 'bg-duo-green/20 border-l-4 border-duo-green',
                                    showResult && !isCorrect && 'bg-duo-red/20 border-l-4 border-duo-red',
                                    isChecked && lineNum === bugLine && !isSelected && 'bg-duo-green/10 border-l-4 border-duo-green'
                                )}
                            >
                                <span className="text-muted-foreground w-6 text-right select-none">
                                    {lineNum}
                                </span>
                                <code className="text-white flex-1">{line || ' '}</code>
                                {showResult && (
                                    <span>
                                        {isCorrect ? (
                                            <Check className="w-5 h-5 text-duo-green" />
                                        ) : (
                                            <X className="w-5 h-5 text-duo-red" />
                                        )}
                                    </span>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Hint */}
            {hint && !isChecked && (
                <div className="text-center">
                    {showHint ? (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-3 bg-duo-gold/10 border border-duo-gold/30 rounded-xl text-sm"
                        >
                            <div className="flex items-center gap-2 mb-1">
                                <Lightbulb className="w-4 h-4 text-duo-gold" />
                                <span className="font-bold text-duo-gold">Hint</span>
                            </div>
                            <p className="text-muted-foreground">{hint}</p>
                        </motion.div>
                    ) : (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowHint(true)}
                            className="text-muted-foreground hover:text-foreground"
                        >
                            <Lightbulb className="w-4 h-4 mr-1" /> Need a hint?
                        </Button>
                    )}
                </div>
            )}

            {/* Result */}
            <AnimatePresence>
                {isChecked && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={cn(
                            'p-4 rounded-2xl',
                            isCorrect ? 'bg-duo-green/10 border border-duo-green/30' : 'bg-duo-red/10 border border-duo-red/30'
                        )}
                    >
                        <div className="flex items-center gap-2 mb-2">
                            {isCorrect ? (
                                <>
                                    <Check className="w-5 h-5 text-duo-green" />
                                    <span className="font-bold text-duo-green">Correct!</span>
                                </>
                            ) : (
                                <>
                                    <AlertTriangle className="w-5 h-5 text-duo-red" />
                                    <span className="font-bold text-duo-red">Not quite...</span>
                                </>
                            )}
                        </div>
                        <p className="text-sm text-muted-foreground">{explanation}</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Check Button */}
            {!isChecked && (
                <Button
                    onClick={handleCheck}
                    disabled={selectedLine === null}
                    className={cn(
                        'w-full h-12 rounded-xl font-bold text-base',
                        selectedLine !== null ? 'btn-duo btn-duo-green' : 'bg-muted text-muted-foreground'
                    )}
                >
                    Check Answer
                </Button>
            )}
        </div>
    );
}

export default DebugCodeLesson;
