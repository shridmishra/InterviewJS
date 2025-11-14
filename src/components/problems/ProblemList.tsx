import React, { useState, useMemo } from 'react';
import { Problem, ProblemStatus, Difficulty } from '../../types';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';

import { FaPlus } from 'react-icons/fa';
import Dropdown from '../ui/Dropdown';
import { BookmarkIcon, SearchIcon } from '../common/Icons';
import NotesModal from '../modals/NotesModal';
import { useAuth } from '../../context/AuthContext';
import ProgressBar from '../progress/ProgressBar';


interface ProblemListPageProps {
    problems: Problem[];
    onSelectProblem: (problem: Problem) => void;
    onToggleStar: (id: string) => void;
    onUpdateNotes: (id: string, notes: string) => void;
    onNavigate: (page: 'profile' | '' | 'list' | 'quiz') => void;
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
                        <p className="text-muted-foreground text-sm">Total Progress</p>
                        <p className="text-3xl font-bold mt-1">{solved} / {total}</p>
                    </div>
                    <div className="relative h-20 w-20">
                        <svg className="h-full w-full" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-muted" strokeWidth="3"></circle>
                            <circle cx="18" cy="18" r="16" fill="none"
                                className="stroke-current text-primary"
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
                    <div className="border-l border-border pl-6">
                        <p className="text-sm text-muted-foreground">Easy</p>
                        <div className="font-semibold text-lg">{easy.solved} / {easy.total} <span className="text-xs text-muted-foreground">completed</span></div>
                    </div>
                    <div className="border-l border-border pl-6">
                        <p className="text-sm text-muted-foreground">Medium</p>
                        <p className="font-semibold text-lg">{medium.solved} / {medium.total} <span className="text-xs text-muted-foreground">completed</span></p>
                    </div>
                    <div className="border-l border-border pl-6">
                        <p className="text-sm text-muted-foreground">Hard</p>
                        <p className="font-semibold text-lg">{hard.solved} / {hard.total} <span className="text-xs text-muted-foreground">completed</span></p>
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

const ArrowUpIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="19" x2="12" y2="5"></line>
        <polyline points="5 12 12 5 19 12"></polyline>
    </svg>
);

const ArrowDownIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <polyline points="19 12 12 19 5 12"></polyline>
    </svg>
);

const SortArrows = ({ sortOrder }: { sortOrder: 'asc' | 'desc' | 'none' }) => {
    const iconClass = "h-4 w-4";
    const inactiveClass = "text-muted-foreground/50";

    return (
        <div className="flex items-center">
            {sortOrder === 'asc' && <ArrowUpIcon className={iconClass} />}
            {sortOrder === 'desc' && <ArrowDownIcon className={iconClass} />}
            {sortOrder === 'none' && (
                <div className="flex flex-col">
                    <ArrowUpIcon className={`h-3 w-3 ${inactiveClass}`} />
                    <ArrowDownIcon className={`h-3 w-3 ${inactiveClass} -mt-1`} />
                </div>
            )}
        </div>
    );
};

