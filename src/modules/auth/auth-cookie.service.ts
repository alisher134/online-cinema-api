import { Injectable } from '@nestjs/common';
import { Response } from 'express';

import { EnvService } from '@/infra/env/env.service';

@Injectable()
export class AuthCookieService {
  constructor(private readonly envService: EnvService) {}

  saveToken(res: Response, cookieName: string, token: string) {
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    this.cookieOptions(res, cookieName, token, expires);
  }

  removeToken(res: Response, cookieName: string) {
    const expires = new Date(0);

    this.cookieOptions(res, cookieName, '', expires);
  }

  private cookieOptions(res: Response, cookieName: string, token: string, expires: Date) {
    const domain = this.envService.domain();

    res.cookie(cookieName, token, {
      httpOnly: true,
      secure: true,
      expires,
      sameSite: 'lax',
      domain,
    });
  }
}
