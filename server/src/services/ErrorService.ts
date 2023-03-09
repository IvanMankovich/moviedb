export class ErrorService extends Error {
  status;
  errors: string[] = [];

  constructor(status: number, message: string, errors?: string[]) {
    super(message);
    this.status = status;
    this.errors = errors ?? [];
  }

  static UnauthorizedError(message: string, errors: string[] = []) {
    return new ErrorService(401, message, errors);
  }

  static BadRequest(message: string, errors: string[] = []) {
    return new ErrorService(400, message, errors);
  }

  static Conflict(message: string, errors: string[] = []) {
    return new ErrorService(409, message, errors);
  }
}
