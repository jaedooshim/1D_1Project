import { IsNotEmpty, IsNumber, IsOptional, IsString, Length, MaxLength, MinLength, minLength } from 'class-validator';

export class PublishCreateDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(10)
  @MinLength(1)
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
