import { IUser } from '../../models/User';

export class UserDto {
  _id;
  userName;
  email;
  about;

  constructor(model: IUser) {
    this.email = model.email;
    this._id = model._id;
    this.userName = model.userName;
    this.about = model.about;
  }
}
