import { BaseEntity } from '@common/classes';
import { OrderEntity } from '@order/entities';

/**
 * Class representing a user entity with common properties.
 * Extends the BaseEntity class to inherit shared fields such as id, createdAt, and updatedAt.
 */
export class UserEntity extends BaseEntity {
  /**
   * The username of the user.
   * It is a string that uniquely identifies the user within the system.
   */
  username: string;

  /**
   * The email address associated with the user.
   * It is a string representing the user's contact email.
   */
  email: string;

  /**
   * The role of the user within the system.
   * It is a string indicating the user's role, which can be either 'user' or 'admin'.
   */
  role: string;

  /**
   * Optional property representing the orders associated with the user.
   * It is an array of OrderEntity instances, indicating the orders placed by the user.
   */
  order?: OrderEntity[];
}
