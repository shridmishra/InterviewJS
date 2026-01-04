'use client';

import React from 'react';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeartsProps {
    current: number;
    max?: number;
    size?: 'sm' | 'md' | 'lg';
    showCount?: boolean;
    onLoseHeart?: () => void;
    className?: string;
}

export function Hearts({
    current,
    max = 5,
    size = 'md',
    showCount = true,
    className,
}: HeartsProps) {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
        lg: 'w-8 h-8',
    };

    const hearts = Array.from({ length: max }, (_, i) => i < current);

    return (
        <div className={cn('flex items-center gap-1', className)}>
            <div className="flex items-center gap-0.5">
                {hearts.map((filled, index) => (
                    <Heart
                        key={index}
                        className={cn(
                            sizeClasses[size],
                            'transition-all duration-200',
                            filled
                                ? 'fill-heart text-heart animate-heart-beat'
                                : 'text-muted-foreground/30'
                        )}
                        style={{
                            animationDelay: `${index * 0.1}s`,
                            animationPlayState: filled ? 'running' : 'paused',
                        }}
                    />
                ))}
            </div>
            {showCount && (
                <span className="ml-1 font-bold text-heart text-sm tabular-nums">
                    {current}
                </span>
            )}
        </div>
    );
}

// Single heart component for use in lesson feedback
export function HeartLoss({ onComplete }: { onComplete?: () => void }) {
    React.useEffect(() => {
        const timer = setTimeout(() => {
            onComplete?.();
        }, 400);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-50">
            <Heart className="w-24 h-24 fill-heart text-heart animate-heart-break" />
        </div>
    );
}

export default Hearts;
