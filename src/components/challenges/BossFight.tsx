'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Skull, Heart, Zap, Trophy, X, Check, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Hearts } from '@/components/gamification/Hearts';

interface BossFightProps {
    bossName: string;
    bossHealth: number;
    questions: {
        question: string;
        options: string[];
        correct: number;
    }[];
    onComplete: (won: boolean, xpEarned: number) => void;
    onClose: () => void;
}

export function BossFight({
    bossName,
    bossHealth,
    questions,
    onComplete,
    onClose,
}: BossFightProps) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [isChecked, setIsChecked] = useState(false);
    const [playerHealth, setPlayerHealth] = useState(3);
    const [bossCurrentHealth, setBossCurrentHealth] = useState(bossHealth);
    const [isFinished, setIsFinished] = useState(false);
    const [playerWon, setPlayerWon] = useState(false);
    const [attackAnimation, setAttackAnimation] = useState<'player' | 'boss' | null>(null);

    const handleAnswer = (index: number) => {
        setSelectedAnswer(index);
        setIsChecked(true);

        const isCorrect = index === questions[currentQuestion].correct;

        if (isCorrect) {
            // Player attacks boss
            setAttackAnimation('player');
            setTimeout(() => {
                setBossCurrentHealth(prev => {
                    const newHealth = prev - 1;
                    if (newHealth <= 0) {
                        setPlayerWon(true);
                        setIsFinished(true);
                    }
                    return Math.max(0, newHealth);
                });
                setAttackAnimation(null);
            }, 500);
        } else {
            // Boss attacks player
            setAttackAnimation('boss');
            setTimeout(() => {
                setPlayerHealth(prev => {
                    const newHealth = prev - 1;
                    if (newHealth <= 0) {
                        setPlayerWon(false);
                        setIsFinished(true);
                    }
                    return Math.max(0, newHealth);
                });
                setAttackAnimation(null);
            }, 500);
        }

        // Next question after delay
        setTimeout(() => {
            if (currentQuestion < questions.length - 1 && !isFinished) {
                setCurrentQuestion(prev => prev + 1);
                setSelectedAnswer(null);
                setIsChecked(false);
            } else if (!isFinished) {
                // Ran out of questions, determine winner
                setPlayerWon(bossCurrentHealth < playerHealth);
                setIsFinished(true);
            }
        }, 1500);
    };

    if (isFinished) {
        const xpEarned = playerWon ? bossHealth * 20 : Math.max(0, (bossHealth - bossCurrentHealth) * 5);

        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
            >
                <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="bg-card rounded-2xl p-8 max-w-md w-full text-center space-y-6 border shadow-2xl"
                >
                    <div className="text-6xl">
                        {playerWon ? '🏆' : '💀'}
                    </div>
                    <h2 className="text-2xl font-bold">
                        {playerWon ? 'Victory!' : 'Defeated!'}
                    </h2>
                    <p className="text-muted-foreground">
                        {playerWon
                            ? `You defeated ${bossName}!`
                            : `${bossName} was too powerful... Try again!`
                        }
                    </p>

                    <div className="flex items-center justify-center gap-2">
                        <Zap className="w-6 h-6 text-xp" />
                        <span className="text-2xl font-bold">+{xpEarned} XP</span>
                    </div>

                    <Button
                        onClick={() => {
                            onComplete(playerWon, xpEarned);
                            onClose();
                        }}
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
            className="fixed inset-0 z-50 flex flex-col bg-gradient-to-b from-slate-900 to-slate-800"
        >
            {/* Header */}
            <header className="p-4 flex items-center justify-between">
                <Button variant="ghost" size="icon" onClick={onClose} className="text-white">
                    <X className="w-5 h-5" />
                </Button>
                <div className="text-white font-bold">BOSS FIGHT</div>
                <div className="w-10" />
            </header>

            {/* Battle Arena */}
            <div className="flex-1 flex flex-col items-center justify-center gap-8 p-6">
                {/* Boss */}
                <motion.div
                    animate={attackAnimation === 'player' ? { x: [0, -20, 0], scale: [1, 0.9, 1] } : {}}
                    className="text-center"
                >
                    <div className="text-6xl mb-2">
                        {bossCurrentHealth > 0 ? '👹' : '💀'}
                    </div>
                    <div className="text-white font-bold mb-2">{bossName}</div>
                    {/* Boss health bar */}
                    <div className="w-48 h-3 bg-slate-700 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-duo-red"
                            initial={{ width: '100%' }}
                            animate={{ width: `${(bossCurrentHealth / bossHealth) * 100}%` }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                    <div className="text-xs text-slate-400 mt-1">
                        {bossCurrentHealth}/{bossHealth} HP
                    </div>
                </motion.div>

                {/* VS */}
                <motion.div
                    animate={attackAnimation ? { scale: [1, 1.2, 1] } : {}}
                    className="text-4xl font-bold text-duo-gold"
                >
                    ⚔️
                </motion.div>

                {/* Player */}
                <motion.div
                    animate={attackAnimation === 'boss' ? { x: [0, 20, 0], scale: [1, 0.9, 1] } : {}}
                    className="text-center"
                >
                    <div className="text-4xl mb-2">🧙</div>
                    <div className="text-white font-bold mb-2">You</div>
                    <div className="flex gap-1 justify-center">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <Heart
                                key={i}
                                className={cn(
                                    'w-6 h-6',
                                    i < playerHealth ? 'text-heart fill-heart' : 'text-slate-600'
                                )}
                            />
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Question Area */}
            <div className="bg-card rounded-t-3xl p-6 space-y-4">
                <h3 className="text-lg font-bold text-center">{question.question}</h3>

                <div className="grid grid-cols-2 gap-3">
                    {question.options.map((option, index) => {
                        const isSelected = selectedAnswer === index;
                        const isCorrect = index === question.correct;

                        return (
                            <motion.button
                                key={index}
                                onClick={() => !isChecked && handleAnswer(index)}
                                whileTap={!isChecked ? { scale: 0.95 } : {}}
                                className={cn(
                                    'p-3 rounded-xl border-2 text-sm font-medium transition-all',
                                    !isChecked && 'border-border hover:border-duo-blue',
                                    isChecked && isSelected && isCorrect && 'border-duo-green bg-duo-green/10',
                                    isChecked && isSelected && !isCorrect && 'border-duo-red bg-duo-red/10',
                                    isChecked && isCorrect && !isSelected && 'border-duo-green/50'
                                )}
                            >
                                {option}
                            </motion.button>
                        );
                    })}
                </div>
            </div>
        </motion.div>
    );
}

export default BossFight;
