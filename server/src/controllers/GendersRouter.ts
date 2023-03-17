import { Request, Response, Router } from 'express';
import { ErrorService } from '../services/ErrorService';
import { gendersService } from '../services/GendersService/GendersService';
import { IQuery } from '../services/types';

const gendersRouter = Router();

gendersRouter.get('', async (req: Request, res: Response) => {
  try {
    const { query } = req;
    const gendersData = await gendersService.findGenders(query as IQuery);

    res.json(gendersData);
  } catch (error) {
    if (error instanceof ErrorService) {
      res.status(error.status).json(error);
    } else {
      res.status(500).json(error);
    }
  }
});

export { gendersRouter };
