import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '../jwt/jwt.service';
import { Observable } from 'rxjs';
import { IRequest } from '../interface/request.interface';

@Injectable()
export class MemberAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request: IRequest = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  async validateRequest(req: IRequest): Promise<boolean> {
    const accessToken = (req.headers as any).authorization;
    if (!accessToken) return false;

    const payload = this.jwtService.verify(accessToken);
    if (typeof payload === 'string') throw new UnauthorizedException(payload);

    req.member = payload;
    return true;
  }
}
