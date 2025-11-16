import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { quizData, QuizQuestion } from '../../data/quizzes';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import ProgressBar from '../progress/ProgressBar';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'sonner';

const ChevronDownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m6 9 6 6 6-6"/>
    </svg>
);


type Difficulty = 'Easy' | 'Medium' | 'Hard' | 'All';
type QuizState = 'loading' | 'active' | 'results';

const difficulties: Difficulty[] = ['All', 'Easy', 'Medium', 'Hard'];

const DifficultyDropdown: React.FC<{
    selected: Difficulty;
    onSelect: (difficulty: Difficulty) => void;
    disabled: boolean;
}> = ({ selected, onSelect, disabled }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (difficulty: Difficulty) => {
        onSelect(difficulty);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <Button
                variant="secondary"
                onClick={() => setIsOpen(!isOpen)}
                disabled={disabled}
                className="w-48 flex items-center justify-between"
            >
                <span>{selected === 'All' ? 'Select Difficulty' : selected}</span>
                <ChevronDownIcon />
            </Button>
            {isOpen && (
                <div className="absolute z-10 mt-2 w-48 rounded-md bg-card border border-border shadow-lg">
                    <ul className="py-1">
                        {difficulties.map(d => (
                                                            <li
                                                                key={d}
                                                                onClick={() => handleSelect(d)}
                                                                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSelect(d); }}
                                                                className="px-4 py-2 text-sm text-foreground hover:bg-accent cursor-pointer"
                                                                tabIndex={0}
                                                                role="menuitem"
                                                            >
                                                                {d}
                                                            </li>                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

import { useSearchParams } from 'next/navigation';
import { IUserAnsweredQuestion } from '../../models/UserAnsweredQuestion';

const QuizPage: React.FC<{ onBack?: () => void }> = ({ onBack: _onBack }) => {
    const searchParams = useSearchParams();
    const _initialQuizView = searchParams.get('view') === 'history' ? 'history' : 'quiz';

    const [quizState, _setQuizState] = useState<QuizState>('active'); // Default to active, no loading progress
    const [difficulty, setDifficulty] = useState<Difficulty>('All');
    const [_initialQuestionIndex, _setInitialQuestionIndex] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswerIndexState, setSelectedAnswerIndexState] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [userQuizHistory, setUserQuizHistory] = useState<IUserAnsweredQuestion[]>([]);
    
    const auth = useAuth();

    const questions = useMemo(() => {
        return difficulty === 'All'
            ? quizData
            : quizData.filter((q: QuizQuestion) => q.difficulty === difficulty);
    }, [difficulty]);

    useEffect(() => {
        const fetchQuizHistoryAndSetInitialQuestion = async () => {
            if (!auth.isAuthenticated) {
                // If not authenticated, reset history and set to first question
                setUserQuizHistory([]);
                setCurrentQuestionIndex(0);
                return;
            }
            try {
                const res = await fetch('/api/quiz/history');
                if (res.ok) {
                    const { answeredQuestions = [] }: { answeredQuestions?: IUserAnsweredQuestion[] } = await res.json();
                    setUserQuizHistory(answeredQuestions);

                    const solvedQuestionTexts = new Set(answeredQuestions.map(item => item.question));

                    let nextUnsolvedQuestionIndex = 0;
                    for (let i = 0; i < questions.length; i++) {
                        if (!solvedQuestionTexts.has(questions[i].question)) {
                            nextUnsolvedQuestionIndex = i;
                            break;
                        }
                    }
                    
                    setCurrentQuestionIndex(nextUnsolvedQuestionIndex);

                } else {
                    setCurrentQuestionIndex(0); // Default to first question on error
                }
            } catch (_error) {
                console.error(_error);
                setCurrentQuestionIndex(0); // Default to first question on error
            }
        };
        fetchQuizHistoryAndSetInitialQuestion();
    }, [auth.isAuthenticated, difficulty, questions]); // Depend on auth.isAuthenticated, difficulty, and questions

    const currentQuestion = questions[currentQuestionIndex];

    const answeredQuestionTexts = useMemo(() => {
        return new Set(userQuizHistory.map(item => item.question));
    }, [userQuizHistory]);

    const hasBeenAnswered = currentQuestion ? answeredQuestionTexts.has(currentQuestion.question) : false;
    const userAnswerForCurrentQuestion = useMemo(() => {
        if (!currentQuestion) return null;
        const historyItem = userQuizHistory.find(item => item.question === currentQuestion.question);
        return historyItem ? historyItem.userAnswer : null;
    }, [currentQuestion, userQuizHistory]);

    const finalSelectedAnswerIndex = useMemo(() => {
        if (hasBeenAnswered) {
            const prevAnswerIndex = userAnswerForCurrentQuestion !== null ? currentQuestion.options.indexOf(userAnswerForCurrentQuestion) : -1;
            return prevAnswerIndex !== -1 ? prevAnswerIndex : null;
        } else {
            return selectedAnswerIndexState;
        }
    }, [hasBeenAnswered, userAnswerForCurrentQuestion, currentQuestion, selectedAnswerIndexState]);



    const saveAnsweredQuestion = useCallback(async (questionData: QuizQuestion, userAnswerIndex: number) => {
        if (!auth.isAuthenticated) return;

        const isCorrect = userAnswerIndex === questionData.correctAnswerIndex;

        try {
            const res = await fetch('/api/quiz/history', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    question: questionData.question,
                    options: questionData.options,
                    correctAnswer: questionData.options[questionData.correctAnswerIndex],
                    userAnswer: questionData.options[userAnswerIndex],
                    isCorrect,
                    difficulty: questionData.difficulty,
                })
            });
            if (res.ok) {
                const newHistoryItem = await res.json();
                setUserQuizHistory(prev => [...prev, newHistoryItem]); // Update history with new answer
                toast.success("Answer saved!");
            } else {
                toast.error("Could not save your answer.");
            }
        } catch (_error) {
            console.error(_error);
            toast.error("Could not save your answer.");
        }
    }, [auth.isAuthenticated]);

    const handleAnswerSelect = (optionIndex: number) => {
        if (isAnswered || hasBeenAnswered) return; // Prevent answering if already answered or in history
        setSelectedAnswerIndexState(optionIndex);
        setIsAnswered(true);
        saveAnsweredQuestion(currentQuestion, optionIndex);
    };

    const handleNextQuestion = () => {
        setSelectedAnswerIndexState(null);
        setIsAnswered(false);
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        } else {
            setCurrentQuestionIndex(0);
            toast.info("You've gone through all questions in this difficulty! Looping back.");
        }
    };

    const handlePreviousQuestion = () => {
        setSelectedAnswerIndexState(null);
        setIsAnswered(false);
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prevIndex => prevIndex - 1);
        }
    };

    const progressPercent = questions.length > 0 ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0;
    
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <main className="grow container mx-auto p-4 md:p-6 lg:p-8 flex flex-col items-center">
                <div className="w-full max-w-2xl">
                    <div className="mb-6 flex flex-row items-center justify-end gap-4">
                        <DifficultyDropdown 
                            selected={difficulty}
                            onSelect={(d) => {
                                setDifficulty(d);
                                setSelectedAnswerIndexState(null);
                                setIsAnswered(false);
                            }}
                            disabled={false}
                        />
                    </div>

                    {currentQuestion && (
                        <div className="animate-fade-in-up">
                            <div className="mb-4">
                                <p className="text-sm text-muted-foreground text-center mb-2">Question {currentQuestionIndex + 1} of {questions.length}</p>
                                <ProgressBar value={progressPercent} />
                            </div>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-xl leading-relaxed">{currentQuestion.question}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {currentQuestion.options.map((option: string, index: number) => {
                                            const isSelected = finalSelectedAnswerIndex === index;
                                            const isCorrect = currentQuestion.correctAnswerIndex === index;
                                            let optionClasses = 'w-full text-left p-3 rounded-md border-2 transition-colors text-foreground';
                                            
                                            if(isAnswered || hasBeenAnswered) {
                                                if (isCorrect) {
                                                    optionClasses += ' bg-success/10 border-success';
                                                } else if (isSelected) {
                                                    optionClasses += ' bg-destructive/10 border-destructive line-through';
                                                } else {
                                                    optionClasses += ' bg-secondary border-border opacity-70';
                                                }
                                            } else {
                                                optionClasses += isSelected 
                                                    ? ' bg-primary/20 border-primary' 
                                                    : ' bg-secondary border-border hover:border-accent';
                                            }

                                            return (
                                                <button 
                                                    key={index}
                                                    onClick={() => handleAnswerSelect(index)}
                                                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleAnswerSelect(index); }}
                                                    className={optionClasses}
                                                >
                                                    {option}
                                                </button>
                                            );
                                        })}
                                    </div>
                                    {(isAnswered || hasBeenAnswered) && (
                                        <div className="mt-4 p-3 bg-secondary rounded-md text-foreground animate-fade-in-up">
                                            <p><span className="font-semibold text-primary">Explanation: </span>{currentQuestion.explanation}</p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            <div className="flex justify-between mt-6">
                                <Button onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
                                   Previous
                                </Button>
                                <Button onClick={handleNextQuestion} disabled={!isAnswered && !hasBeenAnswered}>
                                     Next 
                                </Button>
                            </div>
                        </div>
                    )}

                    {!currentQuestion && quizState === 'active' && (
                        <Card className="text-center p-8">
                            <p>No questions found for the selected difficulty.</p>
                        </Card>
                    )}
                </div>
            </main>
        </div>
    );
};

export default QuizPage;