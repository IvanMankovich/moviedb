export class ErrorService extends Error {
  status;
  errors: string[] = [];

  constructor(status: number, message: string, errors?: string[]) {
    super(message);
    this.status = status;
    this.errors = errors ?? [];
  }

  static UnauthorizedError(message = 'Unauthorized access', errors: string[] = []) {
    return new ErrorService(401, message, errors);
  }

  static BadRequest(message = 'Bad request', errors: string[] = []) {
    return new ErrorService(400, message, errors);
  }

  static Conflict(message = 'Data conflict', errors: string[] = []) {
    return new ErrorService(409, message, errors);
  }

  static NotFound(message = 'Not found', errors: string[] = []) {
    return new ErrorService(404, message, errors);
  }
}
