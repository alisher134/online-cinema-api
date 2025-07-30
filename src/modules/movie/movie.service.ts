import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '@/infra/prisma/prisma.service';

import { buildFilter } from '@/shared/helpers/build-filter';
import { buildPaginationMeta } from '@/shared/helpers/build-pagination-meta';
import { buildQueryOptions } from '@/shared/helpers/query-builder';

import { slugify } from '@/common/utils';

import { CreateMovieDto } from './dto/create-movie.dto';
import { ParamsMovieDto } from './dto/params-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MOVIE_MESSAGES } from './movie.constants';

@Injectable()
export class MovieService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateMovieDto) {
    const movieData: Prisma.MovieCreateInput = {
      slug: slugify(dto.title),
      ...dto,
      category: {
        connect: {
          id: dto.categoryId,
        },
      },
      genres: {
        connect: dto.genreIds.map((genreId) => ({ id: genreId })),
      },
    };

    return this.prismaService.movie.create({
      data: movieData,
    });
  }

  async findAll(dto: ParamsMovieDto) {
    const { sortBy, page, skip, perPage } = buildQueryOptions(dto);
    const { where } = buildFilter(dto);

    const [movies, totalRecords] = await Promise.all([
      this.prismaService.movie.findMany({
        where,
        orderBy: sortBy,
        skip,
        take: perPage,
        include: { category: true, genres: true },
      }),
      this.prismaService.movie.count({ where }),
    ]);

    return {
      data: movies,
      pagination: buildPaginationMeta({ page, perPage, totalRecords }),
    };
  }

  async findOneById(id: string) {
    const movie = await this.prismaService.movie.findUnique({ where: { id } });
    if (!movie) throw new NotFoundException(MOVIE_MESSAGES.NOT_FOUND);

    return movie;
  }

  async findOneBySlug(slug: string) {
    const movie = await this.prismaService.movie.findUnique({
      where: { slug },
      include: { casts: true, category: true, genres: true, seasons: true },
    });
    if (!movie) throw new NotFoundException(MOVIE_MESSAGES.NOT_FOUND);

    return movie;
  }

  async update(id: string, dto: UpdateMovieDto) {
    const movieData: Prisma.MovieUpdateInput = {
      slug: slugify(dto.title),
      ...dto,
      category: {
        update: {
          id: dto.categoryId,
        },
      },
      genres: {
        set: dto.genreIds.map((genreId) => ({ id: genreId })),
      },
    };

    return this.prismaService.movie.update({
      where: { id },
      data: movieData,
    });
  }

  async remove(id: string) {
    return this.prismaService.movie.delete({ where: { id } });
  }
}
