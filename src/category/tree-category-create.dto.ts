import { IsString, IsOptional } from 'class-validator';

export class TreeCategoryCreateDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  parent_id: string | null;
}
