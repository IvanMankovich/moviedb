import bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';

import { User } from '../../models/User';
import { IUser } from '../../models/User';
import { ErrorService } from '../ErrorService';
import { getGIRegEx, parseFiles } from '../../utils/helpers';
import { UserDto } from './UserDto';
import { tokensService } from '../TokensService/TokensService';
import { CreateUser } from './helpers';
import { assetsService } from '../AssetsService/AssetsService';
import { Types } from 'mongoose';

dotenv.config();

class UserService {
  async createUser(userData: IUser, file?: Express.Multer.File) {
    if (userData) {
      const user = new CreateUser(userData);

      const isUserExists = await this.isUserExists(user);
      if (!isUserExists) {
        const password = await bcrypt.hash(userData.userPassword, 10);
        const newUser = new User({ ...userData, userPassword: password });

        if (file) {
          const userPicToAdd = parseFiles([file]);
          const userPic = await assetsService.addAssets(userPicToAdd);
          newUser.userPic = userPic[0]._id;
        }

        const result = await newUser.save();
        return result;
      } else {
        throw ErrorService.Conflict('Users already exists', isUserExists);
      }
    } else {
      throw ErrorService.Conflict('User data not provided');
    }
  }

  async isUserExists(params: Pick<IUser, 'userName' | 'userEmail'>) {
    const userNameToCompare = params.userName.toLowerCase();
    const emailToCompare = params.userEmail.toLowerCase();
    const result = await User.findOne({
      $or: [{ userName: getGIRegEx(userNameToCompare) }, { userEmail: getGIRegEx(emailToCompare) }],
    });

    if (result) {
      const errors: string[] = [];
      if (userNameToCompare === result.userName.toLowerCase()) {
        errors.push(`User '${params.userName}' already exists.`);
      }
      if (emailToCompare === result.userEmail.toLowerCase()) {
        errors.push(`Mail '${params.userEmail}' already used.`);
      }
      return errors;
    } else {
      return false;
    }
  }

  async login(params: Pick<IUser, 'userEmail' | 'userPassword'>) {
    const users = await User.aggregate([
      { $match: { userEmail: getGIRegEx(params.userEmail) } },
      {
        $lookup: {
          from: 'assets',
          localField: 'userPic',
          foreignField: '_id',
          as: 'userPic',
        },
      },
    ]);
    const user = users?.[0];
    if (user) {
      const match = await bcrypt.compare(params.userPassword, user.userPassword);
      if (!match) {
        throw ErrorService.UnauthorizedError('Wrong credentials', ['Wrong credentials']);
      } else {
        const { _id, userName, userEmail } = user;
        const { accessToken, refreshToken } = tokensService.generateTokens({
          _id,
          userName,
          userEmail,
        });

        await tokensService.saveToken(_id, refreshToken);

        return {
          userData: new UserDto(user),
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
      await tokensService.removeToken(refreshToken).catch(() => {
        throw ErrorService.UnauthorizedError(`User doesn't exist`, [`User doesn't exist`]);
      });
    }
  }

  async getUserById(id?: string) {
    if (id) {
      const users = await User.aggregate([
        { $match: { _id: new Types.ObjectId(id) } },
        {
          $lookup: {
            from: 'assets',
            localField: 'userPic',
            foreignField: '_id',
            as: 'userPic',
          },
        },
      ]);
      const user = users?.[0];
      if (user) {
        return new UserDto(user);
      } else {
        throw ErrorService.UnauthorizedError(`User doesn't exist`);
      }
    } else {
      throw ErrorService.UnauthorizedError(`UserId not provided`);
    }
  }
}

export const userService = new UserService();
