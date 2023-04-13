import { Router } from 'express';
import UsersController from '../controllers/users.controller';
import ValidateFieldsLogin from '../middleware/checksLoginFields';

const routerUsers = Router();

const usersController = new UsersController();
const validateFieldsLogin = new ValidateFieldsLogin();

routerUsers.post(
  '/',
  validateFieldsLogin.loginFieldsValidation,
  usersController.getUserByEmail,
);

export default routerUsers;
