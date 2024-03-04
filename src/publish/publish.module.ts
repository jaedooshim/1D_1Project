import { Module } from '@nestjs/common';
import { PublishController } from './publish.controller';
import { PublishService } from './publish.service';
import { PublishRepository } from './publish.repository';
import { PrismaModule } from '../_common/prisma/prisma.module';
import { TagModule } from './tag/tag.module';
import { MemberModule } from '../member/member.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [PrismaModule, TagModule, MemberModule, CommentModule],
  controllers: [PublishController],
  providers: [PublishService, PublishRepository],
  exports: [PublishService],
})
export class PublishModule {}
