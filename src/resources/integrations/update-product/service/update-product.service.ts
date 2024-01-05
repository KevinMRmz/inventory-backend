import { Injectable } from '@nestjs/common';
import { ProductService } from '../../../product/services/product.service';
import { CategoryService } from '../../../category/services/category.service';
import { APIResponse } from '../../../../common/types/';
import { ProductEntity } from '../../../product/entity';
import { UpdateProductDto } from '../../../product/dtos';
import { CategoryNotFoundException } from '../../../category/errors';

@Injectable()
export class UpdateProductService {
  constructor(
    private readonly _productService: ProductService,
    private readonly _categoryService: CategoryService,
  ) {}

  async updateProduct(id: number, updateProductDto: UpdateProductDto) {
    const { categoryName } = updateProductDto;

    if (
      categoryName &&
      !(await this._categoryService.findCategoryByName(categoryName))
    ) {
      throw new CategoryNotFoundException();
    }

    return await this._productService.handleUpdateProductResponse(
      id,
      updateProductDto,
    );
  }
}
