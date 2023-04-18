import { Request, Response } from 'express';
import MatcheService from '../services/matches.service';

export default class MatchesController {
  private matcheService: MatcheService;

  constructor(service = new MatcheService()) {
    this.matcheService = service;
  }

  public getAll = async (req: Request, res:Response): Promise< Response | void > => {
    const { inProgress } = req.query;
    const matches = await this.matcheService.getAll();
    let filterMatches = matches;

    if (inProgress === 'true') {
      filterMatches = matches.filter((m) => m.inProgress);
    }
    if (inProgress === 'false') {
      filterMatches = matches.filter((m) => !m.inProgress);
    }
    return res.status(200).json(filterMatches);
  };

  public finishMatche = async (req: Request, res: Response):Promise<Response | void> => {
    try {
      const { id } = req.params;
      await this.matcheService.finishMatche(Number(id));
      return res.status(200).json({ message: 'Finished' });
    } catch (error) {
      console.log(error);
    }
  };

  public updateScoreById = async (req: Request, res: Response):Promise<Response | void> => {
    try {
      const { id } = req.params;
      const { homeTeamGoals, awayTeamGoals } = req.body;
      await this.matcheService.updateScore(Number(id), homeTeamGoals, awayTeamGoals);
      return res.status(200).json('');
    } catch (error) {
      console.log(error);
    }
  };
}
