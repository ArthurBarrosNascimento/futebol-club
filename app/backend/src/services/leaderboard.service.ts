import MatcheService from './matches.service';
import TeamsService from './teams.service';

export default class LeaderBoardService {
  serviceMatche = new MatcheService();
  serviceTeam = new TeamsService();

  public async showAll() {
    const teams = await this.serviceTeam.getAll();
    console.log(teams);
    const matches = await this.serviceMatche.getAllMatchesFinished();
    return matches;
  }
}
