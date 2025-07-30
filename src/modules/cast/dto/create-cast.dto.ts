import { IsString } from 'class-validator';

export class CreateCastDto {
  @IsString()
  character: string;

  @IsString()
  actorId: string;

  @IsString()
  movieId: string;
}
