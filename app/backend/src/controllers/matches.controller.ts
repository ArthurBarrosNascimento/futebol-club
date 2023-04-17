import { Request, Response } from 'express';
import MatcheService from '../services/matches.service';

export default class MatchesController {
  private matcheService: MatcheService;

  constructor(service = new MatcheService()) {
    this.matcheService = service;
  }

  public getAll = async (_req: Request, res:Response): Promise< Response | void > => {
    const matches = await this.matcheService.getAll();
    return res.status(200).json(matches);
  };
}
