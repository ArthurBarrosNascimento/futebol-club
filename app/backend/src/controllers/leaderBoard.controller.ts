import { Request, Response } from 'express';
import LeaderBoardService from '../services/leaderboard.service';

export default class LeaderBoardController {
  private service: LeaderBoardService;

  constructor(service = new LeaderBoardService()) {
    this.service = service;
  }

  public getHome = async (_req: Request, res: Response): Promise<Response | void> => {
    const result = await this.service.getHomeTeams();
    return res.status(200).json(result);
  };

  public getAway = async (_req: Request, res: Response): Promise<Response | void> => {
    const result = await this.service.getAwayTeams();
    return res.status(200).json(result);
  };

  public getAll = async (_req: Request, res: Response): Promise<Response | void> => {
    const result = await this.service.leaderBoard();
    return res.status(200).json(result);
  };
}
