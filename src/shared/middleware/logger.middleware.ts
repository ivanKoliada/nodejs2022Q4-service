import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { LoggingService } from '../logger/logging.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private logger: LoggingService) {}

  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', async () => {
      const msg = `METHOD:${req.method} URL:${
        req.url
      } QUERY_PARAMS:${JSON.stringify(req.params)} BODY:${JSON.stringify(
        req.body,
      )} STATUS_CODE:${res.statusCode} MESSAGE:${res.statusMessage}`;

      if (res.statusCode === 500) return this.logger.error(msg);
      if (res.statusCode >= 400) return this.logger.warn(msg);

      return this.logger.log(msg);
    });

    next();
  }
}
