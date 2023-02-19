import {
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common';
import { IS_PUBLIC_ACCESS } from '../constants';
import 'dotenv/config';

export const Public = () => SetMetadata(IS_PUBLIC_ACCESS, true);

export const BodyHasRefreshToken = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const body = ctx.switchToHttp().getRequest().body;

    if (Object.keys(body).length !== 1) {
      return true;
    }

    return body;
  },
);
