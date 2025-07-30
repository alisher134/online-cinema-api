import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { StorageDto } from './dto/storage.dto';
import { StorageService } from './storage.service';

@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile('file') file: Express.Multer.File, @Query() dto: StorageDto) {
    return this.storageService.upload(file, dto);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':publicId')
  delete(@Param('publicId') publicId: string) {
    return this.storageService.delete(publicId);
  }
}
