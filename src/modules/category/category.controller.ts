import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { Auth } from '@/common/decorators';

import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ParamsCategoryDto } from './dto/params-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  findAll(@Body() dto: ParamsCategoryDto) {
    return this.categoryService.findAll(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Get('by-slug/:slug')
  findOneBySlug(@Param('slug') slug: string) {
    return this.categoryService.findOneBySlug(slug);
  }

  // private

  @Auth('ADMIN', 'MODERATOR')
  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() dto: CreateCategoryDto) {
    return this.categoryService.create(dto);
  }

  @Auth('ADMIN', 'MODERATOR')
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.categoryService.findOneById(id);
  }

  @Auth('ADMIN', 'MODERATOR')
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    return this.categoryService.update(id, dto);
  }

  @Auth('ADMIN', 'MODERATOR')
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
