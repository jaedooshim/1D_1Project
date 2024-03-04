import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class TagCreateDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  name: string;
}
