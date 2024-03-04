import { ICommentUpdate } from './request.interface';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CommentUpdateDto implements ICommentUpdate {
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

export class CommentParamDto {
  @IsNotEmpty()
  @IsNumber()
  commentId: number;

  @IsNotEmpty()
  @IsNumber()
  publishId: number;
}
