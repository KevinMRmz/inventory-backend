import { CustomAPIException } from '../../../common/classes/custom-api-exception.class';
import { HttpStatus } from '@nestjs/common';

/**
 * @class
 * Exception class representing a "Product Not Found" error.
 * Extends the base CustomAPIException class to provide a custom exception for
 * cases where a requested product cannot be found.
 */
export class ProductNotFoundException extends CustomAPIException {
  /**
   * @constructor
   * Creates an instance of ProductNotFoundException.
   * Sets the default error message to 'Product Not Found' and the HTTP status code to 404 (NOT_FOUND).
   */
  constructor() {
    // Call the constructor of the base class (CustomAPIException) with the specified message and status code.
    super('Product Not Found', HttpStatus.NOT_FOUND);
  }
}
