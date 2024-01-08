import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ServiceConfig } from '../utils/config';
import { ServiceCenter, ServiceName } from '../utils/service';

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
})
export class AdminProducerModule {}
