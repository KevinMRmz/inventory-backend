import { BaseEntity } from '@common/classes';

export class OrderEntity extends BaseEntity {
  description: string;
  productId: number;
  userId: number;
}
