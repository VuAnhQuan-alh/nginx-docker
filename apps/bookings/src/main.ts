import { NestFactory } from '@nestjs/core';
import { BookingsModule } from './bookings.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(BookingsModule);
  app.enableCors();
  app.use(helmet());
  app.setGlobalPrefix('booking/api/v1');
  await app.listen(process.env.PORT_BOOING);

  console.log(
    `Application is running on: ${await app.getUrl()}/booking/api/v1`,
  );
}
bootstrap();
