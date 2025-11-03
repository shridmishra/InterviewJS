'use client';

import ProfilePage from '../../components/profile/ProfilePage';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Header from '../../components/common/Header';

export default function Profile() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  const handleNavigate = (page: 'profile' | 'list' | '' | 'quiz') => {
    router.push(`/${page}`);
  };

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center text-gray-900 dark:text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <Header onNavigate={handleNavigate} />
      <main className="container mx-auto px-4 md:px-6 lg:px-8 py-8 dark:bg-black">
        <ProfilePage />
      </main>
    </div>
  );
}
