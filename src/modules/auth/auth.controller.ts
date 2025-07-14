import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { AuthCookieService } from './auth-cookie.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly authCookieService: AuthCookieService,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(@Res({ passthrough: true }) res: Response, @Body() dto: RegisterDto) {
    const { accessToken, refreshToken } = await this.authService.register(dto);

    this.authCookieService.saveToken(res, 'refreshToken', refreshToken);

    return { accessToken };
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Res({ passthrough: true }) res: Response, @Body() dto: LoginDto) {
    const { accessToken, refreshToken } = await this.authService.login(dto);

    this.authCookieService.saveToken(res, 'refreshToken', refreshToken);

    return { accessToken };
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refresh(@Res({ passthrough: true }) res: Response, @Req() req: Request) {
    const refreshTokenFromCookie = req.cookies['refreshToken'] as string;
    if (!refreshTokenFromCookie) throw new UnauthorizedException('Refresh token not be provided');

    const { accessToken } = await this.authService.refresh(refreshTokenFromCookie);

    this.authCookieService.saveToken(res, 'refreshToken', refreshTokenFromCookie);

    return { accessToken };
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    this.authCookieService.removeToken(res, 'refreshToken');

    return true;
  }
}
