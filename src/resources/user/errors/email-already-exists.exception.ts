import { CustomAPIException } from '../../../common/classes';
import { HttpStatus } from '@nestjs/common';

/**
 * @class
 * EmailAlreadyExists is a custom exception class
 * that extends the CustomAPIException.
 * It represents an exception thrown when an
 * attempt is made to create a user with an email that already exists.
 */
export class EmailAlreadyExistsException extends CustomAPIException {
  /**
   * @constructor
   * Constructor for the EmailAlreadyExists class.
   * It calls the superclass constructor with a default error message
   * and HTTP status code for a bad request.
   */
  constructor() {
    super('Email already exists', HttpStatus.BAD_REQUEST);
  }
}
