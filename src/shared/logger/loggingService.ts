import { ConsoleLogger, Injectable } from '@nestjs/common';
import { LOG_LEVELS } from '../constants';

@Injectable()
export class LoggingService extends ConsoleLogger {
  constructor() {
    super();
    this.setLogLevels(LOG_LEVELS[process.env.LOG_LEVEL]);
  }

  async log(message: string) {
    super.log(message);
    await this.logToFile(message);
  }

  async error(message: string, trace: string) {
    super.error(message);
    await this.logToFile(message);
  }

  async warn(message: string) {
    super.warn(message);
    await this.logToFile(message);
  }

  async debug(message: string) {
    super.debug(message);
    await this.logToFile(message);
  }

  async verbose(message: string) {
    super.verbose(message);
    await this.logToFile(message);
  }

  private async logToFile(message: string) {
    console.log(message, 11111111111111);
    return;
  }
}
