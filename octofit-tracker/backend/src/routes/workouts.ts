import { Router } from 'express';

import { WorkoutModel } from '../models';

const workoutsRouter = Router();

workoutsRouter.get('/', async (_req, res) => {
  try {
    const workouts = await WorkoutModel.find()
      .populate('createdBy', 'fullName level')
      .sort({ difficulty: 1, durationMinutes: 1 })
      .lean();

    res.json({
      route: '/api/workouts/',
      count: workouts.length,
      data: workouts,
    });
  } catch (error) {
    res.status(500).json({
      route: '/api/workouts/',
      error: 'Failed to load workouts.',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default workoutsRouter;
