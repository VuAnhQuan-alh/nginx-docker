import { SERVICE_NAME } from '@libs/common/constant/service.name';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { MicroserviceService } from './microservice.service';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: SERVICE_NAME.AUTH_SERVICE,
        useFactory: (config: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: config.get<string>('TCP_HOST'),
            port: config.get<number>('TCP_PORT'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [MicroserviceService],
  exports: [ClientsModule],
})
export class MicroserviceModule {}
