'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Share2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AchievementBadge, Achievement, ACHIEVEMENTS } from './AchievementBadge';

interface AchievementsGridProps {
    achievements?: Achievement[];
    className?: string;
}

export function AchievementsGrid({
    achievements = ACHIEVEMENTS,
    className
}: AchievementsGridProps) {
    const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

    const unlocked = achievements.filter(a => a.isUnlocked);
    const locked = achievements.filter(a => !a.isUnlocked);

    return (
        <>
            <div className={cn('space-y-6', className)}>
                {/* Stats */}
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold">Achievements</h2>
                        <p className="text-sm text-muted-foreground">
                            {unlocked.length} of {achievements.length} unlocked
                        </p>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-bold text-duo-gold">
                            {unlocked.length}
                        </div>
                        <div className="text-xs text-muted-foreground">Badges earned</div>
                    </div>
                </div>

                {/* Unlocked achievements */}
                {unlocked.length > 0 && (
                    <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-3">Unlocked</h3>
                        <div className="flex flex-wrap gap-3">
                            {unlocked.map((achievement) => (
                                <AchievementBadge
                                    key={achievement.id}
                                    achievement={achievement}
                                    onClick={() => setSelectedAchievement(achievement)}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Locked achievements */}
                {locked.length > 0 && (
                    <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-3">In Progress</h3>
                        <div className="flex flex-wrap gap-3">
                            {locked.map((achievement) => (
                                <AchievementBadge
                                    key={achievement.id}
                                    achievement={achievement}
                                    onClick={() => setSelectedAchievement(achievement)}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Achievement detail modal */}
            <AnimatePresence>
                {selectedAchievement && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
                        onClick={() => setSelectedAchievement(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-card rounded-2xl p-6 max-w-sm w-full shadow-2xl border"
                        >
                            <div className="flex justify-end">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setSelectedAchievement(null)}
                                    className="rounded-full"
                                >
                                    <X className="w-5 h-5" />
                                </Button>
                            </div>

                            <div className="text-center -mt-4">
                                <div className="flex justify-center mb-4">
                                    <AchievementBadge
                                        achievement={selectedAchievement}
                                        size="lg"
                                        showProgress={true}
                                    />
                                </div>

                                <h2 className="text-xl font-bold mb-1">{selectedAchievement.title}</h2>
                                <p className="text-muted-foreground mb-4">{selectedAchievement.description}</p>

                                {/* Rarity badge */}
                                <div className={cn(
                                    'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-4',
                                    selectedAchievement.rarity === 'legendary' && 'bg-duo-gold/20 text-duo-gold',
                                    selectedAchievement.rarity === 'epic' && 'bg-duo-purple/20 text-duo-purple',
                                    selectedAchievement.rarity === 'rare' && 'bg-duo-blue/20 text-duo-blue',
                                    selectedAchievement.rarity === 'common' && 'bg-muted text-muted-foreground',
                                )}>
                                    {selectedAchievement.rarity.charAt(0).toUpperCase() + selectedAchievement.rarity.slice(1)}
                                </div>

                                {/* Progress */}
                                {!selectedAchievement.isUnlocked && (
                                    <div className="space-y-2 mb-4">
                                        <div className="h-3 bg-muted rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-duo-green rounded-full transition-all"
                                                style={{ width: `${(selectedAchievement.progress / selectedAchievement.goal) * 100}%` }}
                                            />
                                        </div>
                                        <p className="text-sm font-medium">
                                            {selectedAchievement.progress} / {selectedAchievement.goal}
                                        </p>
                                    </div>
                                )}

                                {selectedAchievement.isUnlocked && (
                                    <div className="flex items-center justify-center gap-2 text-duo-green mb-4">
                                        <Check className="w-5 h-5" />
                                        <span className="font-medium">Unlocked!</span>
                                    </div>
                                )}

                                {selectedAchievement.isUnlocked && (
                                    <Button variant="outline" className="gap-2">
                                        <Share2 className="w-4 h-4" />
                                        Share
                                    </Button>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export default AchievementsGrid;
