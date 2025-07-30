import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';

import { Auth } from '@/common/decorators';

import { CreateEpisodeDto } from './dto/create-episode.dto';
import { UpdateEpisodeDto } from './dto/update-episode.dto';
import { EpisodeService } from './episode.service';

@Controller('episode')
export class EpisodeController {
  constructor(private readonly episodeService: EpisodeService) {}

  @Auth('ADMIN', 'MODERATOR')
  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() dto: CreateEpisodeDto) {
    return this.episodeService.create(dto);
  }

  @Auth('ADMIN', 'MODERATOR')
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateEpisodeDto) {
    return this.episodeService.update(id, dto);
  }

  @Auth('ADMIN', 'MODERATOR')
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.episodeService.remove(id);
  }
}
