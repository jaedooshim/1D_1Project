import { ForbiddenException, Injectable } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { ICommentCreate } from './types/create/request.interface';
import { ICommentUpdate } from './types/update/request.interface';
import { ICommentDelete } from './types/delete/request.interface';
import { Comment } from '@prisma/client';
import { ICommentFindMany } from './types/findMany/request.interface';

@Injectable()
export class CommentService {
  constructor(private commentRepository: CommentRepository) {}

  async create(data: ICommentCreate): Promise<string> {
    await this.commentRepository.create(data);
    return '댓글이 생성되었습니다.';
  }

  async update(id: number, data: ICommentUpdate, publishId: number): Promise<string> {
    const comment = await this.commentRepository.findUniqueOrThrow(id);
    await this.verifyAccessAuthorityOrThrow(comment.memberId, data.memberId);
    await this.verifyAccessPublishIdOrThrow(comment.publishId, publishId);
    await this.commentRepository.update(id, data);
    return '댓글이 수정되었습니다.';
  }

  async softDelete(id: number, data: ICommentDelete, publishId: number): Promise<string> {
    const comment = await this.commentRepository.findUniqueOrThrow(id);
    await this.verifyAccessAuthorityOrThrow(comment.memberId, data.memberId);
    await this.verifyAccessPublishIdOrThrow(comment.publishId, publishId);
    console.log(comment.publishId);
    console.log(publishId);
    await this.commentRepository.softDelete(id);
    return '댓글이 삭제되었습니다.';
  }

  async findUnique(id: number): Promise<Comment> {
    return await this.commentRepository.findUniqueOrThrow(id);
  }

  async findMany(data: ICommentFindMany) {
    return await this.commentRepository.findFindMany(data);
  }

  async verifyAccessAuthorityOrThrow(commentMemberId: string, memberId: string): Promise<void> {
    if (commentMemberId !== memberId) throw new ForbiddenException('해당하는 댓글에 대한 권한이 없습니다.');
  }

  async verifyAccessPublishIdOrThrow(commentPublishId: number, publishId: number): Promise<void> {
    if (commentPublishId !== publishId) throw new ForbiddenException('해당하는 게시글에 관한 댓글이 아닙니다.');
  }
}
