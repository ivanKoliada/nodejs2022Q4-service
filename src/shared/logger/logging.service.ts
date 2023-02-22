import { ConsoleLogger, Injectable, LogLevel } from '@nestjs/common';
import { LOG_LEVEL, LOG_LEVELS, PATH_TO_ERRORS_FOLDER } from '../constants';
import { logToFile } from '../utils';

@Injectable()
export class LoggingService extends ConsoleLogger {
  log(message: string) {
    return this.doLogging(message, LOG_LEVEL.LOG);
  }

  error(message: string) {
    return this.doLogging(message, LOG_LEVEL.ERROR, PATH_TO_ERRORS_FOLDER);
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

  doLogging(message: string, level: LogLevel, path?: string) {
    if (LOG_LEVELS[process.env.LOG_LEVEL].includes(level)) {
      super[level](message, level);

      logToFile(message, level, path);
    }
  }
}
