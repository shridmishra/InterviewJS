'use client';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Header from '../../components/common/Header';
import ProfilePage from '../../components/profile/ProfilePage';

import ProfileSkeleton from '../../components/profile/ProfileSkeleton';



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
      <div className="bg-background min-h-screen">
        <Header onNavigate={handleNavigate} />
        <main className="container mx-auto px-4 md:px-6 lg:px-8 bg-background">
          <ProfileSkeleton />
        </main>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <Header onNavigate={handleNavigate} />
      <main className="container mx-auto px-4 md:px-6 lg:px-8 bg-background">
        <ProfilePage />
      </main>
    </div>
  );
}
