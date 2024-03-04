import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../_common/prisma/prisma.service';
import { IPublishCreate } from './types/create/request.interface';
import { Publish } from '@prisma/client';
import { IPublishUpdate } from './types/update/request.interface';
import { IPublishFindMany } from './types/findMany/request.interface';

@Injectable()
export class PublishRepository {
  constructor(private prisma: PrismaService) {}

  private publishRepository = this.prisma.extendedClient.publish;

  async create(data: IPublishCreate, memberId: string, tagId: number): Promise<Publish> {
    return this.publishRepository.create({ data: { ...data, memberId, tagId } });
  }

  async update(id: number, { memberId, ...data }: IPublishUpdate, tagId: number): Promise<Publish> {
    return this.publishRepository.update({ where: { id }, data: { ...data, memberId, tagId } });
  }

  async softDelete(id: number): Promise<Publish> {
    return this.publishRepository.softDelete({ id });
  }

  async findUniqueOrThrow(id: number): Promise<Publish> {
    const publish = await this.publishRepository.findFirst({ where: { id } });
    if (!publish) throw new NotFoundException('해당하는 게시글이 존재하지 않습니다.');
    return publish;
  }

  async findMany(data: IPublishFindMany): Promise<Publish[]> {
    const publish = await this.prisma.publish.findMany({
      take: data.take,
      skip: (data.page - 1) * data.take,
      orderBy: {
        title: 'asc',
      },
    });
    return publish;
  }
}
