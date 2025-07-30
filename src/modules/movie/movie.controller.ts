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

import { CreateMovieDto } from './dto/create-movie.dto';
import { ParamsMovieDto } from './dto/params-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieService } from './movie.service';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  findAll(@Body() dto: ParamsMovieDto) {
    return this.movieService.findAll(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Get('by-slug/:slug')
  findOneBySlug(@Param('slug') slug: string) {
    return this.movieService.findOneBySlug(slug);
  }

  // private

  @Auth('ADMIN', 'MODERATOR')
  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() dto: CreateMovieDto) {
    return this.movieService.create(dto);
  }

  @Auth('ADMIN', 'MODERATOR')
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.movieService.findOneById(id);
  }

  @Auth('ADMIN', 'MODERATOR')
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateMovieDto) {
    return this.movieService.update(id, dto);
  }

  @Auth('ADMIN', 'MODERATOR')
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movieService.remove(id);
  }
}
