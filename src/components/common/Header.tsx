import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '../../context/AuthContext';
import { SunIcon, MoonIcon, ChevronLeftIcon, UserIcon, LogOutIcon } from './Icons';
import { useTheme } from 'next-themes';
import Dropdown from '../ui/Dropdown';
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
    return pathname.startsWith(path)
      ? 'text-sm font-medium text-primary transition-colors'
      : 'text-sm font-medium text-muted-foreground hover:text-foreground transition-colors';
  };

  return (
    <header className="bg-background/10 backdrop-blur-sm border-b border-border sticky top-0 z-20 h-16 flex items-center">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {onBack ? (
            <Button variant="ghost" size="sm" onClick={onBack} className="text-muted-foreground hover:text-foreground">
              <ChevronLeftIcon className="h-4 w-4" />
              Practice
            </Button>
          ) : (
            <div className="flex items-center gap-8">
              <button onClick={() => onNavigate && onNavigate('')} className="text-xl font-bold text-foreground tracking-tight cursor-pointer">
                practice<span className="text-primary">JS</span>
              </button>
              <nav className="hidden md:flex items-center gap-6">
                <a href="/practice/js" className={getLinkClass('/practice')}>
                  Practice
                </a>
                <a href="/topics" className={getLinkClass('/topics')}>
                  Topics
                </a>
                <a href="/quiz" className={getLinkClass('/quiz')}>
                  Quiz
                </a>
              </nav>
              <nav className="md:hidden">
                {(pathname === '/' || pathname.startsWith('/practice')) && (
                  <div className="flex gap-4">
                    <a href="/quiz" className={getLinkClass('/quiz')}>
                      Quiz
                    </a>
                  </div>
                )}
                {pathname.startsWith('/quiz') && (
                  <div className="flex gap-4">
                    <a href="/practice/js" className={getLinkClass('/practice')}>
                      Practice
                    </a>
                    <a href="/topics" className={getLinkClass('/topics')}>
                      Topics
                    </a>
                  </div>
                )}
                {pathname.startsWith('/topics') && (
                  <div className="flex gap-4">
                    <a href="/practice/js" className={getLinkClass('/practice')}>
                      Practice
                    </a>
                    <a href="/quiz" className={getLinkClass('/quiz')}>
                      Quiz
                    </a>
                  </div>
                )}
              </nav>
            </div>
          )}
        </div>
        {problemTitle && <h2 className="text-md font-medium text-muted-foreground truncate hidden md:block">{problemTitle}</h2>}
        <div className="flex items-center gap-2">

          {auth.isAuthenticated && auth.user ? (
            <Dropdown
              trigger={
                <div
                  className="w-9 h-9 bg-yellow-300 rounded-full flex items-center justify-center text-primary-foreground text-lg font-bold hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                  aria-label="View Profile"
                >
                  {auth.user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
              }
            >
              {(close) => (
                <div className="p-2">
                  <a href="/profile" className="block w-full" onClick={close}>
                    <Button variant="ghost" size="sm" className="w-full flex justify-start items-center gap-2">
                      <UserIcon />
                      <span>Profile</span>
                    </Button>
                  </a>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setTheme(currentTheme === 'light' ? 'dark' : 'light');
                    }}
                    className="w-full flex justify-start items-center gap-2"
                  >
                    {currentTheme === 'light' ? <MoonIcon className="h-4 w-4" /> : <SunIcon className="h-4 w-4" />}
                    <span>{currentTheme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => { auth.logout(); close(); }} className="w-full flex justify-start items-center gap-2">
                    <LogOutIcon />
                    <span>Sign out</span>
                  </Button>
                </div>
              )}
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