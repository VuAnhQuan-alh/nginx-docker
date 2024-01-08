import { CommonModule } from '@libs/common';
import { DatabaseBookingModule } from '@libs/common/database/database-booking.module';
import { AppLoggerModule } from '@libs/common/middleware/logger-request';
import { Module } from '@nestjs/common';

import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';

@Module({
  imports: [CommonModule, DatabaseBookingModule],
  controllers: [BookingsController],
  providers: [BookingsService],
})
export class BookingsModule extends AppLoggerModule {}
