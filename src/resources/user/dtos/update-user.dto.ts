import { Role } from '@user/types/user.types';
import {
  IsString,
  IsEmail,
  IsOptional,
  MinLength,
  MaxLength,
  IsIn,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(50)
  username?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsOptional()
  @IsIn(['ADMIN', 'USER'])
  role?: Role;
}
