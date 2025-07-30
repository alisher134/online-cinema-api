import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '@/infra/prisma/prisma.service';

import { buildPaginationMeta } from '@/shared/helpers/build-pagination-meta';
import { buildQueryOptions } from '@/shared/helpers/query-builder';

import { slugify } from '@/common/utils';

import { ACTOR_MESSAGES } from './actor.constants';
import { CreateActorDto } from './dto/create-actor.dto';
import { ParamsActorDto } from './dto/params-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';

@Injectable()
export class ActorService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateActorDto) {
    const actorData: Prisma.ActorCreateInput = {
      slug: slugify(dto.name),
      ...dto,
    };

    return this.prismaService.actor.create({
      data: actorData,
    });
  }

  async findAll(dto: ParamsActorDto) {
    const { where, sortBy, page, skip, perPage } = buildQueryOptions({
      ...dto,
      searchFields: ['name'],
    });

    const [actors, totalRecords] = await Promise.all([
      this.prismaService.actor.findMany({
        where,
        orderBy: sortBy,
        skip,
        take: perPage,
      }),
      this.prismaService.actor.count({ where }),
    ]);

    return {
      data: actors,
      pagination: buildPaginationMeta({ page, perPage, totalRecords }),
    };
  }

  async findOneById(id: string) {
    const actor = await this.prismaService.actor.findUnique({ where: { id } });
    if (!actor) throw new NotFoundException(ACTOR_MESSAGES.NOT_FOUND);

    return actor;
  }

  async findOneBySlug(slug: string) {
    const actor = await this.prismaService.actor.findUnique({ where: { slug } });
    if (!actor) throw new NotFoundException(ACTOR_MESSAGES.NOT_FOUND);

    return actor;
  }

  async update(id: string, dto: UpdateActorDto) {
    await this.findOneById(id);

    const actorData: Prisma.ActorUpdateInput = {
      slug: slugify(dto.name),
      ...dto,
    };

    return this.prismaService.actor.update({
      where: { id },
      data: actorData,
    });
  }

  async remove(id: string) {
    await this.findOneById(id);

    return this.prismaService.actor.delete({ where: { id } });
  }
}
