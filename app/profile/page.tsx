'use client';

import ProfileSkeleton from '../components/ProfileSkeleton';
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';

interface ProfileData {
  username: string;
  solvedCount: number;
  totalCount: number;
  streak: number;
  contributions: { [key: string]: number };
  createdAt: string;
  quizHistory: any[];
}

export default function ProfilePage() {
  const auth = useAuth();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!auth.isAuthenticated) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/user/profile');
        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }
        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [auth.isAuthenticated]);

  if (!auth.isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <h1 className="text-2xl font-bold mb-4">Please sign in to view your profile</h1>
        <button
          onClick={() => auth.login()}
          className="px-6 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 transition-colors"
        >
          Sign in with Google
        </button>
      </div>
    );
  }

  if (loading) {
    return <ProfileSkeleton />;
  }

  if (!profileData) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-xl text-gray-600 dark:text-gray-400">Failed to load profile data</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-black">
                {auth.user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">{auth.user?.name}</h1>
              <p className="text-gray-600 dark:text-gray-400">Member since {new Date(profileData.createdAt).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Problems Solved</h3>
              <p className="text-2xl font-bold text-yellow-500">{profileData.solvedCount} / {profileData.totalCount}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Current Streak</h3>
              <p className="text-2xl font-bold text-yellow-500">{profileData.streak} days</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Quiz Score</h3>
              <p className="text-2xl font-bold text-yellow-500">
                {profileData.quizHistory?.length ? 
                  Math.round(profileData.quizHistory.reduce((acc, curr) => acc + curr.score, 0) / profileData.quizHistory.length) + '%' 
                  : 'No quizzes taken'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}