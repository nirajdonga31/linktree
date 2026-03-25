import { Router } from 'express';
import type { Analytics } from '@linktree/shared';

const router = Router();

// In-memory storage for now
const analytics: Analytics[] = [];

// Track a click
router.post('/track', (req, res) => {
  const { userId, linkId } = req.body;
  const today = new Date().toISOString().split('T')[0];
  
  const existing = analytics.find(
    (a) => a.userId === userId && a.linkId === linkId && a.date === today
  );
  
  if (existing) {
    existing.clicks += 1;
  } else {
    analytics.push({
      id: Date.now().toString(),
      userId,
      linkId,
      date: today,
      clicks: 1,
    });
  }
  
  res.json({ data: { success: true } });
});

// Get analytics for a user
router.get('/:userId', (req, res) => {
  const { userId } = req.params;
  const { range = '7d' } = req.query;
  
  const days = range === '30d' ? 30 : range === '90d' ? 90 : 7;
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  
  const userAnalytics = analytics.filter((a) => {
    const date = new Date(a.date);
    return a.userId === userId && date >= cutoff;
  });
  
  const totalClicks = userAnalytics.reduce((sum, a) => sum + a.clicks, 0);
  
  // Group by date for chart data
  const byDate = userAnalytics.reduce((acc, a) => {
    acc[a.date] = (acc[a.date] || 0) + a.clicks;
    return acc;
  }, {} as Record<string, number>);
  
  res.json({
    data: {
      totalClicks,
      byDate,
      details: userAnalytics,
    },
  });
});

export default router;
