import { model, Schema } from 'mongoose';

export interface IAsset {
  _id: string;
  assetData: Buffer;
}

const assetSchema = new Schema({
  assetData: {
    data: Buffer,
    contentType: String,
    size: Number,
  },
});

const Asset = model('Asset', assetSchema);

export { Asset };
