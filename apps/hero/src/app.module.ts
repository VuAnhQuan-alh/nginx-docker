import { CommonModule } from '@libs/common';
import { AbstractOrmRepository } from '@libs/common/database/abstract.orm.repository';
import { DatabaseModule } from '@libs/common/database/database.module';
import { DatabaseService } from '@libs/common/database/database.service';
import { AppTenantConnectModule } from '@libs/common/middleware/tenant-connect';
import { Module, Scope } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SuperModule } from './super/super.module';

@Module({
  imports: [
    CommonModule,
    DatabaseModule.register(Scope.REQUEST),
    // TypeOrmModule.forFeature([AbstractOrmRepository]),
    // SuperModule,
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
// export class AppModule extends AppTenantConnectModule {
//   constructor() {
//     super();
//   }
// } // 4010
