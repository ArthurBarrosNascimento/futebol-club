import { Router, Request, Response } from 'express';
import LeaderBoardController from '../controllers/leaderBoard.controller';

const routerLeaderBoard = Router();
const controller = new LeaderBoardController();

routerLeaderBoard.get('/home', (req: Request, res: Response) => controller.getHome(req, res));
routerLeaderBoard.get('/away', (req: Request, res: Response) => controller.getAway(req, res));
routerLeaderBoard.get('/', (req: Request, res: Response) => controller.getAll(req, res));

export default routerLeaderBoard;
