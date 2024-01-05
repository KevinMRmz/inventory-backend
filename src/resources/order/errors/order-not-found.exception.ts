import { CustomAPIException } from '../../../common/classes';
import { HttpStatus } from '@nestjs/common';

/**
 * @class
 * Exception class representing an "Order Not Found" error.
 * Extends the base CustomAPIException class to provide a custom exception for
 * cases where an attempt is made to retrieve or manipulate an order that does not exist.
 */
export class OrderNotFoundException extends CustomAPIException {
  /**
   * @constructor
   * Creates an instance of OrderNotFoundException.
   * It calls the superclass constructor
   * with a default error message and HTTP status code.
   */
  constructor() {
    super('Order Not Found', HttpStatus.NOT_FOUND);
  }
}
