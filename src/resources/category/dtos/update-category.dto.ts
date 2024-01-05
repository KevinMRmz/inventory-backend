import { IsString, IsOptional, MaxLength, MinLength } from 'class-validator';

export class UpdateCategoryDto {
  @IsString()
  @IsOptional()
  @MaxLength(50)
  @MinLength(3)
  categoryName?: string;
}
