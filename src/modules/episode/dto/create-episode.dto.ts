import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateEpisodeDto {
  @IsNumber()
  number: number;

  @IsString()
  title: string;

  @IsDate()
  releaseDate: Date;

  @IsNumber()
  duration: number;

  @IsString()
  videoUrl: string;

  @IsString()
  seasonId: string;
}
