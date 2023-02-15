import { LoggerService, ConsoleLogger, LogLevel } from '@nestjs/common';

export class LoggingService extends ConsoleLogger {
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

  setLogLevels(levels: LogLevel[]): void {
    super.setLogLevels(levels);
  }

  private async logToFile(message: string) {
    return;
  }
}
