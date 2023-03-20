import { Request, Response, Router } from 'express';
import path from 'path';
import multer from 'multer';
import { v4 } from 'uuid';

import { ErrorService } from '../services/ErrorService';
import { peopleService } from '../services/PeopleService/PeopleService';
import { IPerson } from '../models/PersonModel';

const peopleRouter = Router();

// TODO: investigate: disk storage usage and unused files removing
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, v4() + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

peopleRouter.post(
  '/create',
  upload.fields([
    { name: 'personPic', maxCount: 1 },
    { name: 'personGalleryPhotos', maxCount: 10 },
  ]),
  async (req: Request, res: Response) => {
    try {
      if (!req.body.personData) {
        throw ErrorService.BadRequest('Person data not provided');
      }
      const personData = JSON.parse(req.body.personData) as IPerson;
      const createdPerson = await peopleService.createPerson(
        personData,
        req.files as {
          [fieldname: string]: Express.Multer.File[];
        },
      );
      res.json({ createdPerson });
    } catch (error) {
      if (error instanceof ErrorService) {
        res.status(error.status).json(error);
      } else {
        res.status(500).json(error);
      }
    }
  },
);

peopleRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const personId = req.params.id;
    if (!personId) {
      throw ErrorService.BadRequest('Person data not provided');
    }
    const personData = await peopleService.getPersonById(personId);
    res.json(personData);
  } catch (error) {
    if (error instanceof ErrorService) {
      res.status(error.status).json(error);
    } else {
      res.status(500).json(error);
    }
  }
});

export { peopleRouter };
