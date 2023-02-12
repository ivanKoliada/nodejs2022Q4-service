import { SetMetadata } from '@nestjs/common';
import { isPublicAccess } from '../constants';

export const Public = () => SetMetadata(isPublicAccess, true);
