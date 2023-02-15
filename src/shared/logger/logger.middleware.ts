import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { LoggingService } from './loggingService';

@Injectable()
export class LoggerMiddleware extends LoggingService implements NestMiddleware {
  constructor() {
    super();
  }

  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
      const timestamp = this.getTimestamp();

      this.log(
        `${timestamp} [RESPONSE] - URL:${req.url} QUERY_PARAMS:${JSON.stringify(
          req.params,
        )} BODY:${JSON.stringify(req.body)} STATUS_CODE: ${res.statusCode}`,
      );
    });

    next();
  }
}
