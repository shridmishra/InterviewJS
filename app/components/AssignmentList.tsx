import React, { useState, useMemo } from 'react';
import { Problem, ProblemStatus, Difficulty } from '../types';
import Card from './ui/Card';
import { Input, Checkbox } from './ui/Card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from './ui/Card';
import { Badge, Tabs, TabsList, TabsTrigger, TabsContent } from './ui/Card';
import Button from './ui/Button';

import { StarIcon, NoteIcon } from './Icons';
import NotesModal from './NotesModal';
import { useAuth } from '../context/AuthContext';
import ProgressBar from './ProgressBar';


interface ProblemListPageProps {
  problems: Problem[];
  onSelectProblem: (id: string) => void;
  onToggleStar: (id: string) => void;
  onUpdateNotes: (id: string, notes: string) => void;
  onNavigate: (page: 'profile' | 'hero' | 'list' | 'quiz') => void;
  onLogout: () => void;
  onLogin: () => void;
}

const ProgressSummary = ({ problems }: { problems: Problem[] }) => {
    const total = problems.length;
    const solved = problems.filter(p => p.status === ProblemStatus.Solved).length;
    const progress = total > 0 ? (solved / total) * 100 : 0;

    const getStatsByDifficulty = (difficulty: Difficulty) => {
        const filtered = problems.filter(p => p.difficulty === difficulty);
        const solvedCount = filtered.filter(p => p.status === ProblemStatus.Solved).length;
        return { total: filtered.length, solved: solvedCount };
    };

    const easy = getStatsByDifficulty(Difficulty.Easy);
    const medium = getStatsByDifficulty(Difficulty.Medium);
    const hard = getStatsByDifficulty(Difficulty.Hard);

    return (
        <Card className="mb-6">
            <div className="p-6 flex flex-wrap items-center justify-between gap-x-12 gap-y-6">
                <div className="flex items-center gap-6">
                    <div>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">Total Progress</p>
                        <p className="text-3xl font-bold mt-1">{solved} / {total}</p>
                    </div>
                    <div className="relative h-20 w-20">
                        <svg className="h-full w-full" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-gray-200 dark:text-gray-800" strokeWidth="3"></circle>
                            <circle cx="18" cy="18" r="16" fill="none"
                                className="stroke-current text-yellow-500"
                                strokeWidth="3"
                                strokeDasharray={`${progress}, 100`}
                                strokeLinecap="round"
                                transform="rotate(-90 18 18)"
                            ></circle>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center text-sm font-bold">
                            {Math.round(progress)}%
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-x-8 gap-y-4 flex-wrap">
                    <div className="border-l border-gray-200 dark:border-gray-700 pl-6">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Easy</p>
                        <p className="font-semibold text-lg">{easy.solved} / {easy.total} <span className="text-xs text-gray-600 dark:text-gray-500">completed</span></p>
                    </div>
                    <div className="border-l border-gray-200 dark:border-gray-700 pl-6">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Medium</p>
                        <p className="font-semibold text-lg">{medium.solved} / {medium.total} <span className="text-xs text-gray-600 dark:text-gray-500">completed</span></p>
                    </div>
                    <div className="border-l border-gray-200 dark:border-gray-700 pl-6">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Hard</p>
                        <p className="font-semibold text-lg">{hard.solved} / {hard.total} <span className="text-xs text-gray-600 dark:text-gray-500">completed</span></p>
                    </div>
                </div>
            </div>
        </Card>
    );
};

const ShuffleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line>
        <polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line>
        <line x1="4" y1="4" x2="9" y2="9"></line>
    </svg>
);

