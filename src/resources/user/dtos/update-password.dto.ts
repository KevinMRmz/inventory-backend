import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdatePasswordDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  @MaxLength(50)
  password: string;

  @IsString()
  @IsNotEmpty()
  confirmPassword: string;
}
