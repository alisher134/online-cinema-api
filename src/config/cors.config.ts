import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

import { EnvService } from '@/infra/env/env.service';

export const corsConfig = (envService: EnvService): CorsOptions => {
  return {
    origin: envService.allowedOrigin(),
    credentials: true,
  };
};
