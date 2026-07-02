import { Router } from 'express';

import { ActivityModel } from '../models';

const activitiesRouter = Router();

activitiesRouter.get('/', async (_req, res) => {
  try {
    const activities = await ActivityModel.find()
      .populate('user', 'fullName email')
      .populate('team', 'name city')
      .sort({ performedAt: -1 })
      .lean();

    res.json({
      route: '/api/activities/',
      count: activities.length,
      data: activities,
    });
  } catch (error) {
    res.status(500).json({
      route: '/api/activities/',
      error: 'Failed to load activities.',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default activitiesRouter;
