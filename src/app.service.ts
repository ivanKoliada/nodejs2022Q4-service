import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    // throw new Error();
    // throw new HttpException('fwefwef', HttpStatus.INTERNAL_SERVER_ERROR);
    return 'Hello World!';
  }
}
