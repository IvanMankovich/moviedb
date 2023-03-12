import { model, Schema } from 'mongoose';

export interface IToken {
  _id: string;
  userId: string;
  refreshToken: string | null;
}

const tokenSchema = new Schema({
  userId: {
    type: Schema.Types.String,
    unique: true,
    required: true,
    index: 1,
  },
  refreshToken: {
    type: Schema.Types.String,
  },
});

const Token = model('Token', tokenSchema);

export { Token };
