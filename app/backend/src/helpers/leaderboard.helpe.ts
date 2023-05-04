// import IMatche from '../database/models/matches.model';
import IMatche from '../interfaces/matches.interface';
import ILeaderBoard from '../interfaces/leader.interface';

export type homeOrWay = 'home' | 'away';

type favorOrOwn = 'favor' | 'own';

const totalPoints = (matche: IMatche[], typeHomeOrAway: homeOrWay): number => {
  const home = 'homeTeamGoals';
  const away = 'awayTeamGoals';

  const result = matche.reduce<number>((acc, curr) => {
    let cont = acc;

    if (curr[typeHomeOrAway === 'home' ? home : away]
    > curr[typeHomeOrAway === 'home' ? away : home]) {
      cont += 3;
    }
    if (curr.awayTeamGoals === curr.homeTeamGoals) {
      cont += 1;
    }

    return cont;
  }, 0);

  return result;
};

const totalGames = (matche: IMatche[]) => matche.reduce((acc, _curr) => {
  let cont = acc;

  cont += 1;

  return cont;
}, 0);

const totalVictories = (matche: IMatche[], typeHomeOrAway: homeOrWay): number => {
  const home = 'homeTeamGoals';
  const away = 'awayTeamGoals';

  const result = matche.reduce<number>((acc, curr) => {
    let cont = acc;

    if (curr[typeHomeOrAway === 'home' ? home : away]
    > curr[typeHomeOrAway === 'home' ? away : home]) {
      cont += 1;
    }

    return cont;
  }, 0);

  return result;
};

const totalDraws = (matche: IMatche[]): number => {
  const result = matche.reduce<number>((acc, curr) => {
    let cont = acc;

    if (curr.awayTeamGoals === curr.homeTeamGoals) {
      cont += 1;
    }

    return cont;
  }, 0);

  return result;
};

const totalLosses = (matche: IMatche[], typeHomeOrAway: homeOrWay): number => {
  const home = 'homeTeamGoals';
  const away = 'awayTeamGoals';

  const result = matche.reduce<number>((acc, curr) => {
    let cont = acc;

    if (curr[typeHomeOrAway === 'home' ? home : away]
    < curr[typeHomeOrAway === 'home' ? away : home]) {
      cont += 1;
    }

    return cont;
  }, 0);

  return result;
};

const countGoals = (matche: IMatche[], favorOrOwn:favorOrOwn, homeOrWay: homeOrWay) => {
  let favorOrOwnType: 'homeTeamGoals' | 'awayTeamGoals';

  if (homeOrWay === 'home') {
    favorOrOwnType = favorOrOwn === 'favor' ? 'homeTeamGoals' : 'awayTeamGoals';
  }

  if (homeOrWay === 'away') {
    favorOrOwnType = favorOrOwn === 'favor' ? 'awayTeamGoals' : 'homeTeamGoals';
  }

  return matche.reduce<number>((acc, curr) => {
    let cont = acc;

    cont += curr[favorOrOwnType];

    return cont;
  }, 0);
};

export const efficiencyTeams = (
  (teamType: ILeaderBoard) => Number((
    (teamType.totalPoints / (teamType.totalGames * 3)) * 100).toFixed(2)));

export const createLeaderBoardStus = (
  matche: IMatche[],
  teamName: string,
  homeOrWay: homeOrWay,
) => {
  const formTime = {
    name: teamName,
    totalPoints: totalPoints(matche, homeOrWay),
    totalGames: totalGames(matche),
    totalVictories: totalVictories(matche, homeOrWay),
    totalDraws: totalDraws(matche),
    totalLosses: totalLosses(matche, homeOrWay),
    goalsFavor: countGoals(matche, 'favor', homeOrWay),
    goalsOwn: countGoals(matche, 'own', homeOrWay),
    goalsBalance: 1,
    efficiency: 1,
  };

  return formTime;
};

export const sortTeams = (teams: ILeaderBoard[]) => teams.sort((timeA, timeB) => {
  if (timeA.totalPoints !== timeB.totalPoints) {
    return timeB.totalPoints - timeA.totalPoints;
  }
  if (timeA.goalsBalance !== timeB.goalsBalance) {
    return timeB.goalsBalance - timeA.goalsBalance;
  }
  return timeB.goalsFavor - timeA.goalsFavor;
});

export const SumAll = (home: ILeaderBoard[], away:ILeaderBoard[]) => {
  const allTeamsHome = home.map((h) => {
    const awayTeams = away.find((a) => h.name === a.name) as ILeaderBoard;
    return {
      name: h.name,
      totalPoints: h.totalPoints + awayTeams.totalPoints,
      totalGames: h.totalGames + awayTeams.totalGames,
      totalVictories: h.totalVictories + awayTeams.totalVictories,
      totalDraws: h.totalDraws + awayTeams.totalDraws,
      totalLosses: h.totalLosses + awayTeams.totalLosses,
      goalsFavor: h.goalsFavor + awayTeams.goalsFavor,
      goalsOwn: h.goalsOwn + awayTeams.goalsOwn,
      goalsBalance: h.goalsBalance + awayTeams.goalsBalance,
      efficiency: 1,
    };
  });
  return allTeamsHome;
};
