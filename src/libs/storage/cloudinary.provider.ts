import { Provider } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

import { EnvService } from '@/infra/env/env.service';

export const CloudinaryProvider: Provider = {
  provide: 'CLOUDINARY',
  inject: [EnvService],
  useFactory: (envService: EnvService) => {
    cloudinary.config({
      cloud_name: envService.cloudinaryName(),
      api_key: envService.cloudinaryApiKey(),
      api_secret: envService.cloudinaryApiSecret(),
    });

    return cloudinary;
  },
};
