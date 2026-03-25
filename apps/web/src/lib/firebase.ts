import { initializeApp, getApps, getApp, FirebaseOptions } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Parse Firebase config from env
const configJson = process.env.NEXT_PUBLIC_FIREBASE_CONFIG;

if (!configJson) {
  throw new Error('NEXT_PUBLIC_FIREBASE_CONFIG not found in .env.local');
}

const firebaseConfig: FirebaseOptions = JSON.parse(configJson);

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
