import { Router } from 'express';

import { UserModel } from '../models';

const usersRouter = Router();

usersRouter.get('/', async (_req, res) => {
  try {
    const users = await UserModel.find().populate('team', 'name city').sort({ fullName: 1 }).lean();

    res.json({
      route: '/api/users/',
      count: users.length,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      route: '/api/users/',
      error: 'Failed to load users.',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default usersRouter;
