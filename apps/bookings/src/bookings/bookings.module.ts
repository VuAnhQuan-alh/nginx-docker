import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { DatabaseBookingModule } from '@libs/common/database/database-booking.module';
import { BookingDocument, BookingSchema } from '../models/booking.schema';
import { BookingRepository } from '../models/booking.repository';

@Module({
  imports: [
    DatabaseBookingModule.forFeature([
      { name: BookingDocument.name, schema: BookingSchema },
    ]),
  ],
  controllers: [BookingsController],
  providers: [BookingsService, BookingRepository],
})
export class BookingsModule {}
