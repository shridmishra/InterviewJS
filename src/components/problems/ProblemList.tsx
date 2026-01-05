import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Problem, ProblemStatus, Difficulty } from '../../types';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BsChevronExpand } from "react-icons/bs";

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';

import { FaPlus, FaRandom, FaChevronUp, FaChevronDown, FaYoutube } from 'react-icons/fa';
import Dropdown from '../ui/Dropdown';
import { BookmarkIcon, SearchIcon } from '../common/Icons';
import NotesModal from '../modals/NotesModal';
import { useRouter } from 'next/navigation';
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
    playlistUrl?: string;
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
            <div className="p-4 md:p-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6">
                <div className="flex items-center justify-between md:justify-start gap-6">
                    <div className="flex items-center gap-4">
                        <div className="relative h-16 w-16 md:h-20 md:w-20">
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
                        <div>
                            <p className="text-muted-foreground text-sm">Total Progress</p>
                            <p className="text-2xl md:text-3xl font-bold mt-1">{solved} / {total}</p>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-0 md:flex md:items-center md:gap-x-8 md:gap-y-4">
                    <div className="border-t border-border pt-4 md:border-t-0 md:border-l md:pt-0 md:pl-6">
                        <p className="text-sm text-muted-foreground">Easy</p>
                        <div className="font-semibold text-lg">{easy.solved} / {easy.total} <span className="text-xs text-muted-foreground hidden sm:inline">completed</span></div>
                    </div>
                    <div className="border-t border-border pt-4 md:border-t-0 md:border-l md:pt-0 md:pl-6">
                        <p className="text-sm text-muted-foreground">Medium</p>
                        <p className="font-semibold text-lg">{medium.solved} / {medium.total} <span className="text-xs text-muted-foreground hidden sm:inline">completed</span></p>
                    </div>
                    <div className="border-t border-border pt-4 md:border-t-0 md:border-l md:pt-0 md:pl-6">
                        <p className="text-sm text-muted-foreground">Hard</p>
                        <p className="font-semibold text-lg">{hard.solved} / {hard.total} <span className="text-xs text-muted-foreground hidden sm:inline">completed</span></p>
                    </div>
                </div>
            </div>
        </Card>
    );
};

const ShuffleIcon = () => (
    <FaRandom className="h-4 w-4" />
);

const ChevronUpIcon = () => (
    <FaChevronUp className="h-5 w-5" />
);

const ChevronDownIcon = () => (
    <FaChevronDown className="h-5 w-5 transition-transform duration-200" />
);

const SortArrows = ({ sortOrder }: { sortOrder: 'asc' | 'desc' | 'none' }) => {
    return (
        <div className="flex items-center">
            {sortOrder === 'asc' && <ChevronUpIcon />}
            {sortOrder === 'desc' && <ChevronDownIcon />}
            {sortOrder === 'none' && <BsChevronExpand className="h-4 w-4 text-muted-foreground" />}
        </div>
    );
};

