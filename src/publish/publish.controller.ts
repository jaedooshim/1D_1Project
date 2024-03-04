import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { TagService } from './tag/tag.service';
import { TagCreateDto } from './tag/types/create/request.dto';
import { Comment, Publish, Tag } from '@prisma/client';
import { TagParamDto, TagUpdateDto } from './tag/types/update/request.dto';
import { TagFindManyDto } from './tag/types/findMany/request.dto';
import { PublishService } from './publish.service';
import { PublishCreateDto } from './types/create/request.dto';
import { PublishParamDto, PublishUpdateDto } from './types/update/request.dto';
import { PublishFindManyDto } from './types/findMany/request.dto';
import { CommentCreateDto } from './comment/types/create/request.dto';
import { CommentService } from './comment/comment.service';
import { CommentParamDto, CommentUpdateDto } from './comment/types/update/request.dto';
import { CommentDeleteDto } from './comment/types/delete/request.dto';
import { CommentFindUniqueParamDto } from './comment/types/findUnique/request.dto';
import { CommentFindManyDto } from './comment/types/findMany/request.dto';

@Controller('publish')
export class PublishController {
  constructor(
    private tagService: TagService,
    private publishService: PublishService,
    private commentService: CommentService,
  ) {}

  @Post()
  async create(@Body() body: PublishCreateDto, @Body('memberId') memberId: string, @Body('tagId') tagId: number): Promise<string> {
    return await this.publishService.create(body, memberId, tagId);
  }

  @Put('/:publishId')
  async update(@Body() body: PublishUpdateDto, @Param() param: PublishParamDto, @Body('tagId') tagId: number): Promise<string> {
    return await this.publishService.update(param.publishId, body, tagId);
  }

  @Delete('/:publishId')
  async delete(@Param() param: PublishParamDto, @Body('memberId') memberId: string): Promise<string> {
    return await this.publishService.softDelete(param.publishId, memberId);
  }

  @Get('/comments')
  async commentFindMany(@Query() query: CommentFindManyDto) {
    return await this.publishService.commentFindMany(query);
  }

  @Get('/:publishId')
  async findUnique(@Param() param: PublishParamDto): Promise<Publish> {
    return await this.publishService.findUnique(param.publishId);
  }

  @Get()
  async findMany(@Query() query: PublishFindManyDto) {
    return await this.publishService.findMany(query);
  }

  @Post('/tags')
  async createTag(@Body() body: TagCreateDto): Promise<Tag> {
    return await this.tagService.create(body);
  }

  @Patch('/tags/:tagId')
  async updateTag(@Body() body: TagUpdateDto, @Param() param: TagParamDto): Promise<Tag> {
    return await this.tagService.update(body, param.tagId);
  }

  @Delete('/tags/:tagId')
  async deleteTag(@Param() param: TagParamDto): Promise<Tag> {
    return await this.tagService.delete(param.tagId);
  }

  @Get('/tags/:tagId')
  async getTag(@Param() param: TagParamDto): Promise<Tag> {
    return await this.tagService.getTag(param.tagId);
  }

  @Get('/tags')
  async getFindManyTag(@Query() query: TagFindManyDto) {
    return await this.tagService.findMany(query);
  }

  @Post('/comments')
  async createComment(@Body() body: CommentCreateDto): Promise<string> {
    return await this.commentService.create(body);
  }

  @Patch('/:publishId/comments/:commentId')
  async updateComment(@Body() body: CommentUpdateDto, @Param() param: CommentParamDto): Promise<string> {
    return await this.commentService.update(param.commentId, body, param.publishId);
  }

  @Delete('/:publishId/comments/:commentId')
  async deleteComment(@Param() param: CommentParamDto, @Body() body: CommentDeleteDto): Promise<string> {
    return await this.commentService.softDelete(param.commentId, body, body.publishId);
  }

  @Get('/:publishId/comments/:commentId')
  async findUniqueComment(@Param() param: CommentFindUniqueParamDto): Promise<Comment> {
    return await this.publishService.commentFindUnique(param.publishId, param.commentId);
  }
}
