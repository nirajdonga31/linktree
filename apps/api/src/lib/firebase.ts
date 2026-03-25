import admin from 'firebase-admin';

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  
  if (serviceAccountJson) {
    // Parse JSON from env var
    admin.initializeApp({
      credential: admin.credential.cert(JSON.parse(serviceAccountJson)),
    });
  } else if (process.env.FIREBASE_PROJECT_ID) {
    // Use individual env vars
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
  } else {
    console.warn('Firebase Admin config missing. Check your .env file');
    // Initialize without credentials for development
    admin.initializeApp();
  }
}

export const auth = admin.auth();
export const db = admin.firestore();
export const storage = admin.storage();

export default admin;
