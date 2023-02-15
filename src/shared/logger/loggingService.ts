import { ConsoleLogger, Injectable, LogLevel } from '@nestjs/common';
import { appendFile } from 'fs';
import { LOG_LEVEL, LOG_LEVELS, PATH_TO_LOG_FILE } from '../constants';

@Injectable()
export class LoggingService extends ConsoleLogger {
  constructor() {
    super();
    this.setLogLevels(LOG_LEVELS[process.env.LOG_LEVEL]);
  }

  async log(message: string) {
    super.log(this.colorize(message, LOG_LEVEL.LOG));

    await this.logToFile(message, LOG_LEVEL.LOG);
  }

  async error(message: string) {
    super.error(this.colorize(message, LOG_LEVEL.ERROR));

    await this.logToFile(message, LOG_LEVEL.ERROR);
  }

  async warn(message: string) {
    super.warn(this.colorize(message, LOG_LEVEL.WARN));

    await this.logToFile(message, LOG_LEVEL.WARN);
  }

  async debug(message: string) {
    super.debug(this.colorize(message, LOG_LEVEL.DEBUG));

    await this.logToFile(message, LOG_LEVEL.DEBUG);
  }

  async verbose(message: string) {
    super.verbose(this.colorize(message, LOG_LEVEL.VERBOSE));

    await this.logToFile(message, LOG_LEVEL.VERBOSE);
  }

  private async logToFile(message: string, level: LogLevel) {
    if (this.isLevelEnabled(level)) {
      const msg = `${this.getTimestamp()} [${level}] ${message} \n`;

      appendFile(PATH_TO_LOG_FILE, msg, 'utf8', (err) => {
        if (err) throw err;
      });
    }
  }
}
