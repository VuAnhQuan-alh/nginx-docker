import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { OwnersService } from './owners.service';
import { CreateOwnerDTO } from '../dto/create-owner.dto';
import { MessageQuery } from '@libs/common/constant/messages';
import { UpdateOwnerDTO } from '../dto/update-owner.dto';

@Controller('owners')
export class OwnersController {
  constructor(private readonly ownersService: OwnersService) {}

  @Post()
  async createOwner(@Body() data: CreateOwnerDTO) {
    const result = await this.ownersService.create(data);
    return { data: result, message: MessageQuery.CREATE_SUCCESS };
  }

  @Get()
  async getOwners() {
    const [data, total] = await this.ownersService.findAll();
    return { data, total, message: MessageQuery.GET_LIST_SUCCESS };
  }

  @Get(':id')
  async findOwner(@Param('id') id: string) {
    const data = await this.ownersService.findOne(id);
    return { data, message: MessageQuery.GET_ONE_SUCCESS };
  }

  @Put(':id')
  async updateOwner(@Param('id') id: string, @Body() data: UpdateOwnerDTO) {
    const result = await this.ownersService.update(id, data);
    return { data: result, message: MessageQuery.UPDATE_SUCCESS };
  }

  @Delete(':id')
  async removeOwner(@Param('id') id: string) {
    const data = await this.ownersService.remove(id);
    return { data, message: MessageQuery.REMOVE_SUCCESS };
  }
}
