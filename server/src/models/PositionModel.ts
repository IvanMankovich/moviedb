import { model, Schema } from 'mongoose';

export interface IPosition {
  _id: string;
  personPosition: string;
}

const positionSchema = new Schema({
  personPosition: {
    type: Schema.Types.String,
    unique: true,
    required: true,
    index: 1,
  },
});

const Position = model('Position', positionSchema);

export { Position };
