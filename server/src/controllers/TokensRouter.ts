import { Request, Response, Router } from 'express';
import { REFRESH_TOKEN_COOKIE_NAME, REFRESH_TOKEN_MAX_AGE } from '../const';
import { ErrorService } from '../services/ErrorService';
import { tokensService } from '../services/TokensService/TokensService';

const tokensRouter = Router();

tokensRouter.get('', async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.cookies;
    const freshData = await tokensService.refreshToken(refreshToken);

    res.cookie(REFRESH_TOKEN_COOKIE_NAME, freshData.refreshToken, {
      // maxAge: 30 * 24 * 60 * 60 * 1000,
      maxAge: REFRESH_TOKEN_MAX_AGE,
      httpOnly: true,
    });
    return res.json({
      userData: freshData.userData,
      refreshToken: freshData.refreshToken,
      accessToken: freshData.accessToken,
    });
  } catch (error) {
    if (error instanceof ErrorService) {
      res.status(error.status).json(error);
    } else {
      res.status(500).json(error);
    }
  }
});

export { tokensRouter };
