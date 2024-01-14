import helmet from 'helmet';

import { VAR_PREFIX } from '@libs/common/constant';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AdminModule } from './admin.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from '@libs/common/middleware/http-exception';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AdminModule);
  app.connectMicroservice({ transport: Transport.TCP });

  app.enableCors();
  app.use(helmet());

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalFilters(new HttpExceptionFilter());

  app.setGlobalPrefix(VAR_PREFIX, { exclude: ['healthy'] });
  const config = app.get(ConfigService);

  await app.startAllMicroservices();
  await app.listen(config.get<number>('PORT_ADMIN'));

  Logger.log(
    `🚀 Application is running on: ${await app.getUrl()}/${VAR_PREFIX}`,
  );
}
bootstrap();
