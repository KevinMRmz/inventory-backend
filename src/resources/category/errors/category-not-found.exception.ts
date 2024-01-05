import { CustomAPIException } from '../../../common/classes/custom-api-exception.class';
import { HttpStatus } from '@nestjs/common';

/**
 * @class
 * Custom exception class representing when a category was not found" scenario.
 * Extends the base CustomAPIException class and sets the HTTP status code to 404 (NOT_FOUND).
 */
export class CategoryNotFoundException extends CustomAPIException {
  /**
   * @constructor
   * Constructor for the CategoryNotFoundException class.
   * Sets the default error message to 'Category Not Found' and the HTTP status code to 404 (NOT_FOUND).
   */
  constructor() {
    // Call the constructor of the base class (CustomAPIException) with the specified message and status code.
    super('Category Not Found', HttpStatus.NOT_FOUND);
  }
}
