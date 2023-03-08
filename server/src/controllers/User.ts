require('dotenv').config();
import { NextFunction, Request, Response, Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { userService } from '../services/UserService';
import { ErrorService } from '../services/ErrorService';

const userRouter = Router();

const { SECRET } = process.env;

userRouter.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userService.createUser(req.body);
    res.json(user);
  } catch (error) {
    if (error instanceof ErrorService) {
      res.status(error.status).json(error);
    } else {
      res.status(500).json(error);
    }
  }
});

userRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findOne({ userName: req.body.userName });
    if (user) {
      const result = await bcrypt.compare(req.body.password, user.password);
      if (result) {
        const token = await jwt.sign({ userName: req.body.userName }, SECRET!);
        res.json({ token });
      } else {
        res.status(401).json({ error: "password doesn't match" });
      }
    } else {
      res.status(401).json({ error: "User doesn't exist" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

export { userRouter };
