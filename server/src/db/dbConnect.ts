// import { ConnectOptions } from "mongodb";
import mongoose from 'mongoose';

const connectDB = async () => {
  const { connection } = await mongoose.connect(process.env.DATABASE_URL!);
  connection
    .on('open', () => console.log('MongoDb Connected'))
    .on('close', () => console.log('MongoDb Closed'))
    .on('error', (error) => console.log(error));
};

export { connectDB };
