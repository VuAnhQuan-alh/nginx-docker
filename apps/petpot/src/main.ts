import helmet from 'helmet';

import { VAR_PREFIX } from '@libs/common/constant';
import { HttpExceptionFilter } from '@libs/common/middleware/http-exception';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import * as Sentry from '@sentry/node';

import { AppModule } from './app.module';
import { SentryFilter } from '@libs/common/interceptor/sentry-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  Sentry.init({
    dsn: config.get<string>('SENTRY_DNS'),
  });
  const { httpAdapter } = app.get(HttpAdapterHost);

  app.enableCors();
  app.use(helmet());

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new SentryFilter(httpAdapter),
  );

  app.setGlobalPrefix(VAR_PREFIX);

  await app.listen(config.get<number>('PORT_PET'));
  Logger.log(
    `🚀 Application is running on: ${await app.getUrl()}/${VAR_PREFIX}`,
  );
}
bootstrap();
