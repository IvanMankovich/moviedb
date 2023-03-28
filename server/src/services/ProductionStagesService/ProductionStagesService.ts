import { ErrorService } from '../ErrorService';
import { ProductionStage } from '../../models/ProductionStageModel';
import { getGIRegEx, getSearchStr } from '../../utils/helpers';
import { IQuery } from '../types';
import { PipelineStage } from 'mongoose';

class ProductionStagesService {
  async addProductionStage(productionStageName: string) {
    const isProductionStageExists = await this.isProductionStageExists(productionStageName);
    if (!isProductionStageExists) {
      const newProductionStage = new ProductionStage({ productionStageName });
      const result = await newProductionStage.save();
      return result;
    } else {
      throw ErrorService.Conflict('Production stage already exists', isProductionStageExists);
    }
  }

  async isProductionStageExists(productionStageName: string) {
    const result = await ProductionStage.findOne({
      productionStageName: getGIRegEx(productionStageName),
    });

    if (result) {
      const errors: string[] = [];
      errors.push(`Production stage '${productionStageName}' already exists.`);

      return errors;
    } else {
      return false;
    }
  }

  async removeProductionStage(_id: string) {
    const ProductionStageData = await ProductionStage.deleteOne({ _id: _id });
    return ProductionStageData;
  }

  async findProductionStages({
    qStr = '',
    qFields = ['productionStageName'],
    limit = '10',
    pg = '1',
    sortField = 'productionStageName',
    sortDir = '1',
  }: IQuery) {
    const searchObj = getSearchStr(qFields, qStr);

    const aggregateParams: PipelineStage[] = [
      {
        $match: searchObj,
      },
    ];

    if (sortField && sortDir) {
      aggregateParams.push({
        $sort: { [sortField]: +sortDir as 1 | -1 },
      });
    }

    aggregateParams.push({
      $facet: {
        productionStages: [{ $skip: (+pg - 1) * +limit }, { $limit: +limit }],
        totalCount: [
          {
            $count: 'count',
          },
        ],
      },
    });

    const productionStagesData = await ProductionStage.aggregate(aggregateParams);

    const data = {
      data: productionStagesData[0].productionStages,
      totalPages: productionStagesData[0].totalCount[0]
        ? Math.ceil(productionStagesData[0].totalCount[0].count / +limit)
        : 0,
      currentPage: +pg,
    };
    return data;
  }
}

export const productionStagesService = new ProductionStagesService();
