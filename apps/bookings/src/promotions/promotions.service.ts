import { CommonService } from '@libs/common';
import { Injectable } from '@nestjs/common';

import { CreatePromotionDTO } from '../dto/create-promotion.dto';
import { UpdatePromotionDTO } from '../dto/update-promotion.dto';
import { PromotionRepository } from '../models/promotion.repository';
import { PromotionDocument } from '../models/promotion.schema';

@Injectable()
export class PromotionsService {
  constructor(
    private readonly promotionRepo: PromotionRepository,
    private readonly commonService: CommonService,
  ) {}

  async create(data: CreatePromotionDTO): Promise<PromotionDocument> {
    const code = this.commonService.getCodeHell('prom');
    return await this.promotionRepo.create({ ...data, code });
  }

  async findAll(): Promise<[PromotionDocument[], number]> {
    return await this.promotionRepo.findAndCount({});
  }

  async findOne(_id: string): Promise<PromotionDocument> {
    return await this.promotionRepo.findOne({ _id });
  }

  async update(
    _id: string,
    data: UpdatePromotionDTO,
  ): Promise<PromotionDocument> {
    return await this.promotionRepo.findOneAndUpdate({ _id }, data);
  }

  async remove(_id: string) {
    return await this.promotionRepo.findOneAndDelete({ _id });
  }
}
