import { CustomAPIException } from '../../../common/classes/custom-api-exception.class';
import { HttpStatus } from '@nestjs/common';

/**
 * Custom exception class representing a scenario where a category name already exists.
 * Extends the base CustomAPIException class.
 */
export class CategoryNameAlreadyExistsException extends CustomAPIException {
  /**
   * Constructor for the CategoryNameAlreadyExists class.
   * Sets the default error message to 'Category Name Already Exists' and the HTTP status code to 400 (BAD_REQUEST).
   */
  constructor() {
    // Call the constructor of the base class (CustomAPIException) with the specified message and status code.
    super('Category Name Already Exists', HttpStatus.BAD_REQUEST);
  }
}
