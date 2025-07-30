import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '@/infra/prisma/prisma.service';

import { CreateEpisodeDto } from './dto/create-episode.dto';
import { UpdateEpisodeDto } from './dto/update-episode.dto';

@Injectable()
export class EpisodeService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateEpisodeDto) {
    const episodeData: Prisma.EpisodeCreateInput = {
      number: dto.number,
      title: dto.title,
      duration: dto.duration,
      releaseDate: dto.releaseDate,
      videoUrl: dto.videoUrl,
      season: { connect: { id: dto.seasonId } },
    };

    return this.prismaService.episode.create({
      data: episodeData,
    });
  }

  async update(id: string, dto: UpdateEpisodeDto) {
    const episodeData: Prisma.EpisodeUpdateInput = {
      number: dto.number,
      title: dto.title,
      duration: dto.duration,
      releaseDate: dto.releaseDate,
      videoUrl: dto.videoUrl,
      season: { connect: { id: dto.seasonId } },
    };

    return this.prismaService.episode.update({
      where: { id },
      data: episodeData,
    });
  }

  async remove(id: string) {
    return this.prismaService.episode.delete({ where: { id } });
  }
}
