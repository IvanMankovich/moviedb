import { model, Schema } from 'mongoose';

export interface IAsset {
  _id: string;
  data: Buffer;
  contentType: string;
  size: number;
}

const assetSchema = new Schema({
  data: {
    type: Schema.Types.Buffer,
  },
  contentType: {
    type: Schema.Types.String,
  },
  size: {
    type: Schema.Types.Number,
  },
});

const Asset = model('Asset', assetSchema);

export { Asset };
