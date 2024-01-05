import { Module } from '@nestjs/common';
import { PrismaModule } from '@common/modules/prisma/prisma.module';
import { UserModule } from '@user/user.module';
import { ConfigModule } from '@nestjs/config';
import { validate } from '@config/env/env.validation';
import { BcryptModule } from './common/modules/bcrypt/bcrypt.module';
import { ProductModule } from './resources/product/product.module';
import { CategoryModule } from './resources/category/category.module';
import { OrderModule } from './resources/order/order.module';
import { CreateProductModule } from './resources/integrations/create-product/create-product.module';
import { DeleteCategoryModule } from './resources/integrations/delete-category/delete-category.module';
import { UpdateProductModule } from './resources/integrations/update-product/.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
    BcryptModule,
    OrderModule,
    ProductModule,
    CategoryModule,
    CreateProductModule,
    DeleteCategoryModule,
    UpdateProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
