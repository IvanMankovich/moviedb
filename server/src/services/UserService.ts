import bcrypt from 'bcryptjs';
import { User } from '../models/User';
import { IUser } from '../models/User';
import { ErrorService } from './ErrorService';
import { getGIRegEx } from '../utils/helpers';

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
}

export const userService = new UserService();
