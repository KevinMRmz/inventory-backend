import { Module } from '@nestjs/common';
import { OrderService } from './services/order.service';
import { OrderController } from './controllers/order.controller';
import { PrismaModule } from '../../common/modules/prisma/prisma.module';

@Module({
  providers: [OrderService],
  controllers: [OrderController],
  imports: [PrismaModule],
})
export class OrderModule {}
