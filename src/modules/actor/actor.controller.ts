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
  Query,
} from '@nestjs/common';

import { Auth } from '@/common/decorators';

import { ActorService } from './actor.service';
import { CreateActorDto } from './dto/create-actor.dto';
import { ParamsActorDto } from './dto/params-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';

@Controller('actors')
export class ActorController {
  constructor(private readonly actorService: ActorService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll(@Query() dto: ParamsActorDto) {
    return this.actorService.findAll(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Get('by-slug/:slug')
  findOneBySlug(@Param('slug') slug: string) {
    return this.actorService.findOneBySlug(slug);
  }

  // private

  @Auth('ADMIN', 'MODERATOR')
  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() dto: CreateActorDto) {
    return this.actorService.create(dto);
  }

  @Auth('ADMIN', 'MODERATOR')
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.actorService.findOneById(id);
  }

  @Auth('ADMIN', 'MODERATOR')
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateActorDto) {
    return this.actorService.update(id, dto);
  }

  @Auth('ADMIN', 'MODERATOR')
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.actorService.remove(id);
  }
}
