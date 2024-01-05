import { CustomAPIException } from '../../../common/classes';
import { HttpStatus } from '@nestjs/common';

/**
 * @class
 * UserNotFoundException is a custom exception class
 * that extends the CustomAPIException.
 * It represents an exception thrown when a user is not found.
 */
export class UserNotFoundException extends CustomAPIException {
  /**
   * @constructor
   * Constructor for the UserNotFoundException class.
   * It calls the superclass constructor
   * with a default error message and HTTP status code.
   */
  constructor() {
    super('User Not Found', HttpStatus.NOT_FOUND);
  }
}
