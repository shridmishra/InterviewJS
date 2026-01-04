'use client';

import React, { useState, useEffect } from 'react';
import { Play, CheckCircle, XCircle, Loader2, Lightbulb, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface CodeEditorLessonProps {
    instructions: string;
    starterCode: string;
    expectedOutput?: string;
    hints?: string[];
    onRun: (code: string) => Promise<{ success: boolean; output: string; error?: string }>;
    onComplete: (isCorrect: boolean) => void;
    className?: string;
}

export function CodeEditorLesson({
    instructions,
    starterCode,
    expectedOutput,
    hints = [],
    onRun,
    onComplete,
    className,
}: CodeEditorLessonProps) {
    const [code, setCode] = useState(starterCode);
    const [isRunning, setIsRunning] = useState(false);
    const [result, setResult] = useState<{ success: boolean; output: string; error?: string } | null>(null);
    const [showHint, setShowHint] = useState(false);
    const [currentHintIndex, setCurrentHintIndex] = useState(0);

    const handleRun = async () => {
        setIsRunning(true);
        setResult(null);
        try {
            const runResult = await onRun(code);
            setResult(runResult);
            if (runResult.success) {
                onComplete(true);
            }
        } catch (error) {
            setResult({
                success: false,
                output: '',
                error: 'Oops! Something went wrong. Try again! 💪',
            });
        } finally {
            setIsRunning(false);
        }
    };

    const handleReset = () => {
        setCode(starterCode);
        setResult(null);
    };

    const handleShowHint = () => {
        setShowHint(true);
        if (currentHintIndex < hints.length - 1) {
            setCurrentHintIndex(prev => prev + 1);
        }
    };

    return (
        <div className={cn('space-y-4', className)}>
            {/* Instructions */}
            <div className="bg-muted/50 rounded-xl p-4 border">
                <h3 className="font-bold text-lg mb-2">📝 Your Task</h3>
                <p className="text-muted-foreground leading-relaxed">{instructions}</p>
                {expectedOutput && (
                    <div className="mt-3 pt-3 border-t">
                        <span className="text-sm text-muted-foreground">Expected output: </span>
                        <code className="text-sm bg-muted px-2 py-1 rounded font-mono text-duo-green">
                            {expectedOutput}
                        </code>
                    </div>
                )}
            </div>

            {/* Code Editor */}
            <div className="rounded-xl border overflow-hidden bg-[#1e1e1e]">
                <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d] border-b border-[#404040]">
                    <span className="text-sm text-gray-400 font-mono">script.js</span>
                    <div className="flex gap-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleReset}
                            className="text-gray-400 hover:text-white h-7 px-2"
                        >
                            <RotateCcw className="w-3 h-3 mr-1" />
                            Reset
                        </Button>
                    </div>
                </div>
                <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className={cn(
                        'w-full h-48 p-4 bg-transparent text-gray-100 font-mono text-sm',
                        'resize-none focus:outline-none',
                        'placeholder:text-gray-500'
                    )}
                    placeholder="// Write your code here..."
                    spellCheck={false}
                />
            </div>

            {/* Hint Section */}
            {hints.length > 0 && (
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleShowHint}
                        className="text-muted-foreground gap-1"
                    >
                        <Lightbulb className="w-4 h-4 text-xp" />
                        {showHint ? 'Another hint' : 'Need a hint?'}
                    </Button>

                    <AnimatePresence>
                        {showHint && (
                            <motion.span
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-sm text-muted-foreground"
                            >
                                💡 {hints[Math.min(currentHintIndex, hints.length - 1)]}
                            </motion.span>
                        )}
                    </AnimatePresence>
                </div>
            )}

            {/* Run Button */}
            <Button
                onClick={handleRun}
                disabled={isRunning || !code.trim()}
                className="w-full btn-duo btn-duo-green h-12 rounded-xl text-base font-bold"
            >
                {isRunning ? (
                    <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Running...
                    </>
                ) : (
                    <>
                        <Play className="w-5 h-5 mr-2" />
                        Run Code
                    </>
                )}
            </Button>

            {/* Result */}
            <AnimatePresence>
                {result && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={cn(
                            'rounded-xl p-4 border-2',
                            result.success
                                ? 'bg-duo-green/10 border-duo-green'
                                : 'bg-duo-red/10 border-duo-red'
                        )}
                    >
                        <div className="flex items-start gap-3">
                            {result.success ? (
                                <CheckCircle className="w-6 h-6 text-duo-green shrink-0" />
                            ) : (
                                <XCircle className="w-6 h-6 text-duo-red shrink-0" />
                            )}
                            <div className="flex-1">
                                <h4 className={cn(
                                    'font-bold mb-1',
                                    result.success ? 'text-duo-green' : 'text-duo-red'
                                )}>
                                    {result.success ? 'Great job! 🎉' : 'Not quite right 🤔'}
                                </h4>
                                {result.output && (
                                    <pre className="text-sm font-mono bg-black/10 p-2 rounded mt-2 overflow-x-auto">
                                        {result.output}
                                    </pre>
                                )}
                                {result.error && (
                                    <p className="text-sm text-duo-red mt-1">{result.error}</p>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default CodeEditorLesson;
