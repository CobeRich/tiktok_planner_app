import { Router, Request, Response } from 'express';
import authenticate from '../middleware/auth';
import Analytics from '../models/Analytics';
import Content from '../models/Content';

const router = Router();

interface AuthRequest extends Request {
  userId?: string;
}

// Get all analytics for user
router.get('/', authenticate as any, async (req: AuthRequest, res: Response) => {
  try {
    const analytics = await Analytics.find({ userId: req.userId }).sort({ timestamp: -1 });
    
    // Calculate aggregate stats
    const totalViews = analytics.reduce((sum, a) => sum + a.views, 0);
    const totalLikes = analytics.reduce((sum, a) => sum + a.likes, 0);
    const totalComments = analytics.reduce((sum, a) => sum + a.comments, 0);
    const totalShares = analytics.reduce((sum, a) => sum + a.shares, 0);
    const averageEngagementRate = analytics.length > 0 
      ? (analytics.reduce((sum, a) => sum + a.engagementRate, 0) / analytics.length).toFixed(2)
      : 0;

    res.json({
      analytics,
      summary: {
        totalViews,
        totalLikes,
        totalComments,
        totalShares,
        averageEngagementRate,
        totalPosts: analytics.length,
      },
    });
  } catch (error) {
    console.error('Get analytics error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get analytics for specific content
router.get('/:contentId', authenticate as any, async (req: AuthRequest, res: Response) => {
  try {
    // Verify ownership
    const content = await Content.findById(req.params.contentId);
    if (!content || content.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const analytics = await Analytics.find({ contentId: req.params.contentId }).sort({ timestamp: -1 });
    res.json(analytics);
  } catch (error) {
    console.error('Get content analytics error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create/update analytics
router.post('/:contentId', authenticate as any, async (req: AuthRequest, res: Response) => {
  try {
    const { views, likes, comments, shares, saves, reach, impressions } = req.body;

    // Verify ownership
    const content = await Content.findById(req.params.contentId);
    if (!content || content.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Calculate engagement rate
    const engagementRate = impressions > 0 
      ? (((likes + comments + shares + saves) / impressions) * 100).toFixed(2)
      : 0;

    const analytics = new Analytics({
      contentId: req.params.contentId,
      userId: req.userId,
      views,
      likes,
      comments,
      shares,
      saves,
      reach,
      impressions,
      engagementRate,
    });

    await analytics.save();

    // Update content with latest stats
    content.views = views;
    content.likes = likes;
    content.comments = comments;
    content.shares = shares;
    content.saves = saves;
    await content.save();

    res.status(201).json(analytics);
  } catch (error) {
    console.error('Create analytics error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
