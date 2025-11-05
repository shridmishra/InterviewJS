'use client';

import '../styles/globals.css';
import { Providers } from './providers';
import { ToastProvider } from '../components/common/Toast';
import { ModalProvider } from '../components/modals/ModalProvider';
import React from 'react';
import { ThemeProvider } from 'next-theme';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@700,500,400,900&display=swap" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-white dark:bg-black text-gray-900 dark:text-white antialiased" suppressHydrationWarning={true}>
          <ThemeProvider attribute="class" defaultTheme="system">
        <Providers>
          <ToastProvider>
            <ModalProvider>
              {children}
            </ModalProvider>
          </ToastProvider>
        </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
