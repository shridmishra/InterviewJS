'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Problem, ProblemStatus } from './types';
import ProblemListPage from './components/AssignmentList';
import ProblemSolvingPage from './components/AssignmentDetail';
import ProfilePage from './components/ProfilePage';
import { problemsData as staticProblemsData } from './data/assignments';
import Header from './components/Header';
import { ToastProvider, useToast } from './components/Toast';
import Button from './components/ui/Button';
import QuizPage from './components/QuizPage';
import { useAuth } from './context/AuthContext';

type Page = 'hero' | 'list' | 'problem' | 'profile' | 'quiz';

const HeroPage = ({ onStart, onQuiz }: { onStart: () => void; onQuiz: () => void; }) => {
    const auth = useAuth();
    return (
        <div className="my-8 w-full flex flex-col items-center justify-center bg-white dark:bg-black overflow-hidden relative">
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-white dark:to-black z-0"></div>

            <main className="z-10 w-full px-4 sm:px-8 md:px-32">
                <header className="flex justify-between items-center mb-20 py-4">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                        practice<span className="text-yellow-400">JS</span>
                    </h1>
                    <div className="flex items-center gap-2 sm:gap-4">
                        <Button variant="ghost" size="sm" className="hidden sm:inline-flex" onClick={onQuiz}>Quiz</Button>
                        <Button variant="ghost" size="sm" onClick={onStart}>Challenges</Button>
                        { !auth.isAuthenticated && <Button variant="secondary" size="sm" onClick={() => window.dispatchEvent(new Event('openLoginModal'))}>Login</Button> }
                    </div>
                </header>

                <div className="grid md:grid-cols-5 gap-8 items-center">
                    <div className="md:col-span-3 text-left">
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight tracking-tighter">
                            Master JavaScript,<br />One Challenge at a Time.
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-xl text-lg">
                            Sharpen your skills with interactive exercises, from fundamental concepts to advanced algorithms. Get instant feedback and track your progress.
                        </p>
                        <Button onClick={onStart} className="px-10 py-5 text-lg font-semibold">
                            View Challenges
                        </Button>
                    </div>
                    
                    <div className="md:col-span-2 hidden md:flex items-center justify-center">
                        <div className="w-64 h-64 relative flex items-center justify-center">
                            <div className="absolute inset-0 bg-yellow-500/10 rounded-full blur-2xl"></div>
                            <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-75 relative">
                                <path d="M70 50L40 80L70 110" stroke="#FBBF24" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M130 50L160 80L130 110" stroke="#FBBF24" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M110 40L90 160" stroke="#D1D5DB" className="dark:stroke-gray-600" strokeWidth="10" strokeLinecap="round"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};


const AppContent: React.FC = () => {
    const [page, setPage] = useState<Page>('hero');
    const [problems, setProblems] = useState<Problem[]>([]);
    const [selectedProblemId, setSelectedProblemId] = useState<string | null>(null);
    const [isLoadingProblems, setIsLoadingProblems] = useState(true);

    const auth = useAuth();
    const { addToast } = useToast();

    const fetchProblems = useCallback(async () => {
        setIsLoadingProblems(true);
        try {
            const res = await fetch('/api/problems');
            if (!res.ok) throw new Error('Failed to fetch problems');
            const apiProblems = await res.json();

            // Merge API data with static problems data to retain solutionCheck function
            const mergedProblems = staticProblemsData.map(staticP => {
                const apiP = apiProblems.find((p: Problem) => p.id === staticP.id);
                return {
                    ...staticP,
                    status: apiP?.status || ProblemStatus.Unsolved,
                    isStarred: apiP?.isStarred || false,
                    notes: apiP?.notes || '',
                    solutionCheck: staticP.solutionCheck // Ensure solutionCheck is retained
                };
            });
            setProblems(mergedProblems);
        } catch (error) {
            console.error(error);
            // Fallback to static data on error
            setProblems(staticProblemsData.map(p => ({
                ...p, status: ProblemStatus.Unsolved, isStarred: false, notes: ''
            })));
        } finally {
            setIsLoadingProblems(false);
        }
    }, []);
    
    useEffect(() => {
        fetchProblems();
    }, [fetchProblems, auth.isAuthenticated]);

    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.replace('#', '');
            if (hash === 'profile') {
                setPage('profile');
            } else if (hash === 'list') {
                setPage('list');
            } else if (hash === 'quiz') {
                setPage('quiz');
            } else if (hash === 'hero') {
                setPage('hero');
            }
        };
        window.addEventListener('hashchange', handleHashChange);
        handleHashChange(); // Check hash on initial load
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);
    
    const handleUpdateProblemData = async (id: string, updates: Partial<Pick<Problem, 'status' | 'isStarred' | 'notes'>>) => {
       if (!auth.isAuthenticated) {
           window.dispatchEvent(new Event('openLoginModal'));
           return;
       }

        // Optimistic update
        const originalProblems = problems;
        setProblems(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));

        try {
            const res = await fetch(`/api/problems/${id}/progress`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updates)
            });

            if (!res.ok) {
                throw new Error('Failed to update problem progress');
            }
            
            if (updates.notes !== undefined) {
                addToast('Notes saved successfully!', 'success');
            }
            if (updates.isStarred !== undefined) {
                addToast(updates.isStarred ? 'Added to revision list' : 'Removed from revision list', 'info');
            }

        } catch (error) {
            console.error(error);
            addToast('Failed to save progress.', 'error');
            setProblems(originalProblems);
        }
    };
    
    const handleProblemStatusChange = (id: string, newStatus: ProblemStatus) => {
        handleUpdateProblemData(id, { status: newStatus });
    };

    const handleToggleStar = (id: string) => {
        const problem = problems.find(p => p.id === id);
        if (problem) {
            handleUpdateProblemData(id, { isStarred: !problem.isStarred });
        }
    };

    const handleUpdateNotes = (id: string, notes: string) => {
        handleUpdateProblemData(id, { notes });
    };

    const selectedProblem = useMemo(() => {
        return problems.find(p => p.id === selectedProblemId);
    }, [problems, selectedProblemId]);

    const renderPage = () => {
        if (auth.isLoading || isLoadingProblems) {
            return (
                <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center text-gray-900 dark:text-white">
                    Loading...
                </div>
            );
        }
        
        switch (page) {
            case 'hero':
                return <HeroPage onStart={() => setPage('list')} onQuiz={() => setPage('quiz')} />;
            case 'list':
                return <ProblemListPage
                    problems={problems}
                    onSelectProblem={(id) => { setSelectedProblemId(id); setPage('problem'); }}
                    onToggleStar={handleToggleStar}
                    onUpdateNotes={handleUpdateNotes}
                    onNavigate={setPage}
                    onLogin={() => window.dispatchEvent(new Event('openLoginModal'))}
                    onLogout={auth.logout}
                />;
            case 'problem':
                if (selectedProblem) {
                    return <ProblemSolvingPage
                        key={selectedProblem.id}
                        problem={selectedProblem}
                        onStatusChange={handleProblemStatusChange}
                        onToggleStar={handleToggleStar}
                        onUpdateNotes={handleUpdateNotes}
                        onBack={() => { setSelectedProblemId(null); setPage('list'); }}
                        onNavigate={setPage}
                        onLogin={() => window.dispatchEvent(new Event('openLoginModal'))}
                        onLogout={auth.logout}
                    />;
                }
                setPage('list'); // Go back to list if problem not found
                return null;
            case 'profile':
                 if (!auth.isAuthenticated) {
                    setPage('hero');
                    return null;
                }
                return <ProfilePage />;
            case 'quiz':
                return <QuizPage onBack={() => setPage('list')} />;
            default:
                return <HeroPage onStart={() => setPage('list')} onQuiz={() => setPage('quiz')} />;
        }
    };

    return (
        <div className="min-h-screen">
            {page !== 'hero' && (
                <Header 
                    onNavigate={setPage} 
                    onBack={page === 'problem' || page === 'quiz' ? () => setPage('list') : undefined} 
                    problemTitle={page === 'problem' ? selectedProblem?.title : page === 'quiz' ? 'JavaScript Quiz' : undefined}
                    onLogin={() => window.dispatchEvent(new Event('openLoginModal'))}
                    onLogout={auth.logout}
                />
            )}
            {renderPage()}
        </div>
    );
};

export default function Page() {
    return (
        <ToastProvider>
            <AppContent />
        </ToastProvider>
    );
}