import { Router } from 'express';
import { AnalyticsTable } from '../firebase';

const router = Router();

// Track a click
router.post('/track', async (req, res) => {
  try {
    const { userId, linkId } = req.body;
    const today = new Date().toISOString().split('T')[0];
    
    await AnalyticsTable.trackClick(userId, linkId, today);
    res.json({ data: { success: true } });
  } catch (error) {
    res.status(500).json({ error: 'Failed to track click', code: 'TRACK_ERROR' });
  }
});

// Get analytics for a user
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { range = '7d' } = req.query;
    
    const days = range === '30d' ? 30 : range === '90d' ? 90 : 7;
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    const analytics = await AnalyticsTable.getByUserId(userId, startDate, endDate);
    const totalClicks = await AnalyticsTable.getTotalClicks(userId);
    
    res.json({
      data: {
        totalClicks,
        analytics,
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch analytics', code: 'FETCH_ERROR' });
  }
});

export default router;
