import { IsString, IsOptional } from 'class-validator';

export class TreeCategoryUpdateDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  parent_id: string | null;
}
