import { model, Schema } from 'mongoose';

export interface ICountry {
  _id: string;
  countryName: string;
  countryCode: string;
}

const countrySchema = new Schema({
  countryName: {
    type: Schema.Types.String,
    unique: true,
    required: true,
    index: 1,
  },
  countryCode: {
    type: Schema.Types.String,
    unique: true,
    required: true,
    index: 1,
  },
});

const Country = model('Country', countrySchema);

export { Country };
