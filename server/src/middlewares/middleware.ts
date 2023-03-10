import * as dotenv from 'dotenv';
import { NextFunction, Response, Request } from 'express';
import { ErrorService } from '../services/ErrorService';
import { tokenService } from '../services/TokenService/TokenService';

dotenv.config();

function checkAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(ErrorService.UnauthorizedError());
    }

    const accessToken = authorizationHeader.split(' ')[1];
    if (!accessToken) {
      return next(ErrorService.UnauthorizedError());
    }

    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      return next(ErrorService.UnauthorizedError());
    }

    next();
  } catch (e) {
    return next(ErrorService.UnauthorizedError());
  }
}

export { checkAuth };
