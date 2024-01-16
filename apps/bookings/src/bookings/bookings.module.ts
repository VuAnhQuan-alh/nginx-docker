import { CommonService } from '@libs/common';
import { DatabaseBookingModule } from '@libs/common/database/database-booking.module';
import { MicroserviceModule } from '@micro/microservice';
import { Module } from '@nestjs/common';

import { BookingRepository } from '../models/booking.repository';
import { BookingDocument, BookingSchema } from '../models/booking.schema';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';

@Module({
  imports: [
    MicroserviceModule,
    DatabaseBookingModule.forFeature([
      { name: BookingDocument.name, schema: BookingSchema },
    ]),
  ],
  controllers: [BookingsController],
  providers: [BookingsService, BookingRepository, CommonService],
})
export class BookingsModule {}
