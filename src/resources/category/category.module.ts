import { Module } from '@nestjs/common';
import { CategoryService } from './services/category.service';
import { PrismaModule } from '../../common/modules/prisma/prisma.module';
import { CategoryController } from './controller/category.controller';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService],
  imports: [PrismaModule],
  exports: [CategoryService],
})
export class CategoryModule {}
