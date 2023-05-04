import { ModelStatic, Op } from 'sequelize';
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

  public async createNewMatche(body: IMatche) {
    console.log(body, 'aaaaaaaaaaaaaaaaaaa');
    const allMatches = await this.model.findAll({
      where: { id: { [Op.or]: [body.homeTeamId, body.awayTeamId] } },
    });
    if (allMatches.length < 2) {
      return { type: 404, message: { message: 'There is no team with such id!' } };
    }
    const createMatche = await this.model.create({
      homeTeamId: body.homeTeamId,
      awayTeamId: body.awayTeamId,
      homeTeamGoals: body.homeTeamGoals,
      awayTeamGoals: body.awayTeamGoals,
    });
    console.log(createMatche);
    return { type: 201, message: createMatche };
  }
}
