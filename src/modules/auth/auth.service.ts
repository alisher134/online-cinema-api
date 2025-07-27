import { BadRequestException, Injectable } from '@nestjs/common';

import { HashService } from '@/shared/services/hash.service';

import { UserService } from '../user/user.service';

import { AuthTokenService } from './auth-token.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly hashService: HashService,
    private readonly authTokenService: AuthTokenService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto);
    return this.authResponse(user.id);
  }

  async register(dto: RegisterDto) {
    const isExists = await this.userService.findOneByEmail(dto.email);
    if (isExists) throw new BadRequestException('User with this email is already in use!');

    const user = await this.userService.create(dto);

    return this.authResponse(user.id);
  }

  async refresh(refreshToken: string) {
    const payload = await this.authTokenService.validateRefreshToken(refreshToken);

    const user = await this.userService.findOneById(payload.id);

    const accessToken = await this.authTokenService.generateAccessToken({ id: user.id });

    return { accessToken };
  }

  async getMe(id: string) {
    return this.userService.findOneById(id);
  }

  async authResponse(userId: string) {
    return this.authTokenService.generateTokens(userId);
  }

  private async validateUser(dto: LoginDto) {
    const user = await this.userService.findOneByEmail(dto.email);
    if (!user) throw new BadRequestException('Invalid email or password!');

    const isValidPassword = await this.hashService.comparePassword(user.password, dto.password);
    if (!isValidPassword) throw new BadRequestException('Invalid email or password!');

    return user;
  }
}
