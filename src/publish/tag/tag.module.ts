import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { PrismaModule } from '../../_common/prisma/prisma.module';
import { TagRepository } from './tag.repository';

@Module({
  imports: [PrismaModule],
  providers: [TagService, TagRepository],
  exports: [TagService],
})
export class TagModule {}
