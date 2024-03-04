import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../_common/prisma/prisma.service';
import { IMemberCreate } from './types/create/request.interface';
import { Member } from '@prisma/client';
import { IMemberUpdate } from './types/update/request.interface';
import { IMemberFindMany } from './types/findMany/request.interface';

@Injectable()
export class MemberRepository {
  constructor(private prisma: PrismaService) {}

  private memberRepository = this.prisma.extendedClient.member;

  async create(data: IMemberCreate): Promise<Member> {
    return this.memberRepository.create({ data: { ...data } });
  }

  async update(id: string, data: IMemberUpdate): Promise<Member> {
    return this.memberRepository.update({ where: { id }, data: { ...data } });
  }

  async softDelete(id: string): Promise<Member> {
    return this.memberRepository.softDelete({ id });
  }

  async getMember(id: string): Promise<Member> {
    return this.memberRepository.findFirst({ where: { id } });
  }

  async findMany(data: IMemberFindMany): Promise<Member[]> {
    const member = await this.prisma.member.findMany({
      take: data.take,
      skip: (data.page - 1) * data.take,
      orderBy: {
        name: 'asc',
      },
    });
    return member;
  }

  async existEmail(email: string): Promise<void> {
    const existingEmail = await this.memberRepository.findFirst({ where: { email } });
    if (existingEmail) throw new ConflictException('등록된 이메일입니다. 다시 한번 확인해주세요.');
  }

  async isValidPhoneNumber(phoneNumber: string): Promise<void> {
    const existPhoneNumber = await this.memberRepository.findFirst({ where: { phoneNumber } });
    if (existPhoneNumber) throw new ConflictException('등록된 전화번호입니다. 다시 한번 확인해주세요.');
  }

  async findUniqueOrThrow(id: string): Promise<Member> {
    const member = await this.memberRepository.findFirst({ where: { id } });
    if (!member) throw new NotFoundException('해당하는 멤버가 존재하지 않습니다.');
    return member;
  }

  async modifyPassword(id: string, newPassword: string): Promise<void> {
    const member = await this.memberRepository.findFirst({ where: { id } });
    member.password = newPassword;
    await this.memberRepository.update({ where: { id }, data: { password: newPassword } });
  }

  async isValidEmail(email: string): Promise<Member | null> {
    const member = await this.memberRepository.findFirst({ where: { email } });
    if (!member) throw new NotFoundException('등록되지 않은 이메일입니다.');

    return member;
  }
}
