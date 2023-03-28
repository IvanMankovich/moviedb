import * as dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { connectDB } from './db/dbConnect';

import { usersRouter } from './controllers/UsersRouter';
import { tokensRouter } from './controllers/TokensRouter';
import { positionsRouter } from './controllers/PositionsRouter';
import { movieRouter } from './controllers/Movie';
import { countriesRouter } from './controllers/CountriesRouter';
import { peopleRouter } from './controllers/PeopleRouter';
import { gendersRouter } from './controllers/GendersRouter';
import { genresRouter } from './controllers/GenresRouter';
import { filmRatingsRouter } from './controllers/FilmRatingsRouter';
import { productionStagesRouter } from './controllers/ProductionStagesRouter';
import { languagesRouter } from './controllers/LanguagesRouter';
import { currenciesRouter } from './controllers/CurrenciesRouter';

import { UserContext } from './utils/UserContext';

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
app.use('/tokens', tokensRouter);
app.use('/positions', positionsRouter);
app.use('/countries', countriesRouter);
app.use('/people', peopleRouter);
app.use('/genres', genresRouter);
app.use('/genders', gendersRouter);
app.use('/film-ratings', filmRatingsRouter);
app.use('/production-stages', productionStagesRouter);
app.use('/languages', languagesRouter);
app.use('/currencies', currenciesRouter);

const listetingServer = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

process.on('unhandledRejection', (error) => {
  console.log(`Logged Error: ${error}`);
  listetingServer.close(() => process.exit(1));
});
