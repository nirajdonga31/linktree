import { db } from '../firebase';
import { Link, CreateLinkInput, UpdateLinkInput } from '@linktree/shared';

const COLLECTION = 'links';

export const LinksTable = {
  async getByUserId(userId: string): Promise<Link[]> {
    const snapshot = await db
      .collection(COLLECTION)
      .where('userId', '==', userId)
      .orderBy('order', 'asc')
      .get();
    
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Link));
  },

  async create(data: CreateLinkInput & { userId: string }): Promise<Link> {
    const docRef = await db.collection(COLLECTION).add({
      ...data,
      isActive: true,
      clickCount: 0,
      order: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    
    const doc = await docRef.get();
    return { id: doc.id, ...doc.data() } as Link;
  },

  async update(id: string, data: UpdateLinkInput): Promise<Link> {
    await db.collection(COLLECTION).doc(id).update({
      ...data,
      updatedAt: new Date().toISOString(),
    });
    
    const doc = await db.collection(COLLECTION).doc(id).get();
    return { id: doc.id, ...doc.data() } as Link;
  },

  async delete(id: string): Promise<void> {
    await db.collection(COLLECTION).doc(id).delete();
  },

  async reorder(userId: string, linkIds: string[]): Promise<void> {
    const batch = db.batch();
    
    linkIds.forEach((id, index) => {
      const ref = db.collection(COLLECTION).doc(id);
      batch.update(ref, { order: index, updatedAt: new Date().toISOString() });
    });
    
    await batch.commit();
  },
};
