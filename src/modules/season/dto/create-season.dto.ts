import { IsNumber, IsString } from 'class-validator';

export class CreateSeasonDto {
  @IsNumber()
  number: number;

  @IsString()
  movieId: string;
}
