'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { QuizQuestion } from '@/data/quizzes/types';
import { FaChevronLeft, FaChevronRight, FaTimes, FaCheck, FaRedo, FaTrophy, FaLightbulb } from 'react-icons/fa';

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
  const [answers, setAnswers] = useState<{ [key: number]: number }>({}); // questionIndex -> selectedOptionIndex

  const currentQuestion = questions[currentIndex];

  const handleOptionSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    setAnswers(prev => ({ ...prev, [currentIndex]: index }));

    if (index === currentQuestion.correctAnswerIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);

      // Check if next question was already answered
      const nextAnswer = answers[nextIndex];
      if (nextAnswer !== undefined) {
        setSelectedOption(nextAnswer);
        setIsAnswered(true);
      } else {
        setSelectedOption(null);
        setIsAnswered(false);
      }
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      const prevAnswer = answers[prevIndex];
      if (prevAnswer !== undefined) {
        setSelectedOption(prevAnswer);
        setIsAnswered(true);
      }
    }
  }

  const restartQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setShowResults(false);
    setAnswers({});
  }

  if (!isOpen || !currentQuestion) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl w-full h-[90vh] md:h-auto md:max-h-[90vh] flex flex-col p-0 gap-0 overflow-hidden bg-background border-border shadow-2xl sm:rounded-xl" showCloseButton={false}>

        {/* Header */}
        <div className="border-b px-6 py-4 flex items-center justify-between bg-background z-10">
          <div>
            <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
            {!showResults && (
              <p className="text-sm text-muted-foreground">
                Question {currentIndex + 1} of {questions.length}
              </p>
            )}
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
            <FaTimes className="h-5 w-5" />
          </Button>
        </div>

        {/* Progress Bar */}
        {!showResults && (
          <div className="w-full bg-muted h-1">
            <div
              className="bg-primary h-1 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-muted/30">
          {showResults ? (
            <div className="flex flex-col items-center justify-center h-full space-y-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <FaTrophy className="text-4xl text-primary" />
              </div>
              <h2 className="text-3xl font-bold">Quiz Completed!</h2>
              <p className="text-xl text-muted-foreground">
                You scored <span className="text-primary font-bold">{score}</span> out of <span className="font-bold">{questions.length}</span>
              </p>
              <div className="flex gap-4 mt-8">
                <Button onClick={restartQuiz} variant="outline" className="gap-2">
                  <FaRedo className="w-4 h-4" /> Try Again
                </Button>
                <Button onClick={onClose}>Close</Button>
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto space-y-8">
              {/* Question */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">{currentQuestion.difficulty}</Badge>
                </div>
                <h2 className="text-2xl font-semibold leading-relaxed">
                  {currentQuestion.question}
                </h2>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => {
                  const isSelected = selectedOption === index;
                  const isCorrect = index === currentQuestion.correctAnswerIndex;

                  let optionClasses = 'w-full text-left p-4 rounded-md border-2 transition-colors text-foreground text-base relative';

                  if (isAnswered) {
                    if (isCorrect) {
                      optionClasses += ' bg-green-500/10 border-green-500 text-green-700 dark:text-green-400';
                    } else if (isSelected) {
                      optionClasses += ' bg-red-500/10 border-red-500 text-red-700 dark:text-red-400 line-through opacity-80';
                    } else {
                      optionClasses += ' bg-secondary border-border opacity-50';
                    }
                  } else {
                    optionClasses += isSelected
                      ? ' bg-primary/20 border-primary'
                      : ' bg-secondary border-border hover:border-primary/50';
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleOptionSelect(index)}
                      disabled={isAnswered}
                      className={optionClasses}
                    >
                      <div className="flex items-center justify-between">
                        <span>{option}</span>
                        {isAnswered && isCorrect && <FaCheck className="w-4 h-4 text-green-500" />}
                        {isAnswered && isSelected && !isCorrect && <FaTimes className="w-4 h-4 text-red-500" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Explanation */}
              {isAnswered && (
                <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4 animate-in fade-in slide-in-from-top-2">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-1 flex items-center gap-2">
                    <FaLightbulb className="w-4 h-4 text-yellow-500" /> Explanation
                  </h4>
                  <p className="text-blue-700 dark:text-blue-400 text-sm leading-relaxed">
                    {currentQuestion.explanation}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {!showResults && (
          <div className="border-t p-4 bg-background flex justify-between items-center">
            <Button
              variant="ghost"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="gap-2"
            >
              <FaChevronLeft className="w-4 h-4" /> Previous
            </Button>

            <Button
              onClick={handleNext}
              disabled={!isAnswered}
              className="gap-2 px-8"
            >
              {currentIndex === questions.length - 1 ? 'Finish' : 'Next'} <FaChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}

      </DialogContent>
    </Dialog>
  );
}
