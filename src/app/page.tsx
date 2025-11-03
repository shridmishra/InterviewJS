'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
    const router = useRouter();
    const auth = useAuth();

    const handleNavigate = (page: string) => {
        router.push(`/${page}`);
    };

    return (
        <div className="my-8 w-full flex flex-col items-center justify-center bg-white dark:bg-black overflow-hidden relative">
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-white dark:to-black z-0"></div>

            <main className="z-10 w-full px-4 sm:px-8 md:px-32">
                <header className="flex justify-between items-center mb-20 py-4">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                        practice<span className="text-yellow-400">JS</span>
                    </h1>
                    <div className="flex items-center gap-2 sm:gap-4">
                        <Button variant="ghost" size="sm" onClick={() => handleNavigate('challenges')}>Challenges</Button>
                        <Button variant="ghost" size="sm" className="hidden sm:inline-flex" onClick={() => handleNavigate('quiz')}>Quiz</Button>
                        {!auth.isAuthenticated && <Button variant="secondary" size="sm" onClick={() => window.dispatchEvent(new Event('openLoginModal'))}>Login</Button>}
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
                        <Button onClick={() => handleNavigate('challenges')} className="px-10 py-5 text-lg font-semibold">
                            View Challenges
                        </Button>
                    </div>

                    <div className="md:col-span-2 hidden md:flex items-center justify-center">
                        <div className="w-64 h-64 relative flex items-center justify-center">
                            <div className="absolute inset-0 bg-yellow-500/10 rounded-full blur-2xl"></div>
                            <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-75 relative">
                                <path d="M70 50L40 80L70 110" stroke="#FBBF24" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M130 50L160 80L130 110" stroke="#FBBF24" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M110 40L90 160" stroke="#D1D5DB" className="dark:stroke-gray-600" strokeWidth="10" strokeLinecap="round" />
                            </svg>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default function Page() {
    return (
        <HomePage />
    );
}