import mongoose from 'mongoose';
// import bycrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import crypto from "crypto";
// import { model, Schema, Model, Document } from "mongoose";

interface IMovie {
  email: string;
  password: string;
}

interface movieModelInterface extends mongoose.Model<MovieDoc> {
  build(attr: IMovie): MovieDoc;
}

interface MovieDoc extends mongoose.Document {
  email: string;
  password: string;
}

const movieSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

movieSchema.statics.build = (attr: IMovie) => {
  return new Movie(attr);
};

const Movie = mongoose.model<MovieDoc, movieModelInterface>('Movie', movieSchema);

Movie.build({
  email: 'some title',
  password: 'some description',
});

export { Movie };
