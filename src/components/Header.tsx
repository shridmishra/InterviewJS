import Image from 'next/image';
import React from 'react';
import Button from './ui/Button';
import { useAuth } from '../context/AuthContext';
import { SunIcon, MoonIcon, ChevronLeftIcon, UserIcon, LogOutIcon } from './Icons';
import { useTheme } from 'next-themes';
import Dropdown from './ui/Dropdown';
import { usePathname } from 'next/navigation';

interface HeaderProps {
  problemTitle?: string;
  onBack?: () => void;
  onNavigate?: (page: 'profile' | 'list' | '' | 'quiz') => void;
}

const Header: React.FC<HeaderProps> = ({ problemTitle, onBack, onNavigate }) => {
  const auth = useAuth();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const currentTheme = resolvedTheme || theme;
  const pathname = usePathname();

  const getLinkClass = (path: string) => {
    return pathname === path
      ? 'text-sm font-medium text-yellow-400 transition-colors'
      : 'text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors';
  };

  return (
    <header className="bg-white/80 dark:bg-gray-900/70 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 sticky top-0 z-20 h-16 flex items-center">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {onBack ? (
            <Button variant="ghost" size="sm" onClick={onBack} className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <ChevronLeftIcon className="h-4 w-4" />
              Challenges
            </Button>
          ) : (
            <div className="flex items-center gap-8">
              <button onClick={() => onNavigate && onNavigate('')} className="text-xl font-bold text-gray-900 dark:text-white tracking-tight cursor-pointer">
                practice<span className="text-yellow-400">JS</span>
              </button>
              <nav className="hidden md:flex items-center gap-6">
                <a href="/challenges" className={getLinkClass('/challenges')}>
                  Challenges
                </a>
                <a href="/quiz" className={getLinkClass('/quiz')}>
                  Quiz
                </a>
              </nav>
              <nav className="md:hidden">
                {pathname === '/challenges' && (
                  <a href="/quiz" className={getLinkClass('/quiz')}>
                    Quiz
                  </a>
                )}
                {pathname === '/quiz' && (
                  <a href="/challenges" className={getLinkClass('/challenges')}>
                    Challenges
                  </a>
                )}
              </nav>
            </div>
          )}
        </div>
        {problemTitle && <h2 className="text-md font-medium text-gray-600 dark:text-gray-300 truncate hidden md:block">{problemTitle}</h2>}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(currentTheme === 'light' ? 'dark' : 'light')}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            aria-label="Toggle theme"
          >
            {currentTheme === 'light' ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
          </Button>
          {auth.isAuthenticated && auth.user ? (
            <Dropdown
              trigger={
                <div
                  className="w-9 h-9 bg-yellow-500 rounded-full flex items-center justify-center text-black text-lg font-bold hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900"
                  aria-label="View Profile"
                >
                  {auth.user?.image ? (
                    <Image src={auth.user.image} alt="user avatar" width={36} height={36} className="w-full h-full rounded-full object-cover object-center bject-cover" />
                  ) : (
                    auth.user?.name?.charAt(0)?.toUpperCase() || 'U'
                  )}
                </div>
              }
            >
              <div className="p-2">
                <a href="/profile" className="block w-full">
                  <Button variant="ghost" size="sm" className="w-full flex justify-start items-center gap-2">
                    <UserIcon />
                    <span>Profile</span>
                  </Button>
                </a>
                <Button variant="ghost" size="sm" onClick={() => auth.logout()} className="w-full flex justify-start items-center gap-2">
                  <LogOutIcon />
                  <span>Sign out</span>
                </Button>
              </div>
            </Dropdown>
          ) : (
            <Button variant="secondary" size="sm" onClick={() => auth.login()}>
              Sign in
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;