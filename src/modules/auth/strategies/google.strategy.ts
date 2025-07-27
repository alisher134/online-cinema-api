import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

import { EnvService } from '@/infra/env/env.service';

import { GoogleProfile, SocialUserProfile } from '../auth.types';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly envService: EnvService) {
    super({
      clientID: envService.googleClientId(),
      clientSecret: envService.googleClientSecret(),
      callbackURL: envService.googleCallbackUrl(),
      scope: ['email', 'profile'],
    });
  }

  validate(
    accessToken: string,
    refreshToken: string,
    profile: GoogleProfile,
    done: VerifyCallback,
  ) {
    const { name, emails, photos } = profile;

    const user: SocialUserProfile = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      avatarPath: photos[0].value,
      accessToken,
      refreshToken,
    };

    done(null, user);
  }
}
