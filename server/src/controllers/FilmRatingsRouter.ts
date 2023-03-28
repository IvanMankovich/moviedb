import { Request, Response, Router } from 'express';
import { ErrorService } from '../services/ErrorService';
import { filmRatingsService } from '../services/FilmRatingsService/FilmRatingsService';
import { IQuery } from '../services/types';

const filmRatingsRouter = Router();

filmRatingsRouter.get('', async (req: Request, res: Response) => {
  try {
    const { query } = req;
    const filmRatingsData = await filmRatingsService.findFilmRatings(query as IQuery);

    res.json(filmRatingsData);
  } catch (error) {
    if (error instanceof ErrorService) {
      res.status(error.status).json(error);
    } else {
      res.status(500).json(error);
    }
  }
});

export { filmRatingsRouter };
