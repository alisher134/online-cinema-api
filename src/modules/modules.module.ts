import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { GenreModule } from './genre/genre.module';
import { UserModule } from './user/user.module';
import { ActorModule } from './actor/actor.module';
import { CategoryModule } from './category/category.module';
import { MovieModule } from './movie/movie.module';
import { CastModule } from './cast/cast.module';
import { SeasonModule } from './season/season.module';
import { EpisodeModule } from './episode/episode.module';

@Module({
  imports: [UserModule, AuthModule, GenreModule, ActorModule, CategoryModule, MovieModule, CastModule, SeasonModule, EpisodeModule],
})
export class ModulesModule {}
