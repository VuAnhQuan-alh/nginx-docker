import helmet from 'helmet';

import { VAR_PREFIX } from '@libs/common/constants';
import { NestFactory } from '@nestjs/core';

import { AdminModule } from './admin.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AdminModule);
  app.enableCors();
  app.use(helmet());
  app.setGlobalPrefix(VAR_PREFIX);
  await app.listen(process.env.PORT_ADMIN);

  Logger.log(
    `🚀 Application is running on: ${await app.getUrl()}/${VAR_PREFIX}`,
  );
}
bootstrap();
