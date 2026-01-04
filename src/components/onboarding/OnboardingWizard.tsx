'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { Check } from 'lucide-react';

type Step = 'language' | 'experience' | 'goal' | 'signup';

export function OnboardingWizard() {
    const [step, setStep] = useState<Step>('language');
    const [selections, setSelections] = useState({
        language: '',
        experience: '',
        goal: ''
    });
    const router = useRouter();
    const { login } = useAuth();

    const languages = [
        { id: 'js', label: 'JavaScript', icon: '⚡' },
        { id: 'ts', label: 'TypeScript', icon: '📘' },
    ];

    const experienceLevels = [
        { id: 'beginner', label: 'Just starting', description: 'I want to learn the basics' },
        { id: 'intermediate', label: 'Intermediate', description: 'I know the basics, looking for practice' },
        { id: 'advanced', label: 'Pro', description: 'I want to master advanced concepts' },
    ];

    const goals = [
        { id: 'casual', label: 'Casual', text: '5 mins / day' },
        { id: 'regular', label: 'Regular', text: '15 mins / day' },
        { id: 'serious', label: 'Serious', text: '30 mins / day' },
        { id: 'intense', label: 'Intense', text: '60 mins / day' },
    ];

    const nextStep = (key: keyof typeof selections, value: string) => {
        setSelections(prev => ({ ...prev, [key]: value }));

        switch (step) {
            case 'language': setStep('experience'); break;
            case 'experience': setStep('goal'); break;
            case 'goal': setStep('signup'); break;
        }
    };

    const handleBack = () => {
        switch (step) {
            case 'experience': setStep('language'); break;
            case 'goal': setStep('experience'); break;
            case 'signup': setStep('goal'); break;
        }
    };

    const handleSignup = () => {
        // Here we would typically save the selections to local storage or pass them to the auth provider
        localStorage.setItem('onboarding_data', JSON.stringify(selections));
        login(); // Trigger login modal/redirect
    };

    const variants = {
        enter: { x: 50, opacity: 0 },
        center: { x: 0, opacity: 1 },
        exit: { x: -50, opacity: 0 }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <Card className="w-full max-w-lg border-2 shadow-xl">
                <CardHeader>
                    {step !== 'language' && (
                        <Button variant="ghost" className="w-fit p-0 h-auto mb-2 text-muted-foreground hover:text-foreground" onClick={handleBack}>
                            ← Back
                        </Button>
                    )}
                    <CardTitle className="text-2xl text-center">
                        {step === 'language' && "What do you want to learn?"}
                        {step === 'experience' && "How much coding do you know?"}
                        {step === 'goal' && "Pick a daily goal"}
                        {step === 'signup' && "Create your profile to save progress"}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={step}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.2 }}
                            className="space-y-4"
                        >
                            {step === 'language' && (
                                <div className="grid grid-cols-1 gap-4">
                                    {languages.map(lang => (
                                        <button
                                            key={lang.id}
                                            onClick={() => nextStep('language', lang.id)}
                                            className="flex items-center p-4 border-2 rounded-xl hover:bg-muted hover:border-primary transition-all text-left gap-4"
                                        >
                                            <span className="text-2xl">{lang.icon}</span>
                                            <span className="font-bold text-lg">{lang.label}</span>
                                        </button>
                                    ))}
                                </div>
                            )}

                            {step === 'experience' && (
                                <div className="grid grid-cols-1 gap-4">
                                    {experienceLevels.map(level => (
                                        <button
                                            key={level.id}
                                            onClick={() => nextStep('experience', level.id)}
                                            className="flex flex-col p-4 border-2 rounded-xl hover:bg-muted hover:border-primary transition-all text-left"
                                        >
                                            <span className="font-bold text-lg">{level.label}</span>
                                            <span className="text-muted-foreground">{level.description}</span>
                                        </button>
                                    ))}
                                </div>
                            )}

                            {step === 'goal' && (
                                <div className="grid grid-cols-1 gap-4">
                                    {goals.map(goal => (
                                        <button
                                            key={goal.id}
                                            onClick={() => nextStep('goal', goal.id)}
                                            className="flex items-center justify-between p-4 border-2 rounded-xl hover:bg-muted hover:border-primary transition-all text-left"
                                        >
                                            <span className="font-bold text-lg">{goal.label}</span>
                                            <span className="text-muted-foreground">{goal.text}</span>
                                        </button>
                                    ))}
                                </div>
                            )}

                            {step === 'signup' && (
                                <div className="text-center space-y-6">
                                    <div className="bg-muted p-6 rounded-xl space-y-2">
                                        <div className="flex items-center gap-2">
                                            <Check className="text-green-500 w-5 h-5" />
                                            <span>Target Language: <strong>{languages.find(l => l.id === selections.language)?.label}</strong></span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Check className="text-green-500 w-5 h-5" />
                                            <span>Experience: <strong>{experienceLevels.find(e => e.id === selections.experience)?.label}</strong></span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Check className="text-green-500 w-5 h-5" />
                                            <span>Daily Goal: <strong>{goals.find(g => g.id === selections.goal)?.text}</strong></span>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <Button size="lg" className="w-full font-bold text-lg" onClick={handleSignup}>
                                            Create Profile
                                        </Button>
                                        <Button variant="ghost" className="w-full text-muted-foreground" onClick={() => router.push('/learn')}>
                                            Maybe later
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </CardContent>
            </Card>
        </div>
    );
}
