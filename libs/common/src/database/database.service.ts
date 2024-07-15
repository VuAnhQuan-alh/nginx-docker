import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Database, DatabaseConfig } from './database';
import DataSourceManager from './database.helper';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private logger = new Logger(DatabaseService.name);
  private connections: Map<string, DataSource> = new Map();

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    // Initialize connections when the app starts
  }
  async onModuleDestroy() {
    // Close all connections when the app is shut down
    this.logger.warn('Tenant Destroy');

    // for (const connection of this.connections.values()) {
    //   await connection.destroy();
    // }
  }

  async getDBDataSource(dataSourceName: string): Promise<DataSource> {
    return DataSourceManager.getInstance().getDBDataSource(dataSourceName);
  }
  async getDatabaseName(tenantId: string): Promise<string> {
    const database = await this.configService.getOrThrow<Database>(
      `database.${tenantId}`,
    );
    return database.name;
  }

  async syncDatabase(tenantId: string): Promise<void> {
    const db = await this.configService.getOrThrow<Database>(
      `database.${tenantId}`,
    );
    if (db) {
      const dataSource = new DataSource({
        type: db.type,
        host: db.host,
        port: db.port,
        username: db.username,
        password: db.password,
        database: db.database,
        synchronize: db.synchronize,
        logging: db.logging,
        entities: db.entities,
      } as PostgresConnectionOptions);
      DataSourceManager.getInstance().addDataSource(db.name, dataSource);
    } else {
      throw new Error('No database found');
    }
  }
  async syncAllDatabase(): Promise<void> {
    const database = await this.configService.get<DatabaseConfig>(`database`);
    Object.keys(database).forEach(async (key) => {
      const db: Database = database[key];
      const dataSource = new DataSource({
        type: db.type,
        host: db.host,
        port: db.port,
        username: db.username,
        password: db.password,
        database: db.database,
        synchronize: db.synchronize,
        logging: db.logging,
        entities: db.entities,
      } as PostgresConnectionOptions);
      DataSourceManager.getInstance().addDataSource(db.name, dataSource);
    });
  }
}
