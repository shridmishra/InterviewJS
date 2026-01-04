'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, Clock, Zap, Check, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Hearts } from '@/components/gamification/Hearts';

interface PracticeForHeartsProps {
    currentHearts: number;
    maxHearts: number;
    onComplete: (heartsEarned: number) => void;
    onClose: () => void;
}

// Simple practice question for earning hearts
const PRACTICE_QUESTIONS = [
    {
        question: "What does `typeof null` return in JavaScript?",
        options: ['"null"', '"object"', '"undefined"', '"boolean"'],
        correct: 1,
    },
    {
        question: "Which method adds to the end of an array?",
        options: ['unshift()', 'push()', 'shift()', 'pop()'],
        correct: 1,
    },
    {
        question: "What is `2 + '2'` in JavaScript?",
        options: ['4', '22', '"22"', 'NaN'],
        correct: 2,
    },
    {
        question: "Which is NOT a primitive type?",
        options: ['string', 'number', 'array', 'boolean'],
        correct: 2,
    },
    {
        question: "What does `===` check for?",
        options: ['Value only', 'Type only', 'Value and type', 'Reference'],
        correct: 2,
    },
];

export function PracticeForHearts({
    currentHearts,
    maxHearts,
    onComplete,
    onClose,
}: PracticeForHeartsProps) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [isChecked, setIsChecked] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    const question = PRACTICE_QUESTIONS[currentQuestion];
    const questionsNeeded = maxHearts - currentHearts;

    const handleCheck = () => {
        setIsChecked(true);
        if (selectedAnswer === question.correct) {
            setCorrectCount(prev => prev + 1);
        }
    };

    const handleNext = () => {
        if (currentQuestion < questionsNeeded - 1) {
            setCurrentQuestion(prev => prev + 1);
            setSelectedAnswer(null);
            setIsChecked(false);
        } else {
            setIsFinished(true);
            onComplete(correctCount + (selectedAnswer === question.correct ? 1 : 0));
        }
    };

    if (isFinished) {
        const heartsEarned = correctCount + (selectedAnswer === question.correct ? 1 : 0);
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            >
                <div className="bg-card rounded-2xl p-8 max-w-md w-full text-center space-y-6 border shadow-2xl">
                    <div className="text-6xl">
                        {heartsEarned > 0 ? '🎉' : '😔'}
                    </div>
                    <h2 className="text-2xl font-bold">
                        {heartsEarned > 0 ? 'Hearts Earned!' : 'No Hearts Earned'}
                    </h2>
                    <div className="flex items-center justify-center gap-1">
                        {Array.from({ length: heartsEarned }).map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Heart className="w-8 h-8 text-heart fill-heart" />
                            </motion.div>
                        ))}
                    </div>
                    <p className="text-muted-foreground">
                        You answered {correctCount + (selectedAnswer === question.correct ? 1 : 0)} out of {questionsNeeded} correctly!
                    </p>
                    <Button
                        onClick={onClose}
                        className="w-full btn-duo btn-duo-green h-12 font-bold"
                    >
                        Continue
                    </Button>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
        >
            <div className="bg-card rounded-2xl p-6 max-w-lg w-full space-y-6 border shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Heart className="w-5 h-5 text-heart fill-heart" />
                        <span className="font-bold">Practice for Hearts</span>
                    </div>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <X className="w-5 h-5" />
                    </Button>
                </div>

                {/* Progress */}
                <div className="flex items-center gap-2">
                    {Array.from({ length: questionsNeeded }).map((_, i) => (
                        <div
                            key={i}
                            className={cn(
                                'flex-1 h-2 rounded-full',
                                i < currentQuestion ? 'bg-duo-green' :
                                    i === currentQuestion ? 'bg-duo-blue' : 'bg-muted'
                            )}
                        />
                    ))}
                </div>

                {/* Question */}
                <div className="text-center space-y-4">
                    <p className="text-lg font-medium">{question.question}</p>

                    <div className="space-y-2">
                        {question.options.map((option, index) => {
                            const isSelected = selectedAnswer === index;
                            const isCorrectAnswer = index === question.correct;

                            return (
                                <button
                                    key={index}
                                    onClick={() => !isChecked && setSelectedAnswer(index)}
                                    className={cn(
                                        'w-full p-3 rounded-xl border-2 text-left transition-all flex items-center gap-3',
                                        !isChecked && isSelected && 'border-duo-blue bg-duo-blue/10',
                                        !isChecked && !isSelected && 'border-border hover:border-primary/50',
                                        isChecked && isCorrectAnswer && 'border-duo-green bg-duo-green/10',
                                        isChecked && isSelected && !isCorrectAnswer && 'border-duo-red bg-duo-red/10'
                                    )}
                                >
                                    <code className="font-mono text-sm">{option}</code>
                                    {isChecked && isCorrectAnswer && (
                                        <Check className="w-5 h-5 text-duo-green ml-auto" />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Actions */}
                {!isChecked ? (
                    <Button
                        onClick={handleCheck}
                        disabled={selectedAnswer === null}
                        className={cn(
                            'w-full h-12 rounded-xl font-bold',
                            selectedAnswer !== null ? 'btn-duo btn-duo-green' : 'bg-muted text-muted-foreground'
                        )}
                    >
                        Check Answer
                    </Button>
                ) : (
                    <Button
                        onClick={handleNext}
                        className="w-full h-12 rounded-xl font-bold btn-duo btn-duo-blue"
                    >
                        {currentQuestion < questionsNeeded - 1 ? 'Next Question' : 'Finish'}
                    </Button>
                )}
            </div>
        </motion.div>
    );
}

export default PracticeForHearts;
