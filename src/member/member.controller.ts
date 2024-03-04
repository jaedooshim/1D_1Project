import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberCreateDto } from './types/create/request.dto';
import { MemberParamDto, MemberUpdateDto } from './types/update/request.dto';
import { PasswordDto, PasswordUpdateDto } from './types/update-password/request.dto';
import { Member } from '@prisma/client';
import { MemberFindManyDto } from './types/findMany/request.dto';
import { MemberAuthGuard } from '../_common/guard/member.auth.guard';

@Controller('members')
export class MemberController {
  constructor(private memberService: MemberService) {}

  @Post()
  async create(@Body() body: MemberCreateDto): Promise<string> {
    return await this.memberService.create(body);
  }

  @Put('/:memberId')
  @UseGuards(MemberAuthGuard)
  async update(@Body() body: MemberUpdateDto, @Param() param: MemberParamDto): Promise<string> {
    return await this.memberService.update(param.memberId, body);
  }

  @Patch('/:memberId/password')
  @UseGuards(MemberAuthGuard)
  async updatePassword(@Body() body: PasswordUpdateDto, @Param() param: MemberParamDto): Promise<string> {
    return await this.memberService.updatePassword(param.memberId, body.oldPassword, body.newPassword);
  }

  @Delete('/:memberId')
  @UseGuards(MemberAuthGuard)
  async delete(@Body('password') password: string, @Param() param: MemberParamDto): Promise<string> {
    return await this.memberService.delete(param.memberId, password);
  }

  @Get('/:memberId')
  @UseGuards(MemberAuthGuard)
  async getMember(@Param() param: MemberParamDto): Promise<Member> {
    return await this.memberService.getMember(param.memberId);
  }

  @Get()
  async findMany(@Query() query: MemberFindManyDto) {
    return await this.memberService.findMany(query);
  }
}
