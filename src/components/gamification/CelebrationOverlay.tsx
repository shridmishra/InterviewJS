'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface ConfettiPiece {
    id: number;
    x: number;
    color: string;
    delay: number;
    duration: number;
}

const COLORS = [
    'bg-duo-green',
    'bg-duo-blue',
    'bg-duo-orange',
    'bg-duo-purple',
    'bg-duo-gold',
    'bg-duo-red',
];

interface CelebrationOverlayProps {
    type?: 'confetti' | 'levelUp' | 'perfectLesson' | 'streakSave';
    message?: string;
    subMessage?: string;
    onComplete?: () => void;
    duration?: number;
}

export function CelebrationOverlay({
    type = 'confetti',
    message = "Great job! 🎉",
    subMessage,
    onComplete,
    duration = 2500,
}: CelebrationOverlayProps) {
    const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        // Generate confetti pieces
        const pieces: ConfettiPiece[] = Array.from({ length: 50 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            delay: Math.random() * 0.5,
            duration: 2 + Math.random() * 1,
        }));
        setConfetti(pieces);

        // Auto-dismiss
        const timer = setTimeout(() => {
            setVisible(false);
            onComplete?.();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onComplete]);

    if (!visible) return null;

    return (
        <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
            {/* Confetti pieces */}
            {(type === 'confetti' || type === 'perfectLesson') && (
                <div className="absolute inset-0">
                    {confetti.map((piece) => (
                        <div
                            key={piece.id}
                            className={cn(
                                'absolute w-3 h-3 rounded-sm',
                                piece.color
                            )}
                            style={{
                                left: `${piece.x}%`,
                                top: '-20px',
                                animation: `confetti-fall ${piece.duration}s linear forwards`,
                                animationDelay: `${piece.delay}s`,
                            }}
                        />
                    ))}
                </div>
            )}

            {/* Center message */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center animate-duo-pop">
                    {type === 'levelUp' && (
                        <div className="mb-4 text-6xl">🎊</div>
                    )}
                    {type === 'perfectLesson' && (
                        <div className="mb-4 text-6xl">💯</div>
                    )}
                    {type === 'streakSave' && (
                        <div className="mb-4 text-6xl">🔥</div>
                    )}
                    <h2 className="text-4xl font-bold text-foreground mb-2 drop-shadow-lg">
                        {message}
                    </h2>
                    {subMessage && (
                        <p className="text-xl text-muted-foreground">
                            {subMessage}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

// Encouragement messages for lessons
const ENCOURAGEMENT_MESSAGES = {
    correct: [
        "Excellent! 🌟",
        "Perfect! 💪",
        "You're on fire! 🔥",
        "Amazing! ✨",
        "Keep it up! 🚀",
        "Brilliant! 🧠",
        "Nailed it! 🎯",
    ],
    incorrect: [
        "Not quite! Let's try again 💪",
        "Almost there! 🤔",
        "Keep trying! You've got this! 💫",
        "Learning moment! 📚",
    ],
    streak: [
        "3 in a row! 🎯",
        "5 correct! You're crushing it! 🔥",
        "10 streak! Unstoppable! 👑",
    ],
};

export function getEncouragementMessage(
    type: 'correct' | 'incorrect' | 'streak',
    streak?: number
): string {
    if (type === 'streak' && streak) {
        if (streak >= 10) return ENCOURAGEMENT_MESSAGES.streak[2];
        if (streak >= 5) return ENCOURAGEMENT_MESSAGES.streak[1];
        if (streak >= 3) return ENCOURAGEMENT_MESSAGES.streak[0];
    }

    const messages = ENCOURAGEMENT_MESSAGES[type];
    return messages[Math.floor(Math.random() * messages.length)];
}

export default CelebrationOverlay;
