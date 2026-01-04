'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { PathNode, NodeState } from './PathNode';
import { UnitHeader } from './UnitHeader';
import { BossNode } from './BossNode';

export interface LessonNode {
    id: string;
    title: string;
    state: NodeState;
    type?: 'lesson' | 'boss' | 'checkpoint';
    icon?: React.ReactNode;
    progress?: number;
}

export interface Unit {
    id: string;
    title: string;
    subtitle?: string;
    lessons: LessonNode[];
}

interface LearningPathProps {
    units: Unit[];
    onLessonClick?: (lessonId: string, unitId: string) => void;
    className?: string;
}

// Calculate wavy position for nodes
function getNodePosition(index: number, total: number): 'left' | 'center' | 'right' {
    // Create a wave pattern: center, right, center, left, center, right...
    const pattern: ('left' | 'center' | 'right')[] = ['center', 'right', 'center', 'left'];
    return pattern[index % pattern.length];
}

export function LearningPath({
    units,
    onLessonClick,
    className,
}: LearningPathProps) {
    const [expandedUnits, setExpandedUnits] = useState<Set<string>>(
        new Set(units.length > 0 ? [units[0].id] : []) // Only first expanded by default
    );

    const toggleUnit = (unitId: string) => {
        setExpandedUnits((prev) => {
            const next = new Set(prev);
            if (next.has(unitId)) {
                next.delete(unitId);
            } else {
                next.add(unitId);
            }
            return next;
        });
    };

    return (
        <div className={cn('relative w-full max-w-2xl mx-auto py-8', className)}>
            {units.map((unit, unitIndex) => {
                const completedCount = unit.lessons.filter(
                    (l) => l.state === 'completed'
                ).length;
                const isExpanded = expandedUnits.has(unit.id);

                return (
                    <div key={unit.id} className="mb-12">
                        {/* Unit Header */}
                        <UnitHeader
                            title={unit.title}
                            subtitle={unit.subtitle}
                            unitNumber={unitIndex + 1}
                            totalLessons={unit.lessons.length}
                            completedLessons={completedCount}
                            isExpanded={isExpanded}
                            onToggle={() => toggleUnit(unit.id)}
                        />

                        {/* Lessons */}
                        {isExpanded && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="relative mt-8"
                            >
                                {/* Connecting path SVG */}
                                <svg
                                    className="absolute left-1/2 top-0 w-32 h-full -translate-x-1/2 pointer-events-none"
                                    style={{ zIndex: 0 }}
                                >
                                    {unit.lessons.slice(0, -1).map((_, i) => {
                                        const startPos = getNodePosition(i, unit.lessons.length);
                                        const endPos = getNodePosition(i + 1, unit.lessons.length);

                                        // Calculate x positions
                                        const posX: Record<string, number> = {
                                            left: 16,
                                            center: 64,
                                            right: 112,
                                        };

                                        const startX = posX[startPos];
                                        const endX = posX[endPos];
                                        const startY = i * 100 + 32;
                                        const endY = (i + 1) * 100 + 32;

                                        // Create a curved path
                                        const midY = (startY + endY) / 2;
                                        const pathD = `M ${startX} ${startY} C ${startX} ${midY}, ${endX} ${midY}, ${endX} ${endY}`;

                                        return (
                                            <path
                                                key={i}
                                                d={pathD}
                                                fill="none"
                                                stroke="var(--node-locked)"
                                                strokeWidth="4"
                                                strokeLinecap="round"
                                                strokeDasharray={unit.lessons[i].state === 'completed' ? 'none' : '8 8'}
                                                className="transition-all duration-300"
                                                style={{
                                                    stroke: unit.lessons[i].state === 'completed'
                                                        ? 'var(--node-completed)'
                                                        : 'var(--node-locked)',
                                                }}
                                            />
                                        );
                                    })}
                                </svg>

                                {/* Lesson nodes */}
                                <div className="relative flex flex-col items-center gap-4">
                                    {unit.lessons.map((lesson, lessonIndex) => {
                                        const position = getNodePosition(lessonIndex, unit.lessons.length);

                                        if (lesson.type === 'boss') {
                                            return (
                                                <div
                                                    key={lesson.id}
                                                    className="py-8 flex justify-center w-full"
                                                >
                                                    <BossNode
                                                        id={lesson.id}
                                                        title={lesson.title}
                                                        state={lesson.state}
                                                        onClick={() => onLessonClick?.(lesson.id, unit.id)}
                                                    />
                                                </div>
                                            );
                                        }

                                        return (
                                            <div
                                                key={lesson.id}
                                                className="py-4 flex justify-center w-full"
                                                style={{ minHeight: '100px' }}
                                            >
                                                <PathNode
                                                    id={lesson.id}
                                                    title={lesson.title}
                                                    state={lesson.state}
                                                    type={lesson.type}
                                                    icon={lesson.icon}
                                                    progress={lesson.progress}
                                                    position={position}
                                                    onClick={() => onLessonClick?.(lesson.id, unit.id)}
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default LearningPath;
