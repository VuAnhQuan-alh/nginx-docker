import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { ServiceConfig } from '../utils/config';
import { ServiceCenter, ServiceName } from '../utils/service';
import { AdminProducerService } from './admin-producer.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: ServiceName.ADMIN,
        transport: Transport.KAFKA,
        options: ServiceConfig[ServiceCenter.ADMIN],
      },
    ]),
  ],
  providers: [AdminProducerService],
  exports: [ClientsModule, AdminProducerService],
})
export class AdminProducerModule {}
