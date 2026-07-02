import { Router } from 'express';

const workoutsRouter = Router();

workoutsRouter.get('/', (_req, res) => {
  res.json({
    route: '/api/workouts/',
    message: 'Workouts endpoint is ready.',
  });
});

export default workoutsRouter;
