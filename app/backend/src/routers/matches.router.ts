import { Router, Request, Response } from 'express';
import MatchesController from '../controllers/matches.controller';
import CheckToken from '../middleware/verifyToken';

const routerMatcher = Router();
const matcheController = new MatchesController();
const validateToken = new CheckToken();

routerMatcher.get('/', (req: Request, res: Response) => matcheController.getAll(req, res));

routerMatcher.patch(
  '/:id/finish',
  validateToken.validateToken,
  validateToken.checkToken,
  matcheController.finishMatche,
);

routerMatcher.patch(
  '/:id',
  validateToken.validateToken,
  validateToken.checkToken,
  matcheController.updateScoreById,
);

routerMatcher.post(
  '/',
  validateToken.validateToken,
  validateToken.checkToken,
  matcheController.createNewMatche,
);

export default routerMatcher;
