import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(helmet());
  app.setGlobalPrefix('api/v1');
  await app.listen(process.env.PORT);

  console.log(`Application is running on: ${await app.getUrl()}/api/v1`);
}
bootstrap();
