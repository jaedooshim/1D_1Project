import { ForbiddenException, Injectable } from '@nestjs/common';
import { PublishRepository } from './publish.repository';
import { IPublishCreate } from './types/create/request.interface';
import { Comment, Publish } from '@prisma/client';
import { MemberService } from '../member/member.service';
import { IPublishUpdate } from './types/update/request.interface';
import { TagService } from './tag/tag.service';
import { IPublishFindMany } from './types/findMany/request.interface';
import { CommentService } from './comment/comment.service';
import { ICommentFindMany } from './comment/types/findMany/request.interface';

@Injectable()
export class PublishService {
  constructor(
    private publishRepository: PublishRepository,
    private memberService: MemberService,
    private tagService: TagService,
    private commentService: CommentService,
  ) {}

  async create(data: IPublishCreate, memberId: string, tagId: number): Promise<string> {
    await this.memberService.findUnique(memberId);
    await this.publishRepository.create(data, memberId, tagId);
    return '게시글이 생성되었습니다.';
  }

  async update(id: number, data: IPublishUpdate, tagId: number): Promise<string> {
    await this.memberService.findUnique(data.memberId);
    await this.tagService.getTag(tagId);
    const publish = await this.publishRepository.findUniqueOrThrow(id);
    await this.verifyAccessAuthorityOrThrow(publish.memberId, data.memberId);
    await this.publishRepository.update(id, data, tagId);
    return '게시글이 수정되었습니다.';
  }

  async softDelete(id: number, memberId: string): Promise<string> {
    await this.memberService.findUnique(memberId);
    const publish = await this.publishRepository.findUniqueOrThrow(id);
    await this.verifyAccessAuthorityOrThrow(publish.memberId, memberId);
    await this.publishRepository.softDelete(id);
    return '게시글이 삭제되었습니다.';
  }

  async findUnique(id: number): Promise<Publish> {
    return await this.publishRepository.findUniqueOrThrow(id);
  }

  async commentFindUnique(id: number, commentId: number): Promise<Comment> {
    await this.publishRepository.findUniqueOrThrow(id);
    return await this.commentService.findUnique(commentId);
  }

  async commentFindMany(data: ICommentFindMany) {
    return await this.commentService.findMany(data);
  }

  async findMany(data: IPublishFindMany) {
    return await this.publishRepository.findMany(data);
  }

  async verifyAccessAuthorityOrThrow(publishMemberId: string, memberId: string): Promise<void> {
    if (publishMemberId !== memberId) throw new ForbiddenException('게시글에 대한 권한이 없습니다.');
  }
}
