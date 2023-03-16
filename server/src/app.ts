import * as dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { usersRouter } from './controllers/UsersRouter';
import { tokenRouter } from './controllers/TokenRouter';
import { positionsRouter } from './controllers/PositionsRouter';
import { movieRouter } from './controllers/Movie';

import { connectDB } from './db/dbConnect';
import { UserContext } from './utils/UserContext';
import { countriesRouter } from './controllers/CountriesRouter';

dotenv.config();
const { PORT } = process.env;
const app = express();

connectDB();

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);
app.use(morgan('tiny'));
app.use(cookieParser());
app.use(express.json());
app.use((req: Request, res: Response, next: NextFunction) => {
  UserContext.bind(req);
  next();
});

app.get('/', (req: Request, res: Response) => {
  res.send('health check');
});
app.use('/users', usersRouter);
app.use('/movies', movieRouter);
app.use('/token', tokenRouter);
app.use('/positions', positionsRouter);
app.use('/countries', countriesRouter);

const listetingServer = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

process.on('unhandledRejection', (error) => {
  console.log(`Logged Error: ${error}`);
  listetingServer.close(() => process.exit(1));
});
