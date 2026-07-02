import { Router } from 'express';

import { LeaderboardModel } from '../models';

const leaderboardRouter = Router();

leaderboardRouter.get('/', async (_req, res) => {
  try {
    const leaderboard = await LeaderboardModel.find()
      .populate('team', 'name city totalPoints')
      .sort({ period: 1, rank: 1 })
      .lean();

    res.json({
      route: '/api/leaderboard/',
      count: leaderboard.length,
      data: leaderboard,
    });
  } catch (error) {
    res.status(500).json({
      route: '/api/leaderboard/',
      error: 'Failed to load leaderboard entries.',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default leaderboardRouter;
