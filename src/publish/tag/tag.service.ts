import { Injectable } from '@nestjs/common';
import { TagRepository } from './tag.repository';
import { ITagCreate } from './types/create/request.interface';
import { Tag } from '@prisma/client';
import { ITagUpdate } from './types/update/request.interface';
import { ITagFindMany } from './types/findMany/request.interface';

@Injectable()
export class TagService {
  constructor(private tagRepository: TagRepository) {}

  async create(data: ITagCreate): Promise<Tag> {
    await this.tagRepository.existTag(data.name);
    return await this.tagRepository.create(data);
  }

  async update(data: ITagUpdate, id: number): Promise<Tag> {
    await this.tagRepository.findUniqueOrThrow(id);
    await this.tagRepository.existTag(data.name);
    return await this.tagRepository.update(data, id);
  }

  async delete(id: number): Promise<Tag> {
    await this.tagRepository.findUniqueOrThrow(id);
    return await this.tagRepository.softDelete(id);
  }

  async getTag(id: number): Promise<Tag> {
    await this.tagRepository.findUniqueOrThrow(id);
    return await this.tagRepository.getTag(id);
  }

  async findMany(data: ITagFindMany) {
    return await this.tagRepository.findMany(data);
  }
}
