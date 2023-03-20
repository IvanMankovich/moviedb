import { ErrorService } from '../ErrorService';
import { Position } from '../../models/PositionModel';
import { getGIRegEx, getSearchStr } from '../../utils/helpers';
import { IQuery } from '../types';
import { PipelineStage } from 'mongoose';

class PositionsService {
  async addPosition(positionName: string) {
    const isPositionExists = await this.isPositionExists(positionName);
    if (!isPositionExists) {
      const newPosition = new Position({ positionName });
      const result = await newPosition.save();
      return result;
    } else {
      throw ErrorService.Conflict('Position already exists', isPositionExists);
    }
  }

  async isPositionExists(positionName: string) {
    const result = await Position.findOne({ positionName: getGIRegEx(positionName) });

    if (result) {
      const errors: string[] = [];
      errors.push(`Position '${positionName}' already exists.`);

      return errors;
    } else {
      return false;
    }
  }

  async removePosition(_id: string) {
    const positionData = await Position.deleteOne({ _id: _id });
    return positionData;
  }

  async findPositions({
    qStr = '',
    qFields = ['positionName'],
    limit = '10',
    pg = '1',
    sortField = 'positionName',
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
        positions: [{ $skip: (+pg - 1) * +limit }, { $limit: +limit }],
        totalCount: [
          {
            $count: 'count',
          },
        ],
      },
    });

    const positionsData = await Position.aggregate(aggregateParams);

    const data = {
      data: positionsData[0].positions,
      totalPages: positionsData[0].totalCount[0]
        ? Math.ceil(positionsData[0].totalCount[0].count / +limit)
        : 0,
      currentPage: +pg,
    };
    return data;
  }
}

export const positionsService = new PositionsService();
