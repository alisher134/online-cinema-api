import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';

import { Auth } from '@/common/decorators';

import { CastService } from './cast.service';
import { CreateCastDto } from './dto/create-cast.dto';
import { UpdateCastDto } from './dto/update-cast.dto';

@Controller('cast')
export class CastController {
  constructor(private readonly castService: CastService) {}

  @Auth('ADMIN', 'MODERATOR')
  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() dto: CreateCastDto) {
    return this.castService.create(dto);
  }

  @Auth('ADMIN', 'MODERATOR')
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCastDto) {
    return this.castService.update(id, dto);
  }

  @Auth('ADMIN', 'MODERATOR')
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.castService.remove(id);
  }
}
