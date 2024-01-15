import { CommonModule } from '@libs/common';
import { DatabaseBookingModule } from '@libs/common/database/database-booking.module';
import { AppLoggerModule } from '@libs/common/middleware/logger-request';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServicesModule } from './services/services.module';
import { PromotionsModule } from './promotions/promotions.module';
import { BookingsModule } from './bookings/bookings.module';

@Module({
  imports: [
    CommonModule,
    DatabaseBookingModule,
    ServicesModule,
    PromotionsModule,
    BookingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule extends AppLoggerModule {}
