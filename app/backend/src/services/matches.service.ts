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

  public async finishMatche(id:number) {
    await this.model.update({ inProgress: false }, { where: { id } });
    return null;
  }

  public async updateScore(id: number, hTG: number, aTG: number) {
    await this.model.update({ homeTeamGoals: hTG, awayTeamGoals: aTG }, { where: { id } });
    return null;
  }

  public async createNewMatche(payload: IMatche) {
    const { dataValues } = await this.model.create({
      homeTeamId: payload.homeTeamId,
      homeTeamGoals: payload.homeTeamGoals,
      awayTeamId: payload.awayTeamId,
      awayTeamGoals: payload.awayTeamGoals,
      inProgress: true,
    });
    return dataValues;
  }
}
