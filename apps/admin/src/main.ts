import helmet from 'helmet';

import { VAR_PREFIX } from '@libs/common/constant';
import { HttpExceptionFilter } from '@libs/common/middleware/http-exception';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import * as Sentry from '@sentry/node';

import { AdminModule } from './admin.module';
import { ServiceConsumer } from '@micro/microservice/utils/service';
import { SentryFilter } from '@libs/common/interceptor/sentry-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AdminModule);
  const config = app.get(ConfigService);

  Sentry.init({
    dsn: config.getOrThrow<string>('ADMIN_SENTRY_DNS'),
  });
  const { httpAdapter } = app.get(HttpAdapterHost);

  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [config.getOrThrow<string>('KAFKA_BROKER')],
      },
      consumer: {
        groupId: ServiceConsumer.PETPOT,
      },
    },
  });

  app.enableCors();
  app.use(helmet());

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new SentryFilter(httpAdapter),
  );

  app.setGlobalPrefix(VAR_PREFIX);

  await app.startAllMicroservices();
  await app.listen(config.getOrThrow<number>('PORT_ADMIN'));
  Logger.log(
    `🚀 Application is running on: ${await app.getUrl()}/${VAR_PREFIX}`,
  );
}
bootstrap();
