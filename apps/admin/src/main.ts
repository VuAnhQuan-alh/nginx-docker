import helmet from 'helmet';

import { VAR_PREFIX } from '@libs/common/constant';
import { NestFactory } from '@nestjs/core';

import { AdminModule } from './admin.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from '@libs/common/middleware/http-exception';

async function bootstrap() {
  const app = await NestFactory.create(AdminModule);
  app.enableCors();
  app.use(helmet());

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  app.setGlobalPrefix(VAR_PREFIX);
  await app.listen(process.env.PORT_ADMIN);

  Logger.log(
    `🚀 Application is running on: ${await app.getUrl()}/${VAR_PREFIX}`,
  );
}
bootstrap();
