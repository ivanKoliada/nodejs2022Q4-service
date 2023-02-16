import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { LoggingService } from './loggingService';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private logger: LoggingService) {}

  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', async () => {
      const msg = `METHOD:${req.method} URL:${
        req.url
      } QUERY_PARAMS:${JSON.stringify(req.params)} BODY:${JSON.stringify(
        req.body,
      )} STATUS_CODE:${res.statusCode}`;

      if (res.statusCode === 500) {
        await this.logger.error(msg);
      } else if (res.statusCode >= 400) {
        await this.logger.warn(msg);
      } else await this.logger.log(msg);
    });

    next();
  }
}