const ChevronDownIcon = () => (
    <svg className="h-5 w-5 transition-transform duration-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);

const ProblemListPage: React.FC<ProblemListPageProps> = ({ problems, onSelectProblem, onToggleStar, onUpdateNotes, onNavigate, onLogout, onLogin }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | 'all'>('all');
    const [activeTab, setActiveTab] = useState('all');
    const [editingNotesFor, setEditingNotesFor] = useState<Problem | null>(null);
    const auth = useAuth();
    
    const handleTabChange = (newTab: string) => {
        if (newTab === 'revision' && !auth.isAuthenticated) {
            onLogin();
            return;
        }
        setActiveTab(newTab);
    };

    const filteredProblems = useMemo(() => {
        return problems.filter(problem => {
            if (activeTab === 'revision' && !problem.isStarred) {
                return false;
            }
            const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesDifficulty = difficultyFilter === 'all' || problem.difficulty === difficultyFilter;
            return matchesSearch && matchesDifficulty;
        });
    }, [problems, searchTerm, difficultyFilter, activeTab]);

    const handlePickRandom = () => {
        if (filteredProblems.length > 0) {
            const randomIndex = Math.floor(Math.random() * filteredProblems.length);
            onSelectProblem(filteredProblems[randomIndex].id);
        }
    };
    
    const groupedProblems = useMemo(() => {
        const groups: Record<string, Problem[]> = {};
        for (const problem of filteredProblems) {
            if (!groups[problem.group]) {
                groups[problem.group] = [];
            }
            groups[problem.group].push(problem);
        }
        return Object.entries(groups).sort((a,b) => a[0].localeCompare(b[0])).map(([name, problems]) => ({ name, problems }));
    }, [filteredProblems]);


    return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-black">
        <main className="flex-grow container mx-auto p-4 md:p-6 lg:p-8 flex flex-col">
            <ProgressSummary problems={problems} />

            <Tabs value={activeTab} onValueChange={handleTabChange}>
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                    <TabsList className="p-0 border-0">
                        <TabsTrigger value="all">All Problems</TabsTrigger>
                        <TabsTrigger value="revision">For Revision</TabsTrigger>
                    </TabsList>
                    <div className="flex items-center gap-2 p-1 bg-gray-100 dark:bg-gray-900 rounded-md">
                        {(['all', ...Object.values(Difficulty)] as const).map(diff => (
                            <Button 
                                key={diff} 
                                variant={difficultyFilter === diff ? 'secondary' : 'ghost'} 
                                size="sm" 
                                onClick={() => setDifficultyFilter(diff)}
                                className={difficultyFilter === diff ? 'bg-white dark:bg-gray-700' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800'}
                            >
                                {diff === 'all' ? 'All' : diff}
                            </Button>
                        ))}
                    </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <Input 
                        placeholder="Search problems..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="max-w-xs"
                    />
                    <Button variant="secondary" onClick={handlePickRandom} className="flex items-center gap-2">
                        <ShuffleIcon /> Pick Random
                    </Button>
                </div>

                {groupedProblems.map(({ name, problems: groupProblems }, index) => {
                    const solvedCount = groupProblems.filter(p => p.status === ProblemStatus.Solved).length;
                    const totalCount = groupProblems.length;
                    const progress = totalCount > 0 ? (solvedCount / totalCount) * 100 : 0;

                    return (
                        <details key={name} className="bg-white dark:bg-gray-900/50 rounded-lg mb-4 border border-gray-200 dark:border-gray-800 group" open={index === 0}>
                            <summary className="p-4 cursor-pointer font-semibold list-none text-gray-800 dark:text-gray-200 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 rounded-t-lg">
                                <div className="flex justify-between items-center text-lg">
                                    <div className="flex items-center gap-4">
                                        <span className="group-open:rotate-180 transition-transform duration-200">
                                            <ChevronDownIcon />
                                        </span>
                                        <span>{name}</span>
                                    </div>
                                    <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">{solvedCount} / {totalCount}</span>
                                </div>
                                <div className="mt-3">
                                    <ProgressBar value={progress} />
                                </div>
                            </summary>
                            <div className="border-t border-gray-200 dark:border-gray-800">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="hover:bg-transparent">
                                            <TableHead className="w-[80px]">Status</TableHead>
                                            <TableHead>Problem</TableHead>
                                            <TableHead>Difficulty</TableHead>
                                            <TableHead className="w-[120px] text-center">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {groupProblems.map((problem) => (
                                            <TableRow key={problem.id} className="group/row">
                                                <TableCell onClick={() => onSelectProblem(problem.id)} className="cursor-pointer"><Checkbox checked={problem.status === ProblemStatus.Solved} readOnly disabled /></TableCell>
                                                <TableCell onClick={() => onSelectProblem(problem.id)} className="font-medium text-gray-800 dark:text-gray-200 cursor-pointer">{problem.title}</TableCell>
                                                <TableCell onClick={() => onSelectProblem(problem.id)} className="cursor-pointer">
                                                    <Badge difficulty={problem.difficulty}>{problem.difficulty}</Badge>
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <button onClick={() => auth.isAuthenticated ? onToggleStar(problem.id) : onLogin()} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                                                            <StarIcon filled={!!problem.isStarred} />
                                                        </button>
                                                        <button onClick={() => auth.isAuthenticated ? setEditingNotesFor(problem) : onLogin()} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                                                            <NoteIcon />
                                                        </button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </details>
                    );
                })}
            </Tabs>
        </main>
        {editingNotesFor && (
            <NotesModal
                problem={editingNotesFor}
                onClose={() => setEditingNotesFor(null)}
                onSave={(notes) => onUpdateNotes(editingNotesFor.id, notes)}
            />
        )}
    </div>
    );
};

export default ProblemListPage;