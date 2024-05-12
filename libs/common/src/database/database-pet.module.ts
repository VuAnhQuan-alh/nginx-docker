import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { DatabaseMongodbDefinitions } from './database.mongo';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        uri: config.getOrThrow<string>('MONGOOSE_URI_PET'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabasePetModule extends DatabaseMongodbDefinitions {}
