import { MSG } from '../constants';
import { LoggingService } from '../logger/logging.service';

export const loggingHandledErrors = (logger: LoggingService) => {
  process.on('unhandledRejection', (error) =>
    logger.error(`${MSG.UNHANDLED_REJECTION} ${error}`),
  );

  process.on('uncaughtException', (error) => {
    logger.error(`${MSG.UNCAUGHT_EXCEPTION} ${error}`);
    process.exit(1);
  });
};
