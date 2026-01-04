'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { GripVertical, Check, X, Lightbulb, AlertTriangle, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ArrangeBlocksLessonProps {
    blocks: string[];
    correctOrder: number[];
    instruction: string;
    explanation: string;
    hint?: string;
    onComplete: (correct: boolean) => void;
}

export function ArrangeBlocksLesson({
    blocks,
    correctOrder,
    instruction,
    explanation,
    hint,
    onComplete,
}: ArrangeBlocksLessonProps) {
    const [currentOrder, setCurrentOrder] = useState<number[]>(() =>
        Array.from({ length: blocks.length }, (_, i) => i).sort(() => Math.random() - 0.5)
    );
    const [showHint, setShowHint] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    const handleCheck = () => {
        const correct = JSON.stringify(currentOrder) === JSON.stringify(correctOrder);
        setIsCorrect(correct);
        setIsChecked(true);

        setTimeout(() => {
            onComplete(correct);
        }, 2000);
    };

    const handleReset = () => {
        setCurrentOrder(Array.from({ length: blocks.length }, (_, i) => i).sort(() => Math.random() - 0.5));
        setIsChecked(false);
        setIsCorrect(false);
    };

    const orderedBlocks = currentOrder.map(i => ({ id: i, content: blocks[i] }));

    return (
        <div className="space-y-6">
            {/* Instructions */}
            <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-duo-blue/10 rounded-full text-duo-blue">
                    <GripVertical className="w-5 h-5" />
                    <span className="font-bold">Arrange the blocks</span>
                </div>
                <p className="text-muted-foreground">{instruction}</p>
            </div>

            {/* Blocks */}
            <Reorder.Group
                axis="y"
                values={orderedBlocks}
                onReorder={(newOrder) => {
                    if (!isChecked) {
                        setCurrentOrder(newOrder.map(b => b.id));
                    }
                }}
                className="space-y-2"
            >
                {orderedBlocks.map((block, index) => {
                    const isCorrectPosition = isChecked && correctOrder[index] === block.id;
                    const isWrongPosition = isChecked && correctOrder[index] !== block.id;

                    return (
                        <Reorder.Item
                            key={block.id}
                            value={block}
                            dragListener={!isChecked}
                            className={cn(
                                'bg-card border-2 rounded-xl p-3 flex items-center gap-3 cursor-grab active:cursor-grabbing',
                                !isChecked && 'hover:border-primary/50 hover:bg-muted/50',
                                isCorrectPosition && 'border-duo-green bg-duo-green/10',
                                isWrongPosition && 'border-duo-red bg-duo-red/10'
                            )}
                        >
                            <div className={cn(
                                'w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shrink-0',
                                isCorrectPosition && 'bg-duo-green text-white',
                                isWrongPosition && 'bg-duo-red text-white',
                                !isChecked && 'bg-muted'
                            )}>
                                {index + 1}
                            </div>

                            <code className="font-mono text-sm flex-1 select-none">{block.content}</code>

                            {!isChecked && (
                                <GripVertical className="w-5 h-5 text-muted-foreground shrink-0" />
                            )}
                            {isCorrectPosition && (
                                <Check className="w-5 h-5 text-duo-green shrink-0" />
                            )}
                            {isWrongPosition && (
                                <X className="w-5 h-5 text-duo-red shrink-0" />
                            )}
                        </Reorder.Item>
                    );
                })}
            </Reorder.Group>

            {/* Hint */}
            {hint && !isChecked && (
                <div className="text-center">
                    {showHint ? (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-3 bg-duo-gold/10 border border-duo-gold/30 rounded-xl text-sm"
                        >
                            <div className="flex items-center gap-2 mb-1">
                                <Lightbulb className="w-4 h-4 text-duo-gold" />
                                <span className="font-bold text-duo-gold">Hint</span>
                            </div>
                            <p className="text-muted-foreground">{hint}</p>
                        </motion.div>
                    ) : (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowHint(true)}
                            className="text-muted-foreground hover:text-foreground"
                        >
                            <Lightbulb className="w-4 h-4 mr-1" /> Need a hint?
                        </Button>
                    )}
                </div>
            )}

            {/* Result */}
            <AnimatePresence>
                {isChecked && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={cn(
                            'p-4 rounded-2xl',
                            isCorrect ? 'bg-duo-green/10 border border-duo-green/30' : 'bg-duo-red/10 border border-duo-red/30'
                        )}
                    >
                        <div className="flex items-center gap-2 mb-2">
                            {isCorrect ? (
                                <>
                                    <Check className="w-5 h-5 text-duo-green" />
                                    <span className="font-bold text-duo-green">Perfect!</span>
                                </>
                            ) : (
                                <>
                                    <AlertTriangle className="w-5 h-5 text-duo-red" />
                                    <span className="font-bold text-duo-red">Not quite right...</span>
                                </>
                            )}
                        </div>
                        <p className="text-sm text-muted-foreground">{explanation}</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Buttons */}
            <div className="flex gap-3">
                {isChecked && !isCorrect && (
                    <Button
                        variant="outline"
                        onClick={handleReset}
                        className="flex-1 h-12 rounded-xl font-bold"
                    >
                        <RotateCcw className="w-4 h-4 mr-2" /> Try Again
                    </Button>
                )}

                {!isChecked && (
                    <Button
                        onClick={handleCheck}
                        className="flex-1 h-12 rounded-xl font-bold text-base btn-duo btn-duo-green"
                    >
                        Check Order
                    </Button>
                )}
            </div>
        </div>
    );
}

export default ArrangeBlocksLesson;
