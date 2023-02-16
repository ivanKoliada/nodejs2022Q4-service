import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { LoggingService } from './loggingService';

@Injectable()
export class LoggerMiddleware extends LoggingService implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
      this.log(
        `METHOD:${req.method} URL:${req.url} QUERY_PARAMS:${JSON.stringify(
          req.params,
        )} BODY:${JSON.stringify(req.body)} STATUS_CODE:${res.statusCode}`,
      );
    });

    next();
  }
}
