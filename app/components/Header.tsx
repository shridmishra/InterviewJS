import React from 'react';
import Button from './ui/Button';
import { useAuth} from '../context/AuthContext';
import { SunIcon, MoonIcon } from './Icons';
import { useTheme } from 'next-themes';

interface HeaderProps {
    problemTitle?: string;
    onBack?: () => void;
    onNavigate?: (page: 'profile' | 'list' | 'hero' | 'quiz') => void;
    onLogin?: () => void;
    onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ problemTitle, onBack, onNavigate }) => {
  const auth = useAuth();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const currentTheme = resolvedTheme || theme;
   
  return (
    <header className="bg-white/80 dark:bg-gray-900/70 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 sticky top-0 z-20 h-16 flex items-center">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
            {onBack ? (
                <Button variant="ghost" size="sm" onClick={onBack} className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                    &larr; Problems
                </Button>
            ) : (
                 <div className="flex items-center gap-8">
                    <button onClick={() => onNavigate && onNavigate('hero')} className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                        practice<span className="text-yellow-400">JS</span>
                    </button>
                    <nav className="hidden md:flex items-center gap-6">
                        <button onClick={() => onNavigate && onNavigate('list')} className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                            Challenges
                        </button>
                        <button onClick={() => onNavigate && onNavigate('quiz')} className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                            Quiz
                        </button>
                        {auth.isAuthenticated && (
                            <a href="/profile" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                                Profile
                            </a>
                        )}
                    </nav>
                </div>
             )}
        </div>
        {problemTitle && <h2 className="text-md font-medium text-gray-600 dark:text-gray-300 truncate hidden md:block">{problemTitle}</h2>}
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={() => setTheme(currentTheme === 'light' ? 'dark' : 'light')} className="p-2 text-gray-600 dark:text-gray-300" aria-label="Toggle theme" suppressHydrationWarning>
            {currentTheme === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button>

          {auth.isAuthenticated && auth.user ? (
            <>
              <a 
                href="/profile"
                className="w-9 h-9 bg-yellow-500 rounded-full flex items-center justify-center text-black text-lg font-bold hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900"
                aria-label="View Profile"
              >
                {auth.user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </a>
              <Button variant="secondary" size="sm" onClick={() => auth.logout()}>Sign out</Button>
            </>
          ) : (
             <>
              <Button variant="secondary" size="sm" onClick={() => auth.login()}>Sign in with Google</Button>
             </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;