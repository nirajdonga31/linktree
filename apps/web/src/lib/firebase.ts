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
    console.log('[Firebase] Skipping initialization on server side');
    return;
  }
  
  const configJson = process.env.NEXT_PUBLIC_FIREBASE_CONFIG;
  
  if (!configJson) {
    console.error('[Firebase] NEXT_PUBLIC_FIREBASE_CONFIG not found in environment');
    return;
  }
  
  try {
    const firebaseConfig: FirebaseOptions = JSON.parse(configJson);
    
    if (!firebaseConfig.apiKey || !firebaseConfig.authDomain) {
      console.error('[Firebase] Invalid config: apiKey or authDomain missing');
      return;
    }
    
    console.log('[Firebase] Initializing with project:', firebaseConfig.projectId);
    
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    authInstance = getAuth(app);
    dbInstance = getFirestore(app);
    storageInstance = getStorage(app);
    initialized = true;
    
    console.log('[Firebase] Successfully initialized');
    
  } catch (error) {
    console.error('[Firebase] Failed to initialize:', error);
  }
}

// Initialize on module load (only works on client)
if (typeof window !== 'undefined') {
  initializeFirebase();
}

// Export instances - use mocks if not initialized (SSR/build time)
export const auth: Auth = authInstance || mockAuth;
export const db: Firestore = dbInstance || mockDb;
export const storage: FirebaseStorage = storageInstance || mockStorage;
export const googleProvider = new GoogleAuthProvider();

// Helper to check if Firebase is ready
export function isFirebaseReady(): boolean {
  return initialized && !!authInstance;
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

// Debug helper to check status
export function getFirebaseStatus(): { initialized: boolean; hasAuth: boolean; projectId?: string } {
  return { 
    initialized, 
    hasAuth: !!authInstance,
    projectId: app?.options?.projectId || undefined
  };
}

export default app;
