import { ModelStatic } from 'sequelize';
import TeamsModel from '../database/models/teams.model';
import ITeams from '../interfaces/teams.interface';

export default class TeamsService {
  private model: ModelStatic<TeamsModel> = TeamsModel;

  public async getAll(): Promise<ITeams[]> {
    const allTeams = await this.model.findAll();
    return allTeams;
  }
}
