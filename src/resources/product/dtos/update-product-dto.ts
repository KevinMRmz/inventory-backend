import {
  IsString,
  IsNotEmpty,
  MaxLength,
  MinLength,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  @MaxLength(50)
  @MinLength(2)
  branch?: string;

  @IsString()
  @IsOptional()
  @MaxLength(80)
  @MinLength(2)
  model?: string;

  @IsString()
  @IsOptional()
  @MaxLength(80)
  @MinLength(2)
  description?: string;

  @IsString()
  @IsOptional()
  @MaxLength(80)
  @MinLength(2)
  serial_no?: string;

  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  @MinLength(3)
  categoryName?: string;
}
