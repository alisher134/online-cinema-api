import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { HashService } from '@/shared/services/hash.service';
import { TokenService } from '@/shared/services/token.service';

import { UserModule } from '../user/user.module';

import { AuthCookieService } from './auth-cookie.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [UserModule, JwtModule],
  controllers: [AuthController],
  providers: [AuthService, HashService, TokenService, AuthCookieService, JwtStrategy],
})
export class AuthModule {}
