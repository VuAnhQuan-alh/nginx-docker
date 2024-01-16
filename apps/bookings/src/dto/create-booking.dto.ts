import { OmitType } from '@nestjs/mapped-types';

import { BookingDocument } from '../models/booking.schema';

export class CreateBookingDTO extends OmitType(BookingDocument, ['code']) {}
