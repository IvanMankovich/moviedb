import * as dotenv from 'dotenv';
import path from 'path';
import multer from 'multer';
import { v4 } from 'uuid';
import { Request, Response, Router } from 'express';

import { userService } from '../services/UserService/UserService';
import { ErrorService } from '../services/ErrorService';
import { REFRESH_TOKEN_COOKIE_NAME, REFRESH_TOKEN_MAX_AGE } from '../const';
import { IUser } from '../models/User';

dotenv.config();
const usersRouter = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, v4() + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

usersRouter.post('/signup', upload.single('userPic'), async (req: Request, res: Response) => {
  try {
    const userData = JSON.parse(req.body.userData) as IUser;
    const user = await userService.createUser(userData, req.file);
    res.json(user);
  } catch (error) {
    if (error instanceof ErrorService) {
      res.status(error.status).json(error);
    } else {
      res.status(500).json(error);
    }
  }
});

usersRouter.post('/login', async (req: Request, res: Response) => {
  try {
    const { refreshToken, accessToken, userData } = await userService.login({
      userEmail: req.body.userEmail?.toLowerCase?.()?.trim?.(),
      userPassword: req.body.userPassword,
    });
    res.cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, {
      httpOnly: true,
      maxAge: REFRESH_TOKEN_MAX_AGE,
    });
    res.json({ accessToken, userData });
  } catch (error) {
    if (error instanceof ErrorService) {
      res.status(error.status).json(error);
    } else {
      res.status(500).json(error);
    }
  }
});

usersRouter.delete('/logout', async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.cookies;
    await userService.logout(refreshToken);
    res.clearCookie(REFRESH_TOKEN_COOKIE_NAME);
    res.sendStatus(200);
  } catch (error) {
    if (error instanceof ErrorService) {
      res.status(error.status).json(error);
    } else {
      res.status(500).json(error);
    }
  }
});

export { usersRouter };
