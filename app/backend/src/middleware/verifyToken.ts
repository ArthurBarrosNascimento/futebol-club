import { Request, Response, NextFunction } from 'express';
import TokenJWT from '../token/Token';

export default class CheckToken {
  public validateToken = (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }
    next();
  };

  public checkToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization') as string;
    const getToken = new TokenJWT().CheckToken(token);
    if (!getToken) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
    next();
  };
}
