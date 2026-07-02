import { Router } from 'express';

const leaderboardRouter = Router();

leaderboardRouter.get('/', (_req, res) => {
  res.json({
    route: '/api/leaderboard/',
    message: 'Leaderboard endpoint is ready.',
  });
});

export default leaderboardRouter;
