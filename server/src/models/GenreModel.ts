import { model, Schema } from 'mongoose';

export interface IGenre {
  _id: string;
  genreName: string;
}

const genreSchema = new Schema({
  genreName: {
    type: Schema.Types.String,
    unique: true,
    required: true,
    index: 1,
  },
});

const Genre = model('Genre', genreSchema);

export { Genre };
