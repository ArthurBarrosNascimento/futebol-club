import * as express from 'express';
import routerTeam from './routers/teams.router';
import routerUsers from './routers/users.router';
import routerMatcher from './routers/matches.router';
import routerLeaderBoard from './routers/leaderBoard.router';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();
    this.routes();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }

  private routes(): void {
    this.app.use('/teams', routerTeam);
    this.app.use('/login', routerUsers);
    this.app.use('/matches', routerMatcher);
    this.app.use('/leaderboard', routerLeaderBoard);
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
