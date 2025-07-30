import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { GenreModule } from './genre/genre.module';
import { UserModule } from './user/user.module';
import { ActorModule } from './actor/actor.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [UserModule, AuthModule, GenreModule, ActorModule, CategoryModule],
})
export class ModulesModule {}
