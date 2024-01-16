import { CommonService } from '@libs/common';
import { DatabaseBookingModule } from '@libs/common/database/database-booking.module';
import { Module } from '@nestjs/common';

import { PromotionRepository } from '../models/promotion.repository';
import { PromotionDocument, PromotionSchema } from '../models/promotion.schema';
import { PromotionsController } from './promotions.controller';
import { PromotionsService } from './promotions.service';

@Module({
  imports: [
    DatabaseBookingModule.forFeature([
      { name: PromotionDocument.name, schema: PromotionSchema },
    ]),
  ],
  controllers: [PromotionsController],
  providers: [PromotionsService, PromotionRepository, CommonService],
})
export class PromotionsModule {}
