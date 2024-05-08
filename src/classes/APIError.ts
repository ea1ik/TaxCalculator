/**
 * Represents an API error.
 */
export class APIError extends Error {
  statusCode: number;
  errorCode: string;

  /**
   * Creates a new instance of the APIError class.
   * @param message - The error message.
   * @param statusCode - The HTTP status code associated with the error.
   * @param errorCode - The error code associated with the error.
   */
  constructor(message: string, statusCode: number, errorCode: string) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;

    Object.setPrototypeOf(this, APIError.prototype);
  }
}
