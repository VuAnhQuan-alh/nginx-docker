import helmet from 'helmet';

import { VAR_PREFIX } from '@libs/common/constant';
import { HttpExceptionFilter } from '@libs/common/middleware/http-exception';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';

import { AdminModule } from './admin.module';
import { ServiceConsumer } from '@micro/microservice/utils/service';

async function bootstrap() {
  const app = await NestFactory.create(AdminModule);
  const config = app.get(ConfigService);

  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [config.get<string>('KAFKA_BROKER')],
      },
      consumer: {
        groupId: ServiceConsumer.PETPOT,
      },
    },
  });

  app.enableCors();
  app.use(helmet());

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalFilters(new HttpExceptionFilter());

  app.setGlobalPrefix(VAR_PREFIX);

  await app.startAllMicroservices();
  await app.listen(config.get<number>('PORT_ADMIN'));
  Logger.log(
    `🚀 Application is running on: ${await app.getUrl()}/${VAR_PREFIX}`,
  );
}
bootstrap();
