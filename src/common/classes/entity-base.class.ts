/**
 * Abstract class representing a base entity with common properties.
 * All entities in the application can extend this class to inherit shared fields.
 */
export abstract class BaseEntity {
  /**
   * Unique identifier for the entity.
   * Subclasses should define the specific type of the identifier.
   */
  id: number;

  /**
   * Date and time when the entity was created.
   * It is set automatically when the entity is first persisted.
   */
  createdAt: Date;

  /**
   * Date and time when the entity was last updated.
   * It is updated automatically whenever the entity is modified.
   */
  updatedAt: Date;
}
