import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PromotionsService } from './promotions.service';
import { CreatePromotionDTO } from '../dto/create-promotion.dto';
import { UpdatePromotionDTO } from '../dto/update-promotion.dto';
import { MessageQuery } from '@libs/common/constant/messages';

@Controller('promotions')
export class PromotionsController {
  constructor(private readonly promotionsService: PromotionsService) {}

  @Post()
  async createPromotion(@Body() data: CreatePromotionDTO) {
    const result = await this.promotionsService.create(data);
    return { data: result, message: MessageQuery.CREATE_SUCCESS };
  }

  @Get()
  async getPromotions() {
    const [data, total] = await this.promotionsService.findAll();
    return { data, total, message: MessageQuery.GET_LIST_SUCCESS };
  }

  @Get(':id')
  async findUser(@Param('id') id: string) {
    const data = await this.promotionsService.findOne(id);
    return { data, message: MessageQuery.GET_ONE_SUCCESS };
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() data: UpdatePromotionDTO) {
    const result = await this.promotionsService.update(id, data);
    return { data: result, message: MessageQuery.UPDATE_SUCCESS };
  }

  @Delete('id')
  async remotePromotion(@Param('id') id: string) {
    const data = await this.promotionsService.remove(id);
    return { data, message: MessageQuery.REMOVE_SUCCESS };
  }
}
