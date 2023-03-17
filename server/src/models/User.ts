import { model, Schema } from 'mongoose';

export interface IUser {
  _id: string;
  userName: string;
  userEmail: string;
  userPassword: string;
  userPic: string;
  userFavoriteGenres: string[];
  userDescription: string;
}

const userSchema = new Schema({
  userName: {
    type: Schema.Types.String,
    unique: true,
    required: true,
    index: 1,
  },
  userEmail: {
    type: Schema.Types.String,
    unique: true,
    required: true,
    index: 1,
  },
  userPassword: {
    type: Schema.Types.String,
    required: true,
  },
  userFavoriteGenres: {
    type: [Schema.Types.ObjectId],
    required: true,
  },
  userDescription: {
    type: Schema.Types.String,
  },
  userPic: {
    type: Schema.Types.ObjectId,
  },
});

const User = model('User', userSchema);

export { User };
