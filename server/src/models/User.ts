import { model, Schema } from 'mongoose';

export interface IUser {
  email: string;
  password: string;
  userName: string;
  favoriteGenres: Array<string>;
  about: string;
}

const userSchema = new Schema({
  email: {
    type: Schema.Types.String,
    unique: true,
    required: true,
    index: 1,
  },
  password: {
    type: Schema.Types.String,
    required: true,
  },
  userName: {
    type: Schema.Types.String,
    unique: true,
    required: true,
    index: 1,
  },
  favoriteGenres: {
    type: [Schema.Types.String],
    required: true,
  },
  about: {
    type: Schema.Types.String,
  },
});

const User = model('User', userSchema);

export { User };
