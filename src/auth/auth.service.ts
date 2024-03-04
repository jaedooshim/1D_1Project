import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '../_common/jwt/jwt.service';
import { BcryptService } from '../_common/bcrypt/bcrypt.service';
import { MemberService } from '../member/member.service';
import { ILogin } from './types/request.interface';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private bcryptService: BcryptService,
    private memberService: MemberService,
  ) {}

  async login(data: ILogin): Promise<string> {
    const member = await this.memberService.getEmail(data.email);
    const isvalidPassword = await this.bcryptService.compare(data.password, member.password);
    if (!isvalidPassword) throw new BadRequestException('비밀번호가 일치하지 않습니다.');

    const payload = { id: member.id, email: member.email, name: member.name };
    const accessToken = this.jwtService.sign(payload);
    return accessToken;
  }
}
