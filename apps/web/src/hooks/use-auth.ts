'use client';

import { useEffect, useState } from 'react';
import { create } from 'zustand';
import { 
  signInWithPopup, 
  signOut as firebaseSignOut, 
  onAuthStateChanged,
  User as FirebaseUser 
} from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
import type { User } from '@linktree/shared';

interface AuthState {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setFirebaseUser: (user: FirebaseUser | null) => void;
  setLoading: (loading: boolean) => void;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuth = create<AuthState>((set, get) => ({
  user: null,
  firebaseUser: null,
  loading: true,
  setUser: (user) => set({ user }),
  setFirebaseUser: (firebaseUser) => set({ firebaseUser }),
  setLoading: (loading) => set({ loading }),
  
  signInWithGoogle: async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;
      
      // Create user object from Firebase user
      const user: User = {
        uid: firebaseUser.uid,
        email: firebaseUser.email || '',
        username: firebaseUser.displayName?.toLowerCase().replace(/\s/g, '') || firebaseUser.uid.slice(0, 8),
        displayName: firebaseUser.displayName || 'User',
        bio: '',
        avatarUrl: firebaseUser.photoURL || '',
        theme: {
          preset: 'minimal',
          backgroundColor: '#f5f5f5',
          buttonColor: '#ffffff',
          buttonTextColor: '#1a1a1a',
          fontFamily: 'inter',
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      set({ firebaseUser, user });
      
      // Store user in localStorage for persistence
      localStorage.setItem('linktree_user', JSON.stringify(user));
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  },
  
  signOut: async () => {
    try {
      await firebaseSignOut(auth);
      set({ user: null, firebaseUser: null });
      localStorage.removeItem('linktree_user');
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  },
}));

// Hook to listen to auth state changes
export function useAuthListener() {
  const { setFirebaseUser, setUser, setLoading } = useAuth();

  useEffect(() => {
    // Check localStorage first
    const storedUser = localStorage.getItem('linktree_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setFirebaseUser(firebaseUser);
      
      if (firebaseUser) {
        const user: User = {
          uid: firebaseUser.uid,
          email: firebaseUser.email || '',
          username: firebaseUser.displayName?.toLowerCase().replace(/\s/g, '') || firebaseUser.uid.slice(0, 8),
          displayName: firebaseUser.displayName || 'User',
          bio: '',
          avatarUrl: firebaseUser.photoURL || '',
          theme: {
            preset: 'minimal',
            backgroundColor: '#f5f5f5',
            buttonColor: '#ffffff',
            buttonTextColor: '#1a1a1a',
            fontFamily: 'inter',
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        setUser(user);
        localStorage.setItem('linktree_user', JSON.stringify(user));
      } else {
        setUser(null);
        localStorage.removeItem('linktree_user');
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setFirebaseUser, setUser, setLoading]);
}
