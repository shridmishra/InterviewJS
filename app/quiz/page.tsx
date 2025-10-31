'use client';

import React from 'react';
import QuizPage from '../components/QuizPage';
import Header from '../components/Header';
import { useRouter } from 'next/navigation';

import { Suspense } from 'react';

const Quiz = () => {
    const router = useRouter();

    const handleNavigate = (page: 'profile' | 'list' | 'hero' | 'quiz') => {
        router.push(`/${page}`);
    };

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
            <Header onNavigate={handleNavigate} />
            <main className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
                <Suspense fallback={<div>Loading...</div>}>
                    <QuizPage onBack={() => {}} />
                </Suspense>
            </main>
        </div>
    );
};


export default Quiz;
