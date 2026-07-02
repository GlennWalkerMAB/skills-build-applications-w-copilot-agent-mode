import { Router } from 'express';

const usersRouter = Router();

usersRouter.get('/', (_req, res) => {
  res.json({
    route: '/api/users/',
    message: 'Users endpoint is ready.',
  });
});

export default usersRouter;
