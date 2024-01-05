import { HttpStatus } from '@nestjs/common';

/**
 * Response type represents the structure of an API response.
 * @template T - The type of data included in the response.
 */
export type APIResponse<T> = {
  /**
   * HTTP status code indicating the result of the API operation.
   * It is of type HttpStatus, imported from the '@nestjs/common' package.
   */
  statusCode: HttpStatus;

  /**
   * The actual data payload included in the API response.
   * It is of type T, which is a generic type parameter.
   */
  data: T;

  /**
   * An optional property representing the count of items.
   * This can be used for scenarios like paginated responses.
   */
  count?: number;
};
