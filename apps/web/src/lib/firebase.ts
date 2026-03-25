import { initializeApp, getApps, getApp, FirebaseOptions, FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

// Track initialization state
let initialized = false;
let app: FirebaseApp | undefined;
let authInstance: Auth | undefined;
let dbInstance: Firestore | undefined;
let storageInstance: FirebaseStorage | undefined;

// Mock objects for SSR/build time
const mockAuth = {} as Auth;
const mockDb = {} as Firestore;
const mockStorage = {} as FirebaseStorage;

function initializeFirebase(): void {
  if (initialized) return;
  
  // Only initialize on client side
  if (typeof window === 'undefined') {
    return;
  }
  
  const configJson = process.env.NEXT_PUBLIC_FIREBASE_CONFIG;
  
  if (!configJson) {
    console.warn('NEXT_PUBLIC_FIREBASE_CONFIG not found in .env.local - Firebase features will not work');
    return;
  }
  
  try {
    const firebaseConfig: FirebaseOptions = JSON.parse(configJson);
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    authInstance = getAuth(app);
    dbInstance = getFirestore(app);
    storageInstance = getStorage(app);
    initialized = true;
  } catch (error) {
    console.error('Failed to initialize Firebase:', error);
  }
}

// Initialize on module load (only works on client)
initializeFirebase();

// Export instances - use mocks if not initialized (SSR/build time)
export const auth: Auth = authInstance || mockAuth;
export const db: Firestore = dbInstance || mockDb;
export const storage: FirebaseStorage = storageInstance || mockStorage;
export const googleProvider = new GoogleAuthProvider();

// Helper to check if Firebase is ready
export function isFirebaseReady(): boolean {
  return initialized;
}

// Lazy initialization helpers for components that need to ensure Firebase is ready
export function getAuthInstance(): Auth {
  if (!initialized && typeof window !== 'undefined') {
    initializeFirebase();
  }
  return authInstance || mockAuth;
}

export function getDbInstance(): Firestore {
  if (!initialized && typeof window !== 'undefined') {
    initializeFirebase();
  }
  return dbInstance || mockDb;
}

export function getStorageInstance(): FirebaseStorage {
  if (!initialized && typeof window !== 'undefined') {
    initializeFirebase();
  }
  return storageInstance || mockStorage;
}

export default app;
