import * as dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { userRouter } from './controllers/User';
import { movieRouter } from './controllers/Movie';
import { connectDB } from './db/dbConnect';
import { UserContext } from './utils/UserContext';
import { tokenRouter } from './controllers/Token';

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
app.use('/user', userRouter);
app.use('/movies', movieRouter);
app.use('/token', tokenRouter);

const listetingServer = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

process.on('unhandledRejection', (error) => {
  console.log(`Logged Error: ${error}`);
  listetingServer.close(() => process.exit(1));
});
