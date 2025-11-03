import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Card, { Badge } from './ui/Card';
import Button from './ui/Button';
import ContributionGraph from './ContributionGraph';
import DifficultyProgressBar from './DifficultyProgressBar';

const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 text-green-500 ${className || ''}`} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
);

const XIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 text-red-500 ${className || ''}`} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.693a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);

import { IUserAnsweredQuestion } from '../models/UserAnsweredQuestion';

interface ProfileData {
    solvedCount: number;
    totalCount: number;
    easySolved: number;
    mediumSolved: number;
    hardSolved: number;
    contributions: { [date: string]: number };
    streak: number;
    joinDate: string;
    quizHistory: IUserAnsweredQuestion[];
}

import { useRouter } from 'next/navigation';

const formatDateToRelativeTime = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    let interval = seconds / 31536000; // years
    if (interval > 1) {
        return Math.floor(interval) + " years ago";
    }
    interval = seconds / 2592000; // months
    if (interval > 1) {
        return Math.floor(interval) + " months ago";
    }
    interval = seconds / 604800; // weeks
    if (interval > 1) {
        return Math.floor(interval) + " weeks ago";
    }
    interval = seconds / 86400; // days
    if (interval > 1) {
        return Math.floor(interval) + " days ago";
    }
    interval = seconds / 3600; // hours
    if (interval > 1) {
        return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60; // minutes
    if (interval > 1) {
        return Math.floor(interval) + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
};

const ProfilePage: React.FC = () => {
    const auth = useAuth();
    const [profileData, setProfileData] = useState<ProfileData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    const handleViewQuizHistory = () => {
        router.push('/quiz-page?view=history');
    };

    useEffect(() => {
        const fetchProfile = async () => {
            if (!auth.isAuthenticated) return;
            setIsLoading(true);
            try {
                const res = await fetch('/api/user/profile');
                if (res.ok) {
                    const data = await res.json();
                    setProfileData(data);
                } else {
                    // Intentionally empty: No action needed if response is not ok
                }
            } catch (error) {
                // Intentionally empty: No action needed on error
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, [auth.isAuthenticated]);

    if (!auth.isAuthenticated || !auth.user) {
        return (
            <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white flex items-center justify-center">
                <p>Redirecting...</p>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white flex items-center justify-center">
                <p>Loading Profile...</p>
            </div>
        );
    }
    
    if (!profileData) {
         return (
            <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white flex items-center justify-center">
                <p>Could not load profile data.</p>
            </div>
        );
    }
    
    const { solvedCount, totalCount, easySolved, mediumSolved, hardSolved, contributions, streak, joinDate, quizHistory } = profileData;
    const progressPercent = totalCount > 0 ? (solvedCount / totalCount) * 100 : 0;
    const totalSubmissions = Object.values(contributions).reduce((a, b) => a + b, 0);

    const sortedQuizHistory = quizHistory.sort((a, b) => new Date(b.answeredAt).getTime() - new Date(a.answeredAt).getTime());

    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-black">
            <main className="grow container mx-auto p-4 md:p-6 lg:p-8">
                <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
                    <Card className="w-full md:w-auto shrink-0">
                        <div className="p-6 flex items-center gap-4">
                            <div className="relative w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-4xl font-bold text-gray-600 dark:text-gray-300 overflow-hidden">
                                {auth.user.image ? (
                                    <Image src={auth.user.image} alt="User Avatar" width={96} height={96} className="w-full h-full object-cover" />
                                ) : (
                                    <span>{auth.user.name ? auth.user.name.charAt(0).toUpperCase() : 'U'}</span>
                                )}
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold">{auth.user.name}</h1>
                                <p className="text-gray-500 dark:text-gray-400">{auth.user.email}</p>
                                <p className="text-gray-500 dark:text-gray-400">Joined {formatDateToRelativeTime(joinDate)}</p>
                            </div>
                        </div>
                    </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card>
                        <div className="p-6">
                            <h3 className="text-gray-500 dark:text-gray-400 mb-2">Total Solved</h3>
                            <p className="text-4xl font-bold">{solvedCount}</p>
                        </div>
                    </Card>
                    <Card>
                        <div className="p-6 flex flex-col items-center">
                            <h3 className="text-gray-500 dark:text-gray-400 mb-4">Difficulty Progress</h3>
                            <DifficultyProgressBar easy={easySolved} medium={mediumSolved} hard={hardSolved} />
                            <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                                <p><span className="text-green-500">●</span> Easy: {easySolved}</p>
                                <p><span className="text-yellow-500">●</span> Medium: {mediumSolved}</p>
                                <p><span className="text-red-500">●</span> Hard: {hardSolved}</p>
                            </div>
                        </div>
                    </Card>
                    <Card>
                        <div className="p-6">
                            <h3 className="text-gray-500 dark:text-gray-400 mb-2">Current Streak</h3>
                            <p className="text-4xl font-bold">{streak} <span className="text-lg text-gray-600 dark:text-gray-500">days</span></p>
                        </div>
                    </Card>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    <Card>
                        <div className="p-6">
                            <h2 className="text-xl font-semibold mb-4">{totalSubmissions} problem submissions in the last year</h2>
                            <ContributionGraph contributions={contributions} />
                            <div className="flex justify-end items-center gap-2 mt-2 text-xs text-gray-500">
                               <span>Less</span>
                               <div className="w-3 h-3 bg-gray-200 dark:bg-gray-800 rounded-sm"></div>
                               <div className="w-3 h-3 bg-yellow-200 dark:bg-yellow-900/50 rounded-sm"></div>
                               <div className="w-3 h-3 bg-yellow-300 dark:bg-yellow-900/80 rounded-sm"></div>
                               <div className="w-3 h-3 bg-yellow-400 dark:bg-yellow-600 rounded-sm"></div>
                               <div className="w-3 h-3 bg-yellow-500 dark:bg-yellow-400 rounded-sm"></div>
                               <span>More</span>
                            </div>
                        </div>
                    </Card>
                     <Card>
                        <div className="p-6">
                            <h2 className="text-xl font-semibold mb-4">Quiz History</h2>
                            {profileData.quizHistory.length > 0 ? (
                                <ul className="space-y-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                                    {profileData.quizHistory.map((item, index) => {
                                        const isCorrect = item.isCorrect;
                                        return (
                                            <li key={index} className="flex flex-col p-3 bg-gray-100 dark:bg-gray-800/50 rounded-md">
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className='flex items-center gap-2'>
                                                        <Badge difficulty={item.difficulty}>{item.difficulty}</Badge>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">{new Date(item.answeredAt).toLocaleDateString()}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        {isCorrect ? <CheckIcon className="text-green-500" /> : <XIcon className="text-red-500" />}
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <p className="font-semibold">Question: {item.question}</p>
                                                    <p className="text-sm text-gray-700 dark:text-gray-300">Your Answer: <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>{item.userAnswer}</span></p>
                                                    {!isCorrect && (
                                                        <p className="text-sm text-gray-700 dark:text-gray-300">Correct Answer: <span className="text-green-600">{item.correctAnswer}</span></p>
                                                    )}
                                                    
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            ) : (
                                <p className="text-gray-500 dark:text-gray-400 text-center py-8">No answered questions yet. Answer some questions to see your history here!</p>
                            )}
                        </div>
                    </Card>
                </div>
                

            </main>
        </div>
    );
};

export default ProfilePage;