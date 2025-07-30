import { IsIn, IsString } from 'class-validator';

export class StorageDto {
  @IsString()
  folder: string;

  @IsIn(['auto', 'image', 'raw', 'video'])
  resource: 'auto' | 'image' | 'raw' | 'video';
}
