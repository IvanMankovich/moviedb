import { ErrorService } from '../ErrorService';
import { Genre } from '../../models/GenreModel';
import { getGIRegEx, getSearchStr } from '../../utils/helpers';
import { IQuery } from '../types';
import { PipelineStage } from 'mongoose';

class GenresService {
  async addGenre(genreName: string) {
    const isGenreExists = await this.isGenreExists(genreName);
    if (!isGenreExists) {
      const newGenre = new Genre({ genreName });
      const result = await newGenre.save();
      return result;
    } else {
      throw ErrorService.Conflict('Genre already exists', isGenreExists);
    }
  }

  async isGenreExists(genreName: string) {
    const result = await Genre.findOne({ genreName: getGIRegEx(genreName) });

    if (result) {
      const errors: string[] = [];
      errors.push(`Genre '${genreName}' already exists.`);

      return errors;
    } else {
      return false;
    }
  }

  async removeGenre(_id: string) {
    const GenreData = await Genre.deleteOne({ _id: _id });
    return GenreData;
  }

  async findGenres({
    qStr = '',
    qFields = ['genreName'],
    limit = '10',
    pg = '1',
    sortField = 'genreName',
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
        genres: [{ $skip: (+pg - 1) * +limit }, { $limit: +limit }],
        totalCount: [
          {
            $count: 'count',
          },
        ],
      },
    });

    const genresData = await Genre.aggregate(aggregateParams);

    const data = {
      data: genresData[0].genres,
      totalPages: genresData[0].totalCount[0]
        ? Math.ceil(genresData[0].totalCount[0].count / +limit)
        : 0,
      currentPage: +pg,
    };
    return data;
  }
}

export const genresService = new GenresService();
