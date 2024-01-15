import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { DatabaseBookingModule } from '@libs/common/database/database-booking.module';
import { BookingDocument, BookingSchema } from '../models/booking.schema';
import { BookingRepository } from '../models/booking.repository';
import { CommonService } from '@libs/common';
import { MicroserviceModule } from '@micro/microservice';

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
