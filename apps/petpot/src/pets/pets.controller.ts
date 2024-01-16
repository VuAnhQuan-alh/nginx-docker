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

import { CreatePetDTO } from '../dto/create-pet.dto';
import { UpdateOwnerDTO } from '../dto/update-owner.dto';
import { PetsService } from './pets.service';

@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Post()
  async createPet(@Body() data: CreatePetDTO) {
    const result = await this.petsService.create(data);
    return { data: result, message: MessageQuery.CREATE_SUCCESS };
  }

  @Get()
  async getPets() {
    const [data, total] = await this.petsService.findAll({});
    return { data, total, message: MessageQuery.GET_LIST_SUCCESS };
  }

  @Get(':id')
  async findPet(@Param('id') id: string) {
    const data = await this.petsService.findOne(id);
    return { data, message: MessageQuery.GET_ONE_SUCCESS };
  }

  @Put(':id')
  async updatePet(@Param('id') id: string, @Body() data: UpdateOwnerDTO) {
    const result = await this.petsService.update(id, data);
    return { data: result, message: MessageQuery.UPDATE_SUCCESS };
  }

  @Delete(':id')
  async removePet(@Param('id') id: string) {
    const data = await this.petsService.remove(id);
    return { data, message: MessageQuery.REMOVE_SUCCESS };
  }
}
