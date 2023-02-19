import { LogLevel } from '@nestjs/common';
import { mkdirSync, readdirSync, statSync, writeFileSync } from 'fs';
import { PATH_TO_LOG_FOLDER } from './constants';

export const logToFile = async (message: string, level: LogLevel) => {
  const currentTime = new Date().toISOString();
  const timestamp = currentTime.replace(/[:.]/g, '-');

  const msg = `${currentTime} [${level}] ${message} \n`;

  mkdirSync(PATH_TO_LOG_FOLDER, { recursive: true });

  const files = readdirSync(PATH_TO_LOG_FOLDER);
  const lastFileName = files.at(-1);

  if (!files.length) {
    const pathToLogFile = `${PATH_TO_LOG_FOLDER}${timestamp}.log`;

    writeFileSync(pathToLogFile, msg, { flag: 'a' });
  } else {
    const file = statSync(PATH_TO_LOG_FOLDER + lastFileName);
    const size = Math.ceil(file.size / 1024);
    const filename =
      size >= +process.env.MAX_FILE_SIZE ? `${timestamp}.log` : lastFileName;

    const pathToLogFile = PATH_TO_LOG_FOLDER + filename;

    writeFileSync(pathToLogFile, msg, { flag: 'a' });
  }
};
