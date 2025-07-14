import { Body, Controller, Delete, Get, Param, Patch, Put } from '@nestjs/common';
import { UserRole } from 'prisma/generated';

import { Auth, CurrentUser } from '@/common/decorators';

import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Auth()
  @Get('profile')
  getProfile(@CurrentUser('id') id: string) {
    return this.userService.findOneById(id);
  }

  @Auth()
  @Put('profile')
  updateProfile(@CurrentUser('id') id: string, @Body() dto: UpdateUserDto) {
    return this.userService.update(id, dto);
  }

  @Auth()
  @Delete('profile')
  deleteProfile(@CurrentUser('id') id: string) {
    return this.userService.delete(id);
  }

  @Auth(UserRole.ADMIN)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Auth('ADMIN')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOneById(id);
  }

  @Auth('ADMIN')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Auth('ADMIN')
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
