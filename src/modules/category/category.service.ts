import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '@/infra/prisma/prisma.service';

import { buildFilter } from '@/shared/helpers/build-filter';
import { buildPaginationMeta } from '@/shared/helpers/build-pagination-meta';
import { buildQueryOptions } from '@/shared/helpers/query-builder';

import { slugify } from '@/common/utils';

import { CATEGORY_MESSAGES } from './category.constants';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ParamsCategoryDto } from './dto/params-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateCategoryDto) {
    const categoryData: Prisma.CategoryCreateInput = {
      title: dto.title,
      slug: slugify(dto.title),
    };

    return this.prismaService.category.create({
      data: categoryData,
    });
  }

  async findAll(dto: ParamsCategoryDto) {
    const { sortBy, page, skip, perPage } = buildQueryOptions(dto);
    const { where } = buildFilter(dto);

    const [categories, totalRecords] = await Promise.all([
      this.prismaService.category.findMany({
        where,
        orderBy: sortBy,
        skip,
        take: perPage,
      }),
      this.prismaService.category.count({ where }),
    ]);

    return {
      data: categories,
      pagination: buildPaginationMeta({ page, perPage, totalRecords }),
    };
  }

  async findOneById(id: string) {
    const category = await this.prismaService.category.findUnique({ where: { id } });
    if (!category) throw new NotFoundException(CATEGORY_MESSAGES.NOT_FOUND);

    return category;
  }

  async findOneBySlug(slug: string) {
    const category = await this.prismaService.category.findUnique({ where: { slug } });
    if (!category) throw new NotFoundException(CATEGORY_MESSAGES.NOT_FOUND);

    return category;
  }

  async update(id: string, dto: UpdateCategoryDto) {
    await this.findOneById(id);

    const categoryData: Prisma.CategoryUpdateInput = {
      title: dto.title,
      slug: slugify(dto.title),
    };

    return this.prismaService.category.update({
      where: { id },
      data: categoryData,
    });
  }

  async remove(id: string) {
    await this.findOneById(id);

    return this.prismaService.category.delete({ where: { id } });
  }
}
