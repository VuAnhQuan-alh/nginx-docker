import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

import { Database, DatabaseConfig } from './database';

export default class DataSourceManager {
  private static instance: DataSourceManager;
  private dataSources: { [key: string]: DataSource };

  private constructor() {
    this.dataSources = {};
  }

  public static getInstance(): DataSourceManager {
    if (!DataSourceManager.instance) {
      DataSourceManager.instance = new DataSourceManager();
    }
    return DataSourceManager.instance;
  }

  async initialize(dataSourceName: string): Promise<void> {
    Promise.resolve(this.dataSources[dataSourceName].initialize());
  }

  async addDataSource(
    dataSourceName: string,
    dataSource: DataSource,
  ): Promise<void> {
    this.dataSources[dataSourceName] = dataSource;
  }

  async getDBDataSource(dataSourceName: string): Promise<DataSource> {
    if (this.dataSources[dataSourceName]) {
      const dataSource = this.dataSources[dataSourceName];
      return Promise.resolve(
        dataSource.isInitialized ? dataSource : dataSource.initialize(),
      );
    }

    throw new Error(`No data source found for ${dataSourceName}`);
  }

  async syncAllDatabase(dbConfig: DatabaseConfig): Promise<void> {
    Object.keys(dbConfig).forEach(async (key) => {
      const db: Database = dbConfig[key];
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
      DataSourceManager.getInstance().addDataSource(key, dataSource);
    });
  }
}
