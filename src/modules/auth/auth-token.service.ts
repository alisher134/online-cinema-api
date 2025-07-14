import { Injectable } from '@nestjs/common';

import { EnvService } from '@/infra/env/env.service';

import { TokenService } from '@/shared/services/token.service';

import { AuthJwtPayload } from './auth.types';

@Injectable()
export class AuthTokenService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly envService: EnvService,
  ) {}

  async validateRefreshToken(refreshToken: string) {
    const jwtRefreshSecret = this.envService.jwtRefreshSecret();
    const payload = await this.tokenService.verify<AuthJwtPayload>(refreshToken, {
      secret: jwtRefreshSecret,
    });

    return payload;
  }

  async generateTokens(id: string) {
    const payload = { id };

    const [accessToken, refreshToken] = await Promise.all([
      this.generateAccessToken(payload),
      this.generateRefreshToken(payload),
    ]);

    return { accessToken, refreshToken };
  }

  async generateAccessToken(payload: AuthJwtPayload) {
    const jwtAccessSecret = this.envService.jwtAccessSecret();
    return this.tokenService.generateToken(payload, { expiresIn: '5m', secret: jwtAccessSecret });
  }

  async generateRefreshToken(payload: AuthJwtPayload) {
    const jwtRefreshSecret = this.envService.jwtRefreshSecret();
    return this.tokenService.generateToken(payload, { expiresIn: '7d', secret: jwtRefreshSecret });
  }
}
