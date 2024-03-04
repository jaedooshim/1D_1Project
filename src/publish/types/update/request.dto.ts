import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PublishUpdateDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  memberId: string;
}

export class PublishParamDto {
  @IsNotEmpty()
  @IsNumber()
  publishId: number;
}
