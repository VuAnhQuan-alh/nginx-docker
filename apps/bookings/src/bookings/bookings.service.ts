import { Injectable } from '@nestjs/common';
import { BookingRepository } from '../models/booking.repository';
import { CreateBookingDTO } from '../dto/create-booking.dto';
import { BookingDocument } from '../models/booking.schema';

@Injectable()
export class BookingsService {
  constructor(private readonly bookingRepo: BookingRepository) {}

  async create(data: CreateBookingDTO) {
    return await this.bookingRepo.create(data);
  }

  async findAll(): Promise<[BookingDocument[], number]> {
    return await this.bookingRepo.findAndCount({});
  }
}
