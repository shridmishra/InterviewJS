'use client';

import './globals.css';
import { Providers } from './providers';
import { ToastProvider } from './components/Toast';
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import LoginModal from './components/LoginModal';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  useEffect(() => {
    const openHandler = () => setLoginModalOpen(true);
    window.addEventListener('openLoginModal', openHandler as EventListener);
    return () => window.removeEventListener('openLoginModal', openHandler as EventListener);
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@700,500,400,900&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-white dark:bg-black text-gray-900 dark:text-white antialiased">
        <Providers>
          <ToastProvider>
            {children}
            {/* Render LoginModal if open */}
            {isLoginModalOpen && (
              <LoginModal onClose={() => setLoginModalOpen(false)} />
            )}
          </ToastProvider>
        </Providers>
      </body>
    </html>
  );
}
