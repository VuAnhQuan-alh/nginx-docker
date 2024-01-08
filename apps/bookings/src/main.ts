import helmet from 'helmet';

import { VAR_PREFIX } from '@libs/common/constant';
import { NestFactory } from '@nestjs/core';

import { BookingsModule } from './bookings.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(BookingsModule);
  app.enableCors();
  app.use(helmet());
  app.setGlobalPrefix(VAR_PREFIX);
  await app.listen(process.env.PORT_BOOKING);

  Logger.log(
    `🚀 Application is running on: ${await app.getUrl()}/${VAR_PREFIX}`,
  );
}
bootstrap();
