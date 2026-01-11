import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Problem, ProblemStatus, TestResult } from '../../types';
import { Button } from '@/components/ui/button';
import CodeEditor from '../editor/CodeEditor';
import TestResultsDisplay from '../quiz/TestResultsDisplay';
import { FiMaximize, FiMinimize, FiTrash2 } from 'react-icons/fi';
import { FaPlus, FaBookmark } from 'react-icons/fa';
import { Badge } from '@/components/ui/badge';
import NotesModal from '../modals/NotesModal';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'sonner';

interface ProblemSolvingPageProps {
    problem: Problem;
    topicSlug?: string;
    onStatusChange: (id: string, status: ProblemStatus) => void;
    onBack: () => void;
    onToggleStar: (id: string) => void;
    onUpdateNotes: (id: string, notes: string) => void;
    onNavigate: (page: 'profile' | 'list' | '' | 'quiz') => void;
    onLogin: () => void;
    onLogout: () => void;
}




const ProblemDetail: React.FC<ProblemSolvingPageProps> = ({ problem, topicSlug, onStatusChange, onToggleStar, onUpdateNotes, onLogin, onBack, onNavigate: _onNavigate, onLogout: _onLogout }) => {
    const [code, setCode] = useState(problem.starterCode);
    const [testResults, setTestResults] = useState<TestResult[]>([]);
    const [isRunning, setIsRunning] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);
    const auth = useAuth();

    const handleClearCode = () => {
        setCode(problem.starterCode);
        toast.info('Code has been reset.');
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
            setIsFullScreen(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    const handleRunTests = async () => {
        setIsRunning(true);
        setTestResults([]);

        const results = await Promise.resolve(problem.solutionCheck(code));
        setTestResults(results);
        const allPassed = results.every(r => r.passed);

        if (allPassed) {
            toast.success('All tests passed!');
            onStatusChange(problem.id, ProblemStatus.Attempted);
        } else {
            const passedCount = results.filter(r => r.passed).length;
            toast.error(`${passedCount}/${results.length} tests passed. Keep trying!`);
            onStatusChange(problem.id, ProblemStatus.Attempted);
        }
        setIsRunning(false);
    };

    const handleSubmit = async () => {
        if (!auth.isAuthenticated) {
            onLogin();
            return;
        }
        setIsRunning(true);
        const results = await Promise.resolve(problem.solutionCheck(code));
        setTestResults(results);
        const allPassed = results.every(r => r.passed);

        if (allPassed) {
            onStatusChange(problem.id, ProblemStatus.Solved);
            toast.success('Solution submitted successfully!');
            onBack();
        } else {
            toast.error('Submission failed. Please pass all tests first.');
            onStatusChange(problem.id, ProblemStatus.Attempted);
        }
        setIsRunning(false);
    }

    // renderDescription function removed


    const getYouTubeEmbedUrl = (url: string): string | null => {
        try {
            const urlObj = new URL(url);
            const videoId = urlObj.searchParams.get('v');
            if (videoId) {
                return `https://www.youtube.com/embed/${videoId}`;
            }
        } catch {
            return null;
        }
        return null;
    };

    /**
     * Maps topic slugs to Monaco Editor languages.
     * Supported topics: js, ts, react, nextjs, mongo, express, nodejs, prisma, postgres, html, css
     */
    const getLanguageFromSlug = (slug?: string): string => {
        const languageMap: Record<string, string> = {
            // JavaScript-based topics
            'js': 'javascript',
            'javascript': 'javascript',
            'react': 'javascript',      // React uses JSX which Monaco handles in JS mode
            'nextjs': 'javascript',     // Next.js uses JSX
            'mongo': 'javascript',      // MongoDB shell uses JS syntax
            'express': 'javascript',    // Express.js
            'nodejs': 'javascript',     // Node.js

            // TypeScript-based topics
            'ts': 'typescript',
            'typescript': 'typescript',
            'prisma': 'typescript',     // Prisma Client uses TypeScript

            // SQL-based topics
            'postgres': 'pgsql',        // PostgreSQL dialect
            'postgresql': 'pgsql',
            'sql': 'sql',

            // Markup languages
            'html': 'html',
            'css': 'css',
        };

        if (!slug) return 'javascript'; // Default fallback
        return languageMap[slug.toLowerCase()] || 'javascript';
    };

    const editorLanguage = getLanguageFromSlug(topicSlug);


    return (
        <div className="flex flex-col h-screen bg-background">
            <main className="grow grid grid-cols-1 lg:grid-cols-5 gap-4 p-4">

                {/* Left Panel: Description */}
                {!isFullScreen && (
                    <div className="lg:col-span-2 flex flex-col bg-card rounded-lg border border-border overflow-hidden">
                        <div className="p-4 border-b border-border">
                            <div className="flex justify-between items-start">
                                <h2 className="text-2xl font-bold text-foreground pr-4">{problem.title}</h2>
                                <div className="flex items-center gap-2 shrink-0">
                                    <button onClick={() => auth.isAuthenticated ? onToggleStar(problem.id) : onLogin()} className="p-1.5 rounded-full hover:bg-accent">
                                        <FaBookmark className={problem.isStarred ? 'text-primary' : 'text-muted-foreground'} />
                                    </button>
                                    <button onClick={() => auth.isAuthenticated ? setIsNotesModalOpen(true) : onLogin()} className="p-1.5 rounded-full hover:bg-accent">
                                        <FaPlus className={problem.notes ? 'text-primary' : 'text-muted-foreground'} />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 overflow-y-auto">
                            <div className="flex items-center gap-4 mb-4">
                                <Badge variant={problem.difficulty === 'Easy' ? 'default' : problem.difficulty === 'Medium' ? 'secondary' : 'destructive'}>{problem.difficulty}</Badge>
                                <span className="text-sm text-muted-foreground">{problem.category}</span>
                            </div>
                            <div className="text-foreground leading-relaxed mb-6 prose dark:prose-invert max-w-none">
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                        code({ inline, className, children, ...props }: { inline?: boolean; className?: string; children?: React.ReactNode;[key: string]: any }) {
                                            const match = /language-(\w+)/.exec(className || '');
                                            if (match) {
                                                return (
                                                    <SyntaxHighlighter
                                                        style={vscDarkPlus}
                                                        language={match[1]}
                                                        PreTag="div"
                                                        className="rounded-lg !bg-background/20 !p-4 text-sm border border-border/50 my-4 shadow-sm"
                                                        {...props}
                                                    >
                                                        {String(children).replace(/\n$/, '')}
                                                    </SyntaxHighlighter>
                                                );
                                            }
                                            return (
                                                <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-primary font-medium" {...props}>{children}</code>
                                            );
                                            return (
                                                <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-primary font-medium" {...props}>{children}</code>
                                            );
                                        },
                                        h1: ({ children, ...props }) => <h1 className="text-2xl font-bold mt-6 mb-3 text-foreground" {...props}>{children}</h1>,
                                        h2: ({ children, ...props }) => <h2 className="text-xl font-bold mt-6 mb-3 text-foreground" {...props}>{children}</h2>,
                                        h3: ({ children, ...props }) => <h3 className="text-lg font-semibold mt-4 mb-2 text-foreground" {...props}>{children}</h3>,
                                        p: (props) => <p className="mb-4 leading-relaxed text-foreground" {...props} />,
                                        ul: (props) => <ul className="mb-4 space-y-2 list-disc pl-6 text-foreground" {...props} />,
                                        ol: (props) => <ol className="mb-4 space-y-2 list-decimal pl-6 text-foreground" {...props} />,
                                        li: (props) => <li className="leading-relaxed pl-1" {...props} />,
                                        strong: (props) => <strong className="font-bold text-foreground" {...props} />,
                                        blockquote: (props) => <blockquote className="border-l-4 border-primary/40 pl-4 italic my-4 text-muted-foreground bg-muted/20 py-2 pr-2 rounded-r" {...props} />,
                                        table: (props) => <div className="overflow-x-auto my-4 rounded-lg border border-border"><table className="min-w-full divide-y divide-border" {...props} /></div>,
                                        th: (props) => <th className="bg-muted/50 px-4 py-3 text-left font-semibold text-foreground" {...props} />,
                                        td: (props) => <td className="px-4 py-3 border-t border-border/50 text-foreground" {...props} />,
                                    }}
                                >
                                    {problem.description}
                                </ReactMarkdown>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-foreground mb-3">Examples</h3>
                                <div className="space-y-3">
                                    {problem.testCases && problem.testCases.map((tc, i) => (
                                        <div key={i} className="p-3 bg-secondary rounded-md font-mono text-sm">
                                            <p className="font-semibold text-foreground">Example {i + 1}:</p>
                                            <p><span className="text-muted-foreground">Input:</span> {JSON.stringify(tc.input)}</p>
                                            <p><span className="text-muted-foreground">Expected:</span> {JSON.stringify(tc.expectedOutput)}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>


                            {problem.videoUrl && getYouTubeEmbedUrl(problem.videoUrl) && (
                                <div className="mt-6">
                                    <h3 className="text-lg font-semibold text-foreground mb-3">Video Tutorial</h3>
                                    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                                        <iframe
                                            className="absolute top-0 left-0 w-full h-full rounded-lg"
                                            src={getYouTubeEmbedUrl(problem.videoUrl) || ''}
                                            title="YouTube video player"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                </div>
                            )}

                            <div className="flex flex-wrap gap-3 mt-6">
                                <a href={problem.docsUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-hover inline-block text-sm">
                                    Documentation &rarr;
                                </a>
                                {problem.videoUrl && (
                                    <a href={problem.videoUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-hover inline-block text-sm">
                                        Open in YouTube &rarr;
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Right Panel: Editor and Results */}
                <div className={`flex flex-col gap-4 ${isFullScreen ? 'col-span-full' : 'lg:col-span-3'}`}>
                    <div className={isFullScreen ? "fixed inset-0 z-50 flex flex-col bg-card" : "grow flex flex-col rounded-lg bg-card overflow-hidden border border-border"}>
                        <div className="shrink-0 px-4 py-2 border-b border-border flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">JavaScript</span>
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" size="sm" onClick={handleClearCode} className="text-muted-foreground hover:text-destructive flex items-center gap-2">
                                    <FiTrash2 /> Clear
                                </Button>
                                <Button variant="ghost" size="sm" onClick={toggleFullscreen} className="text-muted-foreground hover:text-foreground">
                                    {isFullScreen ? <FiMinimize /> : <FiMaximize />}
                                </Button>
                            </div>
                        </div>
                        <div className="grow relative min-h-[400px]">
                            <CodeEditor
                                value={code}
                                onChange={setCode}
                                language={editorLanguage}
                                isFullScreen={isFullScreen}
                            />
                        </div>
                    </div>

                    {!isFullScreen && (
                        <div className="shrink-0 flex flex-col rounded-lg bg-card h-[400px] lg:h-[33%] border border-border">
                            <div className="flex justify-between items-center px-4 py-2 border-b border-border">
                                <h3 className="text-lg font-semibold text-foreground">Test Results</h3>
                                <div className="flex items-center gap-2">
                                    <Button variant="secondary" size="sm" onClick={handleRunTests} disabled={isRunning} className="w-20">
                                        {isRunning ? 'Running...' : 'Run'}
                                    </Button>
                                    <Button size="sm" onClick={handleSubmit} disabled={isRunning} className="w-20">
                                        Submit
                                    </Button>
                                </div>
                            </div>
                            <div className="grow overflow-y-auto p-4">
                                {testResults.length > 0 ? (
                                    <TestResultsDisplay results={testResults} />
                                ) : (
                                    <div className="text-muted-foreground text-sm h-full flex items-center justify-center">
                                        Click &quot;Run&quot; to see test results.
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </main>
            {isNotesModalOpen && (
                <NotesModal
                    problem={problem}
                    onClose={() => setIsNotesModalOpen(false)}
                    onSave={(notes) => onUpdateNotes(problem.id, notes)}
                />
            )}
        </div>
    );
};

export default ProblemDetail;