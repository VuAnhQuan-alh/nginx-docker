import helmet from 'helmet';

import { VAR_PREFIX } from '@libs/common/constants';
import { NestFactory } from '@nestjs/core';

import { AdminModule } from './admin.module';

async function bootstrap() {
  const app = await NestFactory.create(AdminModule);
  app.enableCors();
  app.use(helmet());
  app.setGlobalPrefix(VAR_PREFIX);
  await app.listen(process.env.PORT_ADMIN);
}
bootstrap();
