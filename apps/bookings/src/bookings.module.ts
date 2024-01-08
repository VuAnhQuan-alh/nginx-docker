import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { CommonModule } from '@libs/common';
import { DatabaseBookingModule } from '@libs/common/database/database-booking.module';
import { AppLoggerMiddleware } from '@libs/common/middleware/logger-request';

@Module({
  imports: [CommonModule, DatabaseBookingModule],
  controllers: [BookingsController],
  providers: [BookingsService],
})
export class BookingsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
