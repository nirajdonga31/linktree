import { db } from '../firebase';
import { Analytics } from '@linktree/shared';
import admin from 'firebase-admin';

// Subcollection under linktree/users/{userId}/analytics
const getCollection = (userId: string) => 
  db.collection('linktree').doc('data').collection('users').doc(userId).collection('analytics');

export const AnalyticsTable = {
  async trackClick(userId: string, linkId: string, date: string): Promise<void> {
    const docId = `${linkId}_${date}`;
    const ref = getCollection(userId).doc(docId);
    
    await ref.set({
      userId,
      linkId,
      date,
      clicks: admin.firestore.FieldValue.increment(1),
    }, { merge: true });
  },

  async getByUserId(userId: string, startDate: string, endDate: string): Promise<Analytics[]> {
    const snapshot = await getCollection(userId)
      .where('date', '>=', startDate)
      .where('date', '<=', endDate)
      .get();
    
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Analytics));
  },

  async getTotalClicks(userId: string): Promise<number> {
    const snapshot = await getCollection(userId).get();
    return snapshot.docs.reduce((sum, doc) => sum + (doc.data().clicks || 0), 0);
  },
};
