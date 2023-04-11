import { Request, Response } from 'express';
import TeamsService from '../services/teams.service';

export default class TeamsController {
  private teamService: TeamsService;

  constructor(service = new TeamsService()) {
    this.teamService = service;
  }

  public getAll = async (_req: Request, res: Response): Promise< Response | void > => {
    const teams = await this.teamService.getAll();
    return res.status(200).json(teams);
  };
}
