import { IUser } from '../../models/User';

export class UserDto {
  _id;
  userName;
  userEmail;
  userDescription;

  constructor(model: IUser) {
    this.userEmail = model.userEmail;
    this._id = model._id;
    this.userName = model.userName;
    this.userDescription = model.userDescription;
  }
}
