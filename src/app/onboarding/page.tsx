'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { OnboardingProgress } from '@/components/onboarding/OnboardingProgress';
import {
    Code2, FileCode, Braces, Zap, Flame, Heart,
    ChevronRight, ChevronLeft, Rocket, Target, Clock,
    Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { SiJavascript, SiTypescript, SiReact, SiNextdotjs } from 'react-icons/si';

const STEPS = ['language', 'experience', 'goal', 'explainer'] as const;
type Step = typeof STEPS[number];

interface OnboardingData {
    languages: string[];
    experience: 'beginner' | 'intermediate' | 'advanced' | null;
    dailyGoal: 5 | 10 | 20 | null;
}

export default function OnboardingPage() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(0);
    const [data, setData] = useState<OnboardingData>({
        languages: [],
        experience: null,
        dailyGoal: null,
    });

    const step = STEPS[currentStep];

    const canProceed = () => {
        switch (step) {
            case 'language':
                return data.languages.length > 0;
            case 'experience':
                return data.experience !== null;
            case 'goal':
                return data.dailyGoal !== null;
            case 'explainer':
                return true;
            default:
                return false;
        }
    };

    const handleNext = () => {
        if (currentStep < STEPS.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            // Save onboarding data and redirect
            handleComplete();
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleComplete = async () => {
        // Save to API
        try {
            await fetch('/api/user/gamification', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'completeOnboarding',
                    ...data,
                }),
            });
        } catch (e) {
            console.error('Failed to save onboarding data:', e);
        }
        router.push('/learn');
    };

    const toggleLanguage = (lang: string) => {
        setData(prev => ({
            ...prev,
            languages: prev.languages.includes(lang)
                ? prev.languages.filter(l => l !== lang)
                : [...prev.languages, lang],
        }));
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            {/* Header */}
            <header className="p-4 border-b">
                <div className="max-w-lg mx-auto">
                    <OnboardingProgress currentStep={currentStep} totalSteps={STEPS.length} />
                </div>
            </header>

            {/* Content */}
            <main className="flex-1 flex items-center justify-center p-6">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                        className="w-full max-w-lg"
                    >
                        {/* Step 1: Language Selection */}
                        {step === 'language' && (
                            <div className="space-y-6 text-center">
                                <div>
                                    <h1 className="text-3xl font-bold mb-2">What do you want to learn?</h1>
                                    <p className="text-muted-foreground">Select one or more languages</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        { id: 'javascript', name: 'JavaScript', icon: SiJavascript, color: 'text-yellow-500' },
                                        { id: 'typescript', name: 'TypeScript', icon: SiTypescript, color: 'text-blue-500' },
                                        { id: 'react', name: 'React', icon: SiReact, color: 'text-cyan-500' },
                                        { id: 'nextjs', name: 'Next.js', icon: SiNextdotjs, color: 'text-foreground' },
                                    ].map(lang => {
                                        const Icon = lang.icon;
                                        const isSelected = data.languages.includes(lang.id);
                                        return (
                                            <button
                                                key={lang.id}
                                                onClick={() => toggleLanguage(lang.id)}
                                                className={cn(
                                                    'p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3',
                                                    isSelected
                                                        ? 'border-duo-green bg-duo-green/10 shadow-lg'
                                                        : 'border-border hover:border-primary/50'
                                                )}
                                            >
                                                <Icon className={cn('w-12 h-12', lang.color)} />
                                                <span className="font-bold">{lang.name}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Step 2: Experience Level */}
                        {step === 'experience' && (
                            <div className="space-y-6 text-center">
                                <div>
                                    <h1 className="text-3xl font-bold mb-2">What's your experience?</h1>
                                    <p className="text-muted-foreground">We'll personalize your learning path</p>
                                </div>

                                <div className="space-y-3">
                                    {[
                                        { id: 'beginner', label: 'Beginner', desc: "I'm new to coding", icon: Sparkles },
                                        { id: 'intermediate', label: 'Intermediate', desc: 'I know the basics', icon: Code2 },
                                        { id: 'advanced', label: 'Advanced', desc: 'I want to master it', icon: Rocket },
                                    ].map(level => {
                                        const Icon = level.icon;
                                        const isSelected = data.experience === level.id;
                                        return (
                                            <button
                                                key={level.id}
                                                onClick={() => setData(prev => ({ ...prev, experience: level.id as OnboardingData['experience'] }))}
                                                className={cn(
                                                    'w-full p-4 rounded-2xl border-2 transition-all flex items-center gap-4 text-left',
                                                    isSelected
                                                        ? 'border-duo-green bg-duo-green/10'
                                                        : 'border-border hover:border-primary/50'
                                                )}
                                            >
                                                <div className={cn(
                                                    'w-12 h-12 rounded-xl flex items-center justify-center',
                                                    isSelected ? 'bg-duo-green text-white' : 'bg-muted'
                                                )}>
                                                    <Icon className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <div className="font-bold">{level.label}</div>
                                                    <div className="text-sm text-muted-foreground">{level.desc}</div>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Step 3: Daily Goal */}
                        {step === 'goal' && (
                            <div className="space-y-6 text-center">
                                <div>
                                    <h1 className="text-3xl font-bold mb-2">Set a daily goal</h1>
                                    <p className="text-muted-foreground">Consistency is key to learning!</p>
                                </div>

                                <div className="space-y-3">
                                    {[
                                        { value: 5, label: 'Casual', desc: '5 min / day', icon: '🌱' },
                                        { value: 10, label: 'Regular', desc: '10 min / day', icon: '🌿' },
                                        { value: 20, label: 'Serious', desc: '20 min / day', icon: '🌳' },
                                    ].map(goal => {
                                        const isSelected = data.dailyGoal === goal.value;
                                        return (
                                            <button
                                                key={goal.value}
                                                onClick={() => setData(prev => ({ ...prev, dailyGoal: goal.value as 5 | 10 | 20 }))}
                                                className={cn(
                                                    'w-full p-4 rounded-2xl border-2 transition-all flex items-center gap-4 text-left',
                                                    isSelected
                                                        ? 'border-duo-green bg-duo-green/10'
                                                        : 'border-border hover:border-primary/50'
                                                )}
                                            >
                                                <div className="text-3xl">{goal.icon}</div>
                                                <div className="flex-1">
                                                    <div className="font-bold">{goal.label}</div>
                                                    <div className="text-sm text-muted-foreground">{goal.desc}</div>
                                                </div>
                                                <Clock className="w-5 h-5 text-muted-foreground" />
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Step 4: Explainer */}
                        {step === 'explainer' && (
                            <div className="space-y-8 text-center">
                                <div>
                                    <h1 className="text-3xl font-bold mb-2">You're all set! 🎉</h1>
                                    <p className="text-muted-foreground">Here's how CodeLingo works</p>
                                </div>

                                <div className="space-y-4">
                                    {[
                                        { icon: Heart, color: 'text-heart', title: 'Hearts', desc: 'You have 5 hearts. Wrong answers cost hearts. Practice to earn more!' },
                                        { icon: Zap, color: 'text-xp', title: 'XP', desc: 'Earn XP by completing lessons. Level up as you progress!' },
                                        { icon: Flame, color: 'text-streak', title: 'Streaks', desc: 'Practice daily to build your streak. Don\'t break the chain!' },
                                    ].map((item, index) => {
                                        const Icon = item.icon;
                                        return (
                                            <motion.div
                                                key={item.title}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.2 }}
                                                className="flex items-center gap-4 p-4 rounded-2xl bg-card border text-left"
                                            >
                                                <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center bg-muted', item.color)}>
                                                    <Icon className="w-6 h-6" fill="currentColor" />
                                                </div>
                                                <div>
                                                    <div className="font-bold">{item.title}</div>
                                                    <div className="text-sm text-muted-foreground">{item.desc}</div>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </main>

            {/* Footer */}
            <footer className="p-6 border-t">
                <div className="max-w-lg mx-auto flex justify-between items-center">
                    {currentStep > 0 ? (
                        <Button variant="ghost" onClick={handleBack} className="gap-1">
                            <ChevronLeft className="w-4 h-4" /> Back
                        </Button>
                    ) : (
                        <div />
                    )}

                    <Button
                        onClick={handleNext}
                        disabled={!canProceed()}
                        className={cn(
                            'px-8 h-12 rounded-xl font-bold text-base min-w-[140px]',
                            canProceed() ? 'btn-duo btn-duo-green' : 'bg-muted text-muted-foreground'
                        )}
                    >
                        {currentStep === STEPS.length - 1 ? (
                            <>Start Learning <Rocket className="w-5 h-5 ml-1" /></>
                        ) : (
                            <>Continue <ChevronRight className="w-5 h-5 ml-1" /></>
                        )}
                    </Button>
                </div>
            </footer>
        </div>
    );
}
