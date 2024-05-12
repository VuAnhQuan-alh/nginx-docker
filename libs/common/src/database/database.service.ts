import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private logger = new Logger(DatabaseService.name);
  private connections: Map<string, DataSource> = new Map();

  async onModuleInit() {
    // Initialize connections when the app starts
  }

  async getConnection(tenantId: string): Promise<DataSource | null> {
    console.log('tenant connect:', { tenantId });

    if (!this.connections.has(tenantId)) {
      const connection = new DataSource({
        // name: `data_${tenantId}`,
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'admin',
        password: '123456aA@',
        database: `tenant_${tenantId}`, // Giả sử mỗi tenant có một DB tên là "tenant_{tenantId}"
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true, // Lưu ý: chỉ dùng synchronize trong môi trường phát triển
      });
      return await connection
        .initialize()
        .then(() => {
          console.log('Data Source has been initialized!');

          this.connections.set(tenantId, connection);
          return connection;
        })
        .catch((err) => {
          console.error('Error during Data Source initialization', err.message);
          return null;
        });
    }

    return this.connections.get(tenantId);
  }

  async onModuleDestroy() {
    // Close all connections when the app is shut down
    this.logger.warn('Tenant Destroy');

    // for (const connection of this.connections.values()) {
    //   await connection.destroy();
    // }
  }
}
