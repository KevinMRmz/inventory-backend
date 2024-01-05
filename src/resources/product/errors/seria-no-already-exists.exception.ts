import { CustomAPIException } from '../../../common/classes/custom-api-exception.class';
import { HttpStatus } from '@nestjs/common';

/**
 * @class
 * Exception class representing a "Serial No Already Exists" error.
 * Extends the base CustomAPIException class to provide a custom exception for
 * cases where an attempt is made to create a record with a duplicate serial number.
 */
export class SerialNoAlreadyExistsException extends CustomAPIException {
  /**
   * @constructor
   * Creates an instance of SerialNoAlreadyExistsException.
   * Sets the default error message to 'Serial No Already Exists' and the HTTP status code to 404 (NOT_FOUND).
   */
  constructor() {
    // Call the constructor of the base class (CustomAPIException) with the specified message and status code.
    super('Serial No Already Exists', HttpStatus.BAD_REQUEST);
  }
}
