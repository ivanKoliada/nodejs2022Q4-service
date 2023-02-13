import {
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common';
import { isPublicAccess } from '../constants';

export const Public = () => SetMetadata(isPublicAccess, true);

export const BodyHasRefreshToken = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const body = ctx.switchToHttp().getRequest().body;

    if (Object.keys(body).length !== 1) {
      return true;
    }

    return body;
  },
);
