import { Request, Response, Router } from 'express';
import { ErrorService } from '../services/ErrorService';
import { countriesService } from '../services/CountriesService/CountriesService';
import { IQuery } from '../services/types';

const countriesRouter = Router();

countriesRouter.get('', async (req: Request, res: Response) => {
  try {
    const { query } = req;
    const positionsData = await countriesService.findCountries(query as IQuery);

    res.json(positionsData);
  } catch (error) {
    if (error instanceof ErrorService) {
      res.status(error.status).json(error);
    } else {
      res.status(500).json(error);
    }
  }
});

export { countriesRouter };
