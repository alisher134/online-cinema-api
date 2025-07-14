import { BadRequestException, Injectable } from '@nestjs/common';

import { HashService } from '@/shared/services/hash.service';

import { UserService } from '../user/user.service';

import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class AuthPasswordService {
  constructor(
    private readonly userService: UserService,
    private readonly hashService: HashService,
  ) {}

  async changePassword(userId: string, dto: ChangePasswordDto) {
    const user = await this.userService.findOneById(userId);

    const isValidPassword = await this.hashService.comparePassword(user.password, dto.oldPassword);
    if (!isValidPassword) throw new BadRequestException('Wrong old password!');

    const hashed = await this.hashService.hash(dto.newPassword);

    return this.userService.update(userId, { password: hashed });
  }
}
