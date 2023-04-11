import { Router, Request, Response } from 'express';
import TeamsController from '../controllers/teams.controller';

const routerTeam = Router();
const teamsController = new TeamsController();

routerTeam.get('/', (req: Request, res: Response) => teamsController.getAll(req, res));

export default routerTeam;
