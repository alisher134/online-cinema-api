import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { EnvService } from '@/infra/env/env.service';

import { Auth, CurrentUser } from '@/common/decorators';
import { GoogleAuthGuard } from '@/common/guards/google-auth.guard';

import { UserService } from '../user/user.service';

import { AuthCookieService } from './auth-cookie.service';
import { AuthPasswordService } from './auth-password.service';
import { AuthService } from './auth.service';
import { SocialUserProfile } from './auth.types';
import { ChangePasswordDto } from './dto/change-password.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly authCookieService: AuthCookieService,
    private readonly authPasswordService: AuthPasswordService,
    private readonly envService: EnvService,
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
  @Get('google')
  @UseGuards(GoogleAuthGuard)
  googleAuth() {}

  @HttpCode(HttpStatus.OK)
  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleAuthCallback(
    @Req() req: { user: SocialUserProfile },
    @Res({ passthrough: true }) res: Response,
  ) {
    if (!req.user) {
      throw new BadRequestException('User not found by social media');
    }

    const user = await this.userService.findOrCreateSocialUser(req.user);

    const { accessToken, refreshToken } = await this.authService.authResponse(user.id);
    this.authCookieService.saveToken(res, 'refreshToken', refreshToken);

    const clientUrl = this.envService.clientOrl();
    const redirectUrl = `${clientUrl}/auth/by-social?accessToken=${accessToken}`;

    return res.redirect(redirectUrl);
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
