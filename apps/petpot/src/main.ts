import helmet from 'helmet';

import { VAR_PREFIX } from '@libs/common/constant';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(helmet());
  app.setGlobalPrefix(VAR_PREFIX);
  const config = app.get(ConfigService);
  await app.listen(config.get<number>('PORT_PET'));

  Logger.log(
    `🚀 Application is running on: ${await app.getUrl()}/${VAR_PREFIX}`,
  );
}
bootstrap();
