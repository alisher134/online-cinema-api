import { PartialType } from '@nestjs/mapped-types';
import { UserGender } from '@prisma/client';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @IsNumber()
  @IsOptional()
  age?: string;

  @IsString()
  @IsOptional()
  avatarPath?: string;

  @IsString()
  @IsOptional()
  aboutMe?: string;

  @IsString()
  @IsOptional()
  country?: string;

  @IsEnum(UserGender)
  @IsOptional()
  gender?: UserGender;
}
