import { ConsoleLogger, Injectable, LogLevel } from '@nestjs/common';
import { LOG_LEVEL, LOG_LEVELS } from '../constants';
import { logToFile } from '../utils';

@Injectable()
export class LoggingService extends ConsoleLogger {
  log(message: string) {
    return this.doLogging(message, LOG_LEVEL.LOG);
  }

  error(message: string) {
    return this.doLogging(message, LOG_LEVEL.ERROR);
  }

  warn(message: string) {
    return this.doLogging(message, LOG_LEVEL.WARN);
  }

  debug(message: string) {
    return this.doLogging(message, LOG_LEVEL.DEBUG);
  }

  verbose(message: string) {
    return this.doLogging(message, LOG_LEVEL.VERBOSE);
  }

  doLogging(message: string, level: LogLevel) {
    if (LOG_LEVELS[process.env.LOG_LEVEL].includes(level)) {
      super[level](message, level);

      logToFile(message, level);
    }
  }
}
