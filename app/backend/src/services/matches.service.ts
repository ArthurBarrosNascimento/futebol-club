import { ModelStatic } from 'sequelize';
import MatchesModel from '../database/models/matches.model';
import TeamsModel from '../database/models/teams.model';
import IMatche from '../interfaces/matches.interface';

export default class MatcheService {
  private model: ModelStatic<MatchesModel> = MatchesModel;

  public async getAll(): Promise<IMatche[]> {
    const allMatches = this.model.findAll({
      include: [
        { model: TeamsModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: TeamsModel, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return allMatches;
  }
}
