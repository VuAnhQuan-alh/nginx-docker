import { DynamicModule, Module, Scope } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DataSourceFactory } from './database.provider';
import { DatabaseService } from './database.service';

@Module({})
export class DatabaseModule {
  static register(scopeType: Scope): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [ConfigModule],
      providers: [DataSourceFactory[scopeType], DatabaseService],
      exports: ['DATA_SOURCE', DatabaseService],
    };
  }
}
