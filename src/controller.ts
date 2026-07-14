import { Password, isPassword } from './payload';
import { allRulesValid } from './validations';
import { type Request, type Response } from 'express';

export function validatePasswordController(
  req: Request<{}, {}, Password>,
  res: Response
) {
  if (!isPassword(req.body)) {
    res.status(400).json({ message: 'password is invalid API contract' });
  }
  const { password } = req.body;
  if (allRulesValid(password)) {
    res.status(200).json({ message: 'valid password', password });
  }
  res.status(400).json({ message: 'invalid password' });
}
