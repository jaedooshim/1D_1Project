import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '../_common/jwt/jwt.module';
import { BcryptModule } from '../_common/bcrypt/bcrypt.module';
import { MemberModule } from '../member/member.module';

@Module({
  imports: [JwtModule, BcryptModule, MemberModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
