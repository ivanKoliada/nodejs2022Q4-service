import { ConsoleLogger, Injectable, LogLevel } from '@nestjs/common';
import { stat, readdir, mkdir, appendFile, writeFile } from 'fs/promises';
import { LOG_LEVEL, LOG_LEVELS, PATH_TO_LOG_FOLDER } from '../constants';

@Injectable()
export class LoggingService extends ConsoleLogger {
  constructor() {
    super();
    this.setLogLevels(LOG_LEVELS[process.env.LOG_LEVEL]);
  }

  async log(message: string) {
    super.log(message, LOG_LEVEL.LOG);

    await this.logToFile(message, LOG_LEVEL.LOG);
  }

  async error(message: string) {
    super.error(message, LOG_LEVEL.ERROR);

    await this.logToFile(message, LOG_LEVEL.ERROR);
  }

  async warn(message: string) {
    super.warn(message, LOG_LEVEL.WARN);

    await this.logToFile(message, LOG_LEVEL.WARN);
  }

  async debug(message: string) {
    super.debug(message, LOG_LEVEL.DEBUG);

    await this.logToFile(message, LOG_LEVEL.DEBUG);
  }

  async verbose(message: string) {
    super.verbose(message, LOG_LEVEL.VERBOSE);

    await this.logToFile(message, LOG_LEVEL.VERBOSE);
  }

  private async logToFile(message: string, level: LogLevel) {
    if (this.isLevelEnabled(level)) {
      const msg = `${this.getTimestamp()} [${level}] ${message} \n`;

      await mkdir(PATH_TO_LOG_FOLDER, { recursive: true });

      const files = await readdir(PATH_TO_LOG_FOLDER);

      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

      if (!files.length) {
        const pathToLogFile = `${PATH_TO_LOG_FOLDER}${timestamp}.log`;

        await writeFile(pathToLogFile, msg, { flag: 'a' });
      } else {
        const file = await stat(PATH_TO_LOG_FOLDER + files.at(-1));
        const filename =
          file.size / 1024 >= +process.env.MAX_FILE_SIZE
            ? `${timestamp}.log`
            : files.at(-1);

        const pathToLogFile = PATH_TO_LOG_FOLDER + filename;

        await writeFile(pathToLogFile, msg, { flag: 'a' });
      }
    }
  }
}
