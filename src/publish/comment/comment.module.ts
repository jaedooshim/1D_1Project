import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { PrismaModule } from '../../_common/prisma/prisma.module';
import { CommentRepository } from './comment.repository';

@Module({
  imports: [PrismaModule],
  providers: [CommentService, CommentRepository],
  exports: [CommentService],
})
export class CommentModule {}
