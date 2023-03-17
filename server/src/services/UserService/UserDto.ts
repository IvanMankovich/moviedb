import { IUser } from '../../models/User';

export class UserDto {
  _id;
  userName;
  userEmail;
  userPic;
  userFavoriteGenres;
  userDescription;

  constructor(model: IUser) {
    this._id = model._id;
    this.userName = model.userName ?? null;
    this.userEmail = model.userEmail ?? null;
    this.userPic = model.userPic ?? null;
    this.userFavoriteGenres = model.userFavoriteGenres ?? [];
    this.userDescription = model.userDescription ?? null;
  }
}
