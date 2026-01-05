'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Dropdown from '../ui/Dropdown';
import { useAuth } from '../../context/AuthContext';

import { easeInOut, motion, } from "framer-motion";
import { useRef } from "react";
import ArrowIcon from "@/assets/arrow-right.svg";
import jsImage from '@/assets/javascript.png';
import { LogOutIcon, UserIcon, MoonIcon, SunIcon } from '../common/Icons';
import { VscGithubInverted } from "react-icons/vsc";
import { useTheme } from 'next-themes';


export const HomePage = () => {
  const router = useRouter();
  const auth = useAuth();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const currentTheme = resolvedTheme || theme;
  const heroRef = useRef(null);
  const handleNavigate = (page: string) => {
    router.push(`/${page}`);
  };

  return (
    <section ref={heroRef} className="pt-8 pb-20 md:pt-10 md:pb-24 bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#fefce8,#fff_100%)] dark:bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#1a202c,#000_100%)] overflow-x-clip px-4 sm:px-6 lg:px-8 lg:h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <header className="flex justify-between items-center py-4">
          <div className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
            practice<span className="gradient-text">JS</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <button

                className="hidden lg:flex items-center gap-2 text-foreground hover:text-muted-foreground"
                onClick={() => window.open("https://github.com/shridmishra/practicejs", "_blank")}
              >
                Give a star <VscGithubInverted className="w-5 h-5" />
              </button>
              {auth.isAuthenticated && auth.user ? (
                <Dropdown
                  trigger={
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-lg font-bold hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900"
                      aria-label="View Profile"
                    >
                      {auth.user?.image ? (
                        <UserIcon className='text-foreground hover:text-muted-foreground' />
                      ) : (
                        auth.user?.name?.charAt(0)?.toUpperCase() || 'U'
                      )}
                    </div>
                  }
                >
                  {(close) => (
                    <div className="p-2 flex flex-col items-start">
                      <a href="/profile" className="block w-full" onClick={close}>
                        <Button variant="ghost" size="sm" className="w-full flex justify-start items-center gap-2">
                          <UserIcon className='text-foreground hover:text-muted-foreground' />
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
                <Button variant="secondary" size="sm" onClick={() => auth.login()} className="whitespace-nowrap bg-foreground text-background hover:bg-muted-foreground hover:text-muted-background">
                  Sign in
                </Button>
              )} </div>
          </div>
        </header>

        <div className="md:flex items-center justify-center gap-8 md:gap-16 mt-16 md:mt-20">
          <div className="md:w-1/2">
            <div>
              <h1 className="text-3xl lg:text-7xl font-bold tracking-tighter bg-linear-to-b from-black to-[#733e0a] dark:from-white dark:to-[#fff085] text-transparent bg-clip-text mt-6 leading-tight">Escape Tutorial Hell,<br />Master Coding by Doing.</h1>
              <p className="text-lg lg:text-xl text-[#010D3E] dark:text-gray-300 tracking-tight mt-6 ">An interactive platform to practice coding, tackle challenges across various topics, and prepare for technical interviews. Track your progress and master your skills.</p>
            </div>
            <div className="mt-7 flex flex-col gap-4 items-start md:flex-row md:items-center md:gap-1">
              <button onClick={() => handleNavigate('topics')} className="btn btn-primary bg-black text-white dark:bg-white dark:text-black whitespace-nowrap">Explore Topics</button>
              <button onClick={() => handleNavigate('practice/js')} className="btn btn-text gap-1 inline-flex"><span>Practice</span><ArrowIcon className="h-5 w-5" /></button>
            </div>
          </div>


          <div className="hidden md:flex md:w-1/2 pt-12 md:mt-0 items-center justify-center">
            <motion.img src={jsImage.src} alt="Animated JavaScript Logo" className="max-w-sm" animate={{ translateY: [-30, 30], }} transition={{ repeat: Infinity, repeatType: "mirror", duration: 3, ease: easeInOut }} />
          </div>
        </div>
      </div>
    </section>
  );
};
