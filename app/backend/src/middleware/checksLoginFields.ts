import { Request, Response, NextFunction } from 'express';

export default class ValidateFieldsLogin {
  public loginFieldsValidation = (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Response | void => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    const regexEmail = /\S+@\S+\.\S+/;
    if (!(regexEmail.test(email)) || password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    next();
  };
}
