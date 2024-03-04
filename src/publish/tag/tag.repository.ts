import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../_common/prisma/prisma.service';
import { ITagCreate } from './types/create/request.interface';
import { Tag } from '@prisma/client';
import { ConfigModule } from '@nestjs/config';
import { ITagUpdate } from './types/update/request.interface';
import { ITagFindMany } from './types/findMany/request.interface';

@Injectable()
export class TagRepository {
  constructor(private prisma: PrismaService) {}

  private tagRepository = this.prisma.extendedClient.tag;

  async create(data: ITagCreate): Promise<Tag> {
    return this.tagRepository.create({ data: { ...data } });
  }

  async update(data: ITagUpdate, id: number): Promise<Tag> {
    return this.tagRepository.update({ where: { id }, data: { ...data } });
  }

  async softDelete(id: number): Promise<Tag> {
    return this.tagRepository.softDelete({ id });
  }

  async getTag(id: number): Promise<Tag> {
    return this.tagRepository.findFirst({ where: { id } });
  }

  async findMany(data: ITagFindMany): Promise<Tag[]> {
    return this.prisma.tag.findMany({
      take: data.take,
      skip: (data.page - 1) * data.take,
      orderBy: {
        name: 'asc',
      },
    });
  }

  async existTag(name: string): Promise<void> {
    const tag = await this.tagRepository.findFirst({ where: { name } });
    if (tag) throw new ConflictException('이미 존재하는 태그이름 입니다.');
  }

  async findUniqueOrThrow(id: number): Promise<void> {
    const tag = await this.tagRepository.findFirst({ where: { id } });
    if (!tag) throw new NotFoundException('해당하는 태그가 존재하지 않습니다.');
  }
}
