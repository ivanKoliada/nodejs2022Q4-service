import { ConsoleLogger, Injectable, LogLevel } from '@nestjs/common';
import { LOG_LEVEL, LOG_LEVELS } from '../constants';
import { logToFile } from '../utils';
// import { IsLevelEnabled } from '../decorators/decorator';

@Injectable()
export class LoggingService extends ConsoleLogger {
  // constructor() {
  //   super();
  //   this.setLogLevels(LOG_LEVELS[process.env.LOG_LEVEL]);
  // }

  // @IsLevelEnabled
  async log(message: string) {
    // if (LOG_LEVELS[process.env.LOG_LEVEL].includes(LOG_LEVEL.LOG)) {
    //   super.log(message, LOG_LEVEL.LOG);

    //   await logToFile(message, LOG_LEVEL.LOG);
    // }
    return this.checkAndLog(message, LOG_LEVEL.LOG);
  }

  // @IsLevelEnabled
  async error(message: string) {
    // if (LOG_LEVELS[process.env.LOG_LEVEL].includes(LOG_LEVEL.ERROR)) {
    //   super.error(message, LOG_LEVEL.ERROR);
    //   await logToFile(message, LOG_LEVEL.ERROR);
    // }
    return this.checkAndLog(message, LOG_LEVEL.ERROR);
  }

  async warn(message: string) {
    // if (LOG_LEVELS[process.env.LOG_LEVEL].includes(LOG_LEVEL.WARN)) {
    //   super.warn(message, LOG_LEVEL.WARN);

    //   await logToFile(message, LOG_LEVEL.WARN);
    // }
    return this.checkAndLog(message, LOG_LEVEL.WARN);
  }

  async debug(message: string) {
    // if (LOG_LEVELS[process.env.LOG_LEVEL].includes(LOG_LEVEL.DEBUG)) {
    //   super.debug(message, LOG_LEVEL.DEBUG);

    //   await logToFile(message, LOG_LEVEL.DEBUG);
    // }
    return this.checkAndLog(message, LOG_LEVEL.DEBUG);
  }

  async verbose(message: string) {
    // if (LOG_LEVELS[process.env.LOG_LEVEL].includes(LOG_LEVEL.VERBOSE)) {
    //   super.verbose(message, LOG_LEVEL.VERBOSE);

    //   await logToFile(message, LOG_LEVEL.VERBOSE);
    // }
    return this.checkAndLog(message, LOG_LEVEL.VERBOSE);
  }

  async checkAndLog(message: string, level: LogLevel) {
    if (LOG_LEVELS[process.env.LOG_LEVEL].includes(level)) {
      super[level](message, level);

      await logToFile(message, level);
    }
  }
}
