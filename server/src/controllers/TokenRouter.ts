import { Request, Response, Router } from 'express';
import { REFRESH_TOKEN_COOKIE_NAME, REFRESH_TOKEN_MAX_AGE } from '../const';
import { IUser, User } from '../models/User';
import { ErrorService } from '../services/ErrorService';
import { tokenService } from '../services/TokenService/TokenService';
import { UserDto } from '../services/UserService/UserDto';

const tokenRouter = Router();

tokenRouter.get('', async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) return res.sendStatus(401);
    const userData = await tokenService.refreshToken(refreshToken);
    const currUser = await User.findById(userData.userData._id);
    const currUserToObj = currUser?.toObject() as IUser;
    res.cookie(REFRESH_TOKEN_COOKIE_NAME, userData.refreshToken, {
      // maxAge: 30 * 24 * 60 * 60 * 1000,
      maxAge: REFRESH_TOKEN_MAX_AGE,
      httpOnly: true,
    });
    return res.json({
      userData: { ...new UserDto(currUserToObj), userPic: currUserToObj.userPic },
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
