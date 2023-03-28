import { model, Schema } from 'mongoose';

export interface IProductionStage {
  _id: string;
  productionStageName: string;
}

const productionStageSchema = new Schema(
  {
    productionStageName: {
      type: Schema.Types.String,
      unique: true,
      required: true,
      index: 1,
    },
  },
  {
    timestamps: true,
    collection: 'productionStages',
  },
);

const ProductionStage = model('ProductionStage', productionStageSchema);

export { ProductionStage };
