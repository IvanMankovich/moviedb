import { ErrorService } from '../ErrorService';
import { Language } from '../../models/LanguageModel';
import { getGIRegEx, getSearchStr } from '../../utils/helpers';
import { IQuery } from '../types';
import { PipelineStage } from 'mongoose';

class LanguagesService {
  async addLanguage(languageName: string) {
    const isLanguageExists = await this.isLanguageExists(languageName);
    if (!isLanguageExists) {
      const newLanguage = new Language({ languageName });
      const result = await newLanguage.save();
      return result;
    } else {
      throw ErrorService.Conflict('Language already exists', isLanguageExists);
    }
  }

  async isLanguageExists(languageName: string) {
    const result = await Language.findOne({ languageName: getGIRegEx(languageName) });

    if (result) {
      const errors: string[] = [];
      errors.push(`Language '${languageName}' already exists.`);

      return errors;
    } else {
      return false;
    }
  }

  async removeLanguage(_id: string) {
    const LanguageData = await Language.deleteOne({ _id: _id });
    return LanguageData;
  }

  async findLanguages({
    qStr = '',
    qFields = ['languageName'],
    limit = '10',
    pg = '1',
    sortField = 'languageName',
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
        languages: [{ $skip: (+pg - 1) * +limit }, { $limit: +limit }],
        totalCount: [
          {
            $count: 'count',
          },
        ],
      },
    });

    const languagesData = await Language.aggregate(aggregateParams);

    const data = {
      data: languagesData[0].languages,
      totalPages: languagesData[0].totalCount[0]
        ? Math.ceil(languagesData[0].totalCount[0].count / +limit)
        : 0,
      currentPage: +pg,
    };
    return data;
  }
}

export const languagesService = new LanguagesService();
