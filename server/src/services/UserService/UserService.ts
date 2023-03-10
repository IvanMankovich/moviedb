import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

import { User } from '../../models/User';
import { IUser } from '../../models/User';
import { ErrorService } from '../ErrorService';
import { getGIRegEx } from '../../utils/helpers';
import { UserDto } from './UserDto';

dotenv.config();

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

class UserService {
  async createUser(userData: IUser) {
    const isUserExists = await this.isUserExists(userData);
    if (!isUserExists) {
      const password = await bcrypt.hash(userData.password, 10);
      const newUser = new User({ ...userData, password });
      const result = await newUser.save();
      return result;
    } else {
      throw ErrorService.Conflict('Users already exists', isUserExists);
    }
  }

  async isUserExists(params: Pick<IUser, 'userName' | 'email'>) {
    const userNameToCompare = params.userName.toLowerCase();
    const emailToCompare = params.email.toLowerCase();
    const result = await User.findOne({
      $or: [{ userName: getGIRegEx(userNameToCompare) }, { email: getGIRegEx(emailToCompare) }],
    });

    if (result) {
      const errors: string[] = [];
      if (userNameToCompare === result.userName.toLowerCase()) {
        errors.push(`User '${params.userName}' already exists.`);
      }
      if (emailToCompare === result.email.toLowerCase()) {
        errors.push(`Mail '${params.email}' already used.`);
      }
      return errors;
    } else {
      return false;
    }
  }

  async login(params: Pick<IUser, 'userName' | 'password'>) {
    const user = await User.findOne({ userName: params.userName });
    if (user) {
      const match = await bcrypt.compare(params.password, user.password);
      if (!match) {
        throw ErrorService.UnauthorizedError('Wrong credentials', ['Wrong credentials']);
      } else {
        const { _id, userName, email } = user;
        const accessToken = jwt.sign({ _id, userName, email }, ACCESS_TOKEN_SECRET!, {
          expiresIn: '15s',
        });
        const refreshToken = jwt.sign({ _id, userName, email }, REFRESH_TOKEN_SECRET!, {
          expiresIn: '1d',
        });
        user.refreshToken = refreshToken;
        const updatedUser = (await user.save()).toObject() as IUser;
        const userDto = new UserDto(updatedUser);
        return {
          userData: userDto,
          refreshToken,
          accessToken,
        };
      }
    } else {
      throw ErrorService.UnauthorizedError(`User doesn't exist`, [`User doesn't exist`]);
    }
  }

  async logout(refreshToken?: string) {
    if (!refreshToken) {
      throw ErrorService.UnauthorizedError(`User doesn't exist`, [`User doesn't exist`]);
    } else {
      const user = await User.findOne({
        refreshToken: refreshToken,
      });
      if (user) {
        user.set('refreshToken', null);
        await user.save();
      } else {
        throw ErrorService.UnauthorizedError(`User doesn't exist`, [`User doesn't exist`]);
      }
    }
  }
}

export const userService = new UserService();
