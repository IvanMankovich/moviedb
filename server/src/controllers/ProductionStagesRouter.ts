import { Request, Response, Router } from 'express';
import { ErrorService } from '../services/ErrorService';
import { productionStagesService } from '../services/ProductionStagesService/ProductionStagesService';
import { IQuery } from '../services/types';

const productionStagesRouter = Router();

productionStagesRouter.get('', async (req: Request, res: Response) => {
  try {
    const { query } = req;
    const productionStagesData = await productionStagesService.findProductionStages(
      query as IQuery,
    );

    res.json(productionStagesData);
  } catch (error) {
    if (error instanceof ErrorService) {
      res.status(error.status).json(error);
    } else {
      res.status(500).json(error);
    }
  }
});

export { productionStagesRouter };
