import { IsNotEmpty, IsNumber } from 'class-validator';

export class CommentFindUniqueParamDto {
  @IsNotEmpty()
  @IsNumber()
  publishId: number;

  @IsNotEmpty()
  @IsNumber()
  commentId: number;
}