const ProblemList: React.FC<ProblemListPageProps> = ({ problems, onSelectProblem, onToggleStar, onUpdateNotes, onLogin, onNavigate: _onNavigate, onLogout: _onLogout }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | 'all'>('all');
    const [activeTab, setActiveTab] = useState('all');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | 'none'>('none');
    const [editingNotesFor, setEditingNotesFor] = useState<Problem | null>(null);
    const auth = useAuth();

    const handleSort = () => {
        setSortOrder(prev => {
            if (prev === 'asc') return 'desc';
            if (prev === 'desc') return 'none';
            return 'asc';
        });
    };

    const handleDropdownKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, onClick: () => void) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick();
        }
    };

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
            onSelectProblem(filteredProblems[randomIndex]);
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
        return Object.entries(groups).sort((a, b) => a[0].localeCompare(b[0])).map(([name, problems]) => ({ name, problems }));
    }, [filteredProblems]);


    return (
        <div className="min-h-screen flex flex-col bg-background">
            <main className="grow container mx-auto p-4 md:p-6 lg:p-8 flex flex-col">
                <ProgressSummary problems={problems} />


                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-2 p-1 bg-secondary rounded-full">
                        <Button
                            variant={activeTab === 'all' ? 'secondary' : 'ghost'}
                            size="sm"
                            onClick={() => handleTabChange('all')}
                            className={activeTab === 'all' ? 'bg-background hover:bg-background rounded-full' : 'text-muted-foreground hover:bg-accent rounded-full'}

                        >
                            All Problems
                        </Button>
                        <Button
                            variant={activeTab === 'revision' ? 'secondary' : 'ghost'}
                            size="sm"
                            onClick={() => handleTabChange('revision')}
                            className={`${activeTab === 'revision' ? 'bg-background hover:bg-background' : 'text-muted-foreground hover:bg-accent'} rounded-full`}
                        >
                            For Revision
                        </Button>
                    </div>
                    <div className="flex items-center gap-4 ">

                        <div className="flex items-center gap-2">
                            {isSearchVisible ? (
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <SearchIcon className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                    <Input
                                        placeholder="Search problems..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        onBlur={() => setIsSearchVisible(false)}
                                        className="pl-10"
                                    />
                                </div>
                            ) : (
                                <Button variant="secondary" onClick={() => setIsSearchVisible(true)} >
                                    <SearchIcon className="h-5 w-5 text-foreground" />
                                </Button>
                            )}
                        </div>
                        <Button variant="secondary" onClick={handlePickRandom} className="flex items-center gap-2">
                            <ShuffleIcon />  <p className='hidden lg:flex'>Pick Random</p>
                        </Button>
                        <div className="flex items-center gap-2">
                            <Dropdown
                                trigger={
                                    <div className=" p-2 text-sm font-medium flex rounded-md items-center justify-between w-40 bg-secondary text-secondary-foreground hover:bg-secondary-hover cursor-pointer">    <div>{difficultyFilter === 'all' ? 'Select Difficulty' : difficultyFilter}</div>
                                        <ChevronDownIcon />
                                    </div>

                                }
                            >
                                {(close) => (
                                    <div className="py-1">
                                        <div
                                            role="button"
                                            tabIndex={0}
                                            onClick={() => {
                                                setDifficultyFilter('all');
                                                close();
                                            }}
                                            onKeyDown={(e) => handleDropdownKeyDown(e, () => {
                                                setDifficultyFilter('all');
                                                close();
                                            })}
                                            className="block px-4 py-2 text-sm text-foreground hover:bg-accent cursor-pointer"
                                        >
                                            All
                                        </div>
                                        {Object.values(Difficulty).map(diff => (
                                            <div
                                                key={diff}
                                                role="button"
                                                tabIndex={0}
                                                onClick={() => {
                                                    setDifficultyFilter(diff);
                                                    close();
                                                }}
                                                onKeyDown={(e) => handleDropdownKeyDown(e, () => {
                                                    setDifficultyFilter(diff);
                                                    close();
                                                })}
                                                className="block px-4 py-2 text-sm text-foreground hover:bg-accent cursor-pointer"                                            >
                                                {diff}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </Dropdown>
                        </div>

                        
                    </div>
                </div>

                {groupedProblems.map(({ name, problems: groupProblems }, index) => {
                    const solvedCount = groupProblems.filter(p => p.status === ProblemStatus.Solved).length;
                    const totalCount = groupProblems.length;
                    const progress = totalCount > 0 ? (solvedCount / totalCount) * 100 : 0;

                    const sortedProblems = [...groupProblems];
                    if (sortOrder !== 'none') {
                        const difficultyOrder = {
                            [Difficulty.Easy]: 1,
                            [Difficulty.Medium]: 2,
                            [Difficulty.Hard]: 3,
                        };
                        sortedProblems.sort((a, b) => {
                            const diffA = difficultyOrder[a.difficulty];
                            const diffB = difficultyOrder[b.difficulty];
                            return sortOrder === 'asc' ? diffA - diffB : diffB - diffA;
                        });
                    }

                    return (
                        <details key={name} className="bg-card rounded-lg mb-4 border border-border group" open={index === 0}>
                            <summary className="p-4 cursor-pointer font-semibold list-none text-foreground hover:bg-accent rounded-t-lg relative">
                                <div className="flex justify-between items-center text-lg">
                                    <div className="flex items-center gap-4">
                                        <span className="group-open:rotate-180 transition-transform duration-200">
                                            <ChevronDownIcon />
                                        </span>
                                        <span>{name}</span>
                                    </div>
                                    <span className="text-sm text-muted-foreground font-medium">{solvedCount} / {totalCount}</span>
                                </div>
                                <div className="absolute bottom-0 left-0 w-full">
                                    <ProgressBar value={progress} />
                                </div>
                            </summary>
                            <div className="border-t border-border">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="hover:bg-transparent">
                                            <TableHead className="w-20">Status</TableHead>
                                            <TableHead>Problem</TableHead>
                                            <TableHead onClick={handleSort} className="cursor-pointer select-none w-[120px]">
                                                <div className="flex items-center gap-2">
                                                    Difficulty
                                                    <SortArrows sortOrder={sortOrder} />
                                                </div>
                                            </TableHead>
                                            <TableHead className="w-[120px] text-center">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {sortedProblems.map((problem) => (
                                            <TableRow key={problem.id} className="group/row">
                                                <TableCell className="cursor-pointer"><Checkbox checked={problem.status === ProblemStatus.Solved} className="rounded-sm" /></TableCell>
                                                <TableCell onClick={() => onSelectProblem(problem)} className="font-medium text-foreground cursor-pointer">{problem.title}</TableCell>
                                                <TableCell onClick={() => onSelectProblem(problem)} className="cursor-pointer">
                                                    <Badge variant={problem.difficulty === 'Easy' ? 'default' : problem.difficulty === 'Medium' ? 'secondary' : 'destructive'}>{problem.difficulty}</Badge>
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <button onClick={() => auth.isAuthenticated ? onToggleStar(problem.id) : onLogin()} className="p-1 rounded-full hover:bg-accent">                                                            <BookmarkIcon filled={!!problem.isStarred} className="text-gray-400" />
                                                        </button>
                                                        <button onClick={() => auth.isAuthenticated ? setEditingNotesFor(problem) : onLogin()} className="p-1 rounded-full hover:bg-accent">
                                                            <FaPlus className="text-gray-400" />
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

export default ProblemList;