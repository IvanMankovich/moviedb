import * as dotenv from 'dotenv';
import { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import { IUser, User } from '../models/User';
import { ErrorService } from '../services/ErrorService';
import { UserDto } from '../services/UserService/UserDto';

dotenv.config();
const tokenRouter = Router();

tokenRouter.get('', async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);
    const user = await User.findOne({
      refreshToken: refreshToken,
    });
    const userData = new UserDto(user?.toObject() as IUser);
    if (!user) return res.sendStatus(403);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!, (err: unknown) => {
      if (err) return res.sendStatus(403);
      const { _id, userName, email } = user;
      const accessToken = jwt.sign({ _id, userName, email }, process.env.ACCESS_TOKEN_SECRET!, {
        expiresIn: '15s',
      });
      res.json({ accessToken, userData });
    });
  } catch (error) {
    if (error instanceof ErrorService) {
      res.status(error.status).json(error);
    } else {
      res.status(500).json(error);
    }
  }
});

export { tokenRouter };
