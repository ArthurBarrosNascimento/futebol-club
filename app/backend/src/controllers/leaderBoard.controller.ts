import { Request, Response } from 'express';
import LeaderBoardService from '../services/leaderboard.service';

export default class LeaderBoardController {
  private service: LeaderBoardService;

  constructor(service = new LeaderBoardService()) {
    this.service = service;
  }

  public getAll = async (_req: Request, res: Response): Promise<Response | void> => {
    const result = await this.service.showAll();
    return res.status(200).json(result);
  };
}
