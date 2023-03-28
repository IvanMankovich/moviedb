import { Request, Response, Router } from 'express';
import { ErrorService } from '../services/ErrorService';
import { languagesService } from '../services/LanguagesService/LanguagesService';
import { IQuery } from '../services/types';

const languagesRouter = Router();

languagesRouter.get('', async (req: Request, res: Response) => {
  try {
    const { query } = req;
    const languagesData = await languagesService.findLanguages(query as IQuery);

    res.json(languagesData);
  } catch (error) {
    if (error instanceof ErrorService) {
      res.status(error.status).json(error);
    } else {
      res.status(500).json(error);
    }
  }
});

export { languagesRouter };
