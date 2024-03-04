import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IRequest } from '../interface/request.interface';

export const Member = createParamDecorator((data: unknown, input: ExecutionContext) => {
  const request: IRequest = input.switchToHttp().getRequest();
  return request.member;
});
