import { Module } from '@nestjs/common';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';
import { PrismaModule } from '../../common/modules/prisma/prisma.module';

@Module({
  providers: [ProductService],
  controllers: [ProductController],
  imports: [PrismaModule],
  exports: [ProductService],
})
export class ProductModule {}
