import { IsNotEmpty, IsNumber } from 'class-validator';

export class TagFindManyDto {
  @IsNotEmpty()
  @IsNumber()
  take: number;

  @IsNotEmpty()
  @IsNumber()
  page: number;
}
