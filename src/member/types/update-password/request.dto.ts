import { IsNotEmpty, IsString } from 'class-validator';

export class PasswordUpdateDto {
  @IsNotEmpty()
  @IsString()
  oldPassword: string;

  @IsNotEmpty()
  @IsString()
  newPassword: string;
}

export class PasswordDto {
  password: string;
}
