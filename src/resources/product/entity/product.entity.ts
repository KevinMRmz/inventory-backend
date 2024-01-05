import { BaseEntity } from '../../../common/classes/entity-base.class';

export class ProductEntity extends BaseEntity {
  branch: string;
  model: string;
  description: string;
  serial_no: string;
  isAvailable: boolean;
  categoryName: string;
}
