import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import { IUser, User } from '../../models/User';
import { Token } from '../../models/Token';
import { ACCESS_TOKEN_MAX_AGE, REFRESH_TOKEN_MAX_AGE } from '../../const';
import { ErrorService } from '../ErrorService';
import { UserDto } from '../UserService/UserDto';

dotenv.config();

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

class TokenService {
  generateTokens(payload: Pick<IUser, '_id' | 'userName' | 'email'>) {
    const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET!, {
      expiresIn: ACCESS_TOKEN_MAX_AGE / 1000,
    });
    const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET!, {
      expiresIn: REFRESH_TOKEN_MAX_AGE / 1000,
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  validateAccessToken(token: string) {
    try {
      const userData = jwt.verify(token, ACCESS_TOKEN_SECRET!);
      return userData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token: string) {
    try {
      const userData = jwt.verify(token, REFRESH_TOKEN_SECRET!);
      return userData;
    } catch (e) {
      return null;
    }
  }

  async saveToken(userId: string, refreshToken: string) {
    const tokenData = await Token.findOne({ userId: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await Token.create({ userId: userId, refreshToken });
    return token;
  }

  async removeToken(refreshToken: string) {
    const tokenData = await Token.deleteOne({ refreshToken });
    return tokenData;
  }

  async findToken(refreshToken: string) {
    const tokenData = await Token.findOne({
      refreshToken: refreshToken,
    });
    return tokenData;
  }

  async refreshToken(refreshToken?: string) {
    if (!refreshToken) {
      throw ErrorService.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken) as IUser;
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ErrorService.UnauthorizedError();
    } else {
      const user = await User.findById(userData._id.toString());
      if (user) {
        const userDto = new UserDto(user?.toObject());
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto._id, tokens.refreshToken);
        return { ...tokens, userData: userDto };
      } else {
        throw ErrorService.UnauthorizedError(`User doesn't exist`, [`User doesn't exist`]);
      }
    }
  }
}

export const tokenService = new TokenService();
