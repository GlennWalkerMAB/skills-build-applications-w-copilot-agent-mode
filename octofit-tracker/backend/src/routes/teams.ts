import { Router } from 'express';

import { TeamModel } from '../models';

const teamsRouter = Router();

teamsRouter.get('/', async (_req, res) => {
  try {
    const teams = await TeamModel.find()
      .populate('members', 'fullName email totalPoints')
      .sort({ totalPoints: -1 })
      .lean();

    res.json({
      route: '/api/teams/',
      count: teams.length,
      data: teams,
    });
  } catch (error) {
    res.status(500).json({
      route: '/api/teams/',
      error: 'Failed to load teams.',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default teamsRouter;
