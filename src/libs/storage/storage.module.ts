import { Module } from '@nestjs/common';

import { CloudinaryProvider } from './cloudinary.provider';
import { StorageController } from './storage.controller';
import { StorageService } from './storage.service';

@Module({
  controllers: [StorageController],
  providers: [CloudinaryProvider, StorageService],
  exports: [StorageService],
})
export class StorageModule {}
