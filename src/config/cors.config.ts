import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ConfigService } from '@nestjs/config';

export const corsConfig = (configService: ConfigService): CorsOptions => {
  return {
    origin: configService.getOrThrow<string>('ALLOWED_ORIGIN'),
    credentials: true,
  };
};
