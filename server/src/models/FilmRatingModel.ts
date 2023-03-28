import { model, Schema } from 'mongoose';

export interface IFilmRating {
  _id: string;
  filmRatingName: string;
  filmRatingDescription: string;
}

const filmRatingSchema = new Schema(
  {
    filmRatingName: {
      type: Schema.Types.String,
      unique: true,
      required: true,
      index: 1,
    },
    filmRatingDescription: {
      type: Schema.Types.String,
    },
  },
  {
    collection: 'filmRatings',
  },
);

const FilmRating = model('FilmRating', filmRatingSchema);

export { FilmRating };
