import { ErrorService } from '../ErrorService';
import { Gender } from '../../models/GenderModel';
import { getGIRegEx, getSearchStr } from '../../utils/helpers';
import { IQuery } from '../types';
import { PipelineStage, Types } from 'mongoose';

class GendersService {
  async addGender(genderName: string) {
    const isGenderExists = await this.isGenderExists(genderName);
    if (!isGenderExists) {
      const newGender = new Gender({ genderName });
      const result = await newGender.save();
      return result;
    } else {
      throw ErrorService.Conflict('Gender already exists', isGenderExists);
    }
  }

  async isGenderExists(genderName: string) {
    const result = await Gender.findOne({ genderName: getGIRegEx(genderName) });

    if (result) {
      const errors: string[] = [];
      errors.push(`Gender '${genderName}' already exists.`);

      return errors;
    } else {
      return false;
    }
  }

  async removeGender(_id: string) {
    const GenderData = await Gender.deleteOne({ _id: _id });
    return GenderData;
  }

  async findGenders({
    qStr = '',
    qFields = ['genderName'],
    limit = '10',
    pg = '1',
    sortField = 'genderName',
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
        genders: [{ $skip: (+pg - 1) * +limit }, { $limit: +limit }],
        totalCount: [
          {
            $count: 'count',
          },
        ],
      },
    });

    const gendersData = await Gender.aggregate(aggregateParams);

    const data = {
      data: gendersData[0].genders,
      totalPages: gendersData[0].totalCount[0]
        ? Math.ceil(gendersData[0].totalCount[0].count / +limit)
        : 0,
      currentPage: +pg,
    };
    return data;
  }

  async getGenderById(id: string) {
    try {
      const gender = await Gender.findOne({ _id: new Types.ObjectId(id) });
      return gender;
    } catch (err) {
      throw ErrorService.NotFound('Gender not found');
    }
  }
}

export const gendersService = new GendersService();
