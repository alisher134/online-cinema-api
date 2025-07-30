/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Inject, Injectable } from '@nestjs/common';
import { v2 as Cloudinary, UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';

import { StorageDto } from './dto/storage.dto';

@Injectable()
export class StorageService {
  constructor(@Inject('CLOUDINARY') private cloudinary: typeof Cloudinary) {}

  async upload(
    file: Express.Multer.File,
    dto: StorageDto,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      this.cloudinary.uploader
        .upload_stream(
          {
            folder: dto.folder,
            resource_type: dto.resource,
          },
          (error, result) => {
            if (error) {
              return reject(new Error(error.message));
            }

            if (!result) {
              return reject(new Error('Cloudinary returned empty result'));
            }

            resolve(result);
          },
        )
        .end(file.buffer);
    });
  }

  async delete(publicId: string) {
    return this.cloudinary.uploader.destroy(publicId);
  }
}
