import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { NodeEnv } from '@/shared/types/env.types';

@Injectable()
export class EnvService {
  constructor(private readonly configService: ConfigService) {}

  port() {
    return this.configService.get<number>('PORT', 8080);
  }

  appPrefix() {
    return this.configService.get<string>('APP_PREFIX', 'api/v1');
  }

  allowedOrigin() {
    return this.configService.get<string>('ALLOWED_ORIGIN', 'http://localhost:5173');
  }

  isProd() {
    return this.nodeEnv() === 'production';
  }

  nodeEnv() {
    return this.configService.get<NodeEnv>('NODE_ENV', 'development');
  }
}
