import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../_common/prisma/prisma.service';
import { ICommentCreate } from './types/create/request.interface';
import { Comment } from '@prisma/client';
import { ICommentUpdate } from './types/update/request.interface';
import { ICommentFindMany } from './types/findMany/request.interface';

@Injectable()
export class CommentRepository {
  constructor(private prisma: PrismaService) {}

  private commentRepository = this.prisma.extendedClient.comment;

  async create(data: ICommentCreate): Promise<Comment> {
    return this.commentRepository.create({ data: { ...data } });
  }

  async update(id: number, data: ICommentUpdate): Promise<Comment> {
    return this.commentRepository.update({ where: { id }, data: { ...data } });
  }

  async softDelete(id: number): Promise<Comment> {
    return this.commentRepository.softDelete({ id });
  }

  async findUniqueOrThrow(id: number): Promise<Comment> {
    const comment = await this.commentRepository.findFirst({ where: { id } });
    if (!comment) throw new NotFoundException('해당하는 댓글이 존재하지 않습니다.');
    return comment;
  }

  async findFindMany(data: ICommentFindMany): Promise<Comment[]> {
    const comment = await this.prisma.comment.findMany({
      take: data.take,
      skip: (data.page - 1) * data.take,
      orderBy: {
        content: 'asc',
      },
    });
    return comment;
  }
}
