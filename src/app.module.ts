import { Module } from '@nestjs/common';
import { PrismaModule } from './_common/prisma/prisma.module';
import { MemberModule } from './member/member.module';
import { BcryptModule } from './_common/bcrypt/bcrypt.module';
import { JwtModule } from './_common/jwt/jwt.module';
import { AuthModule } from './auth/auth.module';
import { PublishModule } from './publish/publish.module';
import { TagModule } from './publish/tag/tag.module';
import { CommentModule } from './publish/comment/comment.module';

@Module({
  imports: [PrismaModule, MemberModule, BcryptModule, JwtModule, AuthModule, PublishModule, TagModule, CommentModule],
})
export class AppModule {}
