'use client';

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/Card';
import { InterviewQuestion, getRandomInterviewQuestions } from '@/data/interviews';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InterviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InterviewModal: React.FC<InterviewModalProps> = ({ isOpen, onClose }) => {
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  // Initialize questions when modal opens
  const handleOpen = () => {
    if (questions.length === 0) {
      const interviewQuestions = getRandomInterviewQuestions(5);
      setQuestions(interviewQuestions);
    }
    setCurrentStep(0);
    setShowAnswer(false);
  };

  useEffect(() => {
    if (isOpen) {
      handleOpen();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
      setShowAnswer(false);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setShowAnswer(false);
    }
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const currentQuestion = questions[currentStep];
  const progress = questions.length > 0 ? ((currentStep + 1) / questions.length) * 100 : 0;

  const renderMarkdown = (text: string) => {
    // Simple markdown renderer for bold, code blocks, and code inline
    const parts = text.split(/(\*\*.*?\*\*|`[^`]+`|```[\s\S]*?```)/g);
    
    return parts.map((part, index) => {
      // Bold text
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>;
      }
      // Code blocks
      if (part.startsWith('```') && part.endsWith('```')) {
        const code = part.slice(3, -3).trim();
        const lines = code.split('\n');
        const _language = lines[0].trim();
        const codeContent = lines.slice(1).join('\n');
        
        return (
          <pre key={index} className="bg-muted p-4 rounded-md overflow-x-auto my-3 text-sm">
            <code className="text-foreground font-mono">{codeContent || code}</code>
          </pre>
        );
      }
      // Inline code
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code key={index} className="bg-muted px-1.5 py-0.5 rounded text-primary font-mono text-sm">
            {part.slice(1, -1)}
          </code>
        );
      }
      // Regular text with line breaks
      return <span key={index}>{part}</span>;
    });
  };

  if (!currentQuestion) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Interview Preparation</DialogTitle>
        </DialogHeader>

        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Question {currentStep + 1} of {questions.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-300 ease-in-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Step indicators */}
        <div className="flex justify-center gap-2 py-2">
          {questions.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentStep(index);
                setShowAnswer(false);
              }}
              className={cn(
                "h-2 rounded-full transition-all duration-200",
                index === currentStep 
                  ? "w-8 bg-primary" 
                  : index < currentStep 
                    ? "w-2 bg-primary/50" 
                    : "w-2 bg-muted"
              )}
              aria-label={`Go to question ${index + 1}`}
            />
          ))}
        </div>

        {/* Question card */}
        <div className="flex-1 overflow-y-auto px-1">
          <Card className="p-6">
            <div className="space-y-4">
              {/* Topic and difficulty badges */}
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline" className="text-xs">
                  {currentQuestion.topic}
                </Badge>
                <Badge 
                  variant={
                    currentQuestion.difficulty === 'Easy' 
                      ? 'default' 
                      : currentQuestion.difficulty === 'Medium' 
                        ? 'secondary' 
                        : 'destructive'
                  }
                  className="text-xs"
                >
                  {currentQuestion.difficulty}
                </Badge>
              </div>

              {/* Question */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {currentQuestion.question}
                </h3>
              </div>

              {/* Show Answer button or Answer */}
              {!showAnswer ? (
                <div className="pt-4">
                  <Button 
                    onClick={handleShowAnswer} 
                    variant="outline"
                    className="w-full sm:w-auto"
                  >
                    Show Answer
                  </Button>
                </div>
              ) : (
                <div className="pt-4 border-t border-border">
                  <h4 className="text-md font-semibold text-foreground mb-3">Answer:</h4>
                  <div className="prose prose-sm max-w-none text-foreground space-y-2 leading-relaxed">
                    {renderMarkdown(currentQuestion.answer)}
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <Button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            variant="outline"
            className="gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          <div className="text-sm text-muted-foreground">
            {currentStep + 1} / {questions.length}
          </div>

          {currentStep < questions.length - 1 ? (
            <Button
              onClick={handleNext}
              className="gap-2"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={onClose}
              variant="default"
            >
              Finish
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InterviewModal;
