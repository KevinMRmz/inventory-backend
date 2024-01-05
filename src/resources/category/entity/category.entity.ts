import { BaseEntity } from '@common/classes';

/**
 * Represents a category entity in the application.
 * Extends the BaseEntity class, which provides common fields like id and timestamps.
 */
export class CategoryEntity extends BaseEntity {
  /**
   * The name of the category.
   */
  categoryName: string;
}
