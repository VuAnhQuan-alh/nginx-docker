import { Injectable } from '@nestjs/common';
import { BookingRepository } from '../models/booking.repository';
import { CreateBookingDTO } from '../dto/create-booking.dto';
import { BookingDocument } from '../models/booking.schema';
import { UpdateBookingDTO } from '../dto/update-booking.dto';
import { CommonService } from '@libs/common';

@Injectable()
export class BookingsService {
  constructor(
    private readonly bookingRepo: BookingRepository,
    private readonly commonService: CommonService,
  ) {}

  async create(data: CreateBookingDTO) {
    const code = this.commonService.getCodeHell('book');
    return await this.bookingRepo.create({ code, ...data });
  }

  async findAll(): Promise<[BookingDocument[], number]> {
    return await this.bookingRepo.findAndCount({}, [
      { path: 'promotion' },
      { path: 'services' },
    ]);
  }

  async findOne(_id: string): Promise<BookingDocument> {
    return await this.bookingRepo.findOne({ _id });
  }

  async update(_id: string, data: UpdateBookingDTO): Promise<BookingDocument> {
    return await this.bookingRepo.findOneAndUpdate({ _id }, data);
  }

  async remove(_id: string) {
    return await this.bookingRepo.findOneAndDelete({ _id });
  }
}
