'use client';

import React from 'react';
import { Crown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { NodeState } from './PathNode';

interface BossNodeProps {
    id: string;
    title: string;
    state: NodeState;
    onClick?: () => void;
    className?: string;
}

export function BossNode({
    id,
    title,
    state,
    onClick,
    className,
}: BossNodeProps) {
    const isInteractive = state !== 'locked';

    const stateStyles: Record<NodeState, string> = {
        locked: 'bg-node-locked cursor-not-allowed opacity-60',
        available: 'bg-duo-purple cursor-pointer',
        current: 'bg-duo-purple cursor-pointer animate-duo-glow',
        completed: 'bg-duo-gold cursor-pointer',
    };

    return (
        <motion.button
            onClick={isInteractive ? onClick : undefined}
            disabled={!isInteractive}
            whileHover={isInteractive ? { scale: 1.05 } : undefined}
            whileTap={isInteractive ? { scale: 0.95 } : undefined}
            className={cn(
                'relative w-24 h-24 rounded-2xl flex flex-col items-center justify-center',
                'font-bold text-white shadow-xl transition-all duration-200',
                stateStyles[state],
                isInteractive && 'focus:outline-none focus:ring-4 focus:ring-duo-purple/50',
                className
            )}
            style={{
                boxShadow: state !== 'locked'
                    ? `0 6px 0 rgba(0, 0, 0, 0.3), 0 8px 16px rgba(0, 0, 0, 0.2)`
                    : 'none',
            }}
        >
            <Crown className="w-10 h-10 fill-current mb-1" />
            <span className="text-xs font-bold uppercase tracking-wide">Boss</span>

            {/* Glow effect for current */}
            {state === 'current' && (
                <div className="absolute inset-0 rounded-2xl bg-duo-purple/30 animate-pulse -z-10" />
            )}
        </motion.button>
    );
}

export default BossNode;
