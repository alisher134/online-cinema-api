import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { Auth, CurrentUser } from '@/common/decorators';

import { AuthCookieService } from './auth-cookie.service';
import { AuthPasswordService } from './auth-password.service';
import { AuthService } from './auth.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly authCookieService: AuthCookieService,
    private readonly authPasswordService: AuthPasswordService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get('me')
  @Auth()
  async getMe(@CurrentUser('id') id: string) {
    return this.authService.getMe(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(@Res({ passthrough: true }) res: Response, @Body() dto: RegisterDto) {
    const { refreshToken, ...rest } = await this.authService.register(dto);

    this.authCookieService.saveToken(res, 'refreshToken', refreshToken);

    return { ...rest };
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Res({ passthrough: true }) res: Response, @Body() dto: LoginDto) {
    const { refreshToken, ...rest } = await this.authService.login(dto);

    this.authCookieService.saveToken(res, 'refreshToken', refreshToken);

    return { ...rest };
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

  @Auth()
  @HttpCode(HttpStatus.OK)
  @Post('change-password')
  changePassword(@CurrentUser('id') id: string, @Body() dto: ChangePasswordDto) {
    return this.authPasswordService.changePassword(id, dto);
  }
}
