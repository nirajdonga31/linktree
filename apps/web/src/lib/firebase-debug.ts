import { initializeApp, getApps, getApp, FirebaseOptions, FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, Auth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

// Track initialization state
let initialized = false;
let app: FirebaseApp | undefined;
let authInstance: Auth | undefined;
let dbInstance: Firestore | undefined;
let storageInstance: FirebaseStorage | undefined;

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
    console.log('[Firebase] Initializing with config:', { 
      projectId: firebaseConfig.projectId,
      authDomain: firebaseConfig.authDomain 
    });
    
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    authInstance = getAuth(app);
    dbInstance = getFirestore(app);
    storageInstance = getStorage(app);
    initialized = true;
    
    console.log('[Firebase] Successfully initialized');
    console.log('[Firebase] Auth instance:', authInstance ? 'Available' : 'Not available');
    
    // Check auth state
    if (authInstance) {
      authInstance.onAuthStateChanged((user) => {
        console.log('[Firebase] Auth state changed:', user ? `User: ${user.email}` : 'No user');
      });
    }
    
  } catch (error) {
    console.error('[Firebase] Failed to initialize:', error);
  }
}

// Initialize on module load (only works on client)
initializeFirebase();

// Export instances
export const auth: Auth = authInstance!;
export const db: Firestore = dbInstance!;
export const storage: FirebaseStorage = storageInstance!;
export const googleProvider = new GoogleAuthProvider();

// Helper to check if Firebase is ready
export function isFirebaseReady(): boolean {
  return initialized && !!authInstance;
}

// Debug helper
export function getFirebaseStatus(): { initialized: boolean; hasAuth: boolean } {
  return { 
    initialized, 
    hasAuth: !!authInstance 
  };
}
