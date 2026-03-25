import { db } from '../firebase';
import { Link, CreateLinkInput, UpdateLinkInput } from '@linktree/shared';

// Subcollection under linktree/users/{userId}/links
const getCollection = (userId: string) => 
  db.collection('linktree').doc('data').collection('users').doc(userId).collection('links');

export const LinksTable = {
  async getByUserId(userId: string): Promise<Link[]> {
    const snapshot = await getCollection(userId)
      .orderBy('order', 'asc')
      .get();
    
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Link));
  },

  async create(userId: string, data: CreateLinkInput): Promise<Link> {
    const docRef = await getCollection(userId).add({
      ...data,
      userId,
      isActive: true,
      clickCount: 0,
      order: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    
    const doc = await docRef.get();
    return { id: doc.id, ...doc.data() } as Link;
  },

  async update(userId: string, id: string, data: UpdateLinkInput): Promise<Link> {
    await getCollection(userId).doc(id).update({
      ...data,
      updatedAt: new Date().toISOString(),
    });
    
    const doc = await getCollection(userId).doc(id).get();
    return { id: doc.id, ...doc.data() } as Link;
  },

  async delete(userId: string, id: string): Promise<void> {
    await getCollection(userId).doc(id).delete();
  },

  async reorder(userId: string, linkIds: string[]): Promise<void> {
    const batch = db.batch();
    
    linkIds.forEach((id, index) => {
      const ref = getCollection(userId).doc(id);
      batch.update(ref, { order: index, updatedAt: new Date().toISOString() });
    });
    
    await batch.commit();
  },
};
