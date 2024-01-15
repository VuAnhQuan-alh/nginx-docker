import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from '@libs/common/middleware/http-exception';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { VAR_PREFIX } from '@libs/common/constant';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(helmet());

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalFilters(new HttpExceptionFilter());

  app.setGlobalPrefix(VAR_PREFIX);
  const config = app.get(ConfigService);
  await app.listen(config.get<number>('PORT_BOOKING'));

  Logger.log(
    `🚀 Application is running on: ${await app.getUrl()}/${VAR_PREFIX}`,
  );
}
bootstrap();
