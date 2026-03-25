import admin from 'firebase-admin';

// Parse Firebase Admin config from env
const configJson = process.env.FIREBASE_CONFIG;

if (!configJson) {
  throw new Error('FIREBASE_CONFIG not found in .env');
}

const serviceAccount = JSON.parse(configJson);

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const db = admin.firestore();
export const auth = admin.auth();
export const storage = admin.storage();

export default admin;
