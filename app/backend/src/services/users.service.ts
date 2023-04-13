import { ModelStatic } from 'sequelize';
import * as bcrypt from 'bcryptjs';
import UsersModel from '../database/models/users.model';
import { ILogin } from '../interfaces/users.interface';
import TokenJWT from '../token/Token';

export default class UsersService {
  private model: ModelStatic<UsersModel> = UsersModel;

  public async getByEmail(email:string, password: string): Promise<ILogin> {
    const user = await this.model.findOne({ where: { email } });
    if (!user) {
      return { type: 401, message: { message: 'Invalid email or password' } };
    }
    const checkPassword = bcrypt.compareSync(password, user.pasaword);
    if (!checkPassword) {
      return { type: 401, message: { message: 'Invalid email or password' } };
    }
    const token = new TokenJWT().tokenGen(user.dataValues);
    return { type: 200, message: { token } };
  }
}
