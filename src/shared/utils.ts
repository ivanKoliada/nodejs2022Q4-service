import { LogLevel } from '@nestjs/common';
import { mkdirSync, readdirSync, statSync, writeFileSync } from 'fs';
import { PATH_TO_LOGS_FOLDER } from './constants';

export const logToFile = (
  message: string,
  level: LogLevel,
  path: string = PATH_TO_LOGS_FOLDER,
) => {
  const currentTime = new Date().toISOString();
  const timestamp = currentTime.replace(/[:.]/g, '-');

  const msg = `${currentTime} [${level}] ${message} \n`;

  mkdirSync(path, { recursive: true });

  const files = readdirSync(path);
  const lastFileName = files.at(-1);

  if (!files.length) {
    const pathToLogFile = `${path}${timestamp}.log`;

    writeFileSync(pathToLogFile, msg, { flag: 'a' });
  } else {
    const file = statSync(path + lastFileName);
    const size = Math.ceil(file.size / 1024);
    const filename =
      size >= +process.env.MAX_FILE_SIZE ? `${timestamp}.log` : lastFileName;

    const pathToLogFile = path + filename;

    writeFileSync(pathToLogFile, msg, { flag: 'a' });
  }
};
