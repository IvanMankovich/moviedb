import mongoose from 'mongoose';
// import bycrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import crypto from "crypto";
// import { model, Schema, Model, Document } from "mongoose";

interface IUser {
  email: string;
  password: string;
}

interface userModelInterface extends mongoose.Model<UserDoc> {
  build(attr: IUser): UserDoc;
}

interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    index: 1,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.build = (attr: IUser) => {
  return new User(attr);
};

const User = mongoose.model<UserDoc, userModelInterface>('User', userSchema);

User.build({
  email: 'some title',
  password: 'some description',
});

export { User };
