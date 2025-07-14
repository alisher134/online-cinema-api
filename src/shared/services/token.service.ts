import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken<T extends object>(payload: T, options: JwtSignOptions = {}) {
    return this.jwtService.signAsync(payload, options);
  }

  async verify<T extends object>(token: string, options: JwtVerifyOptions = {}): Promise<T> {
    return this.jwtService.verifyAsync(token, options);
  }
}
