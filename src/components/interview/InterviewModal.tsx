import React, { useState, useEffect, useRef } from 'react';

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { InterviewQuestion } from '@/data/interviews';
import { Card } from '@/components/ui/Card';


interface InterviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    questions: InterviewQuestion[];
    startIndex: number;
    onSelectTopic: (topic: string) => void;
    allTopics: string[];
}

export function InterviewModal({ isOpen, onClose, questions, startIndex, onSelectTopic, allTopics }: InterviewModalProps) {
    const [currentIndex, setCurrentIndex] = useState(startIndex);
    const [showCompletion, setShowCompletion] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [suggestedTopics, setSuggestedTopics] = useState<string[]>([]);

    // eslint-disable-next-line react-hooks/set-state-in-effect
    // eslint-disable-next-line react-hooks/set-state-in-effect
    // Handle keyboard navigation
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (showCompletion) {
                if (e.key === 'Escape') onClose();
                return;
            }

            if (e.key === 'ArrowRight') {
                if (currentIndex < questions.length - 1) {
                    setCurrentIndex(prev => prev + 1);
                } else {
                    const currentTopic = questions[0].topic;
                    const otherTopics = allTopics.filter(t => t !== currentTopic);
                    setSuggestedTopics(otherTopics.sort(() => 0.5 - Math.random()).slice(0, 4));
                    setShowCompletion(true);
                }
            }
            if (e.key === 'ArrowLeft') {
                if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
            }
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                scrollRef.current?.scrollBy({ top: -100, behavior: 'smooth' });
            }
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                scrollRef.current?.scrollBy({ top: 100, behavior: 'smooth' });
            }
            if (e.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, currentIndex, questions.length, onClose, showCompletion, questions, allTopics]);



    const currentQuestion = questions[currentIndex];
    const progress = ((currentIndex + 1) / questions.length) * 100;

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            const currentTopic = questions[0].topic;
            const otherTopics = allTopics.filter(t => t !== currentTopic);
            setSuggestedTopics(otherTopics.sort(() => 0.5 - Math.random()).slice(0, 4));
            setShowCompletion(true);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => !open && onClose()}
        >
            <DialogContent className="w-full h-[100dvh] sm:h-[85vh] sm:max-w-5xl flex flex-col p-0 gap-0 overflow-hidden sm:rounded-xl bg-background border-border shadow-2xl focus:outline-none" showCloseButton={false}>
                {showCompletion ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 text-center space-y-8 animate-in fade-in duration-300 overflow-y-auto">
                        <div className="space-y-4">
                            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                                <div className="text-4xl">🎉</div>
                            </div>
                            <DialogTitle className="text-3xl font-bold text-foreground">Topic Completed!</DialogTitle>
                            <p className="text-muted-foreground max-w-md mx-auto text-lg">
                                You&apos;ve mastered {questions.length} questions in {currentQuestion.topic}. Keep the momentum going!
                            </p>
                        </div>

                        <div className="w-full max-w-3xl">
                            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Continue Learning</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
                                {suggestedTopics.map((topic) => (
                                    <Card
                                        key={topic}
                                        className="p-4 hover:border-primary/50 hover:bg-accent/50 transition-all cursor-pointer flex items-center justify-center text-center h-24 group"
                                        onClick={() => onSelectTopic(topic)}
                                    >
                                        <span className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                                            {topic}
                                        </span>
                                    </Card>
                                ))}
                            </div>
                        </div>

                        <Button
                            variant="ghost"
                            onClick={onClose}
                            className="text-muted-foreground hover:text-foreground"
                        >
                            Close
                        </Button>
                    </div>
                ) : (
                    <>
                        <DialogTitle className="sr-only">
                            {currentQuestion.topic} - Question {currentIndex + 1}
                        </DialogTitle>
                        {/* Header with Close Button */}
                        <div className="border-b px-6 py-4 flex items-center justify-between bg-background z-10 relative shrink-0">
                            <div className="flex-1 pr-8">
                                <div className="flex items-center gap-3 mb-1">
                                    <span className="px-2.5 py-1 bg-primary/10 text-primary rounded-md text-xs font-semibold tracking-wide uppercase">
                                        {currentQuestion.topic}
                                    </span>
                                    <span className="text-sm text-muted-foreground font-medium">
                                        {currentIndex + 1} of {questions.length}
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 rounded-full p-2 hover:bg-muted transition-colors focus:outline-none focus-visible:ring-0 focus-visible:bg-muted"
                                aria-label="Close"
                            >
                                <X className="w-5 h-5 text-muted-foreground" />
                            </button>
                            {/* Progress Bar */}
                            <div className="absolute bottom-0 left-0 h-[2px] bg-muted w-full">
                                <div className="h-full bg-primary transition-all duration-300 ease-out" style={{ width: `${progress}%` }} />
                            </div>
                        </div>

                        {/* Content - Single Column */}
                        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 scroll-smooth">
                            {/* Question Section */}
                            <div className="space-y-4 max-w-4xl mx-auto">
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 leading-tight tracking-tight">
                                    {currentQuestion.question}
                                </h2>
                            </div>

                            {/* Answer Section */}
                            <div className="prose prose-lg prose-neutral dark:prose-invert max-w-4xl mx-auto prose-headings:scroll-mt-20 prose-pre:bg-muted/50 prose-pre:border prose-pre:border-border/50 prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-li:text-gray-600 dark:prose-li:text-gray-300">
                                <ReactMarkdown
                                    components={{
                                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                        code({ inline, className, children, ...props }: { inline?: boolean; className?: string; children?: React.ReactNode;[key: string]: any }) {
                                            const match = /language-(\w+)/.exec(className || '');
                                            return !inline && match ? (
                                                <SyntaxHighlighter
                                                    style={vscDarkPlus}
                                                    language={match[1]}
                                                    PreTag="div"
                                                    className="rounded-lg !bg-zinc-950 !p-6 text-sm md:text-base border border-border/50 my-6 shadow-sm"
                                                    {...props}
                                                >
                                                    {String(children).replace(/\n$/, '')}
                                                </SyntaxHighlighter>
                                            ) : (
                                                <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-primary font-medium" {...props}>{children}</code>
                                            );
                                        },
                                        h1: ({ children, ...props }) => <h1 className="text-2xl font-bold mt-8 mb-4 text-gray-800 dark:text-gray-100" {...props}>{children}</h1>,
                                        h2: ({ children, ...props }) => <h2 className="text-xl font-bold mt-8 mb-4 text-gray-800 dark:text-gray-100" {...props}>{children}</h2>,
                                        h3: ({ children, ...props }) => <h3 className="text-lg font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-100" {...props}>{children}</h3>,
                                        p: (props) => <p className="mb-4 leading-relaxed text-gray-600 dark:text-gray-300" {...props} />,
                                        ul: (props) => <ul className="mb-4 space-y-2 list-disc pl-6 text-gray-600 dark:text-gray-300" {...props} />,
                                        ol: (props) => <ol className="mb-4 space-y-2 list-decimal pl-6 text-gray-600 dark:text-gray-300" {...props} />,
                                        li: (props) => <li className="leading-relaxed pl-1" {...props} />,
                                        strong: (props) => <strong className="font-bold text-gray-900 dark:text-gray-100" {...props} />,
                                        blockquote: (props) => <blockquote className="border-l-4 border-primary/40 pl-4 italic my-6 text-muted-foreground bg-muted/20 py-2 pr-2 rounded-r" {...props} />,
                                        table: (props) => <div className="overflow-x-auto my-6 rounded-lg border border-border"><table className="min-w-full divide-y divide-border" {...props} /></div>,
                                        th: (props) => <th className="bg-muted/50 px-4 py-3 text-left font-semibold text-gray-800 dark:text-gray-100" {...props} />,
                                        td: (props) => <td className="px-4 py-3 border-t border-border/50 text-gray-600 dark:text-gray-300" {...props} />,
                                    }}
                                >
                                    {currentQuestion.answer}
                                </ReactMarkdown>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="border-t p-4 md:p-6 flex justify-between items-center bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shrink-0">
                            <Button
                                variant="ghost"
                                onClick={handlePrev}
                                disabled={currentIndex === 0}
                                className="gap-2 text-muted-foreground hover:text-foreground focus-visible:ring-0 focus-visible:bg-muted"
                            >
                                <ChevronLeft className="w-5 h-5" /> Previous
                            </Button>
                            <div className="text-sm text-muted-foreground hidden sm:block font-medium">
                                Use <kbd className="px-2 py-1 bg-muted rounded text-xs mx-1">←</kbd> <kbd className="px-2 py-1 bg-muted rounded text-xs mx-1">→</kbd> to navigate
                            </div>
                            <Button
                                variant="default"
                                onClick={handleNext}
                                className="gap-2 px-6 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                            >
                                {currentIndex === questions.length - 1 ? 'Finish' : 'Next'} <ChevronRight className="w-4 h-4" />
                            </Button>
                        </div>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}
