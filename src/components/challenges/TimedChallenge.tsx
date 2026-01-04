'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, X, Check, Zap, AlertTriangle, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TimedChallengeProps {
    questions: {
        question: string;
        options: string[];
        correct: number;
    }[];
    timeLimit: number; // seconds
    onComplete: (score: number, timeSpent: number) => void;
    onClose: () => void;
}

export function TimedChallenge({
    questions,
    timeLimit,
    onComplete,
    onClose,
}: TimedChallengeProps) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(timeLimit);
    const [isFinished, setIsFinished] = useState(false);
    const [startTime] = useState(Date.now());

    // Timer
    useEffect(() => {
        if (isFinished) return;

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleFinish();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isFinished]);

    const handleFinish = useCallback(() => {
        setIsFinished(true);
        const timeSpent = Math.floor((Date.now() - startTime) / 1000);
        onComplete(score, timeSpent);
    }, [score, startTime, onComplete]);

    const handleAnswer = (index: number) => {
        setSelectedAnswer(index);

        if (index === questions[currentQuestion].correct) {
            setScore(prev => prev + 1);
        }

        // Auto-advance after brief delay
        setTimeout(() => {
            if (currentQuestion < questions.length - 1) {
                setCurrentQuestion(prev => prev + 1);
                setSelectedAnswer(null);
            } else {
                handleFinish();
            }
        }, 500);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const timePercentage = (timeLeft / timeLimit) * 100;
    const isLowTime = timeLeft <= 10;

    if (isFinished) {
        const timeSpent = Math.floor((Date.now() - startTime) / 1000);
        const percentage = Math.round((score / questions.length) * 100);
        const xpEarned = score * 10;

        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            >
                <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="bg-card rounded-2xl p-8 max-w-md w-full text-center space-y-6 border shadow-2xl"
                >
                    <div className="text-6xl">
                        {percentage >= 80 ? '🏆' : percentage >= 50 ? '⭐' : '💪'}
                    </div>
                    <h2 className="text-2xl font-bold">Challenge Complete!</h2>

                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="p-3 bg-muted rounded-xl">
                            <Trophy className="w-6 h-6 mx-auto mb-1 text-duo-gold" />
                            <div className="text-2xl font-bold">{score}/{questions.length}</div>
                            <div className="text-xs text-muted-foreground">Correct</div>
                        </div>
                        <div className="p-3 bg-muted rounded-xl">
                            <Clock className="w-6 h-6 mx-auto mb-1 text-duo-blue" />
                            <div className="text-2xl font-bold">{formatTime(timeSpent)}</div>
                            <div className="text-xs text-muted-foreground">Time</div>
                        </div>
                        <div className="p-3 bg-muted rounded-xl">
                            <Zap className="w-6 h-6 mx-auto mb-1 text-xp" />
                            <div className="text-2xl font-bold">+{xpEarned}</div>
                            <div className="text-xs text-muted-foreground">XP</div>
                        </div>
                    </div>

                    <Button
                        onClick={onClose}
                        className="w-full btn-duo btn-duo-green h-12 font-bold"
                    >
                        Continue
                    </Button>
                </motion.div>
            </motion.div>
        );
    }

    const question = questions[currentQuestion];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex flex-col bg-background"
        >
            {/* Header */}
            <header className="p-4 border-b flex items-center justify-between">
                <Button variant="ghost" size="icon" onClick={onClose}>
                    <X className="w-5 h-5" />
                </Button>

                {/* Timer */}
                <div className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-full font-bold',
                    isLowTime ? 'bg-duo-red/10 text-duo-red animate-pulse' : 'bg-duo-blue/10 text-duo-blue'
                )}>
                    <Clock className="w-5 h-5" />
                    {formatTime(timeLeft)}
                </div>

                {/* Score */}
                <div className="flex items-center gap-2 px-4 py-2 bg-xp/10 rounded-full">
                    <Zap className="w-5 h-5 text-xp" />
                    <span className="font-bold">{score * 10}</span>
                </div>
            </header>

            {/* Progress bar */}
            <div className="h-2 bg-muted">
                <motion.div
                    className={cn(
                        'h-full',
                        isLowTime ? 'bg-duo-red' : 'bg-duo-blue'
                    )}
                    initial={{ width: '100%' }}
                    animate={{ width: `${timePercentage}%` }}
                    transition={{ duration: 1, ease: 'linear' }}
                />
            </div>

            {/* Question progress */}
            <div className="p-4 flex justify-center gap-2">
                {questions.map((_, index) => (
                    <div
                        key={index}
                        className={cn(
                            'w-3 h-3 rounded-full transition-all',
                            index < currentQuestion && 'bg-duo-green',
                            index === currentQuestion && 'bg-duo-blue w-6',
                            index > currentQuestion && 'bg-muted'
                        )}
                    />
                ))}
            </div>

            {/* Question */}
            <main className="flex-1 flex items-center justify-center p-6">
                <div className="w-full max-w-lg space-y-6">
                    <h2 className="text-xl font-bold text-center">{question.question}</h2>

                    <div className="space-y-3">
                        {question.options.map((option, index) => {
                            const isSelected = selectedAnswer === index;
                            const isCorrect = index === question.correct;

                            return (
                                <motion.button
                                    key={index}
                                    onClick={() => selectedAnswer === null && handleAnswer(index)}
                                    whileHover={selectedAnswer === null ? { scale: 1.02 } : {}}
                                    whileTap={selectedAnswer === null ? { scale: 0.98 } : {}}
                                    className={cn(
                                        'w-full p-4 rounded-xl border-2 text-left transition-all flex items-center gap-3',
                                        selectedAnswer === null && 'border-border hover:border-duo-blue',
                                        isSelected && isCorrect && 'border-duo-green bg-duo-green/10',
                                        isSelected && !isCorrect && 'border-duo-red bg-duo-red/10'
                                    )}
                                >
                                    <div className={cn(
                                        'w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm',
                                        selectedAnswer === null && 'bg-muted',
                                        isSelected && isCorrect && 'bg-duo-green text-white',
                                        isSelected && !isCorrect && 'bg-duo-red text-white'
                                    )}>
                                        {String.fromCharCode(65 + index)}
                                    </div>
                                    <span className="flex-1">{option}</span>
                                    {isSelected && isCorrect && <Check className="w-5 h-5 text-duo-green" />}
                                    {isSelected && !isCorrect && <X className="w-5 h-5 text-duo-red" />}
                                </motion.button>
                            );
                        })}
                    </div>
                </div>
            </main>
        </motion.div>
    );
}

export default TimedChallenge;
