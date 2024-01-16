import { MessageQuery } from '@libs/common/constant/messages';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { CreateServiceDTO } from '../dto/create-service.dto';
import { UpdateServiceDTO } from '../dto/update-service.dto';
import { ServicesService } from './services.service';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  async createService(@Body() data: CreateServiceDTO) {
    const result = await this.servicesService.create(data);
    return { data: result, message: MessageQuery.CREATE_SUCCESS };
  }

  @Get()
  async getServices() {
    const [data, total] = await this.servicesService.findAll();
    return { data, total, message: MessageQuery.GET_LIST_SUCCESS };
  }

  @Get(':id')
  async findService(@Param('id') id: string) {
    const data = await this.servicesService.findOne(id);
    return { data, message: MessageQuery.GET_ONE_SUCCESS };
  }

  @Put(':id')
  async updateService(@Param('id') id: string, @Body() data: UpdateServiceDTO) {
    const result = await this.servicesService.update(id, data);
    return { data: result, message: MessageQuery.UPDATE_SUCCESS };
  }

  @Delete(':id')
  async removeService(@Param('id') id: string) {
    const data = await this.servicesService.remove(id);
    return { data, message: MessageQuery.REMOVE_SUCCESS };
  }
}
