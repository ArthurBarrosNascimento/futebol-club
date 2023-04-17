import { Router, Request, Response } from 'express';
import MatchesController from '../controllers/matches.controller';

const routerMatcher = Router();
const matcheController = new MatchesController();

routerMatcher.get('/', (req: Request, res: Response) => matcheController.getAll(req, res));

export default routerMatcher;
