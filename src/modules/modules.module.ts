import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { GenreModule } from './genre/genre.module';

@Module({
  imports: [UserModule, AuthModule, GenreModule],
})
export class ModulesModule {}
