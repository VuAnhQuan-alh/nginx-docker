import { Controller, Get, Post } from '@nestjs/common';
import { BookingsService } from './bookings.service';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  async createBooking() {
    return { data: null, message: 'Created failed!' };
  }

  @Get()
  async getBookings() {
    const [data, total] = await this.bookingsService.findAll();
    return { data, total, message: 'Get list booking successful!' };
  }
}
