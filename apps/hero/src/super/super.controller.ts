import { Controller, Get } from '@nestjs/common';
import { SuperService } from './super.service';
import { MessageQuery } from '@libs/common/constant/messages';

@Controller('super')
export class SuperController {
  constructor(private readonly superService: SuperService) {}

  @Get()
  async getSupers() {
    const data = await this.superService.findAll({});
    return { data, message: MessageQuery.GET_LIST_SUCCESS };
  }
}
