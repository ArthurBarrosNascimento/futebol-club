import { Request, Response } from 'express';
import UsersService from '../services/users.service';
import { ILogin } from '../interfaces/users.interface';

export default class UsersController {
  private usersService: UsersService;

  constructor(service = new UsersService()) {
    this.usersService = service;
  }

  public getUserByEmail = async (req: Request, res: Response): Promise<Response | ILogin> => {
    const { email, password } = req.body;
    const { type, message } = await this.usersService.getByEmail(email, password);
    return res.status(type).json(message);
  };

  public getRoleUser = async (req: Request, res: Response): Promise<Response | ILogin> => {
    const token = req.header('Authorization') as string;
    const { type, message } = UsersService.getUserRoleByToken(token);
    return res.status(type).json(message);
  };
}
