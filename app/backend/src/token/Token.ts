import * as jwt from 'jsonwebtoken';
import { IUsers } from '../interfaces/users.interface';

export default class TokenJWT {
  private secret = process.env.JWT_SECRET || 'jwt_secret';

  public tokenGen(user: IUsers): string {
    const token = jwt.sign(user, this.secret, {
      expiresIn: '7d',
      algorithm: 'HS256',
    });
    return token;
  }
}
