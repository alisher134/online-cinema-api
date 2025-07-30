import { IsDate, IsString } from 'class-validator';

export class CreateActorDto {
  @IsString()
  name: string;

  @IsString()
  bio: string;

  @IsString()
  photoUrl: string;

  @IsDate()
  birthDate: Date;

  @IsString()
  country: string;
}
