import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '@/infra/prisma/prisma.service';

import { buildFilter } from '@/shared/helpers/build-filter';
import { buildPaginationMeta } from '@/shared/helpers/build-pagination-meta';
import { buildQueryOptions } from '@/shared/helpers/query-builder';

import { slugify } from '@/common/utils';

import { CreateGenreDto } from './dto/create-genre.dto';
import { ParamsGenreDto } from './dto/params-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { GENRE_MESSAGES } from './genre.constants';

@Injectable()
export class GenreService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateGenreDto) {
    const genreData: Prisma.GenreCreateInput = {
      title: dto.title,
      slug: slugify(dto.title),
    };

    return this.prismaService.genre.create({
      data: genreData,
    });
  }

  async findAll(dto: ParamsGenreDto) {
    const { sortBy, page, skip, perPage } = buildQueryOptions(dto);
    const { where } = buildFilter(dto);

    const [genres, totalRecords] = await Promise.all([
      this.prismaService.genre.findMany({
        where,
        orderBy: sortBy,
        skip,
        take: perPage,
      }),
      this.prismaService.genre.count({ where }),
    ]);

    return {
      data: genres,
      pagination: buildPaginationMeta({ page, perPage, totalRecords }),
    };
  }

  async findOneById(id: string) {
    const genre = await this.prismaService.genre.findUnique({ where: { id } });
    if (!genre) throw new NotFoundException(GENRE_MESSAGES.NOT_FOUND);

    return genre;
  }

  async findOneBySlug(slug: string) {
    const genre = await this.prismaService.genre.findUnique({ where: { slug } });
    if (!genre) throw new NotFoundException(GENRE_MESSAGES.NOT_FOUND);

    return genre;
  }

  async update(id: string, dto: UpdateGenreDto) {
    await this.findOneById(id);

    const genreData: Prisma.GenreUpdateInput = {
      title: dto.title,
      slug: slugify(dto.title),
    };

    return this.prismaService.genre.update({
      where: { id },
      data: genreData,
    });
  }

  async remove(id: string) {
    await this.findOneById(id);

    return this.prismaService.genre.delete({ where: { id } });
  }
}
