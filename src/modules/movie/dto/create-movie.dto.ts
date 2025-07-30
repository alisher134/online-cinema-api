import { IsArray, IsDate, IsNumber, IsString } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsDate()
  releaseDate: Date;

  @IsNumber()
  duration: number;

  @IsNumber()
  rating: number;

  @IsString()
  posterUrl: string;

  @IsString()
  trailerUrl: string;

  @IsString()
  videoUrl: string;

  @IsString()
  categoryId: string;

  @IsArray()
  @IsString({ each: true })
  genreIds: string[];
}
