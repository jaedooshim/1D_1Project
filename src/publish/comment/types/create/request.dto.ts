import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CommentCreateDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  memberId: string;

  @IsNotEmpty()
  @IsNumber()
  publishId: number;
}
