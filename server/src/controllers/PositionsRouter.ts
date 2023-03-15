import { Request, Response, Router } from 'express';
import { ErrorService } from '../services/ErrorService';
import { positionsService } from '../services/PositionsService/PositionsService';
import { IQuery } from '../services/types';

const positionsRouter = Router();

positionsRouter.get('', async (req: Request, res: Response) => {
  try {
    const { query } = req;
    const positionsData = await positionsService.findPositions(query as IQuery);

    res.json(positionsData);
  } catch (error) {
    if (error instanceof ErrorService) {
      res.status(error.status).json(error);
    } else {
      res.status(500).json(error);
    }
  }
});

export { positionsRouter };
