import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '@/infra/prisma/prisma.service';

import { CreateSeasonDto } from './dto/create-season.dto';
import { UpdateSeasonDto } from './dto/update-season.dto';

@Injectable()
export class SeasonService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateSeasonDto) {
    const seasonData: Prisma.SeasonCreateInput = {
      number: dto.number,
      movie: { connect: { id: dto.movieId } },
    };

    return this.prismaService.season.create({
      data: seasonData,
    });
  }

  async update(id: string, dto: UpdateSeasonDto) {
    const seasonData: Prisma.SeasonUpdateInput = {
      number: dto.number,
      movie: { connect: { id: dto.movieId } },
    };

    return this.prismaService.season.update({
      where: { id },
      data: seasonData,
    });
  }

  async remove(id: string) {
    return this.prismaService.season.delete({ where: { id } });
  }
}
