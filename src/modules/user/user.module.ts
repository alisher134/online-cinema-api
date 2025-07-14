import { Module } from '@nestjs/common';

import { HashService } from '@/shared/services/hash.service';

import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, HashService],
  exports: [UserService],
})
export class UserModule {}
