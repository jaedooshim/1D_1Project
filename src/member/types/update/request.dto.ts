import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class MemberUpdateDto {
  @IsOptional()
  @IsString()
  @MaxLength(4)
  @MinLength(2)
  name?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  subAddress?: string;
}

export class MemberParamDto {
  @IsNotEmpty()
  @IsString()
  memberId: string;
}
