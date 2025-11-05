'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Button from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';

import { easeInOut, motion, } from "framer-motion";
import { useRef } from "react";
import ArrowIcon from "@/assets/arrow-right.svg";
import jsImage from '@/assets/javascript.png';
import Dropdown from '../ui/Dropdown';
import { LogOutIcon, MoonIcon, SunIcon, UserIcon } from '../common/Icons';
import { VscGithubAlt } from "react-icons/vsc";
import { useTheme } from 'next-themes';



export const HomePage = () => {
  const router = useRouter();
  const auth = useAuth();
  const heroRef = useRef(null);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const currentTheme = resolvedTheme || theme;
  const handleNavigate = (page: string) => {
    router.push(`/${page}`);
  };

  return (
    <section ref={heroRef} className="pt-8 pb-20 md:pt-10 md:pb-24 bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#fefce8,#fff_100%)] dark:bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#1a202c,#000_100%)] overflow-x-clip px-4 sm:px-6 lg:px-8 h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <header className="flex justify-between items-center py-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
            practice<span className="gradient-text">JS</span>
          </h1>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <button
                
                className="hidden lg:flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                onClick={() => window.open("https://github.com/shridmishra/practicejs", "_blank")}
              >
                Give a star <VscGithubAlt className="w-5 h-5" />
              </button>
              {auth.isAuthenticated && auth.user ? (
                <Dropdown
                  trigger={
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-lg font-bold hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900"
                      aria-label="View Profile"
                    >
                      {auth.user?.image ? (
                        <UserIcon />
                      ) : (
                        auth.user?.name?.charAt(0)?.toUpperCase() || 'U'
                      )}
                    </div>
                  }
                >
                  <div className="p-2 flex flex-col items-start">
                    <a href="/profile" className="block w-full">
                      <Button variant="ghost" size="sm" className="w-full flex justify-start items-center gap-2">
                        <UserIcon />
                        <span>Profile</span>
                      </Button>
                    </a>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setTheme(currentTheme === 'light' ? 'dark' : 'light')}
                      className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white w-full"
                      aria-label="Toggle theme"
                    >
                      {currentTheme === 'light' ? <div className="w-full flex justify-start items-center gap-2"><MoonIcon className="h-5 w-5" /> <span>Dark</span></div> : <div className="w-full flex justify-start items-center gap-2"><SunIcon className="h-5 w-5" /> <span>Light</span></div>}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => auth.logout()} className="w-full flex justify-start items-center gap-2">
                      <LogOutIcon />
                      <span>Sign out</span>
                    </Button>
                  </div>
                </Dropdown>
              ) : (
                <Button variant="secondary" size="sm" onClick={() => auth.login()} className="whitespace-nowrap">
                  Sign in
                </Button>
              )} </div>
          </div>
        </header>

                <div className="md:flex items-center justify-center gap-8 md:gap-16 mt-16 md:mt-20">
                    <div className="md:w-1/2">
                        <div>
                            <h1 className="text-3xl lg:text-7xl font-bold tracking-tighter bg-linear-to-b from-black to-[#733e0a] dark:from-white dark:to-[#fff085] text-transparent bg-clip-text mt-6">Master JavaScript,<br />One Challenge at a Time.</h1>
                            <p className="text-lg lg:text-xl text-[#010D3E] dark:text-gray-300 tracking-tight mt-6 ">Celebrate the joy of accomplishment with an app designed to track your progress, motivate your efforts, and celebrate your successes.</p>
                        </div>
                        <div className="mt-7 flex gap-1 md:items-center flex-col items-start md:flex-row">
                            <button onClick={() => handleNavigate('challenges')} className="btn btn-primary bg-black text-white dark:bg-white dark:text-black">View Challenges</button>
                            <button onClick={() => handleNavigate('quiz')} className="btn btn-text gap-1 hidden md:inline-flex"><span>Take quiz</span><ArrowIcon className="h-5 w-5" /></button>
                        </div>
                    </div>


          <div className="hidden md:flex md:w-1/2 pt-12 md:mt-0 items-center justify-center">
            <motion.img src={jsImage.src} alt="js image" className="max-w-sm" animate={{ translateY: [-30, 30], }} transition={{ repeat: Infinity, repeatType: "mirror", duration: 3, ease: easeInOut }} />
          </div>
        </div>
      </div>
    </section>
  );
};
