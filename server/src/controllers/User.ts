require('dotenv').config();
import express, { NextFunction, Request, Response, Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userRouter = Router();

const { SECRET } = process.env;

export interface IExtendedReq extends Request {
  context: any;
}

userRouter.post('/signup', async (req: any, res: Response, next: NextFunction) => {
  console.log('signup');
  console.log(req.context!);
  const { User } = req.context.models;
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const user = await User.create(req.body);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error });
  }
});

userRouter.post('/login', async (req: any, res: Response, next: NextFunction) => {
  const { User } = req.context.models;
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      const result = await bcrypt.compare(req.body.password, user.password);
      if (result) {
        const token = await jwt.sign({ username: user.username }, SECRET!);
        res.json({ token });
      } else {
        res.status(400).json({ error: "password doesn't match" });
      }
    } else {
      res.status(400).json({ error: "User doesn't exist" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

export { userRouter };
