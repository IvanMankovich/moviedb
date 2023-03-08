import { Request } from 'express';
import { IUser } from '../models/User';

export class UserContext {
  static _bindings = new WeakMap<Request, UserContext>();

  public currentUser: IUser | null = null;

  constructor() {}

  static bind(req: Request): void {
    const ctx = new UserContext();
    UserContext._bindings.set(req, ctx);
  }

  static get(req: Request): UserContext | null {
    return UserContext._bindings.get(req) || null;
  }
}
