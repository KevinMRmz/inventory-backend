import { Role } from '@user/types/user.types';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsIn,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  @MaxLength(50)
  password: string;

  @IsString()
  @IsNotEmpty()
  confirmPassword: string;

  @IsNotEmpty()
  @IsIn(['ADMIN', 'USER'])
  role: Role;
}
