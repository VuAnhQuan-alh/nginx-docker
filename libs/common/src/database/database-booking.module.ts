import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModuleDefinitions } from './database.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('MONGOOSE_URI_BOOKING'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseBookingModule extends DatabaseModuleDefinitions {}
