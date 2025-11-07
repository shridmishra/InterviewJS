import React, { useState } from 'react';
import { Problem, ProblemStatus, TestResult } from '../../types';
import Button from '../ui/Button';
import CodeEditor from '../common/CodeEditor';
import TestResultsDisplay from '../quiz/TestResultsDisplay';
import { FiMaximize, FiMinimize, FiTrash2 } from 'react-icons/fi';
import { FaPlus, FaBookmark } from 'react-icons/fa';
import { Badge } from '../ui/Card';
import NotesModal from '../modals/NotesModal';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../common/Toast';

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




const ProblemSolvingPage: React.FC<ProblemSolvingPageProps> = ({ problem, onStatusChange, onToggleStar, onUpdateNotes, onLogin, onBack: _onBack, onNavigate: _onNavigate, onLogout: _onLogout }) => {
  const [code, setCode] = useState(problem.starterCode);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);
  const auth = useAuth();
  const { addToast } = useToast();

  const handleClearCode = () => {
    setCode(problem.starterCode);
    addToast('Code has been reset.', 'info');
  };

  const handleRunTests = () => {
    setIsRunning(true);
    setTestResults([]);

    setTimeout(() => {
      const results = problem.solutionCheck(code);
      setTestResults(results);
      const allPassed = results.every(r => r.passed);
      
      if (allPassed) {
          addToast('All tests passed!', 'success');
          onStatusChange(problem.id, ProblemStatus.Attempted);
      } else {
          const passedCount = results.filter(r => r.passed).length;
          addToast(`${passedCount}/${results.length} tests passed. Keep trying!`, 'error');
          onStatusChange(problem.id, ProblemStatus.Attempted);
      }
      setIsRunning(false);
    }, 300);
  };

  const handleSubmit = () => {
     if (!auth.isAuthenticated) {
        onLogin();
        return;
    }
    setIsRunning(true);
    setTimeout(() => {
      const results = problem.solutionCheck(code);
      setTestResults(results);
      const allPassed = results.every(r => r.passed);

      if (allPassed) {
        onStatusChange(problem.id, ProblemStatus.Solved);
        addToast('Solution submitted successfully!', 'success');
      } else {
        addToast('Submission failed. Please pass all tests first.', 'error');
        onStatusChange(problem.id, ProblemStatus.Attempted);
      }
      setIsRunning(false);
    }, 300);
  }

  const renderDescription = (description: string) => {
    const parts = description.split('`');
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return <span key={index} className="text-yellow-500 px-1 py-0.5 rounded-md font-mono text-sm">{part}</span>;
      }
      return part;
    });
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-black">
      <main className="grow grid grid-cols-1 lg:grid-cols-5 gap-4 p-4">
        
        {/* Left Panel: Description */}
        {!isFullScreen && (
            <div className="lg:col-span-2 flex flex-col bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                <div className="flex justify-between items-start">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white pr-4">{problem.title}</h2>
                    <div className="flex items-center gap-2 shrink-0">
                        <button onClick={() => auth.isAuthenticated ? onToggleStar(problem.id) : onLogin()} className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                            <FaBookmark className={problem.isStarred ? 'text-yellow-500' : 'text-gray-400'} />
                        </button>
                        <button onClick={() => auth.isAuthenticated ? setIsNotesModalOpen(true) : onLogin()} className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                            <FaPlus className={problem.notes ? 'text-yellow-500' : 'text-gray-400'} />
                        </button>
                    </div>
                </div>
            </div>
            <div className="p-6 overflow-y-auto">
                    <div className="flex items-center gap-4 mb-4">
                        <Badge difficulty={problem.difficulty}>{problem.difficulty}</Badge>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{problem.category}</span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap mb-6">{renderDescription(problem.description)}</p>
                    
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Examples</h3>
                        <div className="space-y-3">
                        {problem.testCases && problem.testCases.map((tc, i) => (
                            <div key={i} className="p-3 bg-gray-100 dark:bg-gray-800 rounded-md font-mono text-sm">
                                <p className="font-semibold text-gray-700 dark:text-gray-300">Example {i + 1}:</p>
                                <p><span className="text-gray-500 dark:text-gray-400">Input:</span> {JSON.stringify(tc.input)}</p>
                                <p><span className="text-gray-500 dark:text-gray-400">Expected:</span> {JSON.stringify(tc.expectedOutput)}</p>
                            </div>
                        ))}
                        </div>
                        </div>

                    <a href={problem.docsUrl} target="_blank" rel="noopener noreferrer" className="text-yellow-500 dark:text-yellow-400 hover:text-yellow-600 dark:hover:text-yellow-300 mt-6 inline-block text-sm">
                        Related Documentation &rarr;
                    </a>
            </div>
            </div>
        )}
        
        {/* Right Panel: Editor and Results */}
        <div className={`flex flex-col gap-4 ${isFullScreen ? 'col-span-full' : 'lg:col-span-3'}`}>
            <div className={isFullScreen ? "fixed inset-0 z-50 flex flex-col bg-white dark:bg-gray-900" : "grow flex flex-col rounded-lg bg-white dark:bg-gray-900 overflow-hidden border border-gray-200 dark:border-gray-800"}>
                <div className="shrink-0 px-4 py-2 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">JavaScript</span>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={handleClearCode} className="text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-500 flex items-center gap-2">
                            <FiTrash2 /> Clear
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => setIsFullScreen(!isFullScreen)} className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                            {isFullScreen ? <FiMinimize /> : <FiMaximize />}
                        </Button>
                    </div>
                </div>
                <div className="grow relative min-h-[400px]">
                   <CodeEditor value={code} onChange={setCode} />
                </div>
            </div>
            
            {!isFullScreen && (
                <div className="shrink-0 flex flex-col rounded-lg bg-white dark:bg-gray-900 h-[400px] lg:h-[33%] border border-gray-200 dark:border-gray-800">
                    <div className="flex justify-between items-center px-4 py-2 border-b border-gray-200 dark:border-gray-800">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Test Results</h3>
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
                            <div className="text-gray-500 dark:text-gray-400 text-sm h-full flex items-center justify-center">
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

export default ProblemSolvingPage;