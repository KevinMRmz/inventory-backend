import { Injectable } from '@nestjs/common';
import { ProductService } from '../../../product/services/product.service';
import { CategoryService } from '../../../category/services/category.service';
import { CreateProductDto } from '../../../product/dtos';
import { APIResponse } from '../../../../common/types/';
import { ProductEntity } from '../../../product/entity';
import { SerialNoAlreadyExistsException } from '../../../product/errors';

@Injectable()
export class CreateProductService {
  constructor(
    private readonly _productService: ProductService,
    private readonly _categorySerivce: CategoryService,
  ) {}

  async createProduct(
    createProductDto: CreateProductDto,
  ): Promise<APIResponse<ProductEntity>> {
    const { serial_no, categoryName } = createProductDto;

    const product = await this._productService.findProductBySerialNo(serial_no);

    if (product) {
      throw new SerialNoAlreadyExistsException();
    }

    const category = await this._categorySerivce.getCategoryByName(
      categoryName,
    );

    return await this._productService.handleCreateProductResponse(
      createProductDto,
    );
  }
}
