import { Module } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module';
import { EnvModule } from './env/env.module';

@Module({
  imports: [PrismaModule, EnvModule],
})
export class InfraModule {}
