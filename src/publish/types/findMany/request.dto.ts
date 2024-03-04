import { IsNotEmpty, IsNumber } from 'class-validator';

export class PublishFindManyDto {
  @IsNotEmpty()
  @IsNumber()
  take: number;

  @IsNotEmpty()
  @IsNumber()
  page: number;
}
