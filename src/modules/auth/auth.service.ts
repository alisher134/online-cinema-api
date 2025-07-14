import { BadRequestException, Injectable } from '@nestjs/common';

import { EnvService } from '@/infra/env/env.service';

import { HashService } from '@/shared/services/hash.service';
import { TokenService } from '@/shared/services/token.service';

import { UserService } from '../user/user.service';

import { AuthJwtPayload } from './auth.types';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly hashService: HashService,
    private readonly tokenService: TokenService,
    private readonly envService: EnvService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto);
    return this.generateTokens(user.id);
  }

  async register(dto: RegisterDto) {
    const isExists = await this.userService.findOneByEmail(dto.email);
    if (isExists) throw new BadRequestException('User with this email is already in use!');

    const user = await this.userService.create(dto);

    return this.generateTokens(user.id);
  }

  async refresh(refreshToken: string) {
    const jwtRefreshSecret = this.envService.jwtRefreshSecret();
    const payload = await this.tokenService.verify<AuthJwtPayload>(refreshToken, {
      secret: jwtRefreshSecret,
    });

    const user = await this.userService.findOneById(payload.id);

    const accessToken = await this.generateAccessToken({ id: user.id });

    return { accessToken };
  }

  private async validateUser(dto: LoginDto) {
    const user = await this.userService.findOneByEmail(dto.email);
    if (!user) throw new BadRequestException('Invalid email or password!');

    const isValidPassword = await this.hashService.comparePassword(user.password, dto.password);
    if (!isValidPassword) throw new BadRequestException('Invalid email or password!');

    return user;
  }

  private async generateTokens(id: string) {
    const payload = { id };

    const [accessToken, refreshToken] = await Promise.all([
      this.generateAccessToken(payload),
      this.generateRefreshToken(payload),
    ]);

    return { accessToken, refreshToken };
  }

  private async generateAccessToken(payload: AuthJwtPayload) {
    const jwtAccessSecret = this.envService.jwtAccessSecret();
    return this.tokenService.generateToken(payload, { expiresIn: '5m', secret: jwtAccessSecret });
  }

  private async generateRefreshToken(payload: AuthJwtPayload) {
    const jwtRefreshSecret = this.envService.jwtRefreshSecret();
    return this.tokenService.generateToken(payload, { expiresIn: '7d', secret: jwtRefreshSecret });
  }
}
