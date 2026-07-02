import { Router } from 'express';

const teamsRouter = Router();

teamsRouter.get('/', (_req, res) => {
  res.json({
    route: '/api/teams/',
    message: 'Teams endpoint is ready.',
  });
});

export default teamsRouter;
