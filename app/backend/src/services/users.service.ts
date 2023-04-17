import { ModelStatic } from 'sequelize';
import * as bcrypt from 'bcryptjs';
import UsersModel from '../database/models/users.model';
import { ILogin, IUsers } from '../interfaces/users.interface';
import TokenJWT from '../token/Token';

export default class UsersService {
  private model: ModelStatic<UsersModel> = UsersModel;

  public async getByEmail(email:string, password: string): Promise<ILogin> {
    const user = await this.model.findOne({ where: { email } }) as unknown as IUsers;
    if (!user) {
      return { type: 401, message: { message: 'Invalid email or password' } };
    }
    const checkPassword = bcrypt.compareSync(password, user.password);
    if (!checkPassword) {
      return { type: 401, message: { message: 'Invalid email or password' } };
    }
    const token = new TokenJWT().tokenGen(user);
    return { type: 200, message: { token } };
  }

  public static getUserRoleByToken(token:string):ILogin {
    const getToken = new TokenJWT().CheckToken(token);
    if (!getToken) {
      return { type: 401, message: { message: 'Token must be a valid token' } };
    }
    return { type: 200, message: { role: getToken.data.role } };
  }
}
