import { Router } from 'express';
import UsersController from '../controllers/users.controller';
import ValidateFieldsLogin from '../middleware/checksLoginFields';
import CheckToken from '../middleware/verifyToken';

const routerUsers = Router();

const usersController = new UsersController();
const validateFieldsLogin = new ValidateFieldsLogin();
const validateToken = new CheckToken();

routerUsers.post(
  '/',
  validateFieldsLogin.loginFieldsValidation,
  usersController.getUserByEmail,
);
routerUsers.get('/role', validateToken.validateToken, usersController.getRoleUser);

export default routerUsers;
