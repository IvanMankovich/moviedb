require('dotenv').config();
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { Movie } from '../models/Movie';
import { NextFunction, Request, Response, Router } from 'express';

const createContext = (req: any, res: Response, next: NextFunction) => {
  req.context! = {
    models: {
      User,
      Movie,
    },
  };
  next();
};

const isLoggedIn = async (req: any, res: Response, next: NextFunction) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      if (token) {
        const payload = await jwt.verify(token, process.env.SECRET!);
        if (payload) {
          req.user = payload;
          next();
        } else {
          res.status(400).json({ error: 'token verification failed' });
        }
      } else {
        res.status(400).json({ error: 'malformed auth header' });
      }
    } else {
      res.status(400).json({ error: 'No authorization header' });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

export { isLoggedIn, createContext };
