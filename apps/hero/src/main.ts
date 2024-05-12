import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { VAR_PREFIX } from '@libs/common/constant';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { HttpExceptionFilter } from '@libs/common/middleware/http-exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.enableCors();
  app.use(helmet());

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.setGlobalPrefix(VAR_PREFIX);

  await app.listen(config.getOrThrow<number>('PORT_HERO'));
  Logger.log(
    `🚀 Application is running on: ${await app.getUrl()}/${VAR_PREFIX}`,
  );
}
bootstrap();
