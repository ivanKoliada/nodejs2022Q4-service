import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { readFileSync } from 'fs';
import { parse } from 'yaml';
import { LoggingService } from './shared/logger/logging.service';
import { HttpExceptionFilter } from './shared/filter/httpException.filter';
import { loggingHandledErrors } from './shared/handler/error.handler';

async function bootstrap() {
  const port = process.env.PORT || 4000;

  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: false,
  });

  const logger = new LoggingService();

  app.useLogger(logger);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  loggingHandledErrors(logger);

  const file = readFileSync('./doc/api.yaml', 'utf8');
  const document = parse(file);

  SwaggerModule.setup('doc', app, document);

  await app.listen(port);
}
bootstrap();
