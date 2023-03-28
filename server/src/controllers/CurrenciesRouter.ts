import { Request, Response, Router } from 'express';
import { currenciesService } from '../services/CurrenciesService/CurrenciesService';
import { ErrorService } from '../services/ErrorService';
import { IQuery } from '../services/types';

const currenciesRouter = Router();

currenciesRouter.get('', async (req: Request, res: Response) => {
  try {
    const { query } = req;
    const currenciesData = await currenciesService.findCurrencies(query as IQuery);

    res.json(currenciesData);
  } catch (error) {
    if (error instanceof ErrorService) {
      res.status(error.status).json(error);
    } else {
      res.status(500).json(error);
    }
  }
});

export { currenciesRouter };
