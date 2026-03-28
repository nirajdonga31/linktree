'use client';

import { db } from './firebase';
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
  query,
  orderBy,
  where,
  serverTimestamp,
  writeBatch,
  Timestamp,
  increment,
} from 'firebase/firestore';
import type { Link, CreateLinkInput, UpdateLinkInput } from '@linktree/shared';

// Collection path: users/{userId}/links
const getLinksCollection = (userId: string) =>
  collection(db, 'users', userId, 'links');

// Get all links for a user
export async function getLinks(userId: string): Promise<Link[]> {
  const q = query(
    getLinksCollection(userId),
    orderBy('order', 'asc')
  );
  const snapshot = await getDocs(q);
  
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
      updatedAt: data.updatedAt?.toDate?.()?.toISOString() || new Date().toISOString(),
    } as Link;
  });
}

// Create a new link
export async function createLink(
  userId: string,
  data: CreateLinkInput
): Promise<Link> {
  const now = Timestamp.now();
  const docRef = await addDoc(getLinksCollection(userId), {
    ...data,
    userId,
    isActive: true,
    clickCount: 0,
    order: Date.now(),
    createdAt: now,
    updatedAt: now,
  });

  return {
    id: docRef.id,
    userId,
    ...data,
    isActive: true,
    clickCount: 0,
    order: Date.now(),
    createdAt: now.toDate().toISOString(),
    updatedAt: now.toDate().toISOString(),
  };
}

// Update a link
export async function updateLink(
  userId: string,
  id: string,
  data: UpdateLinkInput
): Promise<void> {
  const linkRef = doc(db, 'users', userId, 'links', id);
  await updateDoc(linkRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

// Delete a link
export async function deleteLink(userId: string, id: string): Promise<void> {
  console.log('[firebase-links] Deleting link:', id, 'for user:', userId);
  const linkRef = doc(db, 'users', userId, 'links', id);
  try {
    await deleteDoc(linkRef);
    console.log('[firebase-links] Link deleted successfully');
  } catch (error: any) {
    console.error('[firebase-links] Delete failed:', error.code, error.message);
    throw error;
  }
}

// Reorder links
export async function reorderLinks(
  userId: string,
  linkIds: string[]
): Promise<void> {
  const batch = writeBatch(db);

  linkIds.forEach((id, index) => {
    const linkRef = doc(db, 'users', userId, 'links', id);
    batch.update(linkRef, { order: index, updatedAt: serverTimestamp() });
  });

  await batch.commit();
}

// Increment click count
export async function incrementClickCount(userId: string, linkId: string): Promise<void> {
  const linkRef = doc(db, 'users', userId, 'links', linkId);
  await updateDoc(linkRef, {
    clickCount: increment(1),
    updatedAt: serverTimestamp(),
  });
}

// Get user by username (for public profile)
export async function getUserByUsername(username: string): Promise<{ uid: string; displayName: string; bio: string } | null> {
  const usersRef = collection(db, 'users');
  const q = query(usersRef, where('username', '==', username));
  const snapshot = await getDocs(q);
  
  if (snapshot.empty) return null;
  
  const doc = snapshot.docs[0];
  const data = doc.data();
  return {
    uid: doc.id,
    displayName: data.displayName || '',
    bio: data.bio || '',
  };
}

// Get links by username (for public profile)
export async function getLinksByUsername(username: string): Promise<Link[]> {
  const user = await getUserByUsername(username);
  if (!user) return [];
  
  const q = query(
    getLinksCollection(user.uid),
    orderBy('order', 'asc')
  );
  const snapshot = await getDocs(q);
  
  return snapshot.docs
    .map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        updatedAt: data.updatedAt?.toDate?.()?.toISOString() || new Date().toISOString(),
      } as Link;
    })
    .filter((link) => link.isActive);
}
