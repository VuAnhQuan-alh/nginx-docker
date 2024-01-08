import { CommonModule } from '@libs/common';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppLoggerMiddleware } from '@libs/common/middleware/logger-request';
import { DatabasePetModule } from '@libs/common/database/database-pet.module';

@Module({
  imports: [CommonModule, DatabasePetModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
