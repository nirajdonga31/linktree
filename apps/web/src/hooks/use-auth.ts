'use client';

import { useEffect, useState } from 'react';
import { create } from 'zustand';
import { 
  signInWithPopup, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut as firebaseSignOut, 
  onAuthStateChanged,
  User as FirebaseUser 
} from 'firebase/auth';
import { auth, googleProvider, isFirebaseReady, getFirebaseStatus } from '@/lib/firebase';
import type { User } from '@linktree/shared';

interface AuthState {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  error: string | null;
  firebaseReady: boolean;
  setUser: (user: User | null) => void;
  setFirebaseUser: (user: FirebaseUser | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setFirebaseReady: (ready: boolean) => void;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string, displayName: string) => Promise<void>;
  signOut: () => Promise<void>;
  clearError: () => void;
  checkFirebaseStatus: () => boolean;
}

const createUserFromFirebase = (firebaseUser: FirebaseUser): User => ({
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
});

export const useAuth = create<AuthState>((set, get) => ({
  user: null,
  firebaseUser: null,
  loading: true,
  error: null,
  firebaseReady: false,
  setUser: (user) => set({ user }),
  setFirebaseUser: (firebaseUser) => set({ firebaseUser }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setFirebaseReady: (ready) => set({ firebaseReady: ready }),
  clearError: () => set({ error: null }),
  
  checkFirebaseStatus: () => {
    const status = getFirebaseStatus();
    const ready = isFirebaseReady();
    set({ firebaseReady: ready });
    
    if (!ready) {
      console.error('[Auth] Firebase not ready. Status:', status);
    }
    
    return ready;
  },
  
  signInWithGoogle: async () => {
    try {
      set({ error: null });
      
      if (!get().checkFirebaseStatus()) {
        throw new Error('Firebase not initialized. Check your Firebase configuration.');
      }
      
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;
      const user = createUserFromFirebase(firebaseUser);
      
      set({ firebaseUser, user });
      localStorage.setItem('linktree_user', JSON.stringify(user));
    } catch (error: any) {
      console.error('Sign in error:', error);
      set({ error: error.message || 'Failed to sign in with Google' });
      throw error;
    }
  },

  signInWithEmail: async (email: string, password: string) => {
    try {
      set({ error: null });
      
      if (!get().checkFirebaseStatus()) {
        throw new Error('Firebase not initialized. Check your Firebase configuration.');
      }
      
      console.log('[Auth] Attempting email sign in for:', email);
      const result = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = result.user;
      const user = createUserFromFirebase(firebaseUser);
      
      console.log('[Auth] Email sign in successful for:', email);
      set({ firebaseUser, user });
      localStorage.setItem('linktree_user', JSON.stringify(user));
    } catch (error: any) {
      console.error('[Auth] Email sign in error:', error.code, error.message);
      let errorMessage = 'Failed to sign in';
      
      // Handle specific Firebase errors
      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address';
          break;
        case 'auth/user-disabled':
          errorMessage = 'This account has been disabled';
          break;
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password';
          break;
        case 'auth/invalid-credential':
          errorMessage = 'Invalid email or password';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many failed attempts. Please try again later';
          break;
        case 'auth/operation-not-allowed':
          errorMessage = 'Email/Password authentication is not enabled in Firebase. Please enable it in Firebase Console > Authentication > Sign-in method';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Please check your internet connection';
          break;
        case 'auth/internal-error':
          errorMessage = 'Internal error. Please check Firebase configuration';
          break;
        default:
          errorMessage = error.message || 'Failed to sign in';
      }
      
      set({ error: errorMessage });
      throw error;
    }
  },

  signUpWithEmail: async (email: string, password: string, displayName: string) => {
    try {
      set({ error: null });
      
      if (!get().checkFirebaseStatus()) {
        throw new Error('Firebase not initialized. Check your Firebase configuration.');
      }
      
      console.log('[Auth] Attempting email sign up for:', email);
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = result.user;
      
      // Update the user's profile with the display name
      await updateProfile(firebaseUser, { displayName });
      
      const user: User = {
        uid: firebaseUser.uid,
        email: firebaseUser.email || '',
        username: displayName.toLowerCase().replace(/\s/g, '') || firebaseUser.uid.slice(0, 8),
        displayName: displayName,
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
      
      console.log('[Auth] Email sign up successful for:', email);
      set({ firebaseUser, user });
      localStorage.setItem('linktree_user', JSON.stringify(user));
    } catch (error: any) {
      console.error('[Auth] Sign up error:', error.code, error.message);
      let errorMessage = 'Failed to create account';
      
      // Handle specific Firebase errors
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'An account with this email already exists';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password should be at least 6 characters';
          break;
        case 'auth/operation-not-allowed':
          errorMessage = 'Email/Password authentication is not enabled in Firebase. Please enable it in Firebase Console > Authentication > Sign-in method';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Please check your internet connection';
          break;
        case 'auth/internal-error':
          errorMessage = 'Internal error. Please check Firebase configuration';
          break;
        default:
          errorMessage = error.message || 'Failed to create account';
      }
      
      set({ error: errorMessage });
      throw error;
    }
  },
  
  signOut: async () => {
    try {
      if (!get().checkFirebaseStatus()) {
        throw new Error('Firebase not initialized');
      }
      
      await firebaseSignOut(auth);
      set({ user: null, firebaseUser: null, error: null });
      localStorage.removeItem('linktree_user');
    } catch (error: any) {
      console.error('Sign out error:', error);
      set({ error: error.message || 'Failed to sign out' });
      throw error;
    }
  },
}));

// Hook to listen to auth state changes
export function useAuthListener() {
  const { setFirebaseUser, setUser, setLoading, setFirebaseReady, checkFirebaseStatus } = useAuth();

  useEffect(() => {
    // Check Firebase status
    const ready = checkFirebaseStatus();
    
    // Check localStorage first for persisted user
    const storedUser = localStorage.getItem('linktree_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    if (!ready) {
      console.error('[Auth] Firebase not properly initialized');
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      console.log('[Auth] Auth state changed:', firebaseUser ? `User: ${firebaseUser.email}` : 'No user');
      setFirebaseUser(firebaseUser);
      
      if (firebaseUser) {
        const user = createUserFromFirebase(firebaseUser);
        setUser(user);
        localStorage.setItem('linktree_user', JSON.stringify(user));
      } else {
        setUser(null);
        localStorage.removeItem('linktree_user');
      }
      
      setLoading(false);
    }, (error) => {
      console.error('[Auth] Auth state error:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setFirebaseUser, setUser, setLoading, setFirebaseReady, checkFirebaseStatus]);
}
