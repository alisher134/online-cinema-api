import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '@/infra/prisma/prisma.service';

import { CreateCastDto } from './dto/create-cast.dto';
import { UpdateCastDto } from './dto/update-cast.dto';

@Injectable()
export class CastService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateCastDto) {
    const castData: Prisma.CastCreateInput = {
      character: dto.character,
      actor: { connect: { id: dto.actorId } },
      movie: { connect: { id: dto.movieId } },
    };

    return this.prismaService.cast.create({
      data: castData,
    });
  }

  async update(id: string, dto: UpdateCastDto) {
    const castData: Prisma.CastUpdateInput = {
      character: dto.character,
      actor: { connect: { id: dto.actorId } },
      movie: { connect: { id: dto.movieId } },
    };

    return this.prismaService.cast.update({
      where: { id },
      data: castData,
    });
  }

  async remove(id: string) {
    return this.prismaService.cast.delete({ where: { id } });
  }
}
