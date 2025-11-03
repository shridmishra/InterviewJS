'use client';

import React, { createContext, useContext } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface User {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (provider?: string) => Promise<void>;
    logout: () => Promise<void>;
    isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    const login = async (provider: string = 'google') => {
        await signIn(provider);
    };

    const logout = async () => {
        await signOut();
        router.push('/');
    };

    const value = {
        user: session?.user ?? null,
        isAuthenticated: !!session,
        login,
        logout,
        isLoading: status === 'loading',
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};