/**
 * Custom error class for operational errors
 * Used to distinguish expected errors from programming errors
 */
export class AppError extends Error {
  public readonly isOperational: boolean = true;

  constructor(
    public readonly statusCode: number,
    message: string,
    public readonly code: string = 'ERROR',
  ) {
    super(message);
    this.name = this.constructor.name;

    // Maintains proper stack trace for where our error was thrown
    Error.captureStackTrace(this, this.constructor);
  }
}