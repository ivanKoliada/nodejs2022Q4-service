import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    // throw new Error();
    // throw new InternalServerErrorException();
    return 'Hello World!';
  }
}
