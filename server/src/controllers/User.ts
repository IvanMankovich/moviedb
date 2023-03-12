import * as dotenv from 'dotenv';
import { Request, Response, Router } from 'express';
import { userService } from '../services/UserService/UserService';
import { ErrorService } from '../services/ErrorService';
import { REFRESH_TOKEN_COOKIE_NAME, REFRESH_TOKEN_MAX_AGE } from '../const';

dotenv.config();
const userRouter = Router();

userRouter.post('/signup', async (req: Request, res: Response) => {
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

userRouter.post('/login', async (req: Request, res: Response) => {
  try {
    const { refreshToken, accessToken, userData } = await userService.login({
      email: req.body.email?.toLowerCase?.()?.trim?.(),
      password: req.body.password,
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

userRouter.delete('/logout', async (req: Request, res: Response) => {
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

export { userRouter };
