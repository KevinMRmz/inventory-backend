import { Module } from '@nestjs/common';
import { UpdateProductService } from './service/update-product.service';
import { UpdateProductController } from './controller/update-product.controller';
import { CategoryModule } from '../../category/category.module';
import { ProductModule } from '../../product/product.module';

@Module({
  providers: [UpdateProductService],
  controllers: [UpdateProductController],
  imports: [CategoryModule, ProductModule],
})
export class UpdateProductModule {}
