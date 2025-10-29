import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { quizData, QuizQuestion } from '../data/quizData';
import Button from './ui/Button';
import Card from './ui/Card';
import ProgressBar from './ProgressBar';
import { useAuth } from '../context/AuthContext';
import { useToast } from './Toast';

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
);

const XIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.693a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);

const ChevronDownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m6 9 6 6 6-6"/>
    </svg>
);


type Difficulty = 'Easy' | 'Medium' | 'Hard' | 'All';
type QuizState = 'loading' | 'active' | 'results';

interface QuizProgress {
    index: number;
    answers: Record<number, number>;
}

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
                <span>{selected}</span>
                <ChevronDownIcon />
            </Button>
            {isOpen && (
                <div className="absolute z-10 mt-2 w-48 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg">
                    <ul className="py-1">
                        {difficulties.map(d => (
                            <li
                                key={d}
                                onClick={() => handleSelect(d)}
                                className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                            >
                                {d}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

const QuizPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [quizState, setQuizState] = useState<QuizState>('loading');
    const [difficulty, setDifficulty] = useState<Difficulty>('All');
    const [progress, setProgress] = useState<Record<string, QuizProgress>>({});
    
    const auth = useAuth();
    const { addToast } = useToast();

    const loadAllProgress = useCallback(async () => {
        setQuizState('loading');
        let allProgress: Record<string, QuizProgress> = {};
        if (auth.isAuthenticated) {
            try {
                const res = await fetch('/api/quiz/progress');
                if (res.ok) {
                    allProgress = await res.json();
                }
            } catch (error) {
                console.error("Failed to load progress from DB", error);
                addToast("Could not load your saved progress.", "error");
            }
        } else {
            difficulties.forEach(d => {
                const saved = localStorage.getItem(`quizProgress_${d}`);
                if (saved) {
                    allProgress[d] = JSON.parse(saved);
                }
            });
        }
        setProgress(allProgress);
        setQuizState('active');
    }, [auth.isAuthenticated, addToast]);

    useEffect(() => {
        loadAllProgress();
    }, [loadAllProgress]);

    const questions = useMemo(() => {
        return difficulty === 'All'
            ? quizData
            : quizData.filter(q => q.difficulty === difficulty);
    }, [difficulty]);

    const currentProgress = useMemo(() => {
        return progress[difficulty] || { index: 0, answers: {} };
    }, [progress, difficulty]);

    const { index: currentQuestionIndex, answers: selectedAnswers } = currentProgress;
    
    const updateProgress = (newProgress: Partial<QuizProgress>) => {
        setProgress(prev => ({
            ...prev,
            [difficulty]: {
                ...currentProgress,
                ...newProgress
            }
        }));
    };

    const saveProgress = useCallback(async () => {
        if (!difficulty || quizState !== 'active') return;

        if (auth.isAuthenticated) {
            try {
                await fetch('/api/quiz/progress', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ difficulty, ...currentProgress }),
                });
            } catch (error) {
                console.error("Failed to save progress to DB", error);
                // Silent fail to not annoy user
            }
        } else {
            localStorage.setItem(`quizProgress_${difficulty}`, JSON.stringify(currentProgress));
        }
    }, [auth, difficulty, currentProgress, quizState]);

    useEffect(() => {
        const handler = setTimeout(() => {
            if (quizState === 'active') saveProgress();
        }, 1000);
        return () => clearTimeout(handler);
    }, [progress, saveProgress, quizState]);


    const isCurrentQuestionAnswered = selectedAnswers[currentQuestionIndex] !== undefined;

    const handleAnswerSelect = (optionIndex: number) => {
        if (isCurrentQuestionAnswered) return;
        const newAnswers = { ...selectedAnswers, [currentQuestionIndex]: optionIndex };
        updateProgress({ answers: newAnswers });
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            updateProgress({ index: currentQuestionIndex + 1 });
        }
    };
    
    const handleSkip = () => {
        if (currentQuestionIndex < questions.length - 1) {
            updateProgress({ index: currentQuestionIndex + 1 });
        }
    };

    const handlePrev = () => {
        if (currentQuestionIndex > 0) {
            updateProgress({ index: currentQuestionIndex - 1 });
        }
    };
    
    const saveQuizToHistory = useCallback(async (score: number) => {
        if (!auth.isAuthenticated || !difficulty) return;
        try {
            await fetch('/api/quiz/history', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    difficulty,
                    score,
                    totalQuestions: questions.length,
                })
            });
            addToast("Quiz result saved to your profile!", "success");
        } catch (error) {
            console.error("Failed to save quiz history", error);
            addToast("Could not save your quiz result.", "error");
        }
    }, [auth, difficulty, questions.length, addToast]);

    const score = useMemo(() => {
        return questions.reduce((acc, question, index) => {
            if (selectedAnswers[index] === question.correctAnswerIndex) {
                return acc + 1;
            }
            return acc;
        }, 0);
    }, [questions, selectedAnswers]);

    const handleSubmit = () => {
        setQuizState('results');
        saveQuizToHistory(score);
    };

    const handleTakeNewQuiz = () => {
        // Reset progress for the current difficulty and go back to active state
        updateProgress({ index: 0, answers: {} });
        setQuizState('active');
    }

    const currentQuestion = questions[currentQuestionIndex];
    const progressPercent = questions.length > 0 ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0;
    
    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-black">
            <main className="grow container mx-auto p-4 md:p-6 lg:p-8 flex flex-col items-center">
                <div className="w-full max-w-2xl">
                    <div className="mb-6 flex flex-col items-center gap-4">
                        <label className="text-sm text-gray-500 dark:text-gray-400">
                           Select Quiz Difficulty
                        </label>
                         <DifficultyDropdown 
                            selected={difficulty}
                            onSelect={setDifficulty}
                            disabled={quizState !== 'active'}
                        />
                    </div>

                    {quizState === 'loading' && (
                        <Card className="text-center p-8">
                           <p>Loading your quiz progress...</p>
                        </Card>
                    )}
                    
                    {quizState === 'active' && currentQuestion && (
                         <div className="animate-fade-in-up">
                            <div className="mb-4">
                                <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-2">Question {currentQuestionIndex + 1} of {questions.length}</p>
                                <ProgressBar value={progressPercent} />
                            </div>

                            <Card>
                                <Card.Header>
                                    <Card.Title className="text-xl leading-relaxed">{currentQuestion.question}</Card.Title>
                                </Card.Header>
                                <Card.Content>
                                    <div className="space-y-3">
                                        {currentQuestion.options.map((option, index) => {
                                            const isSelected = selectedAnswers[currentQuestionIndex] === index;
                                            const isCorrect = currentQuestion.correctAnswerIndex === index;
                                            let optionClasses = 'w-full text-left p-3 rounded-md border-2 transition-colors text-gray-800 dark:text-gray-200';
                                            
                                            if(isCurrentQuestionAnswered) {
                                                if (isCorrect) {
                                                    optionClasses += ' bg-green-100 dark:bg-green-900/40 border-green-500 dark:border-green-600';
                                                } else if (isSelected) {
                                                    optionClasses += ' bg-red-100 dark:bg-red-900/40 border-red-500 dark:border-red-600 line-through';
                                                } else {
                                                    optionClasses += ' bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 opacity-70';
                                                }
                                            } else {
                                                optionClasses += isSelected 
                                                    ? ' bg-yellow-100/80 dark:bg-yellow-900/50 border-yellow-500' 
                                                    : ' bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600';
                                            }

                                            return (
                                                <button 
                                                    key={index}
                                                    onClick={() => handleAnswerSelect(index)}
                                                    disabled={isCurrentQuestionAnswered}
                                                    className={optionClasses}
                                                >
                                                    {option}
                                                </button>
                                            );
                                        })}
                                    </div>
                                    {isCurrentQuestionAnswered && (
                                        <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800/50 rounded-md text-gray-700 dark:text-gray-300 animate-fade-in-up">
                                            <p><span className="font-semibold text-yellow-600 dark:text-yellow-500">Explanation: </span>{currentQuestion.explanation}</p>
                                        </div>
                                    )}
                                </Card.Content>
                            </Card>

                            <div className="flex justify-between mt-6">
                                <Button variant="secondary" onClick={handlePrev} disabled={currentQuestionIndex === 0}>
                                    Previous
                                </Button>
                                <div className="flex items-center gap-2">
                                     {!isCurrentQuestionAnswered && (
                                        <Button variant="secondary" onClick={handleSkip} disabled={currentQuestionIndex === questions.length - 1}>
                                            Skip
                                        </Button>
                                     )}
                                    {currentQuestionIndex === questions.length - 1 ? (
                                        <Button onClick={handleSubmit}>
                                            Show Results
                                        </Button>
                                    ) : (
                                        <Button onClick={handleNext} disabled={!isCurrentQuestionAnswered}>
                                            Next
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {quizState === 'results' && (
                        <div className="animate-fade-in-up">
                            <Card className="text-center">
                                <Card.Header>
                                    <Card.Title className="text-3xl">Quiz Completed!</Card.Title>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm">Difficulty: {difficulty}</p>
                                </Card.Header>
                                <Card.Content>
                                    <p className="text-5xl font-bold mb-2 text-yellow-500 dark:text-yellow-400">{score} / {questions.length}</p>
                                    <p className="text-gray-500 dark:text-gray-400 mb-6">You got {((score / questions.length) * 100 || 0).toFixed(1)}% correct.</p>
                                    <Button onClick={handleTakeNewQuiz}>Take This Quiz Again</Button>
                                </Card.Content>
                            </Card>

                            <div className="mt-8">
                                <h2 className="text-2xl font-bold mb-4">Review Your Answers</h2>
                                <div className="space-y-4">
                                    {questions.map((q, index) => {
                                        const userAnswerIndex = selectedAnswers[index];
                                        const isCorrect = userAnswerIndex === q.correctAnswerIndex;
                                        return (
                                            <Card key={index} className={`border ${isCorrect ? 'border-green-200 dark:border-green-800/50' : userAnswerIndex !== undefined ? 'border-red-200 dark:border-red-800/50' : 'border-gray-200 dark:border-gray-800'}`}>
                                                <div className="p-4">
                                                    <p className="font-semibold mb-3">{index + 1}. {q.question}</p>
                                                    <div className="space-y-2 text-sm mb-3">
                                                        {q.options.map((option, optIndex) => {
                                                            const isUserAnswer = userAnswerIndex === optIndex;
                                                            const isCorrectAnswer = q.correctAnswerIndex === optIndex;
                                                            let classes = 'p-2 rounded-md flex items-center gap-2';
                                                            if (isCorrectAnswer) {
                                                                classes += ' bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300';
                                                            } else if (isUserAnswer && !isCorrect) {
                                                                classes += ' bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-300 line-through';
                                                            } else {
                                                                classes += ' bg-gray-100 dark:bg-gray-800'
                                                            }
                                                            
                                                            return (
                                                                <div key={optIndex} className={classes}>
                                                                    {isCorrectAnswer ? <CheckIcon/> : (isUserAnswer ? <XIcon/> : <div className="w-5 h-5"></div>)}
                                                                    <span>{option}</span>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                    <div className="p-3 bg-gray-100 dark:bg-gray-800/50 rounded-md text-gray-700 dark:text-gray-300 text-sm">
                                                        <span className="font-semibold text-yellow-600 dark:text-yellow-500">Explanation: </span>{q.explanation}
                                                    </div>
                                                </div>
                                            </Card>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default QuizPage;