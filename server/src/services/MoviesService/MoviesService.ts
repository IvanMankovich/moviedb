import { ErrorService } from '../ErrorService';
import { IMovie, Movie } from '../../models/MovieModel';
import { getGIRegEx, getSearchStr } from '../../utils/helpers';
import { IQuery } from '../types';
import { PipelineStage } from 'mongoose';
import { MovieBuilder } from './helpers';

class MoviesService {
  async addMovie(movieData: IMovie) {
    const isMovieExists = await this.isMovieExists(movieData);

    if (!isMovieExists) {
      const movie = new MovieBuilder(movieData);
      const newMovie = new Movie(movie);
      try {
        const result = await newMovie.save();
        return result;
      } catch (err) {
        console.log(err);
        return {};
      }
    } else {
      throw ErrorService.Conflict('Movie already exists', isMovieExists);
    }
  }

  async isMovieExists(movieData: Pick<IMovie, 'movieTitle'>) {
    const result = await Movie.findOne({ movieTitle: getGIRegEx(movieData.movieTitle) });

    if (result) {
      const errors: string[] = [];
      errors.push(`Movie '${movieData.movieTitle}' already exists.`);

      return errors;
    } else {
      return false;
    }
  }

  async removeMovie(_id: string) {
    const MovieData = await Movie.deleteOne({ _id: _id });
    return MovieData;
  }

  async findMovies({
    qStr = '',
    qFields = ['movieName'],
    limit = '10',
    pg = '1',
    sortField = 'movieName',
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
        movies: [{ $skip: (+pg - 1) * +limit }, { $limit: +limit }],
        totalCount: [
          {
            $count: 'count',
          },
        ],
      },
    });

    const moviesData = await Movie.aggregate(aggregateParams);

    const data = {
      data: moviesData[0].movies,
      totalPages: moviesData[0].totalCount[0]
        ? Math.ceil(moviesData[0].totalCount[0].count / +limit)
        : 0,
      currentPage: +pg,
    };
    return data;
  }
}

export const moviesService = new MoviesService();
