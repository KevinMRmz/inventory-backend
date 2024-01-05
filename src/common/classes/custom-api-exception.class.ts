import { HttpException, HttpStatus, Logger } from '@nestjs/common';

/**
 * @class
 * CustomAPIException is an abstract class that extends the NestJS HttpException.
 * It provides a custom exception with additional logging capabilities.
 */
export abstract class CustomAPIException extends HttpException {
  /**
   * @description
   * Logger instance for logging error messages.
   * The logger is initialized with the name of the exception class.
   */
  readonly _logger = new Logger(CustomAPIException.name);

  /**
   * @constructor
   * Constructor for the CustomAPIException class.
   *
   * @param message - A string describing the error message associated with the exception.
   * @param status - The HTTP status code to be sent with the exception.
   */
  constructor(message: string, status: HttpStatus) {
    super(message, status);

    // Log the error message using the class logger.
    this.log(message);
  }

  /**
   * @description
   * Log method for logging error messages using the class logger.
   *
   * @param msg - The error message to be logged.
   */
  log(msg: string) {
    this._logger.error(msg);
  }
}
