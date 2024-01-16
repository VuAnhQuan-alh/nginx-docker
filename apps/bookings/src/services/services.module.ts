import { CommonService } from '@libs/common';
import { DatabaseBookingModule } from '@libs/common/database/database-booking.module';
import { Module } from '@nestjs/common';

import { ServiceRepository } from '../models/service.repository';
import { ServiceDocument, ServiceSchema } from '../models/service.schema';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';

@Module({
  imports: [
    DatabaseBookingModule.forFeature([
      { name: ServiceDocument.name, schema: ServiceSchema },
    ]),
  ],
  controllers: [ServicesController],
  providers: [ServicesService, ServiceRepository, CommonService],
})
export class ServicesModule {}
