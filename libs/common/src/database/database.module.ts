import { DynamicModule, Global, Module, Scope } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from './database.service';
import { DataSourceFactory } from './database.factory';
import { DataSource } from 'typeorm';

@Global()
@Module({})
export class DatabaseModule {
  static register(scopeType: Scope): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [ConfigModule, DataSource],
      providers: [DataSourceFactory[scopeType], DatabaseService],
      exports: ['DATA_SOURCE', DataSource, DatabaseService],
    };
  }
}
