import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { MicroserviceService } from './microservice.service';

@Module({
  imports: [],
  providers: [MicroserviceService],
  exports: [ClientsModule],
})
export class MicroserviceModule {}
