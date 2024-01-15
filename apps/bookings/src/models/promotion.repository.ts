import { AbstractRepository } from '@libs/common/database/abstract.repository';
import { Injectable, Logger } from '@nestjs/common';
import { PromotionDocument } from './promotion.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PromotionRepository extends AbstractRepository<PromotionDocument> {
  protected readonly logger = new Logger(PromotionRepository.name);

  constructor(
    @InjectModel(PromotionDocument.name)
    promotionModel: Model<PromotionDocument>,
  ) {
    super(promotionModel);
  }
}
