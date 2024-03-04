import { IPayload } from '../jwt/types/payload.interface';

export interface IRequest extends Request {
  member: IPayload;
}
