'use client';

import React from 'react';
import { Lock, Check, Star, Crown, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export type NodeState = 'locked' | 'available' | 'current' | 'completed';
export type NodeType = 'lesson' | 'boss' | 'checkpoint';

interface PathNodeProps {
    id: string;
    title: string;
    state: NodeState;
    type?: NodeType;
    icon?: React.ReactNode;
    progress?: number;
    onClick?: () => void;
    className?: string;
    position?: 'left' | 'center' | 'right';
}

export function PathNode({
    id,
    title,
    state,
    type = 'lesson',
    icon,
    progress = 0,
    onClick,
    className,
    position = 'center',
}: PathNodeProps) {
    const isInteractive = state !== 'locked';
    const isBoss = type === 'boss';

    const stateStyles: Record<NodeState, string> = {
        locked: 'bg-node-locked cursor-not-allowed opacity-60',
        available: 'bg-node-available cursor-pointer hover:scale-105',
        current: 'bg-node-current cursor-pointer animate-duo-glow hover:scale-105',
        completed: 'bg-node-completed cursor-pointer hover:scale-105',
    };

    const positionOffset: Record<string, string> = {
        left: '-translate-x-12',
        center: 'translate-x-0',
        right: 'translate-x-12',
    };

    const nodeSize = isBoss ? 'w-20 h-20' : 'w-16 h-16';

    return (
        <motion.button
            onClick={isInteractive ? onClick : undefined}
            disabled={!isInteractive}
            whileHover={isInteractive ? { scale: 1.05 } : undefined}
            whileTap={isInteractive ? { scale: 0.95 } : undefined}
            className={cn(
                'relative rounded-full flex items-center justify-center transition-all duration-200',
                'font-bold text-white shadow-lg',
                nodeSize,
                stateStyles[state],
                positionOffset[position],
                isInteractive && 'focus:outline-none focus:ring-4 focus:ring-duo-green/50',
                className
            )}
            style={{
                boxShadow: state !== 'locked'
                    ? `0 4px 0 rgba(0, 0, 0, 0.25), 0 6px 12px rgba(0, 0, 0, 0.15)`
                    : 'none',
            }}
        >
            {/* Inner content */}
            <div className="relative z-10">
                {state === 'locked' && <Lock className="w-6 h-6" />}
                {state === 'completed' && <Check className="w-6 h-6" strokeWidth={3} />}
                {state === 'current' && (
                    icon || <Star className="w-6 h-6 fill-current" />
                )}
                {state === 'available' && (
                    icon || <Star className="w-6 h-6" />
                )}
                {isBoss && state !== 'locked' && (
                    <Crown className="w-7 h-7 fill-current" />
                )}
            </div>

            {/* Progress ring for current node */}
            {state === 'current' && progress > 0 && (
                <svg
                    className="absolute inset-0 w-full h-full -rotate-90"
                    viewBox="0 0 100 100"
                >
                    <circle
                        cx="50"
                        cy="50"
                        r="46"
                        fill="none"
                        stroke="rgba(255,255,255,0.3)"
                        strokeWidth="4"
                    />
                    <circle
                        cx="50"
                        cy="50"
                        r="46"
                        fill="none"
                        stroke="white"
                        strokeWidth="4"
                        strokeDasharray={`${2 * Math.PI * 46}`}
                        strokeDashoffset={`${2 * Math.PI * 46 * (1 - progress / 100)}`}
                        strokeLinecap="round"
                    />
                </svg>
            )}

            {/* XP indicator for completed */}
            {state === 'completed' && (
                <div className="absolute -bottom-1 -right-1 bg-xp text-white text-xs font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                    <Zap className="w-3 h-3" />
                    <span>+10</span>
                </div>
            )}
        </motion.button>
    );
}

export default PathNode;
