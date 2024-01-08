import helmet from 'helmet';

import { VAR_PREFIX } from '@libs/common/constants';
import { NestFactory } from '@nestjs/core';

import { BookingsModule } from './bookings.module';

async function bootstrap() {
  const app = await NestFactory.create(BookingsModule);
  app.enableCors();
  app.use(helmet());
  app.setGlobalPrefix(VAR_PREFIX);
  await app.listen(process.env.PORT_BOOING);

  console.log(`Application is running on: ${await app.getUrl()}/${VAR_PREFIX}`);
}
bootstrap();
