'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { quizModules } from '../../data/quizzes';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/button';
import QuizModal from './QuizModal';
import { QuizQuestion } from '@/data/quizzes/types';
import Header from '@/components/common/Header';
import {
    FaCode,
    FaBrain,
    FaLayerGroup,
    FaClock,
    FaMousePointer,
    FaRocket,
    FaGlobe,
    FaStar
} from 'react-icons/fa';
import { SiJavascript, SiTypescript } from 'react-icons/si';

// Map IDs to Icons
const iconMap: Record<string, React.ElementType> = {
    'basics': SiJavascript,
    'functions-scope': FaBrain,
    'arrays-objects': FaLayerGroup,
    'asynchronous': FaClock,
    'dom-events': FaMousePointer,
    'advanced-concepts': FaRocket,
    'es6-features': FaStar,
    'web-apis-browser': FaGlobe,
    'typescript': SiTypescript,
};

export default function QuizPage() {
    const router = useRouter();
    const [selectedQuiz, setSelectedQuiz] = useState<{ title: string, questions: QuizQuestion[] } | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sessionId, setSessionId] = useState(0);

    const handleStartQuiz = (module: typeof quizModules[0]) => {
        setSelectedQuiz({
            title: module.title,
            questions: module.questions
        });
        setSessionId(prev => prev + 1);
        setIsModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-background">
            <Header
                onBack={() => router.push('/practice/js')}
                problemTitle="JavaScript Quizzes"
            />

            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <div className="mb-8 space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">JavaScript Quizzes</h1>
                    <p className="text-muted-foreground text-lg">Test your knowledge across various JavaScript topics.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {quizModules.map((module) => {
                        const Icon = iconMap[module.id] || FaCode;
                        return (
                            <Card key={module.id} className="hover:border-primary/50 transition-all hover:shadow-md flex flex-col group">
                                <CardHeader>
                                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary group-hover:scale-110 transition-transform duration-300">
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <CardTitle className="text-xl">{module.title}</CardTitle>
                                    <CardDescription className="line-clamp-2 text-sm mt-2">{module.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="mt-auto pt-0">
                                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
                                        <span className="text-sm text-muted-foreground font-medium bg-secondary/50 px-2 py-1 rounded">
                                            {module.questions.length} Questions
                                        </span>
                                        <Button onClick={() => handleStartQuiz(module)} variant="default" size="sm">
                                            Start Quiz
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {selectedQuiz && (
                    <QuizModal
                        key={sessionId}
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        questions={selectedQuiz.questions}
                        title={selectedQuiz.title}
                    />
                )}
            </div>
        </div>
    );
}