const ProblemList: React.FC<ProblemListPageProps> = ({ problems, onSelectProblem, onToggleStar, onUpdateNotes, onLogin, playlistUrl, onNavigate: _onNavigate, onLogout: _onLogout }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | 'all'>('all');
    const [activeTab, setActiveTab] = useState('all');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | 'none'>('none');
    const [editingNotesFor, setEditingNotesFor] = useState<Problem | null>(null);
    const router = useRouter();
    const auth = useAuth();
    const containerRef = useRef<HTMLDivElement>(null);

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

    // Track which groups are open (allow multiple)
    const [openGroups, setOpenGroups] = useState<Set<string>>(new Set());

    // Initialize with first group open when groups change
    useEffect(() => {
        if (groupedProblems.length === 0) {
            setOpenGroups(new Set());
            return;
        }
        // Open the first group by default if none are open
        if (openGroups.size === 0) {
            setOpenGroups(new Set([groupedProblems[0].name]));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [groupedProblems]);


    return (
        <div className="min-h-screen flex flex-col bg-background" style={{ scrollBehavior: 'auto' }}>
            <main ref={containerRef} className="grow container mx-auto p-4 md:p-6 lg:p-8 flex flex-col">
                <ProgressSummary problems={problems} />


                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    {/* Tabs + mobile shuffle */}
                    <div className="flex items-center gap-2">
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
                                <span className="sm:hidden"><BookmarkIcon filled={false} className="h-4 w-4" /></span>
                                <span className="hidden sm:inline">For Revision</span>
                            </Button>
                        </div>
                        {/* Topics Button (navigates to page) */}
                        <Button
                            variant="default"
                            size="sm"
                            onClick={() => router.push('/topics')}
                            className="rounded-full gap-2 bg-foreground/90 text-background hover:bg-foreground/90"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                            </svg>
                            <span className="hidden sm:inline">Topics</span>
                        </Button>
                        {/* Mobile-only random icon next to tabs */}
                        <Button
                            variant="secondary"
                            onClick={handlePickRandom}
                            aria-label="Pick Random"
                            className="md:hidden flex items-center justify-center p-2 rounded-md hover:bg-muted-foreground"
                            title="Pick Random"
                        >
                            <ShuffleIcon />
                        </Button>
                    </div>
                    {/* Search + desktop shuffle + difficulty */}
                    <div className="flex flex-row gap-2 items-center md:gap-4">
                        <div className="grow">
                            {isSearchVisible ? (
                                <div className="relative w-full">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <SearchIcon className="h-5 w-5 text-foreground" />
                                    </div>
                                    <Input
                                        placeholder="Search..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10 w-full"
                                    />
                                </div>
                            ) : (
                                <Button variant="secondary" onClick={() => setIsSearchVisible(true)} className="w-full justify-start text-muted-foreground">
                                    <SearchIcon className="h-5 w-5 text-foreground" />
                                    <span className="ml-2">Search...</span>
                                </Button>
                            )}
                        </div>
                        <div className="flex flex-row items-center gap-2 w-full sm:w-auto">
                            {/* Desktop-only shuffle button */}
                            <Button variant="secondary" onClick={handlePickRandom} className="hidden md:flex items-center justify-center gap-2">
                                <ShuffleIcon />
                                <span className="hidden md:inline">Pick Random</span>
                            </Button>
                            <div className="w-full sm:w-40">
                                <Dropdown
                                    trigger={
                                        <div className="p-2 text-sm font-medium flex rounded-md items-center justify-between w-full sm:w-40 bg-secondary text-secondary-foreground hover:bg-secondary-hover cursor-pointer">
                                            <div>{difficultyFilter === 'all' ? 'Select Difficulty' : difficultyFilter}</div>
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
                                                    className="block px-4 py-2 text-sm text-foreground hover:bg-accent cursor-pointer"
                                                >
                                                    {diff}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </div>

                {groupedProblems.map(({ name, problems: groupProblems }) => {
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
                        <details
                            key={name}
                            className="bg-card rounded-lg mb-4 border border-border group"
                            open={openGroups.has(name)}
                            onToggle={(e) => {
                                const isOpen = (e.currentTarget as HTMLDetailsElement).open;
                                setOpenGroups(prev => {
                                    const newSet = new Set(prev);
                                    if (isOpen) {
                                        newSet.add(name);
                                    } else {
                                        newSet.delete(name);
                                    }
                                    return newSet;
                                });
                            }}
                        >
                            <summary className="p-4 cursor-pointer font-semibold list-none text-foreground hover:bg-accent rounded-t-lg relative">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-lg">
                                    <div className="flex items-center gap-4">
                                        <span className="group-open:rotate-180 transition-transform duration-200">
                                            <ChevronDownIcon />
                                        </span>
                                        <span>{name}</span>
                                    </div>
                                    <span className="text-sm text-muted-foreground font-medium mt-2 sm:mt-0 ml-8 sm:ml-0">{solvedCount} / {totalCount}</span>
                                </div>
                                <div className="absolute bottom-0 left-0 w-full">
                                    <ProgressBar value={progress} />
                                </div>
                            </summary>
                            <div className="border-t border-border overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="hover:bg-transparent">
                                            <TableHead className="w-12">Status</TableHead>
                                            <TableHead>Problem</TableHead>
                                            {playlistUrl && <TableHead className="hidden lg:table-cell w-20 text-center">Lectures</TableHead>}
                                            <TableHead className="hidden md:table-cell w-36 text-center">Category</TableHead>
                                            <TableHead onClick={handleSort} className="cursor-pointer select-none w-36 text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    Difficulty
                                                    <SortArrows sortOrder={sortOrder} />
                                                </div>
                                            </TableHead>
                                            <TableHead className="w-36 text-center">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {sortedProblems.map((problem) => (
                                            <TableRow key={problem.id} className="group/row">
                                                <TableCell>
                                                    <Checkbox checked={problem.status === ProblemStatus.Solved} className="rounded-sm" />
                                                </TableCell>
                                                <TableCell onClick={() => onSelectProblem(problem)} className="font-medium text-foreground cursor-pointer">{problem.title}</TableCell>
                                                {playlistUrl && (
                                                    <TableCell className="hidden lg:table-cell w-20 text-center">
                                                        {problem.videoUrl ? (
                                                            <a href={problem.videoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center p-1 rounded-full hover:bg-accent" title="Watch Video Tutorial">
                                                                <FaYoutube className="h-5 w-5 text-red-600" />
                                                            </a>
                                                        ) : (
                                                            <span className="text-muted-foreground text-xs">-</span>
                                                        )}
                                                    </TableCell>
                                                )}
                                                <TableCell className="hidden md:table-cell w-36 text-center">
                                                    <Badge variant="outline" className="w-24 justify-center">{problem.category.split(' ')[0]}</Badge>
                                                </TableCell>
                                                <TableCell onClick={() => onSelectProblem(problem)} className="cursor-pointer w-36 text-center">
                                                    <Badge variant={problem.difficulty === 'Easy' ? 'default' : problem.difficulty === 'Medium' ? 'secondary' : 'destructive'}>{problem.difficulty}</Badge>
                                                </TableCell>
                                                <TableCell className="w-36 text-center">
                                                    <div className="flex items-center justify-center gap-1">
                                                        <button onClick={() => auth.isAuthenticated ? onToggleStar(problem.id) : onLogin()} className="p-1 rounded-full hover:bg-accent">
                                                            <BookmarkIcon filled={!!problem.isStarred} className="text-muted-foreground h-5 w-5" />
                                                        </button>
                                                        <button onClick={() => auth.isAuthenticated ? setEditingNotesFor(problem) : onLogin()} className="p-1 rounded-full hover:bg-accent">
                                                            <FaPlus className="text-muted-foreground h-4 w-4" />
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