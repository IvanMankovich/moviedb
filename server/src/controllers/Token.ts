import * as dotenv from 'dotenv';
import { Request, Response, Router } from 'express';
import { ErrorService } from '../services/ErrorService';
import { tokenService } from '../services/TokenService/TokenService';

dotenv.config();
const tokenRouter = Router();

tokenRouter.get('', async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) return res.sendStatus(401);
    const userData = await tokenService.refreshToken(refreshToken);
    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.json({
      userData: userData.userData,
      refreshToken: userData.refreshToken,
      accessToken: userData.accessToken,
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
