import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class TagUpdateDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class TagParamDto {
  @IsNotEmpty()
  @IsNumber()
  tagId: number;
}
