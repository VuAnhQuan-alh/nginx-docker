import { AbstractRepository } from '@libs/common/database/abstract.repository';
import { Injectable, Logger } from '@nestjs/common';
import { BookingDocument } from './booking.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class BookingRepository extends AbstractRepository<BookingDocument> {
  protected readonly logger = new Logger(BookingRepository.name);

  constructor(
    @InjectModel(BookingDocument.name) bookingModel: Model<BookingDocument>,
  ) {
    super(bookingModel);
  }
}
