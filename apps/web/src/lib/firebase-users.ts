'use client';

import { db } from './firebase';
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import type { User, Theme } from '@linktree/shared';

const getUserDoc = (uid: string) => doc(db, 'users', uid);

// Create or update user in Firestore
export async function saveUser(user: User): Promise<void> {
  const userRef = getUserDoc(user.uid);
  await setDoc(
    userRef,
    {
      ...user,
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    },
    { merge: true }
  );
}

// Get user from Firestore
export async function getUser(uid: string): Promise<User | null> {
  const userRef = getUserDoc(uid);
  const snapshot = await getDoc(userRef);
  
  if (!snapshot.exists()) return null;
  
  const data = snapshot.data();
  return {
    ...data,
    uid,
    createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
    updatedAt: data.updatedAt?.toDate?.()?.toISOString() || new Date().toISOString(),
  } as User;
}

// Update user profile
export async function updateUser(uid: string, data: Partial<User>): Promise<void> {
  const userRef = getUserDoc(uid);
  await updateDoc(userRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

// Update user theme
export async function updateUserTheme(uid: string, theme: Theme): Promise<void> {
  const userRef = getUserDoc(uid);
  await updateDoc(userRef, {
    theme,
    updatedAt: serverTimestamp(),
  });
}
