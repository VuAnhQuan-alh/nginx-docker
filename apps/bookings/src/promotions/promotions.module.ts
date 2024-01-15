import { Module } from '@nestjs/common';
import { PromotionsService } from './promotions.service';
import { PromotionsController } from './promotions.controller';
import { DatabaseBookingModule } from '@libs/common/database/database-booking.module';
import { PromotionDocument, PromotionSchema } from '../models/promotion.schema';
import { PromotionRepository } from '../models/promotion.repository';
import { CommonService } from '@libs/common';

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
