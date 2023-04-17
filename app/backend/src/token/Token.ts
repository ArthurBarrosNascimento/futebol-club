import * as jwt from 'jsonwebtoken';
import { IUsers } from '../interfaces/users.interface';

export default class TokenJWT {
  private secret = process.env.JWT_SECRET || 'jwt_secret';

  public tokenGen(user: IUsers): string {
    const token = jwt.sign({ data: user }, this.secret, {
      expiresIn: '7d',
      algorithm: 'HS256',
    });
    return token;
  }

  public CheckToken(token: string) {
    try {
      const payload = jwt.verify(token, this.secret);
      return payload as jwt.JwtPayload;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
