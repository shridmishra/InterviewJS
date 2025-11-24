import React, { useState } from 'react';
import { Problem, ProblemStatus, TestResult } from '../../types';
import { Button } from '@/components/ui/button';
import CodeEditor from '../common/CodeEditor';
import TestResultsDisplay from '../quiz/TestResultsDisplay';
import { FiMaximize, FiMinimize, FiTrash2 } from 'react-icons/fi';
import { FaPlus, FaBookmark } from 'react-icons/fa';
import { Badge } from '@/components/ui/badge';
import NotesModal from '../modals/NotesModal';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'sonner';

interface ProblemSolvingPageProps {
    problem: Problem;
    onStatusChange: (id: string, status: ProblemStatus) => void;
    onBack: () => void;
    onToggleStar: (id: string) => void;
    onUpdateNotes: (id: string, notes: string) => void;
    onNavigate: (page: 'profile' | 'list' | '' | 'quiz') => void;
    onLogin: () => void;
    onLogout: () => void;
}




const ProblemDetail: React.FC<ProblemSolvingPageProps> = ({ problem, onStatusChange, onToggleStar, onUpdateNotes, onLogin, onBack, onNavigate: _onNavigate, onLogout: _onLogout }) => {
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

    const renderDescription = (description: string) => {
        const parts = description.split('`');
        return parts.map((part, index) => {
            if (index % 2 === 1) {
                return <span key={index} className="text-primary px-1 py-0.5 rounded-md font-mono text-sm">{part}</span>;
            }
            return part;
        });
    };

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
                            <p className="text-foreground leading-relaxed whitespace-pre-wrap mb-6">{renderDescription(problem.description)}</p>

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

                            <a href={problem.docsUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-hover mt-6 inline-block text-sm">
                                Related Documentation &rarr;
                            </a>
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
                                <Button variant="ghost" size="sm" onClick={() => setIsFullScreen(!isFullScreen)} className="text-muted-foreground hover:text-foreground">
                                    {isFullScreen ? <FiMinimize /> : <FiMaximize />}
                                </Button>
                            </div>
                        </div>
                        <div className="grow relative min-h-[400px]">
                            <CodeEditor value={code} onChange={setCode} />
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