import { Module } from '@nestjs/common';
import { CreateProductController } from './controller/create-product.controller';
import { CreateProductService } from './service/create-product.service';
import { CategoryModule } from '../../category/category.module';
import { ProductModule } from '../../product/product.module';

@Module({
  controllers: [CreateProductController],
  providers: [CreateProductService],
  imports: [CategoryModule, ProductModule],
})
export class CreateProductModule {}
