import { ConflictException, Injectable } from '@nestjs/common';
import { MemberRepository } from './member.repository';
import { IMemberCreate } from './types/create/request.interface';
import { BcryptService } from '../_common/bcrypt/bcrypt.service';
import { IMemberUpdate } from './types/update/request.interface';
import { IPassword } from './types/update-password/request.interface';
import { Member } from '@prisma/client';
import { IMemberFindMany } from './types/findMany/request.interface';

@Injectable()
export class MemberService {
  constructor(
    private memberRepository: MemberRepository,
    private bcryptService: BcryptService,
  ) {}

  async create(data: IMemberCreate): Promise<string> {
    await this.memberRepository.existEmail(data.email);
    await this.memberRepository.isValidPhoneNumber(data.phoneNumber);
    data.password = await this.bcryptService.hash(data.password);
    await this.memberRepository.create(data);
    return '회원가입이 정상적으로 완료되었습니다.';
  }

  async update(id: string, data: IMemberUpdate): Promise<string> {
    await this.memberRepository.findUniqueOrThrow(id);
    await this.memberRepository.update(id, data);
    return '회원정보를 정상적으로 수정하였습니다.';
  }

  async updatePassword(id: string, oldPassword: string, newPassword: string): Promise<string> {
    const member = await this.memberRepository.findUniqueOrThrow(id);
    const password = await this.bcryptService.compare(oldPassword, member.password);
    if (!password) throw new ConflictException('비밀번호가 일치하지 않습니다.');

    const hashPassword = await this.bcryptService.hash(newPassword);
    await this.memberRepository.modifyPassword(id, hashPassword);
    return '비밀번호가 정상적으로 변경되었습니다.';
  }

  async delete(id: string, password: string): Promise<string> {
    await this.memberRepository.findUniqueOrThrow(id);
    await this.isValidPassword(id, password);
    await this.memberRepository.softDelete(id);
    return '회원삭제가 정상적으로 되었습니다.';
  }

  async getMember(id: string): Promise<Member> {
    await this.memberRepository.findUniqueOrThrow(id);
    return await this.memberRepository.getMember(id);
  }

  async findUnique(id: string): Promise<void> {
    await this.memberRepository.findUniqueOrThrow(id);
  }

  async findMany(data: IMemberFindMany) {
    return await this.memberRepository.findMany(data);
  }

  async isValidPassword(id: string, password: string): Promise<void> {
    const member = await this.memberRepository.findUniqueOrThrow(id);
    const validPassword = await this.bcryptService.compare(password, member.password);
    console.log('validPassword', validPassword);
    console.log('memberPassword', member.password);
    console.log('password', password);
    if (!validPassword) throw new ConflictException('비밀번호가 일치하지 않습니다.');
  }

  async getEmail(email: string): Promise<Member> {
    return await this.memberRepository.isValidEmail(email);
  }
}
