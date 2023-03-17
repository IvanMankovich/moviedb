import { model, Schema } from 'mongoose';

export interface IGender {
  _id: string;
  genderName: string;
}

const genderSchema = new Schema({
  genderName: {
    type: Schema.Types.String,
    unique: true,
    required: true,
    index: 1,
  },
});

const Gender = model('Gender', genderSchema);

export { Gender };
