import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Card from './ui/Card';
import Button from './ui/Button';
import ContributionGraph from './ContributionGraph';

interface QuizHistoryItem {
    difficulty: string;
    score: number;
    totalQuestions: number;
    completedAt: string;
}

interface ProfileData {
    solvedCount: number;
    totalCount: number;
    contributions: { [date: string]: number };
    streak: number;
    joinDate: string;
    quizHistory: QuizHistoryItem[];
}

const ProfilePage: React.FC = () => {
    const auth = useAuth();
    const [profileData, setProfileData] = useState<ProfileData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

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
                    console.error("Failed to fetch profile data");
                }
            } catch (error) {
                console.error(error);
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
    
    const { solvedCount, totalCount, contributions, streak, joinDate, quizHistory } = profileData;
    const progressPercent = totalCount > 0 ? (solvedCount / totalCount) * 100 : 0;
    const totalSubmissions = Object.values(contributions).reduce((a, b) => a + b, 0);

    const sortedQuizHistory = quizHistory.sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime());

    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-black">
            <main className="grow container mx-auto p-4 md:p-6 lg:p-8">
                <div className="flex items-center gap-4 mb-8">
                   
                    <div>
                        <p className="text-gray-500 dark:text-gray-400">Joined on {new Date(joinDate).toLocaleDateString()}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card>
                        <div className="p-6">
                            <h3 className="text-gray-500 dark:text-gray-400 mb-2">Total Solved</h3>
                            <p className="text-4xl font-bold">{solvedCount}</p>
                        </div>
                    </Card>
                    <Card>
                        <div className="p-6">
                            <h3 className="text-gray-500 dark:text-gray-400 mb-2">Progress</h3>
                            <p className="text-4xl font-bold">{progressPercent.toFixed(1)}%</p>
                        </div>
                    </Card>
                    <Card>
                        <div className="p-6">
                            <h3 className="text-gray-500 dark:text-gray-400 mb-2">Current Streak</h3>
                            <p className="text-4xl font-bold">{streak} <span className="text-lg text-gray-600 dark:text-gray-500">days</span></p>
                        </div>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                            {sortedQuizHistory.length > 0 ? (
                                <ul className="space-y-3 max-h-80 overflow-y-auto">
                                    {sortedQuizHistory.map((item, index) => {
                                        const percentage = ((item.score / item.totalQuestions) * 100).toFixed(0);
                                        return (
                                            <li key={index} className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800/50 rounded-md">
                                                <div>
                                                    <p className="font-semibold">{item.difficulty} Quiz</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">{new Date(item.completedAt).toLocaleDateString()}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold text-lg text-yellow-500 dark:text-yellow-400">{item.score} / {item.totalQuestions}</p>
                                                    <p className="text-xs text-gray-600 dark:text-gray-300">{percentage}%</p>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            ) : (
                                <p className="text-gray-500 dark:text-gray-400 text-center py-8">No quiz history yet. Complete a quiz to see your results here!</p>
                            )}
                        </div>
                    </Card>
                </div>
                
                 <div className="mt-8 text-center">
                </div>
            </main>
        </div>
    );
};

export default ProfilePage;