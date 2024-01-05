import { Controller, Post, Body } from '@nestjs/common';
import { CreateProductDto } from '../../../product/dtos';
import { APIResponse } from '../../../../common/types';
import { CreateProductService } from '../service/create-product.service';
import { ProductEntity } from '../../../product/entity';

@Controller('create-product')
export class CreateProductController {
  constructor(private readonly _createProductService: CreateProductService) {}

  @Post()
  async createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<APIResponse<ProductEntity>> {
    return await this._createProductService.createProduct(createProductDto);
  }
}
