import { ClientsModule, Transport } from '@nestjs/microservices';
import { Module } from '@nestjs/common';
import { MicroserviceService } from './microservice.service';
import { ConfigService } from '@nestjs/config';
import { SERVICE_NAME } from '@libs/common/constant/service.name';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: SERVICE_NAME.AUTH_SERVICE,
        useFactory: (config: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: '0.0.0.0',
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
