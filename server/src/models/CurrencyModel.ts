import { model, Schema } from 'mongoose';

export interface ICurrency {
  _id: string;
  currencySymbol: string;
  currencyCode: string;
}

const currencySchema = new Schema({
  currencySymbol: {
    type: Schema.Types.String,
    unique: true,
    required: true,
    index: 1,
  },
  currencyCode: {
    type: Schema.Types.String,
    unique: true,
    required: true,
    index: 1,
  },
});

const Currency = model('Currency', currencySchema);

export { Currency };
