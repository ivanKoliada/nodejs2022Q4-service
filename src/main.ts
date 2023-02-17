import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { readFileSync } from 'fs';
import { parse } from 'yaml';
import { LoggingService } from './shared/logger/logging.service';
import { HttpExceptionFilter } from './shared/filter/httpException.filter';

async function bootstrap() {
  const port = process.env.PORT || 4000;

  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: false,
  });

  app.useLogger(new LoggingService());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const file = readFileSync('./doc/api.yaml', 'utf8');
  const document = parse(file);

  SwaggerModule.setup('doc', app, document);

  await app.listen(port);
}
bootstrap();
