import { Module } from '@nestjs/common';

import { InfraModule } from './infra/infra.module';
import { ModulesModule } from './modules/modules.module';
import { StorageModule } from './libs/storage/storage.module';

@Module({
  imports: [InfraModule, ModulesModule, StorageModule],
})
export class AppModule {}
