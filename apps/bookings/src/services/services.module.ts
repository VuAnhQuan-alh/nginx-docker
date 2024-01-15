import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { ServiceRepository } from '../models/service.repository';
import { DatabaseBookingModule } from '@libs/common/database/database-booking.module';
import { ServiceDocument, ServiceSchema } from '../models/service.schema';

@Module({
  imports: [
    DatabaseBookingModule.forFeature([
      { name: ServiceDocument.name, schema: ServiceSchema },
    ]),
  ],
  controllers: [ServicesController],
  providers: [ServicesService, ServiceRepository],
})
export class ServicesModule {}
