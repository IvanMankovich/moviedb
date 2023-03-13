import bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';

import { User } from '../../models/User';
import { IUser } from '../../models/User';
import { ErrorService } from '../ErrorService';
import { getGIRegEx } from '../../utils/helpers';
import { UserDto } from './UserDto';
import { tokenService } from '../TokenService/TokenService';

dotenv.config();

class UserService {
  async createUser(
    userData: IUser,
    file: {
      contentType?: string;
      data: Buffer;
      size?: number;
    },
  ) {
    const isUserExists = await this.isUserExists(userData);
    if (!isUserExists) {
      const password = await bcrypt.hash(userData.password, 10);
      const newUser = new User({ ...userData, password, userPic: file });
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

  async login(params: Pick<IUser, 'email' | 'password'>) {
    const user = await User.findOne({ email: getGIRegEx(params.email) });
    if (user) {
      const match = await bcrypt.compare(params.password, user.password);
      if (!match) {
        throw ErrorService.UnauthorizedError('Wrong credentials', ['Wrong credentials']);
      } else {
        const { _id, userName, email } = user;
        const { accessToken, refreshToken } = tokenService.generateTokens({
          _id: _id.toString(),
          userName,
          email,
        });

        await tokenService.saveToken(_id.toString(), refreshToken);
        const userToObj = user.toObject() as IUser;

        return {
          userData: { ...new UserDto(userToObj), userPic: userToObj.userPic },
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
      await tokenService.removeToken(refreshToken).catch(() => {
        throw ErrorService.UnauthorizedError(`User doesn't exist`, [`User doesn't exist`]);
      });
    }
  }
}

export const userService = new UserService();
