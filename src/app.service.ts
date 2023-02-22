import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    // throw new Error();
    throw new InternalServerErrorException('custom 500');
    return 'Hello World!';
  }
}
