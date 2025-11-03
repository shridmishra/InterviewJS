'use client';

import React, { useState, useEffect } from 'react';
import LoginModal from './LoginModal';

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  useEffect(() => {
    const openHandler = () => setLoginModalOpen(true);
    window.addEventListener('openLoginModal', openHandler as EventListener);
    return () => window.removeEventListener('openLoginModal', openHandler as EventListener);
  }, []);

  return (
    <>
      {children}
      {isLoginModalOpen && (
        <LoginModal onClose={() => setLoginModalOpen(false)} />
      )}
    </>
  );
}
