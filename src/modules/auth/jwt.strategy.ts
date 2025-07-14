import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { EnvService } from '@/infra/env/env.service';

import { UserService } from '../user/user.service';

import { AuthJwtPayload } from './auth.types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    private readonly envService: EnvService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: envService.isDev(),
      secretOrKey: envService.jwtAccessSecret(),
    });
  }

  async validate(payload: AuthJwtPayload) {
    return this.userService.findOneById(payload.id);
  }
}
