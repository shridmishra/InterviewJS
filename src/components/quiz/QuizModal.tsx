'use client';

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { QuizQuestion } from '@/data/quizzes/types';
import { X, ChevronRight, RotateCcw, Trophy, Lightbulb, Check, Zap } from 'lucide-react';
import { Hearts } from '@/components/gamification/Hearts';
import { XpGain, XpBadge } from '@/components/gamification/XpBadge';
import { CelebrationOverlay, getEncouragementMessage } from '@/components/gamification/CelebrationOverlay';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  questions: QuizQuestion[];
  title: string;
}

export default function QuizModal({ isOpen, onClose, questions, title }: QuizModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [hearts, setHearts] = useState(5);
  const [streak, setStreak] = useState(0);
  const [showEncouragement, setShowEncouragement] = useState<string | null>(null);
  const [showXpGain, setShowXpGain] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [totalXp, setTotalXp] = useState(0);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex) / questions.length) * 100;

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
      setSelectedOption(null);
      setIsAnswered(false);
      setScore(0);
      setShowResults(false);
      setAnswers({});
      setHearts(5);
      setStreak(0);
      setTotalXp(0);
    }
  }, [isOpen]);

  const handleOptionSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    setAnswers(prev => ({ ...prev, [currentIndex]: index }));

    const isCorrect = index === currentQuestion.correctAnswerIndex;

    if (isCorrect) {
      setScore(prev => prev + 1);
      setStreak(prev => prev + 1);
      const xpEarned = streak >= 2 ? 15 : 10;
      setTotalXp(prev => prev + xpEarned);

      // Show encouragement
      const message = streak >= 3
        ? getEncouragementMessage('streak', streak + 1)
        : getEncouragementMessage('correct');
      setShowEncouragement(message);

      setTimeout(() => setShowEncouragement(null), 1500);
    } else {
      setStreak(0);
      setHearts(prev => Math.max(0, prev - 1));
      setShowEncouragement(getEncouragementMessage('incorrect'));
      setTimeout(() => setShowEncouragement(null), 1500);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      // Show celebration before results
      if (score >= questions.length * 0.8) {
        setShowCelebration(true);
        setTimeout(() => {
          setShowCelebration(false);
          setShowResults(true);
        }, 2000);
      } else {
        setShowResults(true);
      }
    }
  };

  const handleSkip = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResults(true);
    }
  };

  const restartQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setShowResults(false);
    setAnswers({});
    setHearts(5);
    setStreak(0);
    setTotalXp(0);
  };

  if (!isOpen || !currentQuestion) return null;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent
          className="max-w-2xl w-full h-[90vh] md:h-auto md:max-h-[85vh] flex flex-col p-0 gap-0 overflow-hidden bg-background border-none shadow-2xl sm:rounded-2xl"
          showCloseButton={false}
        >
          {/* Header with Progress and Hearts */}
          <div className="px-4 py-3 flex items-center gap-4 bg-background">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="rounded-full shrink-0 text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </Button>

            {/* Duolingo-style Progress Bar */}
            {!showResults && (
              <div className="flex-1 h-4 bg-muted rounded-full overflow-hidden relative">
                <motion.div
                  className="h-full bg-duo-green rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-foreground/70">
                    {currentIndex + 1} / {questions.length}
                  </span>
                </div>
              </div>
            )}

            {/* Hearts */}
            {!showResults && (
              <Hearts current={hearts} max={5} size="sm" showCount={false} />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            <AnimatePresence mode="wait">
              {showResults ? (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex flex-col items-center justify-center h-full space-y-6 text-center py-8"
                >
                  {/* Trophy */}
                  <div className="w-24 h-24 rounded-full bg-duo-gold/20 flex items-center justify-center animate-duo-pop">
                    <Trophy className="w-12 h-12 text-duo-gold" />
                  </div>

                  {/* Title */}
                  <div>
                    <h2 className="text-3xl font-bold mb-2">
                      {score >= questions.length * 0.8 ? 'Amazing! 🎉' : score >= questions.length * 0.5 ? 'Good job! 💪' : 'Keep practicing! 📚'}
                    </h2>
                    <p className="text-muted-foreground">
                      You completed the lesson!
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="flex gap-8 py-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-duo-green">{score}</div>
                      <div className="text-sm text-muted-foreground">Correct</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-muted-foreground">{questions.length - score}</div>
                      <div className="text-sm text-muted-foreground">Mistakes</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-3xl font-bold text-xp">
                        <Zap className="w-6 h-6" />
                        {totalXp}
                      </div>
                      <div className="text-sm text-muted-foreground">XP Earned</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 w-full max-w-xs mt-4">
                    <Button
                      onClick={restartQuiz}
                      variant="outline"
                      className="flex-1 gap-2 h-12 rounded-xl"
                    >
                      <RotateCcw className="w-4 h-4" /> Retry
                    </Button>
                    <Button
                      onClick={onClose}
                      className="flex-1 btn-duo btn-duo-green h-12 rounded-xl"
                    >
                      Continue
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {/* Question */}
                  <div>
                    <Badge
                      variant="outline"
                      className="mb-3 bg-muted border-none"
                    >
                      {currentQuestion.difficulty}
                    </Badge>
                    <DialogTitle className="text-xl md:text-2xl font-bold leading-relaxed">
                      {currentQuestion.question}
                    </DialogTitle>
                  </div>

                  {/* Options */}
                  <div className="space-y-3">
                    {currentQuestion.options.map((option, index) => {
                      const isSelected = selectedOption === index;
                      const isCorrect = index === currentQuestion.correctAnswerIndex;

                      return (
                        <motion.button
                          key={index}
                          onClick={() => handleOptionSelect(index)}
                          disabled={isAnswered}
                          whileTap={!isAnswered ? { scale: 0.98 } : undefined}
                          className={cn(
                            'w-full text-left p-4 rounded-xl border-2 transition-all duration-200',
                            'text-foreground text-base relative',
                            !isAnswered && 'hover:border-primary/50 active:scale-98',
                            !isAnswered && isSelected && 'border-primary bg-primary/10',
                            !isAnswered && !isSelected && 'border-border bg-card',
                            isAnswered && isCorrect && 'border-duo-green bg-duo-green/10 animate-correct',
                            isAnswered && isSelected && !isCorrect && 'border-duo-red bg-duo-red/10 animate-incorrect',
                            isAnswered && !isCorrect && !isSelected && 'border-border bg-muted opacity-50'
                          )}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <span className={cn(
                              isAnswered && isSelected && !isCorrect && 'line-through opacity-70'
                            )}>
                              {option}
                            </span>
                            {isAnswered && isCorrect && (
                              <Check className="w-5 h-5 text-duo-green shrink-0" />
                            )}
                            {isAnswered && isSelected && !isCorrect && (
                              <X className="w-5 h-5 text-duo-red shrink-0" />
                            )}
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Explanation */}
                  <AnimatePresence>
                    {isAnswered && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="bg-duo-blue/10 border border-duo-blue/30 rounded-xl p-4">
                          <h4 className="font-semibold text-duo-blue mb-1 flex items-center gap-2">
                            <Lightbulb className="w-4 h-4 text-xp" />
                            {selectedOption === currentQuestion.correctAnswerIndex ? 'Great!' : 'Learn from this:'}
                          </h4>
                          <p className="text-sm leading-relaxed text-muted-foreground">
                            {currentQuestion.explanation}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          {!showResults && (
            <div className="border-t p-4 bg-background">
              <div className="flex justify-between items-center gap-4">
                <Button
                  variant="ghost"
                  onClick={handleSkip}
                  className="text-muted-foreground"
                >
                  Skip
                </Button>

                <Button
                  onClick={handleNext}
                  disabled={!isAnswered}
                  className={cn(
                    'px-8 h-12 rounded-xl font-bold text-base',
                    isAnswered ? 'btn-duo btn-duo-green' : 'bg-muted text-muted-foreground'
                  )}
                >
                  {currentIndex === questions.length - 1 ? 'Finish' : 'Continue'}
                  <ChevronRight className="w-5 h-5 ml-1" />
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Encouragement Toast */}
      <AnimatePresence>
        {showEncouragement && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] bg-card border shadow-lg rounded-2xl px-6 py-3 font-bold text-lg"
          >
            {showEncouragement}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Celebration Overlay */}
      {showCelebration && (
        <CelebrationOverlay
          type="perfectLesson"
          message="Perfect Lesson! 💯"
          subMessage={`+${totalXp} XP`}
        />
      )}

      {/* XP Gain Animation */}
      {showXpGain && (
        <XpGain amount={10} onComplete={() => setShowXpGain(false)} />
      )}
    </>
  );
}
