import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { GenreModule } from './genre/genre.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, AuthModule, GenreModule],
})
export class ModulesModule {}
