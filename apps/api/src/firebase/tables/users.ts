import { db } from '../firebase';
import { User } from '@linktree/shared';

const COLLECTION = 'users';

export const UsersTable = {
  async getById(uid: string): Promise<User | null> {
    const doc = await db.collection(COLLECTION).doc(uid).get();
    if (!doc.exists) return null;
    return { uid: doc.id, ...doc.data() } as User;
  },

  async getByUsername(username: string): Promise<User | null> {
    const snapshot = await db
      .collection(COLLECTION)
      .where('username', '==', username)
      .limit(1)
      .get();
    
    if (snapshot.empty) return null;
    const doc = snapshot.docs[0];
    return { uid: doc.id, ...doc.data() } as User;
  },

  async create(uid: string, data: Partial<User>): Promise<User> {
    await db.collection(COLLECTION).doc(uid).set({
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    
    return { uid, ...data } as User;
  },

  async update(uid: string, data: Partial<User>): Promise<void> {
    await db.collection(COLLECTION).doc(uid).update({
      ...data,
      updatedAt: new Date().toISOString(),
    });
  },

  async usernameExists(username: string): Promise<boolean> {
    const snapshot = await db
      .collection(COLLECTION)
      .where('username', '==', username)
      .limit(1)
      .get();
    
    return !snapshot.empty;
  },
};
