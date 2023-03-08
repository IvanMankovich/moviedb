import express, { Router, Request, Response } from 'express';
import { isLoggedIn } from '../middlewares/middleware';

const movieRouter = Router();

movieRouter.get('/', isLoggedIn, async (req: Request, res: Response) => {
  // const { Todo } = req.context.models;
  // const { username } = req.user;
  // res.json(
  //   await Todo.find({ username }).catch((error) =>
  //     res.status(400).json({ error })
  //   )
  // );
});

movieRouter.get('/:id', isLoggedIn, async (req: Request, res: Response) => {
  // const { Todo } = req.context.models;
  // const { username } = req.user;
  // const _id = req.params.id;
  // res.json(
  //   await Todo.findOne({ username, _id }).catch((error) =>
  //     res.status(400).json({ error })
  //   )
  // );
});

movieRouter.post('/', isLoggedIn, async (req: Request, res: Response) => {
  // const { Todo } = req.context.models;
  // const { username } = req.user;
  // req.body.username = username;
  // res.json(
  //   await Todo.create(req.body).catch((error) =>
  //     res.status(400).json({ error })
  //   )
  // );
});

movieRouter.put('/:id', isLoggedIn, async (req: Request, res: Response) => {
  // const { Todo } = req.context.models;
  // const { username } = req.user;
  // req.body.username = username;
  // const _id = req.params.id;
  // res.json(
  //   await Todo.updateOne({ username, _id }, req.body, { new: true }).catch(
  //     (error) => res.status(400).json({ error })
  //   )
  // );
});

movieRouter.delete('/:id', isLoggedIn, async (req: Request, res: Response) => {
  // const { Todo } = req.context.models;
  // const { username } = req.user;
  // const _id = req.params.id;
  // res.json(
  //   await Todo.remove({ username, _id }).catch((error) =>
  //     res.status(400).json({ error })
  //   )
  // );
});

export { movieRouter };
