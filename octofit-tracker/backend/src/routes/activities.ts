import { Router } from 'express';

const activitiesRouter = Router();

activitiesRouter.get('/', (_req, res) => {
  res.json({
    route: '/api/activities/',
    message: 'Activities endpoint is ready.',
  });
});

export default activitiesRouter;
