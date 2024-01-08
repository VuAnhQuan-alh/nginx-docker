import helmet from 'helmet';

import { VAR_PREFIX } from '@libs/common/constants';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(helmet());
  app.setGlobalPrefix(VAR_PREFIX);
  await app.listen(process.env.PORT_PET);

  console.log(`Application is running on: ${await app.getUrl()}/petpot/api/v1`);
}
bootstrap();
