import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { APIResponse } from '../../../common/types';
import { ProductEntity } from '../entity';
import { ProductService } from '../services/product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly _productService: ProductService) {}

  @Get()
  async getProducts(): Promise<APIResponse<ProductEntity[]>> {
    return await this._productService.handleGetProductsResponse();
  }

  @Get(':id')
  async getProduct(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<APIResponse<ProductEntity>> {
    return await this._productService.handleGetProductResponse(id);
  }
}
