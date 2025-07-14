import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from 'prisma/generated';

import { PrismaService } from '@/infra/prisma/prisma.service';

import { HashService } from '@/shared/services/hash.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly hashService: HashService,
  ) {}

  async create(dto: CreateUserDto) {
    const userData: Prisma.UserCreateInput = {
      ...dto,
      password: await this.hashPassword(dto.password),
    };

    return this.prismaService.user.create({ data: userData });
  }

  async findAll() {
    return this.prismaService.user.findMany();
  }

  async findOneById(id: string) {
    const user = await this.prismaService.user.findUnique({ where: { id } });

    if (!user) throw new NotFoundException('User not found!');

    return user;
  }

  async findOneByEmail(email: string) {
    return this.prismaService.user.findUnique({ where: { email } });
  }

  async update(id: string, dto: UpdateUserDto) {
    await this.findOneById(id);

    const userData: Prisma.UserUpdateInput = {
      ...dto,
    };

    return await this.prismaService.user.update({
      where: { id },
      data: userData,
    });
  }

  async remove(id: string) {
    await this.findOneById(id);
    return this.prismaService.user.delete({ where: { id } });
  }

  private async hashPassword(password: string) {
    return this.hashService.hash(password);
  }
}
