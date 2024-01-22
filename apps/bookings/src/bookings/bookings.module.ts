import { CommonService } from '@libs/common';
import { DatabaseBookingModule } from '@libs/common/database/database-booking.module';
import { Module } from '@nestjs/common';

import { BookingRepository } from '../models/booking.repository';
import { BookingDocument, BookingSchema } from '../models/booking.schema';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { AdminProducerModule } from '@micro/microservice/admin';

@Module({
  imports: [
    AdminProducerModule,
    DatabaseBookingModule.forFeature([
      { name: BookingDocument.name, schema: BookingSchema },
    ]),
  ],
  controllers: [BookingsController],
  providers: [BookingsService, BookingRepository, CommonService],
})
export class BookingsModule {}
