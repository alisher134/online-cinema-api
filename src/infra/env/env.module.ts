import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { envSchema } from './env.schema';
import { EnvService } from './env.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, cache: true, validationSchema: envSchema })],
  providers: [EnvService],
})
export class EnvModule {}
