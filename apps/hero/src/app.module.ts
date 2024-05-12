import { Module, Scope } from '@nestjs/common';
import { AppTenantConnectModule } from '@libs/common/middleware/tenant-connect';
import { CommonModule } from '@libs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SuperModule } from './super/super.module';
import { DatabaseService } from '@libs/common/database/database.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbstractOrmRepository } from '@libs/common/database/abstract.orm.repository';
import { DatabaseModule } from '@libs/common/database/database.module';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    CommonModule,
    DatabaseModule.register(Scope.REQUEST),
    TypeOrmModule.forFeature([AbstractOrmRepository]),
    SuperModule,
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule extends AppTenantConnectModule {
  constructor(private dataSource: DataSource) {
    super();
  }
} // 4010
