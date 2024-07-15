import helmet from 'helmet';

import { VAR_PREFIX } from '@libs/common/constant';
import { Database } from '@libs/common/database/database';
import DataSourceManager from '@libs/common/database/database.helper';
import { HttpExceptionFilter } from '@libs/common/middleware/http-exception';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.enableCors();
  app.use(helmet());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      validateCustomDecorators: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  app.setGlobalPrefix(VAR_PREFIX);

  const database = await config.getOrThrow<Database>('database');
  await DataSourceManager.getInstance().syncAllDatabase(database);

  await app.listen(config.getOrThrow<number>('PORT_HERO'));
  Logger.log(
    `🚀 Application is running on: ${await app.getUrl()}/${VAR_PREFIX}`,
  );
}
bootstrap();
