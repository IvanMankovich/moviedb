import { ErrorService } from '../ErrorService';
import { IMovie, Movie } from '../../models/MovieModel';
import { getGIRegEx, getSearchStr, parseFiles } from '../../utils/helpers';
import { IQuery } from '../types';
import { PipelineStage, Types } from 'mongoose';
import { MovieBuilder, MovieDto } from './helpers';
import { assetsService } from '../AssetsService/AssetsService';

class MoviesService {
  async addMovie(
    movieData: IMovie,
    files?: {
      [fieldname: string]: Express.Multer.File[];
    },
  ) {
    const isMovieExists = await this.isMovieExists(movieData);

    if (!isMovieExists) {
      const movie = new MovieBuilder(movieData);
      const newMovie = new Movie(movie);

      if (files) {
        const { movieBackdrop, moviePoster } = files;
        if (movieBackdrop?.length) {
          const movieBackdropToAdd = parseFiles(files.movieBackdrop);
          const movieBackdrop = await assetsService.addAssets(movieBackdropToAdd);
          newMovie.movieBackdrop = movieBackdrop.map((f) => f._id);
        }

        if (moviePoster?.length) {
          const moviePosterToAdd = parseFiles(files.moviePoster);
          const moviePoster = await assetsService.addAssets(moviePosterToAdd);
          newMovie.moviePoster = moviePoster.map((f) => f._id);
        }
      }

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

  async getMovieById(id: string) {
    try {
      const isExists = await this.checkMovieId(id);
      if (isExists) {
        const movies = await Movie.aggregate([
          { $match: { _id: new Types.ObjectId(id) } },
          {
            $lookup: {
              from: 'assets',
              localField: 'movieBackdrop',
              foreignField: '_id',
              as: 'movieBackdrop',
            },
          },
          {
            $lookup: {
              from: 'assets',
              localField: 'moviePoster',
              foreignField: '_id',
              as: 'moviePoster',
            },
          },
          {
            $lookup: {
              from: 'languages',
              localField: 'movieLanguage',
              foreignField: '_id',
              as: 'movieLanguage',
            },
          },
          {
            $lookup: {
              from: 'genres',
              localField: 'movieGenres',
              foreignField: '_id',
              as: 'movieGenres',
            },
          },
          {
            $lookup: {
              from: 'countries',
              localField: 'movieProductionPlace',
              foreignField: '_id',
              as: 'movieProductionPlace',
            },
          },
          {
            $lookup: {
              from: 'productionStages',
              localField: 'movieStage',
              foreignField: '_id',
              as: 'movieStage',
            },
          },
          {
            $lookup: {
              from: 'people',
              localField: 'movieCast.castPerson',
              foreignField: '_id',
              as: 'movieCast.castPerson',
            },
          },
        ]);
        const movie = movies?.[0];

        if (movie) {
          return new MovieDto(movie);
        } else {
          throw ErrorService.NotFound('Movie not found');
        }
      } else {
        throw ErrorService.NotFound('Movie not found');
      }
    } catch (err) {
      throw ErrorService.NotFound(err?.toString?.());
    }
  }

  async checkMovieId(id?: string) {
    try {
      if (id) {
        const isExists = await Movie.findById(id);
        if (isExists) {
          return true;
        }
        return false;
      } else {
        throw ErrorService.BadRequest('Movie id not provided');
      }
    } catch (err) {
      throw ErrorService.BadRequest(err?.toString?.());
    }
  }
}

export const moviesService = new MoviesService();
