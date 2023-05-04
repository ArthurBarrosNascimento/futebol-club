import MatcheService from './matches.service';
import TeamsService from './teams.service';
// import ILeaderBoard from '../interfaces/leader.interface';
import {
  homeOrWay,
  createLeaderBoardStus,
  efficiencyTeams,
  sortTeams,
  SumAll,
} from '../helpers/leaderboard.helpe';
import ITeams from '../interfaces/teams.interface';

export default class LeaderBoardService {
  constructor(
    private matcheService = new MatcheService(),
    private teamService = new TeamsService(),
  ) { }

  private async fiterTeam(idTeam:number, typeHomeOrWay: homeOrWay) {
    const allMatches = await this.matcheService.getAll();
    const teamById = await this.teamService.getById(idTeam) as ITeams;
    const { teamName } = teamById;
    const mathesProgress = allMatches
      .filter((matche) =>
        matche[typeHomeOrWay === 'home' ? 'homeTeamId' : 'awayTeamId'] === idTeam
        && !matche.inProgress);
    const resultStatusBoard = createLeaderBoardStus(mathesProgress, teamName, typeHomeOrWay);
    resultStatusBoard.goalsBalance = resultStatusBoard.goalsFavor - resultStatusBoard.goalsOwn;
    resultStatusBoard.efficiency = efficiencyTeams(resultStatusBoard);
    return resultStatusBoard;
  }

  public async getHomeTeams() { // : Promise<ILeaderBoard>
    const allTeams = await this.teamService.getAll();
    const homeTeams = allTeams.map((team) => this.fiterTeam(team.id, 'home'));
    const awaitHomeTeams = await Promise.all(homeTeams);
    const sortTeamsHome = sortTeams(awaitHomeTeams);
    return sortTeamsHome;
  }

  public async getAwayTeams() { // : Promise<ILeaderBoard>
    const allTeams = await this.teamService.getAll();
    const AwayTeams = allTeams.map((team) => this.fiterTeam(team.id, 'away'));
    const awaitAwayTeams = await Promise.all(AwayTeams);
    const sortTeamsAway = sortTeams(awaitAwayTeams);
    return sortTeamsAway;
  }

  public async leaderBoard() {
    const home = await this.getHomeTeams();
    const away = await this.getAwayTeams();
    const getAllBoard = SumAll(home, away);
    const getEficiency = getAllBoard.map((all) => {
      const allget = all;
      allget.efficiency = efficiencyTeams(all);
      return allget;
    });
    const sortAllTeams = sortTeams(getEficiency);
    return sortAllTeams;
  }
}

// [
//   {
//     "id": 1,
//     "homeTeamId": 16,
//     "homeTeamGoals": 1,
//     "awayTeamId": 8,
//     "awayTeamGoals": 1,
//     "inProgress": false,
//     "homeTeam": {
//       "teamName": "São Paulo"
//     },
//     "awayTeam": {
//       "teamName": "Grêmio"
//     }
//   },
// ]
