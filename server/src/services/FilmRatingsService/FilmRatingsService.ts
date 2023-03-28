import { ErrorService } from '../ErrorService';
import { FilmRating } from '../../models/FilmRatingModel';
import { getGIRegEx, getSearchStr } from '../../utils/helpers';
import { IQuery } from '../types';
import { PipelineStage } from 'mongoose';

class FilmRatingsService {
  async addFilmRating(filmRatingName: string) {
    const isFilmRatingExists = await this.isFilmRatingExists(filmRatingName);
    if (!isFilmRatingExists) {
      const newFilmRating = new FilmRating({ filmRatingName });
      const result = await newFilmRating.save();
      return result;
    } else {
      throw ErrorService.Conflict('Film rating already exists', isFilmRatingExists);
    }
  }

  async isFilmRatingExists(filmRatingName: string) {
    const result = await FilmRating.findOne({ filmRatingName: getGIRegEx(filmRatingName) });

    if (result) {
      const errors: string[] = [];
      errors.push(`Film rating '${filmRatingName}' already exists.`);

      return errors;
    } else {
      return false;
    }
  }

  async removeFilmRating(_id: string) {
    const FilmRatingData = await FilmRating.deleteOne({ _id: _id });
    return FilmRatingData;
  }

  async findFilmRatings({
    qStr = '',
    qFields = ['filmRatingName'],
    limit = '10',
    pg = '1',
    sortField = 'filmRatingName',
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
        filmRatings: [{ $skip: (+pg - 1) * +limit }, { $limit: +limit }],
        totalCount: [
          {
            $count: 'count',
          },
        ],
      },
    });

    const filmRatingsData = await FilmRating.aggregate(aggregateParams);

    const data = {
      data: filmRatingsData[0].filmRatings,
      totalPages: filmRatingsData[0].totalCount[0]
        ? Math.ceil(filmRatingsData[0].totalCount[0].count / +limit)
        : 0,
      currentPage: +pg,
    };
    return data;
  }
}

export const filmRatingsService = new FilmRatingsService();
