import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { PrismaModule } from '@common/modules/prisma/prisma.module';
import { BcryptModule } from '@common/modules/bcrypt/bcrypt.module';

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [PrismaModule, BcryptModule],
})
export class UserModule {}
