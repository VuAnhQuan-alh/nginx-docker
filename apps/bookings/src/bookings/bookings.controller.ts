import { MessageQuery } from '@libs/common/constant/messages';
import { JWTCanAuth } from '@micro/microservice/auth/jwt-auth.canactivate';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';

import { CreateBookingDTO } from '../dto/create-booking.dto';
import { UpdateBookingDTO } from '../dto/update-booking.dto';
import { BookingsService } from './bookings.service';

@Controller('bookings')
@UseGuards(JWTCanAuth)
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  async createBooking(@Req() request, @Body() data: CreateBookingDTO) {
    const result = await this.bookingsService.create({
      ...data,
      staffId: request.user._id,
    });
    return { data: result, message: MessageQuery.CREATE_SUCCESS };
  }

  @Get()
  async getBookings() {
    const [data, total] = await this.bookingsService.findAll();
    return { data, total, message: MessageQuery.GET_LIST_SUCCESS };
  }

  @Get('id')
  async findBooking(@Param('id') id: string) {
    const data = await this.bookingsService.findOne(id);
    return { data, message: MessageQuery.GET_ONE_SUCCESS };
  }

  @Put(':id')
  async updateBooking(
    @Req() request,
    @Param('id') id: string,
    @Body() data: UpdateBookingDTO,
  ) {
    const result = await this.bookingsService.update(id, {
      ...data,
      staffId: request.user._id,
    });
    return { data: result, message: MessageQuery.UPDATE_SUCCESS };
  }

  @Delete(':id')
  async removeBooking(@Param('id') id: string) {
    const data = await this.bookingsService.remove(id);
    return { data, message: MessageQuery.REMOVE_SUCCESS };
  }
}
