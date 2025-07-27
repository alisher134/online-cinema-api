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

  isDev() {
    return this.nodeEnv() === 'development';
  }

  jwtAccessSecret() {
    return this.configService.get<string>('JWT_ACCESS_SECRET') || '';
  }

  jwtRefreshSecret() {
    return this.configService.get<string>('JWT_REFRESH_SECRET') || '';
  }

  domain() {
    return this.configService.get<string>('DOMAIN');
  }

  googleClientId() {
    return this.configService.getOrThrow<string>('GOOGLE_CLIENT_ID');
  }

  googleClientSecret() {
    return this.configService.getOrThrow<string>('GOOGLE_CLIENT_SECRET');
  }

  googleCallbackUrl() {
    return this.configService.getOrThrow<string>('GOOGLE_CALLBACK_URL');
  }

  clientOrl() {
    return this.configService.getOrThrow<string>('CLIENT_ORIGIN');
  }

  private nodeEnv() {
    return this.configService.get<NodeEnv>('NODE_ENV', 'development');
  }
}
