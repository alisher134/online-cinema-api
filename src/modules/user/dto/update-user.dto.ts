import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';

import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNumber()
  @IsOptional()
  phoneNumber: number;

  @IsString()
  @IsUrl()
  @IsOptional()
  avatarPath: string;
}
