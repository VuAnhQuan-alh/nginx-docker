import { Controller, Get, Post } from '@nestjs/common';
import { ServicesService } from './services.service';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  async createService() {
    return { data: null, message: 'Created successful!' };
  }

  @Get()
  async getServices() {
    const [data, total] = await this.servicesService.findAll();
    return { data, total, message: 'Get list successful!' };
  }
}
