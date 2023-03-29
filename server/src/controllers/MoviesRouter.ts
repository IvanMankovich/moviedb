import { Router, Request, Response } from 'express';
import path from 'path';
import multer from 'multer';
import { v4 } from 'uuid';

import { checkAuth } from '../middlewares/middleware';
import { IMovie } from '../models/MovieModel';
import { ErrorService } from '../services/ErrorService';
import { moviesService } from '../services/MoviesService/MoviesService';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, v4() + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

const moviesRouter = Router();

// movieRouter.get('/', checkAuth, async (req: Request, res: Response) => {
//   // const { Todo } = req.context.models;
//   // const { username } = req.user;
//   // res.json(
//   //   await Todo.find({ username }).catch((error) =>
//   //     res.status(400).json({ error })
//   //   )
//   // );
// });

// movieRouter.get('/:id', checkAuth, async (req: Request, res: Response) => {
//   // const { Todo } = req.context.models;
//   // const { username } = req.user;
//   // const _id = req.params.id;
//   // res.json(
//   //   await Todo.findOne({ username, _id }).catch((error) =>
//   //     res.status(400).json({ error })
//   //   )
//   // );
// });

moviesRouter.post(
  '',
  checkAuth,
  upload.fields([
    { name: 'personPic', maxCount: 10 },
    { name: 'personGalleryPhotos', maxCount: 10 },
  ]),
  async (req: Request, res: Response) => {
    try {
      if (!req.body.movieData) {
        throw ErrorService.BadRequest('Movie data not provided');
      }
      const movieData = JSON.parse(req.body.movieData) as IMovie;

      const createdMovie = await moviesService.addMovie(movieData);
      res.json({ createdMovie });
    } catch (error) {
      if (error instanceof ErrorService) {
        res.status(error.status).json(error);
      } else {
        res.status(500).json(error);
      }
    }

    // const { Todo } = req.context.models;
    // const { username } = req.user;
    // req.body.username = username;
    // res.json(
    //   await Todo.create(req.body).catch((error) =>
    //     res.status(400).json({ error })
    //   )
    // );
  },
);

// movieRouter.put('/:id', checkAuth, async (req: Request, res: Response) => {
//   // const { Todo } = req.context.models;
//   // const { username } = req.user;
//   // req.body.username = username;
//   // const _id = req.params.id;
//   // res.json(
//   //   await Todo.updateOne({ username, _id }, req.body, { new: true }).catch(
//   //     (error) => res.status(400).json({ error })
//   //   )
//   // );
// });

// movieRouter.delete('/:id', checkAuth, async (req: Request, res: Response) => {
//   // const { Todo } = req.context.models;
//   // const { username } = req.user;
//   // const _id = req.params.id;
//   // res.json(
//   //   await Todo.remove({ username, _id }).catch((error) =>
//   //     res.status(400).json({ error })
//   //   )
//   // );
// });

export { moviesRouter };
