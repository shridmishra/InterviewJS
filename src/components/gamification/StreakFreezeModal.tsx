'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Snowflake, X, Check, AlertTriangle, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StreakFreezeModalProps {
    currentStreak: number;
    freezesAvailable: number;
    onUseFreeze: () => void;
    onClose: () => void;
}

export function StreakFreezeModal({
    currentStreak,
    freezesAvailable,
    onUseFreeze,
    onClose,
}: StreakFreezeModalProps) {
    const [isUsing, setIsUsing] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    const handleUseFreeze = async () => {
        setIsUsing(true);

        // Call API
        try {
            await fetch('/api/user/gamification', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'useStreakFreeze' }),
            });
            setIsComplete(true);
            onUseFreeze();
        } catch (e) {
            console.error('Failed to use streak freeze:', e);
        } finally {
            setIsUsing(false);
        }
    };

    if (isComplete) {
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
                    <div className="text-6xl">🧊</div>
                    <h2 className="text-2xl font-bold text-duo-blue">Streak Frozen!</h2>
                    <p className="text-muted-foreground">
                        Your {currentStreak}-day streak is protected for today.
                        Don't forget to practice tomorrow!
                    </p>
                    <div className="flex items-center justify-center gap-2">
                        <Flame className="w-6 h-6 text-streak" />
                        <span className="text-2xl font-bold">{currentStreak}</span>
                    </div>
                    <Button
                        onClick={onClose}
                        className="w-full btn-duo btn-duo-blue h-12 font-bold"
                    >
                        Got it!
                    </Button>
                </motion.div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
        >
            <div className="bg-card rounded-2xl p-6 max-w-md w-full space-y-6 border shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Snowflake className="w-6 h-6 text-duo-blue" />
                        Streak Freeze
                    </h2>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <X className="w-5 h-5" />
                    </Button>
                </div>

                {/* Warning */}
                <div className="p-4 bg-duo-gold/10 border border-duo-gold/30 rounded-xl">
                    <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-duo-gold shrink-0 mt-0.5" />
                        <div>
                            <p className="font-medium text-duo-gold">You haven't practiced today!</p>
                            <p className="text-sm text-muted-foreground mt-1">
                                Your {currentStreak}-day streak is at risk of being lost.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Options */}
                <div className="space-y-3">
                    <div className="p-4 border-2 border-duo-blue rounded-xl bg-duo-blue/5">
                        <div className="flex items-center justify-between mb-2">
                            <span className="font-bold">Use a Streak Freeze</span>
                            <div className="flex items-center gap-1 text-duo-blue">
                                <Snowflake className="w-4 h-4" />
                                <span>{freezesAvailable} available</span>
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Protect your streak for today without practicing.
                        </p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="flex-1 h-12 rounded-xl font-bold"
                    >
                        Practice Instead
                    </Button>
                    <Button
                        onClick={handleUseFreeze}
                        disabled={freezesAvailable === 0 || isUsing}
                        className={cn(
                            'flex-1 h-12 rounded-xl font-bold',
                            freezesAvailable > 0 ? 'btn-duo btn-duo-blue' : 'bg-muted text-muted-foreground'
                        )}
                    >
                        {isUsing ? 'Using...' : 'Use Freeze'}
                    </Button>
                </div>
            </div>
        </motion.div>
    );
}

export default StreakFreezeModal;
