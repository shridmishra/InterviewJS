import React, { useState, useEffect, useRef } from 'react';

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X, Maximize2, Minimize2, Trophy, RefreshCw, ArrowRight, Minus, Plus } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { TopicQuestion } from '@/data/topics/types';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { HelpCircle } from 'lucide-react';

interface TopicModalProps {
    isOpen: boolean;
    onClose: () => void;
    questions: TopicQuestion[];
    startIndex: number;
    onSelectTopic: (topic: string) => void;
    allTopics: string[];
}

export function TopicModal({ isOpen, onClose, questions, startIndex, onSelectTopic, allTopics }: TopicModalProps) {
    const [currentIndex, setCurrentIndex] = useState(startIndex);
    const [showCompletion, setShowCompletion] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [fontSize, setFontSize] = useState(16); // Default font size
    const scrollRef = useRef<HTMLDivElement>(null);
    const [suggestedTopics, setSuggestedTopics] = useState<string[]>([]);

    // Touch/swipe handling refs
    const touchStartX = useRef<number | null>(null);
    const touchEndX = useRef<number | null>(null);
    const minSwipeDistance = 50;


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
    }, [isOpen, currentIndex, questions, onClose, showCompletion, allTopics]);

    // Handle swipe gestures
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
        touchEndX.current = null;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (!touchStartX.current || !touchEndX.current) return;
        if (showCompletion) return;

        const distance = touchStartX.current - touchEndX.current;
        const isSwipeLeft = distance > minSwipeDistance;
        const isSwipeRight = distance < -minSwipeDistance;

        if (isSwipeLeft) {
            // Swipe left = next
            if (currentIndex < questions.length - 1) {
                setCurrentIndex(prev => prev + 1);
            } else {
                const currentTopic = questions[0].topic;
                const otherTopics = allTopics.filter(t => t !== currentTopic);
                setSuggestedTopics(otherTopics.sort(() => 0.5 - Math.random()).slice(0, 4));
                setShowCompletion(true);
            }
        } else if (isSwipeRight && currentIndex > 0) {
            // Swipe right = previous
            setCurrentIndex(prev => prev - 1);
        }

        touchStartX.current = null;
        touchEndX.current = null;
    };

    // Handle trackpad two-finger horizontal swipe
    const lastWheelTime = useRef<number>(0);
    const handleWheel = (e: React.WheelEvent) => {
        // Only handle horizontal scroll (trackpad two-finger swipe)
        if (Math.abs(e.deltaX) < 30 || Math.abs(e.deltaY) > Math.abs(e.deltaX)) return;
        if (showCompletion) return;

        const now = Date.now();
        if (now - lastWheelTime.current < 300) return; // Debounce
        lastWheelTime.current = now;

        if (e.deltaX > 0) {
            // Swipe left (scroll right) = next
            if (currentIndex < questions.length - 1) {
                setCurrentIndex(prev => prev + 1);
            } else {
                const currentTopic = questions[0].topic;
                const otherTopics = allTopics.filter(t => t !== currentTopic);
                setSuggestedTopics(otherTopics.sort(() => 0.5 - Math.random()).slice(0, 4));
                setShowCompletion(true);
            }
        } else if (e.deltaX < 0 && currentIndex > 0) {
            // Swipe right (scroll left) = previous
            setCurrentIndex(prev => prev - 1);
        }
    };

    // Handle fullscreen toggle
    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    };



    // Sync fullscreen state with browser
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    // Reset state when questions change (State from props pattern)
    const [prevQuestions, setPrevQuestions] = useState(questions);
    if (questions !== prevQuestions) {
        setPrevQuestions(questions);
        setCurrentIndex(startIndex);
        setShowCompletion(false);
    }




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


    if (!currentQuestion) return null;


    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => !open && onClose()}
        >
            <DialogContent
                overlayClassName={!isFullscreen ? "backdrop-blur-md" : ""}
                className={`w-full flex flex-col p-0 gap-0 overflow-hidden bg-background border-border shadow-2xl focus:outline-none transition-all duration-300 ${isFullscreen ? 'h-[100dvh] min-w-full rounded-none sm:rounded-none' : 'h-[100dvh] sm:h-[85vh] sm:max-w-3xl sm:rounded-xl'}`} showCloseButton={false}>
                {showCompletion ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 text-center space-y-8 animate-in fade-in duration-300 overflow-y-auto">
                        <div className="space-y-4 max-w-lg mx-auto">
                            <div className="relative">
                                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                                    <Trophy className="w-12 h-12 text-primary" />
                                </div>
                                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full animate-ping opacity-20" />
                            </div>

                            <h2 className="text-4xl font-extrabold tracking-tight text-foreground">
                                Topic Mastered!
                            </h2>
                            <p className="text-muted-foreground text-lg px-4 leading-relaxed">
                                You&apos;ve successfully completed all <span className="text-foreground font-semibold">{questions.length}</span> questions in <span className="text-primary font-semibold">{currentQuestion.topic}</span>.
                            </p>
                        </div>

                        {suggestedTopics.length > 0 && (
                            <div className="w-full max-w-md space-y-4 pt-4 border-t border-border/50">
                                <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
                                    Suggested Next Topics
                                </p>
                                <div className="grid grid-cols-2 gap-3">
                                    {suggestedTopics.map((topic) => (
                                        <Button
                                            key={topic}
                                            variant="outline"
                                            className="h-auto py-3 px-4 flex flex-col items-start gap-1 hover:border-primary hover:bg-primary/5 transition-all text-left group"
                                            onClick={() => {
                                                onSelectTopic(topic);
                                                setShowCompletion(false);
                                            }}
                                        >
                                            <span className="font-semibold text-foreground group-hover:text-primary transition-colors">{topic}</span>
                                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                Practice <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                                            </span>
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="flex items-center gap-3 w-full max-w-xs pt-4">
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setCurrentIndex(0);
                                    setShowCompletion(false);
                                }}
                                className="flex-1 gap-2"
                            >
                                <RefreshCw className="w-4 h-4" />
                                Restart
                            </Button>
                            <Button
                                onClick={onClose}
                                className="flex-1 bg-foreground text-background hover:bg-foreground/90"
                            >
                                Done
                            </Button>
                        </div>
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

                        </div>
                        {/* Progress Bar */}
                        <div className="h-[2px] bg-muted w-full shrink-0">
                            <div className="h-full bg-primary/50 transition-all duration-300 ease-out" style={{ width: `${progress}%` }} />
                        </div>

                        {isFullscreen && (
                            <div className="fixed top-20 right-8 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
                                <div className="flex items-center gap-1 bg-muted backdrop-blur-md  shadow-2xl rounded-full p-1.5 px-2">
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 rounded-full bg-muted"
                                                    onClick={() => setFontSize(prev => Math.max(12, prev - 2))}
                                                    disabled={fontSize <= 12}
                                                >
                                                    <Minus className="h-4 w-4" />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Decrease font size</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>

                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 rounded-full bg-muted"
                                                    onClick={() => setFontSize(prev => Math.min(32, prev + 2))}
                                                    disabled={fontSize >= 32}
                                                >
                                                    <Plus className="h-4 w-4" />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Increase font size</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                            </div>
                        )}

                        <div className="absolute top-4 right-4 flex items-center gap-1 z-50">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <button
                                            className="rounded-full p-2 hover:bg-muted transition-colors focus:outline-none focus-visible:ring-0 focus-visible:bg-muted hidden sm:block"
                                            aria-label="Navigation Help"
                                        >
                                            <HelpCircle className="w-5 h-5 text-muted-foreground" />
                                        </button>
                                    </TooltipTrigger>
                                    <TooltipContent >
                                        <p>Use <span className="font-semibold text-background px-1 rounded-full">arrow keys</span> or <span className="font-semibold text-background px-1 rounded-full">swipe</span> to navigate</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <button
                                            onClick={toggleFullscreen}
                                            className="rounded-full p-2 hover:bg-muted transition-colors focus:outline-none focus-visible:ring-0 focus-visible:bg-muted"
                                            aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                                        >
                                            {isFullscreen ? (
                                                <Minimize2 className="w-5 h-5 text-muted-foreground" />
                                            ) : (
                                                <Maximize2 className="w-5 h-5 text-muted-foreground" />
                                            )}
                                        </button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>{isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>

                            <button
                                onClick={onClose}
                                className="rounded-full p-2 hover:bg-muted transition-colors focus:outline-none focus-visible:ring-0 focus-visible:bg-muted"
                                aria-label="Close"
                            >
                                <X className="w-5 h-5 text-muted-foreground" />
                            </button>
                        </div>


                        {/* Content - Single Column */}
                        <div
                            ref={scrollRef}
                            className={`flex-1 overflow-y-auto p-6 space-y-8 bg-muted/50 scroll-smooth relative ${isFullscreen ? 'md:p-10' : 'md:px-24 md:py-10'}`}
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                            onWheel={handleWheel}
                        >
                            {/* Question Section */}
                            <div className="space-y-4 max-w-4xl mx-auto">
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 leading-tight tracking-tight">
                                    {currentQuestion.question}
                                </h2>
                            </div>

                            {/* Answer Section */}
                            <div
                                className="prose prose-neutral bg-muted/50 p-8 rounded-md dark:prose-invert max-w-4xl mx-auto prose-headings:scroll-mt-20 prose-pre:bg-muted/50 prose-pre:border prose-pre:border-border/50 prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-li:text-gray-600 dark:prose-li:text-gray-300"
                                style={{ fontSize: `${fontSize}px` }}
                            >
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                        code({ inline, className, children, ...props }: { inline?: boolean; className?: string; children?: React.ReactNode;[key: string]: any }) {
                                            const match = /language-(\w+)/.exec(className || '');
                                            if (match) {
                                                return (
                                                    <SyntaxHighlighter
                                                        style={vscDarkPlus}
                                                        language={match[1]}
                                                        PreTag="div"
                                                        className="rounded-lg !bg-background/20 !p-6 border border-border/50 my-6 shadow-sm"
                                                        customStyle={{ fontSize: `${fontSize}px`, lineHeight: '1.6' }}
                                                        codeTagProps={{ style: { fontSize: `${fontSize}px`, lineHeight: '1.6' } }}
                                                        {...props}
                                                    >
                                                        {String(children).replace(/\n$/, '')}
                                                    </SyntaxHighlighter>
                                                );
                                            }
                                            return (
                                                <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-primary font-medium" {...props}>{children}</code>
                                            );
                                            // Duplicate return removed
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

                        {/* Floating Navigation Buttons - Visible on hover or always? Always for better UX */}
                        {currentIndex > 0 && (
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={handlePrev}
                                className="fixed left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full shadow-lg bg-background/80 backdrop-blur-sm border-border hover:bg-background hover:scale-105 transition-all z-50 hidden md:flex"
                                aria-label="Previous Question"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </Button>
                        )}

                        {currentIndex < questions.length - 1 && (
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={handleNext}
                                className="fixed right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full shadow-lg bg-background/80 backdrop-blur-sm border-border hover:bg-background hover:scale-105 transition-all z-50 hidden md:flex"
                                aria-label="Next Question"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </Button>
                        )}

                        {/* Mobile Navigation Hint (since we hid buttons on mobile) */}
                        {/* Or maybe we should keep small buttons on mobile? 
                                 Swipe is good but sometimes users miss it.
                                 The original footer had "Use arrow keys or swipe".
                                 Let's trust the toast and swipe for mobile to keep UI clean, 
                                 or maybe add small indicators? 
                                 For now, just the buttons for desktop. 
                             */}

                    </>
                )}
            </DialogContent>
        </Dialog >
    );
}
