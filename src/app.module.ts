import { Module } from '@nestjs/common';

import { InfraModule } from './infra/infra.module';
import { StorageModule } from './libs/storage/storage.module';
import { ModulesModule } from './modules/modules.module';

@Module({
  imports: [InfraModule, ModulesModule, StorageModule],
})
export class AppModule {}
