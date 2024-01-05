import { Controller, Patch, Param, Body, ParseIntPipe } from '@nestjs/common';
import { UpdateProductService } from '../service/update-product.service';
import { UpdateProductDto } from '../../../product/dtos';

@Controller('update-product')
export class UpdateProductController {
  constructor(private readonly _updateProductService: UpdateProductService) {}

  @Patch(':id')
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return await this._updateProductService.updateProduct(id, updateProductDto);
  }
}
